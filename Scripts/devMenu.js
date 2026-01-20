/*
Ezekiel Morgan, 2026
*/

const Version = "0.1.0"

const DEV_MENU_HTML = `
  <section hidden class="devMenu" id="devMenu" style="transform: translateX(300px);">
    <button id="DM-visibilityButton">&lt</button>
    <section id="DM-Main">
      <h1>Dev Menu</h1>
      <select id="DM-SelectPage">
      </select>
      <section id="DM-Adorne">

      </section>
    </section>
  </section>`

const DevMenu = class extends EventTarget {
    constructor() {
        super();
        const StylesheetContainer = document.head

        const DMStylesheet = document.createElement("link")
        DMStylesheet.id = "DM-DevMenuStylesheet"
        DMStylesheet.setAttribute("rel", "stylesheet")
        DMStylesheet.setAttribute("href", `${window.location.protocol}//${window.location.host}/Themes/devMenu/devMenu.css`)

        const ConsoleStylesheet = document.createElement("link")
        ConsoleStylesheet.id = "DM-ConsoleStylesheet"
        ConsoleStylesheet.setAttribute("rel", "stylesheet")
        ConsoleStylesheet.setAttribute("href", `${window.location.protocol}//${window.location.host}/Themes/devMenu/console.css`)

        StylesheetContainer.append(DMStylesheet)
        StylesheetContainer.append(ConsoleStylesheet)

        const body = document.body
        if (body) {
            body.insertAdjacentHTML("afterbegin", DEV_MENU_HTML)
        }

        this.#connectVisibilityButton().then(() => {

        }).catch((err) => {
            alert(`DevMenu Error: ${err.message}`)
        })

        this.#optionsContainer = document.getElementById("DM-SelectPage")

        this.#Pages.forEach((element, index) => {
            this.#buildPage(index)
        });

        this.#buildErrorPage()
        this.#loadPage()
        this.#connectPageSelect()

        setTimeout(() => {
            this.#SignInContainer.hidden = false
            this.#MA_Debounce = false
        }, 750);
    }

    addPage = (Name, Constructor) => {
        if (!Name || typeof Name !== "string") {
            throw new Error("Invalid Name for DevMenu Page")
        }
        if (!Constructor || typeof Constructor !== "function") {
            throw new Error("Invalid Constructor for DevMenu Page")
        }
        const Page = {
            Name: Name,
            PageElement: null,
            OptionElement: null,
            constructor: Constructor,
            CanLoad: true
        }
        this.#Pages.push(Page)
        this.#buildPage(this.#Pages.length - 1)
    }

    #errorPageElement

    #setErrorPageMsg

    #buildErrorPage = () => {
        const PageElement = document.createElement("div")
        PageElement.id = "DM-ErrorPage"
        PageElement.class = "DM-Page"
        PageElement.textContent = "An error has occurred in the Dev Menu."
        this.#errorPageElement = PageElement
        this.#errorPageElement.hidden = true
        document.getElementById("DM-Adorne").appendChild(this.#errorPageElement)

        this.#setErrorPageMsg = (msg) => {
            if (this.#errorPageElement) {
                this.#errorPageElement.textContent = `An error has occurred in the Dev Menu:\n${msg}`
            }
        }
    }

    #showErrorPage = (msg) => {
        if (this.#VisiblePageElement) {
            this.#VisiblePageElement.hidden = true
        }
        this.#errorPageElement.hidden = false
        this.#VisiblePageElement = this.#errorPageElement
    }

    #buildPage = (PageIndex) => {
        const Page = this.#Pages[PageIndex]
        let option = document.createElement("option")
        option.value = PageIndex
        option.textContent = Page.Name
        this.#optionsContainer.appendChild(option)
        if (Page && Page.constructor) {
            Page.constructor(Page)
        }

        Page.PageElement.hidden = true
        document.getElementById("DM-Adorne").append(Page.PageElement)
    }

    #loadPage = () => {
        if (this.#VisiblePageElement) {
            this.#VisiblePageElement.hidden = true
        }
        const Page = this.#Pages[this.#PageIndex]
        if (Page && Page.PageElement) {
            Page.PageElement.hidden = false
            this.#VisiblePageElement = Page.PageElement
        } else {
            this.#setErrorPageMsg(`Failed to load page at index ${this.#PageIndex}`)
            this.#showErrorPage()
        }
    }

    #optionsContainer

    #PageIndex = 0

    #VisiblePageElement = null

    #Pages = [
        {
            Name: "About",
            PageElement: null,
            OptionElement: null,
            CanLoad: true,
            constructor: (Page) => {
                Page.PageElement = document.createElement("section")
                Page.PageElement.id = "DM-AboutPage"
                Page.PageElement.class = "DM-Page"
                Page.PageElement.innerHTML = `Dev Menu v${Version}<br/>Created by Ezekiel Morgan<br/><br/>This menu is meant to serve as a replacement for the developer console built into browsers, for when that console is inaccessible.<br/>It also serves as a place for pages to load their own respective developer tools.`
            }
        },
        {
            Name: "Console",
            PageElement: null,
            OptionElement: null,
            CanLoad: true,
            constructor: (Page) => {
                const PageElement = document.createElement("section")
                PageElement.id = "DM-ConsolePage"
                PageElement.class = "DM-Page"

                const LogContainer = document.createElement("div")
                LogContainer.id = "DM-Cons-LogContainer"

                PageElement.appendChild(LogContainer)


                Page.PageElement = PageElement

                const _console = {
                    assert: console.assert,
                    clear: console.clear,
                    count: console.count,
                    countReset: console.countReset,
                    debug: console.debug,
                    dir: console.dir,
                    dirxml: console.dirxml,
                    error: console.error,
                    group: console.group,
                    groupCollapsed: console.groupCollapsed,
                    groupEnd: console.groupEnd,
                    info: console.info,
                    log: console.log,
                    profile: console.profile,
                    profileEnd: console.profileEnd,
                    table: console.table,
                    time: console.time,
                    timeEnd: console.timeEnd,
                    timeLog: console.timeLog,
                    timeStamp: console.timeStamp,
                    trace: console.trace,
                    warn: console.warn,
                }

                console.log = (...args) => {
                    _console.log(...args)
                    const LogEntry = document.createElement("section")
                    LogEntry.textContent = args.map(arg => {
                        if (typeof arg === "object") {
                            try {
                                return JSON.stringify(arg)
                            } catch {
                                return "[Object]"
                            }
                        } else {
                            return String(arg)
                        }
                    }).join(" ")
                    LogEntry.setAttribute("class", "DM-Cons_Log")
                    LogContainer.appendChild(LogEntry)
                }

                console.error = (...args) => {
                    _console.error(...args)
                    const LogEntry = document.createElement("section")
                    LogEntry.textContent = args.map(arg => {
                        if (typeof arg === "object") {
                            try {
                                return JSON.stringify(arg)
                            } catch {
                                return "[Object]"
                            }
                        } else {
                            return String(arg)
                        }
                    }).join(" ")
                    LogEntry.setAttribute("class", "DM-Cons_Error")
                    LogContainer.appendChild(LogEntry)
                }
                window.addEventListener("error", (ev) => {
                    console.error(`Error Detected\nMessage:${ev.message}\nLine:${ev.lineno}\nFile:${ev.filename}`)
                })
            }
        }
    ]


    #Debounce = false
    #Visible = false

    get Visible() {
        return this.#Visible
    }

    set Visible(value) {
        if (typeof value !== "boolean") {
            throw new Error("DevMenu Visible property must be a boolean")
        }
        if (this.#Visible !== value) {
            document.getElementById("DM-visibilityButton").click()
        }
    }
    #SignInContainer
    #Animations = {
        Show: "transform 1s cubic-bezier(.5,.2,.25,1.5)",
        Hide: "transform 1s cubic-bezier(.75,-0.5,.5,.8)"
    }
    #VisButton
    async #connectVisibilityButton() {
        const VisibilityButton = document.getElementById("DM-visibilityButton")
        const SignInContainer = document.getElementById("devMenu")

        this.#VisButton = VisibilityButton
        this.#SignInContainer = SignInContainer

        VisibilityButton.addEventListener("click", () => {
            if (this.#Debounce === true) return
            this.#Debounce = true
            if (SignInContainer.style.transform === "translateX(0px)") {
                SignInContainer.style.transform = `translateX(265px)`
                VisibilityButton.textContent = "<"
            } else {
                SignInContainer.style.transform = `translateX(0px)`
                VisibilityButton.textContent = ">"
            }
            this.#Visible = !this.#Visible
            setTimeout(() => {
                this.#Debounce = false
                if (this.#Visible) {
                    SignInContainer.style.transition = this.#Animations.Hide
                } else {
                    SignInContainer.style.transition = this.#Animations.Show
                }
            }, 1750)
        })

        /*setTimeout(() => {
            SignInContainer.hidden = false
            setTimeout(() => {
                SignInContainer.style.transform = `translateX(265px)`
                setTimeout(() => {
                    SignInContainer.style.transition = this.#Animations.Show
                    this.#Debounce = false
                    this.#Visible = false
                }, 1750)
            }, 200);
        }, 500)*/
    }

    #connectPageSelect = async () => {
        this.#optionsContainer.addEventListener("change", (ev) => {
            this.#PageIndex = parseInt(this.#optionsContainer.value)
            this.#loadPage()
        })
    }


    #MenuAccessible = false
    #MA_Debounce = true
    toggleVisibility() {
        if (this.#Debounce === true) return
        if (this.#MA_Debounce === true) return
        this.#MA_Debounce = true
        this.#Debounce = true

        if (this.#MenuAccessible === true) {
            this.#SignInContainer.style.transition = this.#Animations.Hide
            this.#SignInContainer.style.transform = `translateX(300px)`
            this.#MenuAccessible = false
        } else {
            this.#SignInContainer.style.transition = this.#Animations.Show
            this.#SignInContainer.style.transform = `translateX(265px)`
            this.#Visible = false
            this.#VisButton.textContent = "<"
            this.#MenuAccessible = true
        }


        setTimeout(() => {
            this.#MA_Debounce = false
            this.#Debounce = false
        }, 1750)


    }
}

let devMenu = new DevMenu()

/**
 * 
 * @param {KeyboardEvent} ev 
 */
const KeyPress = (ev) => {
    if (ev.key === "~" && ev.ctrlKey && ev.shiftKey) {
        devMenu.toggleVisibility()
    }
}

window.addEventListener("keydown", KeyPress);



/*

OLD


/*
Ezekiel Morgan, 2025

The purpose of this is for when the page is loaded in an environment
without access to the dev console.

So any console.logs, etc, can still be viewed.

Right now, it just does them all as an alert(),

eventually it will add an entire side menu that ideally will replace dev console to a degree.

* /
const _console = {
    log: console.log,
    error: console.error
}

/**
 * 
 * @param {ErrorEvent} ev 
 * /
const alertError = (ev) => {
    alert(`Error Detected\nMessage:${ev.message}\nLine:${ev.lineno}\nFile:${ev.filename}`)
}

const empty = () => { }

let alertUncaughtErrors = empty

window.addEventListener("error", (ev) => {
    alertUncaughtErrors(ev)
})

let HashChanged = () => {


    const pageURL = new URL(document.URL)

    const splitHash = pageURL.hash.substring(1).split(',')

    // Errors, hash is "alertErrors"

    if (splitHash.includes("alertUncaughtErrors")) {
        alertUncaughtErrors = alertError
    } else {
        alertUncaughtErrors = empty
    }

    // Logs, hash is "alertLogs"
    const _log = console.log

    if (splitHash.includes("alertLogs")) {
        console.log = (...Log) => {
            _console.log(Log)
            alert(Log)
        }
    } else {
        console.log = _console.log
    }

    if (splitHash.includes("alertErrors")) {
        console.error = (...Error) => {
            _console.error(Error)
            alert(Error)
        }
    } else {
        console.error = _console.error
    }
}

window.addEventListener("hashchange", HashChanged)

HashChanged()

let lastHash = window.location.hash
setInterval(() => {
    if (lastHash !== window.location.hash) {
        lastHash = window.location.hash
        HashChanged()
    }
}, 1000)
/*
*/