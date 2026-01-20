const newButton = document.getElementById("NewMugShotButton")
const mugShotElement = document.getElementById("mugshot");
const PossibleMugshots = [
    {
        Name: "Franks",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/TheCommons/Franks.jpeg`,
        Chance: 150,
        /**
         * 
         * @param {HTMLImageElement} ImgElement 
         */
        OnGet: (ImgElement) => {
            ImgElement.style.width = Math.floor(Math.random() * 200) + 100 + "px";
            ImgElement.style.height = Math.floor(Math.random() * 200) + 100 + "px";
        }
    },
    {
        Name: "Minor",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/TheCommons/Minor.png`,
        Chance: 150,
        /**
         * 
         * @param {HTMLImageElement} ImgElement 
         */
        OnGet: (ImgElement) => {
            ImgElement.style.width = Math.floor(Math.random() * 200) + 100 + "px";
            ImgElement.style.height = Math.floor(Math.random() * 200) + 100 + "px";
        }
    },
    {
        Name: "Rose",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/TheCommons/Rose.jpeg`,
        Chance: 150,
        /**
         * 
         * @param {HTMLImageElement} ImgElement 
         */
        OnGet: (ImgElement) => {
            ImgElement.style.width = Math.floor(Math.random() * 200) + 100 + "px";
            ImgElement.style.height = Math.floor(Math.random() * 200) + 100 + "px";
        }
    },
    {
        Name: "Turner",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/TheCommons/Turner.jpeg`,
        Chance: 150,
        /**
         * 
         * @param {HTMLImageElement} ImgElement 
         */
        OnGet: (ImgElement) => {
            ImgElement.style.width = Math.floor(Math.random() * 200) + 100 + "px";
            ImgElement.style.height = Math.floor(Math.random() * 200) + 100 + "px";
        }
    },
    {
        Name: "Brooks",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/TheCommons/Brooks.jpeg`,
        Chance: 150,
        /**
         * 
         * @param {HTMLImageElement} ImgElement 
         */
        OnGet: (ImgElement) => {
            ImgElement.style.width = Math.floor(Math.random() * 200) + 100 + "px";
            ImgElement.style.height = Math.floor(Math.random() * 200) + 100 + "px";
        }
    },
    {
        Name: "Tobin",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/TheCommons/Tobin.jpeg`,
        Chance: 150
    },
    {
        Name: "Haan",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/TheCommons/BEARDMAN.png`,
        Chance: 150,
        /**
         * 
         * @param {HTMLImageElement} ImgElement 
         */
        OnGet: (ImgElement) => {
            ImgElement.style.width = Math.floor(Math.random() * 200) + 100 + "px";
            ImgElement.style.height = Math.floor(Math.random() * 200) + 100 + "px";
        }
    },
    {
        Name: "ThatOneDude",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/ThatOneDude/2026.JPG`,
        Chance: 150,
        /**
         * 
         * @param {HTMLImageElement} ImgElement 
         */
        OnGet: (ImgElement) => {
            ImgElement.style.width = Math.floor(Math.random() * 200) + 100 + "px";
            ImgElement.style.height = Math.floor(Math.random() * 200) + 100 + "px";
        }
    },
    {
        Name: "Mason",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/Mason/2026.png`,
        Chance: 150,
        /**
         * 
         * @param {HTMLImageElement} ImgElement 
         */
        OnGet: (ImgElement) => {
            ImgElement.style.width = Math.floor(Math.random() * 400) + 100 + "px";
            ImgElement.style.height = Math.floor(Math.random() * 400) + 100 + "px";
        }
    },
    {
        Name: "Ezekiel-1",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/Ezekiel/2024-25.jpg`,
        Chance: 50,
        /**
         * 
         * @param {HTMLImageElement} ImgElement 
         */
        OnGet: (ImgElement) => {
            ImgElement.style.width = Math.floor(Math.random() * 500) + 100 + "px";
            ImgElement.style.height = Math.floor(Math.random() * 500) + 100 + "px";
        }
    },
    {
        Name: "Ezekiel-2",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/Ezekiel/2025-26.jpg`,
        Chance: 50,
        /**
         * 
         * @param {HTMLImageElement} ImgElement 
         */
        OnGet: (ImgElement) => {
            ImgElement.style.width = Math.floor(Math.random() * 500) + 100 + "px";
            ImgElement.style.height = Math.floor(Math.random() * 500) + 100 + "px";
        }
    },
    {
        Name: "Makail",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/Makail/2012.JPG`,
        Chance: 10,
        /**
         * 
         * @param {HTMLImageElement} ImgElement 
         */
        OnGet: (ImgElement) => {
            ImgElement.style.width = Math.floor(Math.random() * 700) + 100 + "px";
            ImgElement.style.height = Math.floor(Math.random() * 700) + 100 + "px";
        }
    },
    {
        Name: "GAMBLING",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/GAMBLING.jpeg`,
        Chance: 1,
        /**
         * 
         * @param {HTMLImageElement} ImgElement 
         */
        OnGet: (ImgElement) => {
            ImgElement.style.width = Math.floor(Math.random() * 1000) + 100 + "px";
            ImgElement.style.height = Math.floor(Math.random() * 1000) + 100 + "px";
        }
    },
    {
        Name: "SmilingDude",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/Other/SmilingDude.png`,
        Chance: 20,
        /**
         * 
         * @param {HTMLImageElement} ImgElement 
         */
        OnGet: (ImgElement) => {
            ImgElement.style.width = "400px";
            ImgElement.style.height = "100px";
        }
    }
]

let PossibleImagesString = "Possible Images:\n";

let currentGamble

let totalPossibleChance = 0

for (let i = 0; i < PossibleMugshots.length; i++) {
    const Mugshot = PossibleMugshots[i];
    PossibleImagesString += `${Mugshot.Name}\n`;

    Mugshot.ChanceL = totalPossibleChance
    totalPossibleChance += Mugshot.Chance
    Mugshot.ChanceM = totalPossibleChance

    if (Mugshot.Name == "GAMBLING") currentGamble = Mugshot
}

document.getElementById("possibleImages").innerText = PossibleImagesString;

const newMugshot = () => {
    let Result = Math.random() * totalPossibleChance;

    for (let i = 0; i < PossibleMugshots.length; i++) {
        const Mugshot = PossibleMugshots[i];
        if (Result >= Mugshot.ChanceL && Result <= Mugshot.ChanceM) {
            mugShotElement.src = Mugshot.Url;
            Mugshot.OnGet?.(mugShotElement);
            currentGamble = Mugshot
            break;
        }
    }
}
newButton.addEventListener("click", newMugshot);

const AutoGambleElement = document.getElementById("MugshotAutoChangeCheckbox")
const StopWhenElement = document.getElementById("stopWhen")

let interval

let autoGambling = false

const autoGamble = () => {
    newMugshot()
    if (currentGamble.Name == StopWhenElement.value) {
        autoGambling = false
        clearInterval(interval)
        AutoGambleElement.checked = false
        newButton.disabled = false
    }
}

AutoGambleElement.addEventListener("click", () => {
    autoGambling = AutoGambleElement.checked

    if (autoGambling) {
        interval = setInterval(autoGamble, 500);
        newButton.disabled = true
    } else {
        clearInterval(interval)
        newButton.disabled = false
    }
})