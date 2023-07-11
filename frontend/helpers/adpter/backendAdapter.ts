import { FirebaseApp } from "firebase/app";
import BackendFirebase from "./backendFirebase";
import { FirebaseWindow } from "@/helpers/customWindow";
import { ApplicationVerifier } from "firebase/auth";

export interface SignUpProps {
  name: string;
  email: string;
  city: string;
  phone: string;
  birth: Dayjs;
  appVerifier: ApplicationVerifier;
}

class BackendAdapter {
    backend: BackendFirebase | null = null

    constructor(backendType: string, app: FirebaseApp) {
        if (backendType === "firebase") {
            this.backend = new BackendFirebase(app)
            this.backend.auth.useDeviceLanguage();
        }
        else {
            throw new Error('Suporta apenas firebase')
        }
    }
    
    signInWithPhone(args: SignUpProps, window: FireBaseWindow) {
      this.backend.signInWithPhone(
        args,
        { shouldRedirect: true, redirect: () => router.push("/verify") },
        window
      );
    }
    
    signInWithEmail(email: string, password: string) {
      this.backend.signInWithEmail(email, password, {
        shouldRedirect: true,
        redirect: () => router.push("/admin/campaignSelect"),
      });
    }

    validation() {
      this.backend.validation();
    }
    
    signUp(email: string, password: string, path: string, name: string) {
      this.backend.signUp(
        email,
        password,
        { shouldRedirect: true, redirect: () => router.push(path) },
        name
      );
    }
}

export default BackendAdapter
