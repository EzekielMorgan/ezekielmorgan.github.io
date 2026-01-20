import { initializeApp, deleteApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getDatabase, ref, get, set, onValue, goOffline, goOnline } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
import { getAuth, signOut, signInAnonymously, setPersistence, browserLocalPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCHpFyiCn2xrjCJJVCSjrJk83ebiOS91z8",
    authDomain: "ezekielmorgan-github-io.firebaseapp.com",
    databaseURL: "https://ezekielmorgan-github-io-default-rtdb.firebaseio.com",
    projectId: "ezekielmorgan-github-io",
    storageBucket: "ezekielmorgan-github-io.firebasestorage.app",
    messagingSenderId: "771229554096",
    appId: "1:771229554096:web:9296b76a98421104da7275",
    measurementId: "G-0ESVDEN3YE"
};

const DEFAULT_USER_DATA = {
    Name: '',
}

const EMPTY_CALLBACK = () => {

}

const htmlData = {
    signInDisplayElement: `
    <section class="firebaseLogInContainer" id="signinContainer" style="transform: translateX(300px);" hidden>
      <button id="fb-visibilityButton"><</button>
      <section id="fb-logInContent">
        <a id="fb-signInTitle">Firebase Log In</a>
        <a id="fb-accountName">Not signed in</a>
        <div id="fb-inputs">
          <button id="fb-signIn">Sign In/Up</button>
          <button id="fb-signOut" hidden>Sign Out</button>
        </div>
      </section>
    </section>`,
}

