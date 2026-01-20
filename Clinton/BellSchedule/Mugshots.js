const newButton = document.getElementById("NewMugShotButton")
const mugShotElement = document.getElementById("mugshot");
const PossibleMugshots = [
    {
        Name: "Franks",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/TheCommons/Franks.jpeg`,
        ChanceL: 0,
        ChanceM: 149
    },
    {
        Name: "Minor",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/TheCommons/Minor.png`,
        ChanceL: 150,
        ChanceM: 299
    },
    {
        Name: "Rose",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/TheCommons/Rose.jpeg`,
        ChanceL: 300,
        ChanceM: 349
    },
    {
        Name: "Turner",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/TheCommons/Turner.jpeg`,
        ChanceL: 350,
        ChanceM: 499
    },
    {
        Name: "Brooks",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/TheCommons/Brooks.jpeg`,
        ChanceL: 500,
        ChanceM: 649
    },
    {
        Name: "Tobin",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/TheCommons/Tobin.jpeg`,
        ChanceL: 650,
        ChanceM: 799
    },
    {
        Name: "Haan",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/TheCommons/BEARDMAN.png`,
        ChanceL: 800,
        ChanceM: 899
    },
    {
        Name: "ThatOneDude",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/ThatOneDude/2026.JPG`,
        ChanceL: 900,
        ChanceM: 999
    },
    {
        Name: "Mason",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/Mason/2026.png`,
        ChanceL: 1000,
        ChanceM: 1049
    },
    {
        Name: "Ezekiel-1",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/Ezekiel/2024-25.jpg`,
        ChanceL: 1050,
        ChanceM: 1099
    },
    {
        Name: "Ezekiel-2",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/Ezekiel/2025-26.jpg`,
        ChanceL: 1100,
        ChanceM: 1149
    },
    {
        Name: "Makail",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/Makail/2012.JPG`,
        ChanceL: 1150,
        ChanceM: 1160
    },
    {
        Name: "GAMBLING",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/GAMBLING.jpeg`,
        ChanceL: 1161,
        ChanceM: 1162
    },
    {
        Name: "SmilingDude",
        Url: `${window.location.protocol}//${window.location.host}/Images/Mugshots/Other/SmilingDude.png`,
        ChanceL: 1163,
        ChanceM: 1200
    }
]

let PossibleImagesString = "Possible Images:\n";

let currentGamble

for (let i = 0; i < PossibleMugshots.length; i++) {
    const Mugshot = PossibleMugshots[i];
    PossibleImagesString += `${Mugshot.Name}\n`;

    if (Mugshot.Name == "GAMBLING") currentGamble = Mugshot
}

document.getElementById("possibleImages").innerText = PossibleImagesString;



const newMugshot = () => {
    let ChanceL = 0;
    let ChanceM = 0;

    for (let i = 0; i < PossibleMugshots.length; i++) {
        const Mugshot = PossibleMugshots[i];
        ChanceM = Math.max(ChanceM, Mugshot.ChanceM)
    }

    let Result = Math.random() * ChanceM;

    for (let i = 0; i < PossibleMugshots.length; i++) {
        const Mugshot = PossibleMugshots[i];
        if (Result >= Mugshot.ChanceL && Result <= Mugshot.ChanceM) {
            mugShotElement.src = Mugshot.Url;
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
        interval = setInterval(autoGamble, 250);
        newButton.disabled = true
    } else {
        clearInterval(interval)
        newButton.disabled = false
    }
})