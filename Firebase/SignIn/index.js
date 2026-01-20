import FirebaseBuilder from "../../Scripts/firebaseHandler.js"

const FirebaseService = FirebaseBuilder()

console.log(FirebaseService.isSignedIn)

const redirect_old = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const redirectTo = urlParams.get("redirect")
  console.log(redirectTo)
  if (redirectTo) {
    let newURL = new URL(redirectTo, window.location.protocol + window.location.host)
    newURL.hash = window.location.hash
    window.location.assign(newURL)
  } else {
    let newURL = new URL("/Firebase", window.location.protocol + window.location.host)
    window.location.assign(newURL)
  }
}

const redirectAfterSignIn = sessionStorage.getItem("redirectAfterSignIn")
const redirect = () => {
  if (redirectAfterSignIn) {
    let newURL = new URL(redirectAfterSignIn, window.location.protocol + window.location.host)
    sessionStorage.removeItem("redirectAfterSignIn")
    window.location.assign(newURL)
  } else {
    let newURL = new URL("/Firebase", window.location.protocol + window.location.host)
    window.location.assign(newURL)
  }
}

FirebaseService.addEventListener("signInStateChanged", () => {
  console.log("Sign-in state changed.")
  console.log(FirebaseService.isSignedIn)
  if (FirebaseService.isSignedIn) {
    console.log("Signed in now.")
    redirect()
  }
})

if (FirebaseService.isSignedIn) {
  console.log("Already signed in!")
  redirect()
} else {
  console.log("Not signed in.")

  const emailElement = document.getElementById("emailInput")
  const passwordElement = document.getElementById("passwordInput")
  const responseElement = document.getElementById("errorMessage")
  const signInElement = document.getElementById("signInButton")
  const signUpElement = document.getElementById("signUpButton")

  let debounce = false

  const debounceStart = () => {
    debounce = true
    emailElement.disabled = true
    passwordElement.disabled = true
    signInElement.disabled = true
    signUpElement.disabled = true
  }

  const debounceEnd = () => {
    responseElement.textContent = ""
    debounce = false
    emailElement.removeAttribute("disabled")
    passwordElement.removeAttribute("disabled")
    signInElement.removeAttribute("disabled")
    signUpElement.removeAttribute("disabled")
  }

  const signInPress = async () => {
    if (debounce) return
    debounceStart()
    responseElement.textContent = "Signing in..."
    const email = emailElement.value
    const password = passwordElement.value

    FirebaseService.attemptSignIn(email, password, (NewState) => {
      responseElement.textContent = NewState
    }).then((a) => {
      redirect()
    }).catch((e) => {
      responseElement.textContent = e
    }).finally(() => {
      setTimeout(debounceEnd, 5 * 1000)
    })
  }

  const signUpPress = async () => {
    if (debounce) return
    debounceStart()
    responseElement.textContent = "Signing up..."
    const email = emailElement.value
    const password = passwordElement.value

    FirebaseService.attemptSignUp(email, password, (NewState) => {
      responseElement.textContent = NewState
    }).then((a) => {
    }).catch((e) => {
      responseElement.textContent = e

    }).finally(() => {
      setTimeout(debounceEnd, 5 * 1000)
    })

  }

  signInElement.addEventListener("click", signInPress)
  signUpElement.addEventListener("click", signUpPress)
}

/*

get(dataRef)
  .then((snapshot) => {
    document.getElementById("DatabaseTest").textContent =
      snapshot.exists()
        ? JSON.stringify(snapshot.val(), null, 2)
        : "No data available";
  })
  .catch((error) => {
    document.getElementById("DatabaseTest").textContent =
      "Error: " + error.message;
  });

setTimeout(() => {
  console.log("Attempting value set");
  set(
    ref(database, "testing"),
    parseFloat(document.getElementById("DatabaseTest").textContent) + 1
  );
}, 5000);*/