const FirebaseService = class extends EventTarget {
    constructor() {
        super()
        this.#app = initializeApp(firebaseConfig);

        this.#database = getDatabase(this.#app);

        this.#auth = getAuth(this.#app);

        onValue(ref(this.#database, 'Users/_AllowedEmails'), (snapshot) => {
            this.#allowedEmails = snapshot.val() || []
        })

        onAuthStateChanged(this.#auth, (user) => {
            if (this.#Debounces.SignIn) return
            if (user) {
                this.#user.user = user
                this.#finializeSignIn(this.#SignInStateChanged_Dispatch, this.#SignInStateChanged_Dispatch, true, EMPTY_CALLBACK)
            } else {
                this.#user.user = undefined
                this.#user.data = undefined
                this.dispatchEvent(new Event("signInStateChanged"))
            }
        })
        if (this.#auth.currentUser) {
            this.#user.user = this.#auth.currentUser
            this.#finializeSignIn(this.#SignInStateChanged_Dispatch, this.#SignInStateChanged_Dispatch, true, EMPTY_CALLBACK)
        }
        const SignInButton = document.getElementById("fb-signIn")
        const SignOutButton = document.getElementById("fb-signOut")
        const AccountNameDisplay = document.getElementById("fb-accountName")
        const VisibilityButton = document.getElementById("fb-visibilityButton")
        const SignInContainer = document.getElementById("signinContainer")
        if (SignInButton && SignOutButton && AccountNameDisplay && VisibilityButton && SignInContainer) {
            this.addEventListener("signInStateChanged", () => {
                if (this.isSignedIn) {
                    AccountNameDisplay.textContent = this.#user.data.Name || this.#user.user.email || "Unnamed User"
                    SignInButton.hidden = true
                    SignOutButton.hidden = false
                } else {
                    AccountNameDisplay.textContent = "Not signed in"
                    SignInButton.hidden = false
                    SignOutButton.hidden = true
                }
            })
            SignInButton.addEventListener("click", this.redirectToSignIn)
            SignOutButton.addEventListener("click", () => {
                signOut(this.#auth).then(() => {
                    console.log("Signed out successfully.")
                    window.location.reload()
                }).catch((error) => {
                    console.error("Failed to sign out.", error)
                })
            })

            let Debounce = true
            let Visible = false
            const Animations = {
                Show: "transform 1s cubic-bezier(.5,.2,.25,1.5)",
                Hide: "transform 1s cubic-bezier(.75,-0.5,.5,.8)"
            }

            VisibilityButton.addEventListener("click", () => {
                if (Debounce === true) return
                Debounce = true
                if (SignInContainer.style.transform === "translateX(0px)") {
                    SignInContainer.style.transform = `translateX(265px)`
                    VisibilityButton.textContent = "<"
                } else {
                    SignInContainer.style.transform = `translateX(0px)`
                    VisibilityButton.textContent = ">"
                }
                Visible = !Visible
                setTimeout(() => {
                    Debounce = false
                    if (Visible) {
                        SignInContainer.style.transition = Animations.Hide
                    } else {
                        SignInContainer.style.transition = Animations.Show
                    }
                }, 1750)
            })

            setTimeout(() => {
                SignInContainer.hidden = false
                setTimeout(() => {
                    SignInContainer.style.transform = `translateX(265px)`
                    setTimeout(() => {
                        SignInContainer.style.transition = Animations.Show
                        Debounce = false
                        Visible = false
                    }, 1750)
                }, 200);
            }, 500)

        }
    }

    static {
        if (window.location.pathname !== `/Firebase/SignIn` && window.location.pathname !== `/Firebase/SignIn/index.html` && window.location.pathname !== `/Firebase/SignIn/`) {
            const StylesheetContainer = document.head
            const Stylesheet = document.createElement("link")
            Stylesheet.id = "fb-SignInStyleSheet"
            Stylesheet.setAttribute("rel", "stylesheet")
            Stylesheet.setAttribute("href", `${window.location.protocol}//${window.location.host}/Themes/Firebase/AccountData.css`)
            StylesheetContainer.append(Stylesheet)
            const body = document.body
            if (body) {
                body.insertAdjacentHTML("afterbegin", htmlData.signInDisplayElement)
            }
        }
    }



    Destroy = () => {
        deleteApp(this.#app).then(() => {
            console.log("Firebase app shut-down successfully.")
        }).catch((error) => {
            console.error("Failed to shut-down Firebase app.", error)
        })
    }

    #app = undefined

    #database = undefined

    #auth = undefined

    goOffline = () => {
        goOffline(this.#database)
    }

    goOnline = () => {
        goOnline(this.#database)
    }


    /*
    AUTH HANDLING
    */

    redirectToSignIn = () => {
        sessionStorage.setItem("redirectAfterSignIn", window.location.pathname + window.location.search + window.location.hash)
        window.location.assign(`${window.location.protocol}//${window.location.host}/Firebase/SignIn`)
    }

    #SignInStateChanged_Dispatch = () => {
        this.dispatchEvent(new Event("signInStateChanged"))
    }

    #allowedEmails = []

    get isSignedIn() {
        return this.#user.user != undefined
    }
    set isSignedIn(v) {
        throw new Error("Firebase.isSignedIn is read-only.")
    }

    #user = {
        user: undefined,
        data: undefined
    }

    #Debounces = {
        SignIn: false
    }

    /**
     * 
     * @param {(value: any) => void} resolve
     * @param {(reason?: any) => void} reject
     */
    #finializeSignIn = (resolve, reject, isSignIn, stateUpdateCallback) => {
        setPersistence(this.#auth, browserLocalPersistence).catch((error) => {
            console.error("Failed to set auth persistence.", error)
        });

        const dataRef = ref(this.#database, `Users/${this.#user.user.uid}`)

        stateUpdateCallback("Fetching user data.")

        get(dataRef).then((snapshot) => {
            if (snapshot.exists()) {
                this.#user.data = snapshot.val()
                resolve(`Successfully signed ${isSignIn && "in" || "up"}.`)
                this.dispatchEvent(new Event('signInStateChanged'))
                setTimeout(() => { this.#Debounces.SignIn = false }, 2500)
            } else {
                stateUpdateCallback("No user data. Creating...")
                this.#user.data = structuredClone(DEFAULT_USER_DATA)
                set(dataRef, this.#user.data).then((snapshot_set) => {
                    resolve(`Successfully signed ${isSignIn && "in" || "up"}.`)
                    this.dispatchEvent(new Event('signInStateChanged'))
                    setTimeout(() => { this.#Debounces.SignIn = false }, 2500)
                }).catch((e) => {
                    console.error(e)
                    reject("Failed to create user data. Aborting sign in.")
                    this.dispatchEvent(new Event('signInStateChanged'))
                    setTimeout(() => { this.#Debounces.SignIn = false }, 2500)
                })
            }
        }).catch((e) => {
            console.error(e)
            sighOut(this.#auth)
            reject("Failed to fetch user data. Aborting sign in.")
            setTimeout(() => { this.#Debounces.SignIn = false }, 2500)
        })
    }

    /**
     * @callback stateUpdateCallback
     * @param {string} NewState
     * 
     * @returns {void}
     */

    /**
     * 
     * @param {string} email 
     * @param {string} password
     * @param {stateUpdateCallback} stateUpdateCallback Function to call as the progress of sign in updates. 
     * 
     * @returns {Promise}
     */
    attemptSignIn = (email, password, stateUpdateCallback) => {
        return new Promise((resolve, reject) => {
            if (this.#Debounces.SignIn) {
                return reject("Please wait before trying again.")
            }
            stateUpdateCallback("Checking if email is allowed.")
            if (this.#allowedEmails.includes(email) == false) {
                reject("The provided email is not allowed access.")
                setTimeout(() => { this.#Debounces.SignIn = false }, 2500)
                return
            }
            this.#Debounces.SignIn = true
            stateUpdateCallback("Signing in...")
            signInWithEmailAndPassword(this.#auth, email, password).then((userCred) => {
                stateUpdateCallback("Signed in.")
                this.#user.user = this.#auth.currentUser
                this.#finializeSignIn(resolve, reject, true, stateUpdateCallback)
            }).catch((error) => {
                console.error("Failed to sign in.", error)
                reject(`Failed to sign in. ${error.code}`)
                setTimeout(() => { this.#Debounces.SignIn = false }, 2500)
            })
        })
    }

    /**
     * 
     * @param {string} email The email for the new account.
     * @param {string} password The password for the new account.
     * @param {function(NewState: string) : void} stateUpdateCallback Function to call as the progress of sign up updates. 
     * @returns 
     */
    attemptSignUp = (email, password, stateUpdateCallback) => {
        return new Promise((resolve, reject) => {
            if (this.#Debounces.SignIn) {
                return reject("Please wait before trying again.")
            }
            this.#Debounces.SignIn = true
            stateUpdateCallback("Checking if email is allowed.")
            if (this.#allowedEmails.includes(email) == false) {
                reject("The provided email is not allowed access.")
                setTimeout(() => { this.#Debounces.SignIn = false }, 2500)
                return
            }
            stateUpdateCallback("Creating user account.")
            createUserWithEmailAndPassword(this.#auth, email, password).then((userCred) => {
                stateUpdateCallback("Account created.")
                this.#user.cred = userCred
                this.#finializeSignIn(resolve, reject, false, stateUpdateCallback)
            }).catch((error) => {
                console.error("Failed to sign up.", error)
                reject(`Failed to signed up. ${error.code}`)
                setTimeout(() => { this.#Debounces.SignIn = false }, 2500)
            })
        })
    }

    /*
    DATABASE HANDLING
    */

    /**
     * 
     * @param {string} path 
     */
    get = (path) => {
        return new Promise((resolve, reject) => {
            const dataRef = ref(this.#database, path)
            get(dataRef).then((snapshot) => {
                if (snapshot.exists()) {
                    resolve(snapshot.val())
                } else {
                    resolve(null)
                }
            }).catch((e) => {
                console.error(e)
                reject("Failed to fetch data.")
            })
        })
    }

    /**
     * 
     * @param {string} path 
     * @param {*} value 
     * @returns 
     */
    set = (path, value) => {
        return new Promise((resolve, reject) => {
            const dataRef = ref(this.#database, path)

            set(dataRef, value).then(() => {
                resolve()
            }).catch((e) => {
                console.error(e)
                reject("Failed to set data.")
            })
        })
    }

    /**
     * @description Fires the callback everytime a data change is detected at the specified path.
     * 
     * @param {string} path 
     * @param {function(*): void} callback 
     * 
     * @returns {function(): void} Disconnects the listerner when called.
     */
    on = (path, callback) => {
        const dataRef = ref(this.#database, path)
        return onValue(dataRef, (snapshot) => {
            if (snapshot.exists()) {
                callback(snapshot.val())
            } else {
                callback(null)
            }
        })
    }

    /**
     * @description The same as Firebase.on, but after the first fire the listener is automatically disconnected.
     * 
     * @param {string} path 
     * @param {function(*): void} callback 
     * 
     * @returns {void}
     */
    once = (path, callback) => {
        const dataRef = ref(this.#database, path)
        const unsubscribe = onValue(dataRef, (snapshot) => {
            unsubscribe()
            if (snapshot.exists()) {
                callback(snapshot.val())
            } else {
                callback(null)
            }
        })
    }
}

let FirebaseSingleton = undefined

/**
 * 
 * @returns {FirebaseService}
 */
export default () => {
    if (!FirebaseSingleton) {
        FirebaseSingleton = new FirebaseService()
    }
    return FirebaseSingleton
}