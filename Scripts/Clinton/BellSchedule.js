import FirebaseBuilder from '../../Scripts/firebaseHandler.js'

export class BellScheduleService extends EventTarget {
    /**
     * 
     * @param {boolean} editMode 
     */
    constructor(editMode) {
        super()

        this.Firebase = FirebaseBuilder()

        this.#ConfigUpdateUnsubscribe = this.Firebase.on("/BellSchedule/Config/", (newConfig) => {
            this.#Config = newConfig
            this.dispatchEvent(new Event('configUpdated'))
        })


        this.#isEdit = editMode

        const storedConfig = localStorage.getItem("Clinton/BellSchedule/Config")
        if (storedConfig) {
            this.#Config = storedConfig
        }
    }

    Firebase

    #ConfigUpdateUnsubscribe
    #Config

    get Config() {
        return this.#Config
    }
    set Config(newConfig) {
        if (this.#isEdit) {

        } else {
            throw new Error("Cannot write to a read-only Bell Schedule Service.")
        }
    }

    #isEdit

    get BellScheduleData() {
        if (localStorage.getItem("BellScheduleData")) {
            return JSON.parse(localStorage.getItem("BellScheduleData"))
        }
        return null
    }

    #online = false

    get OnlineStatus() {
        return this.#online
    }

    set OnlineStatus(newStatus) {
        if (newStatus) {
            this.#goOnline()
        } else {
            this.#goOffline()
        }
    }

    #goOnline = () => {
        this.Firebase.goOnline()
        this.#online = true
    }

    #goOffline = () => {
        this.Firebase.goOffline()
        this.#online = false
    }


    Destroy = () => {
        this.#ConfigUpdateUnsubscribe()
        this.Firebase.Destroy()
    }
}