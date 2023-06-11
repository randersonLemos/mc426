import { FirebaseApp } from "firebase/app";
import BackendFirebase from "./backendFirebase";

class BackendAdapter {
    backend: BackendFirebase | null = null

    constructor(backendType: string, app: FirebaseApp) {
        if (backendType === "firebase") {
            this.backend = new BackendFirebase(app)
        }
        else {
            throw new Error('Suporta apenas firebase')
        }
    }


}

export default BackendAdapter