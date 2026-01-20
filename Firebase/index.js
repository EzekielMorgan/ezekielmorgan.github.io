import FirebaseBuilder from "../Scripts/firebaseHandler.js"

const Firebase = FirebaseBuilder()

const Page = () => {

}

Firebase.addEventListener("signInStateChanged", () => {
  if (!Firebase.isSignedIn) {
    Firebase.redirectToSignIn()
  } else {
    Page()
  }
})