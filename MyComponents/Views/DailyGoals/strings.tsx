import { Language } from "../../Redux/profilesSlice";

export default {
    [`${Language.AMHARIC}`]: {
        hoursofsleep: "የእንቅልፍ ሰዓታት",
        yourgoals: "የእርስዎ ግቦች",
        hoursofrest: "የእረፍት ሰዓታት",
        glassesofwater: "የውሃ ብርጭቆዎች",
        glassesperday: "ብርጭቆዎች በቀን"
    },

    [`${Language.ENGLISH}`]: {
        hoursofsleep: "Hours of Sleep",
        yourgoals: "Your Goals",
        hoursofrest: "Hours of rest",
        glassesofwater: "Glasses of Water",
        glassesperday: "Glasses Per Day"
    },

    [`${Language.FRENCH}`]: {
        hoursofsleep: "Heures de sommeil",
        yourgoals: "Tes objectifs",
        hoursofrest: "Heures de repos",
        glassesofwater: "Verres d'eau par jour",
        glassesperday: "Verres d'eau"
    }
}