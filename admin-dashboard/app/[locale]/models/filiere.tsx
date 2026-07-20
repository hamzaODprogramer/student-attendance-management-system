import mongoose from "mongoose";
import Matiere from "./matiere";

const nomValidator = (value : any) =>{
    if(!/^[a-zA-Z]/.test(value)){
        throw new Error('Le nom ne doit contenir que des lettres')
    }
}

const filiereSchema = new mongoose.Schema({
    nom : {
        type : String,
        required : [true,'Le nom est requis'],
        validate : nomValidator
    },
    matieres : [Matiere],
    createdAt : {
        type : Date,
        default : Date.now() 
    }
})

const Filiere = mongoose.models.Filiere || mongoose.model('Filiere',filiereSchema)
export default Filiere