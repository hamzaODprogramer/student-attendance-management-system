import mongoose from "mongoose";
import Etudiant from "./etudiant";
import Enseignant from "./enseignant";
import Classe from "./classe";
import Salle from "./salle";
import Matiere from "./matiere";

const pdfValidator = (value : any) =>{
    if(!/^[a-zA-z1-9]/.test(value)){
        throw new Error("cette URL n'est pas valide")
    }
    if(!(value+'').includes('.pdf')){
        throw new Error("l'extension du fichier doit être PDF")
    }
}

const seanceSchema = new mongoose.Schema({
  date_seance : {
    type: Date,
    required: [true, "la date de séance est requise"],
  },
  heure_seance : {
    type : String,
    required: [true, "l'heure de séance est requise"],
  },
  pdf : {
    type : String,
    validate : pdfValidator
  },
  presentes : [Etudiant],
  enseignant : Enseignant,
  classe : Classe,
  salle : Salle,
  matiere : Matiere,
});