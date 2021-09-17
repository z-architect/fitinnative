import { Language } from "../../../Redux/profilesSlice";

export default {
    [`${Language.AMHARIC}`]: {
        savedplans: "የዕቅዶች ማስታወሻ",
        youdonthaveanysavedplans: "ምንም የተቀመጡ ዕቅዶች የሉዎትም"
    },

    [`${Language.ENGLISH}`]: {
        savedplans: "Saved Plans",
        youdonthaveanysavedplans: "You don't have any saved plans"
    },

    [`${Language.FRENCH}`]: {
        savedplans: "Plans enregistrés",
        youdonthaveanysavedplans: "Vous n'avez aucun plan enregistré"
    }
}