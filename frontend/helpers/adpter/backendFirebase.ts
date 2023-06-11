import { FirebaseApp } from "firebase/app";
import {
    ApplicationVerifier,
    Auth,
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";
import { FirebaseWindow } from "../customWindow";
import { SignUpProps } from "@/components/signUpForm/signUpForm";

interface RecaptchaProps {
    size: "string"
    callback: () => void
    auth: Auth
}

interface SignInRedirect {
    shouldRedirect: boolean;
    redirect: () => void
}


class BackendFirebase {
    auth !: Auth

    constructor(app: FirebaseApp) {
        this.auth = getAuth(app)
    }

    public async signIn(args: SignUpProps, redirect: SignInRedirect, window: FirebaseWindow) {
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


