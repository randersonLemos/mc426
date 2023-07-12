import { RecaptchaParameters, ConfirmationResult, RecaptchaVerifier } from 'firebase/auth'

export interface FirebaseWindow extends Window {
  recaptchaVerifier: RecaptchaParameters | RecaptchaVerifier | undefined
  confirmationResult: ConfirmationResult
}
