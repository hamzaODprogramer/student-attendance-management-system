import mongoose from "mongoose"
import Filiere from "./filiere"
import Etudiant from "./etudiant"

const classeSchema = new mongoose.Schema({
    numero : {
        type : String,
        required : [true,'le num\é\ro de de class est requis']
    },
    filiers : Filiere,
    etudiants : [Etudiant]
})

const Classe = mongoose.models.Classe || mongoose.model('Classe',classeSchema)
export default Classe