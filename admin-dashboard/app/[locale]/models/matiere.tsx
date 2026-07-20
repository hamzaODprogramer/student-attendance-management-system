import mongoose from 'mongoose'

const nomValidator = (value : any) =>{
    if(!/^[a-zA-Z]/.test(value)){
        throw new Error('Le nom ne doit contenir que des lettres')
    }
}

const matiereSchema = new mongoose.Schema({
    nom : {
        type : String,
        required : [true,'Le nom est requis'],
        validate : nomValidator
    }
})

const Matiere = mongoose.models.Matiere || mongoose.model('Matiere',matiereSchema)
export default Matiere