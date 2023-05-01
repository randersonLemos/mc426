import { RecaptchaParameters, ConfirmationResult } from 'firebase/auth'

export interface FirebaseWindow extends Window {
  recaptchaVerifier: RecaptchaParameters
  confirmationResult: ConfirmationResult
}
