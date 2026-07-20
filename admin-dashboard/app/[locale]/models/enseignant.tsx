import mongoose from "mongoose";
import { Schema , models , model, SchemaType } from 'mongoose'
import Matiere from "./matiere";
import Classe from "./classe";

const cinValidator = (value : any) =>{
    if(!/^[A-Z]{2}/.test(value)){
        throw new Error('Le cne doit commencer par une lettre entre A et Z')
    }
}
const nomValidator = (value : any) =>{
    if(!/^[a-zA-Z]/.test(value)){
        throw new Error('Le nom ne doit contenir que des lettres')
    }
}
const prenomValidator = (value : any) =>{
    if(!/^[a-zA-Z]/.test(value)){
        throw new Error('Le prenom ne doit contenir que des lettres')
    }
}


const enseignantSchema = new Schema({
    cin : {
        type : String,
        required : [true,'Le cin est requis'],
        validate : cinValidator
    },
    nom : {
        type : String,
        required : [true,'Le nom est requis'],
        validate : nomValidator
    },
    prenom : {
        type : String,
        required : [true,'Le cne est requis'],
        validate : prenomValidator
    },
    email : {
        type : String,
        required : [true,'L\'\ email est requis']
    },
    date_naissance : {
        type : Date,
        required : [true,'La date naissance est requis']
    },
    telephone : {
        type : String,
        required : [true,'Le t\é\l\è\phone est requis']
    },
    image : {
        type : String,
        required : [true,"L\'\ image est requis"],
    },
    matieres : [Matiere],
    classes : [Classe],
    createdAt : {
        type : Date,
        default : Date.now()
    }

})

const Enseignant = models.Enseignant || model('Enseignant',enseignantSchema)
export default Enseignant
