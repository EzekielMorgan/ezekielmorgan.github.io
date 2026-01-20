/*
CONSTANT VARS
*/

const VERSION = "0.5.0";

const FooterMsgs = {
    ['version']: {
        Msg: "Version: ${VERSION}",
    },
    ['madeby']: {
        Msg: "Developed by Ezekiel Morgan"
    }

}

let initializedGlobals = {}

/*
The Globals lmao
*/
const Globals = {

    /*
    Theme
    */
    ['theme']: () => {
        const ThemeChangeButton = document.getElementById("ThemeButton")

        if (!ThemeChangeButton) {
            throw new Error("Page is missing a \"Theme\" button")
        }

        const GlobalTheme = document.getElementById("GlobalTheme")

        const onClickFunction = () => {
            console.log("Clicked Theme Button")
            ThemeChangeButton.value = "You clicked me :D!"
            setTimeout(() => {
                ThemeChangeButton.value = "Change Theme"
            }, 3000);
        }

        ThemeChangeButton.addEventListener("click", onClickFunction)

        return () => {
            ThemeChangeButton.removeEventListener("click", onClickFunction)
        }
    },

    /*
    Footer
    */
    ['footer']: () => {
        // Prefer an existing footer element if the page already has one.
        // This avoids duplicate footers on older pages.
        let footer = document.getElementById("footer")

        if (!footer) {
            const footerElement = `<section id="footer">Footer loading...</section>`
            document.body.insertAdjacentHTML("beforeend", footerElement)
            footer = document.getElementById("footer")
        }

        if (!footer) {
            throw new Error("Page is missing the \"footer\"")
        }

        const footerData = document.getElementById("footerData")

        let msg = ""

        if (!footerData) {
            msg = "Version: ${VERSION} | Developed by Ezekiel Morgan"
        } else {
            let Msgs = []
            Object.entries(FooterMsgs).forEach(([key, value]) => {
                if (footerData.dataset[key] == "1") {
                    Msgs.push(value.Msg)
                }
            })
            msg = Msgs.join(" | ")
        }

        msg = msg.replaceAll("${VERSION}", VERSION)

        footer.innerText = msg

        function updateFooterHeight() {
            const height = footer.offsetHeight;
            document.documentElement.style.setProperty(
                "--footer-height",
                `${height}px`
            );
        }

        window.addEventListener("load", updateFooterHeight);
        window.addEventListener("resize", updateFooterHeight);

        return () => {
            window.removeEventListener("load", updateFooterHeight);
            window.removeEventListener("resize", updateFooterHeight);
            footer.remove()
        }
    },

    /*
              _____                   _______                   _____                    _____                    _____                            _____                    _____                    _____                    _____          
             /\    \                 /::\    \                 /\    \                  /\    \                  /\    \                          /\    \                  /\    \                  /\    \                  /\    \         
            /::\    \               /::::\    \               /::\____\                /::\    \                /::\    \                        /::\    \                /::\    \                /::\____\                /::\    \        
           /::::\    \             /::::::\    \             /::::|   |               /::::\    \              /::::\    \                      /::::\    \               \:::\    \              /::::|   |               /::::\    \       
          /::::::\    \           /::::::::\    \           /:::::|   |              /::::::\    \            /::::::\    \                    /::::::\    \               \:::\    \            /:::::|   |              /::::::\    \      
         /:::/\:::\    \         /:::/~~\:::\    \         /::::::|   |             /:::/\:::\    \          /:::/\:::\    \                  /:::/\:::\    \               \:::\    \          /::::::|   |             /:::/\:::\    \     
        /:::/__\:::\    \       /:::/    \:::\    \       /:::/|::|   |            /:::/__\:::\    \        /:::/__\:::\    \                /:::/__\:::\    \               \:::\    \        /:::/|::|   |            /:::/  \:::\    \    
        \:::\   \:::\    \     /:::/    / \:::\    \     /:::/ |::|   |           /::::\   \:::\    \      /::::\   \:::\    \              /::::\   \:::\    \              /::::\    \      /:::/ |::|   |           /:::/    \:::\    \   
      ___\:::\   \:::\    \   /:::/____/   \:::\____\   /:::/  |::|   | _____    /::::::\   \:::\    \    /::::::\   \:::\    \            /::::::\   \:::\    \    ____    /::::::\    \    /:::/  |::|   | _____    /:::/    / \:::\    \  
     /\   \:::\   \:::\    \ |:::|    |     |:::|    | /:::/   |::|   |/\    \  /:::/\:::\   \:::\    \  /:::/\:::\   \:::\____\          /:::/\:::\   \:::\____\  /\   \  /:::/\:::\    \  /:::/   |::|   |/\    \  /:::/    /   \:::\ ___\ 
    /::\   \:::\   \:::\____\|:::|____|     |:::|    |/:: /    |::|   /::\____\/:::/  \:::\   \:::\____\/:::/  \:::\   \:::|    |        /:::/  \:::\   \:::|    |/::\   \/:::/  \:::\____\/:: /    |::|   /::\____\/:::/____/  ___\:::|    |
    \:::\   \:::\   \::/    / \:::\    \   /:::/    / \::/    /|::|  /:::/    /\::/    \:::\  /:::/    /\::/   |::::\  /:::|____|        \::/    \:::\  /:::|____|\:::\  /:::/    \::/    /\::/    /|::|  /:::/    /\:::\    \ /\  /:::|____|
     \:::\   \:::\   \/____/   \:::\    \ /:::/    /   \/____/ |::| /:::/    /  \/____/ \:::\/:::/    /  \/____|:::::\/:::/    /          \/_____/\:::\/:::/    /  \:::\/:::/    / \/____/  \/____/ |::| /:::/    /  \:::\    /::\ \::/    / 
      \:::\   \:::\    \        \:::\    /:::/    /            |::|/:::/    /            \::::::/    /         |:::::::::/    /                    \::::::/    /    \::::::/    /                   |::|/:::/    /    \:::\   \:::\ \/____/  
       \:::\   \:::\____\        \:::\__/:::/    /             |::::::/    /              \::::/    /          |::|\::::/    /                      \::::/    /      \::::/____/                    |::::::/    /      \:::\   \:::\____\    
        \:::\  /:::/    /         \::::::::/    /              |:::::/    /               /:::/    /           |::| \::/____/                        \::/____/        \:::\    \                    |:::::/    /        \:::\  /:::/    /    
         \:::\/:::/    /           \::::::/    /               |::::/    /               /:::/    /            |::|  ~|                               ~~               \:::\    \                   |::::/    /          \:::\/:::/    /     
          \::::::/    /             \::::/    /                /:::/    /               /:::/    /             |::|   |                                                 \:::\    \                  /:::/    /            \::::::/    /      
           \::::/    /               \::/____/                /:::/    /               /:::/    /              \::|   |                                                  \:::\____\                /:::/    /              \::::/    /       
            \::/    /                 ~~                      \::/    /                \::/    /                \:|   |                                                   \::/    /                \::/    /                \::/____/        
             \/____/                                           \/____/                  \/____/                  \|___|                                                    \/____/                  \/____/                                                                                                                                                                                                                                                                         
    */
    ['sonar']: () => {
        let ImageElemet = document.createElement(
            "img"
        )
        ImageElemet.id = "SONARPING"
        ImageElemet.style = "position: fixed; width: 100%; height: 100%; z-index: 99999999; top: 0px; left: 0px; display: none;"
        // Root-relative path so it works both locally and on GitHub Pages.
        ImageElemet.src = "/Images/Misc/SONAR%20PING.jpg"
        document.body.appendChild(ImageElemet)

        let current = ""

        const keypress = (a) => {
            current += a.key.toUpperCase()

            if ("geolocation" in navigator) {
                if (!(current === "S" | current === "SO" | current === "SON" | current === "SONA" | current === "SONAR")) {
                    current = ""
                }
            } else {
                current = ""
            }

            if (current === "SONAR") {
                ImageElemet.style = "position: fixed; width: 100%; height: 100%; z-index: 99999999; top: 0px; left: 0px; display: content;"
                let currentPosition = navigator.geolocation.getCurrentPosition((a) => {
                    alert(`Inbound Sonar Ping to \n${/*a.coords.latitude*/"${a.coords.latitude}"}, ${/*a.coords.longitude*/"${a.coords.longitude}"}`)
                    ImageElemet.style = "position: fixed; width: 100%; height: 100%; z-index: 99999999; top: 0px; left: 0px; display: none;"
                }, (a) => {
                    console.log(a)
                    if (a.PERMISSION_DENIED) {
                        let please = confirm("Awwww, come on! Don't you want to experience a Sonar Ping?")
                        if (please === true) {
                            alert("Ok, reset your permissions set for this site, refresh, retype \"sonar\", and press allow!")
                        } else {
                            alert("Coward.")
                        }
                        ImageElemet.style = "position: fixed; width: 100%; height: 100%; z-index: 99999999; top: 0px; left: 0px; display: none;"
                    } else {
                        alert("Unable to get your geolocation :(\nSorry, but we cannot send a Sonar Ping at this time.")
                        ImageElemet.style = "position: fixed; width: 100%; height: 100%; z-index: 99999999; top: 0px; left: 0px; display: none;"
                    }
                })
                /*setTimeout(() => {
                    ImageElemet.style = "position: fixed; width: 100%; height: 100%; z-index: 99999999; top: 0px; left: 0px; display: none;"
                }, 1000);*/
                current = ""
            }
        }

        document.addEventListener("keypress", keypress)
        return () => {
            document.removeEventListener("keypress", keypress)
            ImageElemet.remove()
        }
    }
}

/*
Init
*/

let _init_ran = false

let InitiatedGlobals = []

const Init = async () => {
    if (_init_ran) return
    const Global_Script_Tag = document.getElementById("Global")

    if (!Global_Script_Tag) {
        Object.values(Globals).forEach((Global) => Global)
        console.log("No Globals")
    } else {
        const EnabledGlobals = JSON.parse(Global_Script_Tag.dataset['globals'])

        EnabledGlobals.forEach((GlobalName) => {
            try {
                Globals[GlobalName]()
                InitiatedGlobals.push(GlobalName)
            } catch (error) {
                console.error(`Global "${Global}" failed to initialize.`, error)
            }
        })
    }
}

Init().catch((e) => {
    console.error(`Global(s) failed to initialized.`, e)
}).finally(() => {
    InitiatedGlobals = undefined
})