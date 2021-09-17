import { Language } from "../../Redux/profilesSlice";

export default {
    [`${Language.AMHARIC}`]: {
        signup: "ይምዝገቡ",
        login: "ይግቡ",
        email: "ኢሜይል",
        password: "የይለፍ ቃል",
        donthaveanaccount: "የመለያ አካውንት የለዎትም?"

    },

    [`${Language.ENGLISH}`]: {
        signup: "Sign Up",
        login: "Log in",
        email: "Email",
        password: "Password",
        donthaveanaccount: "Don't Have an account?"
    },

    [`${Language.FRENCH}`]: {
        signup: "S'inscrire",
        login: "connexion",
        email: "E-mail",
        password: "Mot de passe",
        donthaveanaccount: "Vous n'avez pas de compte ?"

    }
}