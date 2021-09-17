import { Language } from "../../Redux/profilesSlice";

export default {
    [`${Language.AMHARIC}`]: {
        settings: "ቅንብሮች",
        theme: "ገጽታ",
        lightmode: "ብርሃናማ",
        dimmedmode: "ከፊል ጨለማ",
        darkmode: "ጨለማ",
        language: "ቋንቋ",
        english: "እንግሊዝኛ",
        amharic: "አማርኛ",
        french: "ፈረንሳይኛ",
        propertyofaxesoftware: "የ AXE ሶፍትዌር ንብረት",
        version: "ስሪት"
    },

    [`${Language.ENGLISH}`]: {
        settings: "Settings",
        theme: "Theme",
        lightmode: "Light Mode",
        dimmedmode: "Dimmed Mode",
        darkmode: "Dark Mode",
        language: "Language",
        english: "English",
        amharic: "Amharic",
        french: "French",
        propertyofaxesoftware: "Proprerty of AXE Software",
        version: "Version"
    },

    [`${Language.FRENCH}`]: {
        settings: "Paramètres",
        theme: "Thème",
        lightmode: "Mode lumière",
        dimmedmode: "Mode estompé",
        darkmode: "Mode sombre",
        language: "Langue",
        english: "Anglaise",
        amharic: "amharique",
        french: "français",
        propertyofaxesoftware: "Propriété du logiciel AXE",
        version: "Version"
    }
}