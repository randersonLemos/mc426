import { FirebaseApp } from "firebase/app";
import {
    Auth,
    createUserWithEmailAndPassword,
    getAuth,
    RecaptchaVerifier,
    signInWithEmailAndPassword,
    signInWithPhoneNumber,
    updateProfile,
} from "firebase/auth";
import { FirebaseWindow } from "../customWindow";
import { SignUpProps } from "@/components/signUpForm/signUpForm";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/pages/_app";

interface RecaptchaProps {
    size: "string"
    callback: () => void
    auth: Auth
}

interface SignInRedirect {
    shouldRedirect: boolean;
    redirect: () => any
}


class BackendFirebase {
    auth !: Auth

    constructor(app: FirebaseApp) {
        this.auth = getAuth(app)
    }

    public async signInWithPhone(args: SignUpProps, redirect: SignInRedirect, window: FirebaseWindow) {
        await signInWithPhoneNumber(this.auth, args.phone, args.appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                sessionStorage.setItem("name", args.name);
                sessionStorage.setItem("email", args.email);
                sessionStorage.setItem("city", args.city);
                sessionStorage.setItem("phone", args.phone);
                sessionStorage.setItem("birth", String(args.birth.unix()));
                if (redirect && redirect.shouldRedirect) redirect.redirect()
                // router.push("/verify");
                // return confirmationResult;
            })
            .catch((error) => {
                // Error; SMS not sent
                console.error(error);
            });
    }

    public async signInWithEmail(email: string, password: string, redirect: SignInRedirect) {
        let flag = false

        await signInWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user
                sessionStorage.setItem('user', JSON.stringify(user))
                flag = true
                // ...
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode, errorMessage)
            })

        if (flag && redirect.shouldRedirect) redirect.redirect()
    }

    public async signUp(email: string, password: string, redirect: SignInRedirect, name = "Usuário") {
        let flag = false
        const user = (await createUserWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user
                sessionStorage.setItem('user', JSON.stringify(user))
                console.log(user)
                flag = true
                return user
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode, errorMessage)
            }))

        if (user && flag) {
            await updateProfile(user, { displayName: name }).catch((err) => console.log(err))

            try {
                const docRef = await addDoc(collection(db, 'admins'), {
                    userInfo: user.uid,
                    name,
                    email: user.email,
                })
                console.log('Document written with ID: ', docRef.id)
                if (redirect.shouldRedirect) redirect.redirect()
            } catch (e) {
                console.error('Error adding document: ', e)
            }
        }
    }


    public validation(): RecaptchaVerifier {
        const verifier = new RecaptchaVerifier(
            "recaptcha",
            {
                size: "invisible",
                callback: () => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    // handleSignUp()
                },
            },
            this.auth
        );


        return verifier
    }
}

export default BackendFirebase


