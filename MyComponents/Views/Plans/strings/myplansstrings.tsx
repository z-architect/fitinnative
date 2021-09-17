import { Language } from "../../../Redux/profilesSlice";

export default {
    [`${Language.AMHARIC}`]: {
        myplans: "የእኔ እቅዶች",
        youdonthaveanysavedplans: "በእራስዎ ምንም የሥልጠና እቅዶች የሉዎትም።",
        createplan: "ዕቅድ ይፍጠሩ"
    },

    [`${Language.ENGLISH}`]: {
        myplans: "My Plans",
        youdonthaveanysavedplans: "You don't have any workout plans of your own.",
        createplan: "Create Plan"
    },

    [`${Language.FRENCH}`]: {
        myplans: "Mes plans",
        youdonthaveanysavedplans: "Vous n'avez aucun plan d'entraînement personnel.",
        createplan: "Créer un plan"
    }
}