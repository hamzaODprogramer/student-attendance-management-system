import mongoose from "mongoose";
import { type_salle } from "../enums/global";

const salleSchema = new mongoose.Schema({
    numero : {
        type : String,
        unique : true,
        required : [true,'le nu\é\mero de salle est requis']
    },
    type_salle : {
        type : type_salle,
        required : [true,"le type de salle est requis"]
    },
    nombre_place : {
        type : Number,
        required : [true,"le nombre des place est requis"],
        validate : { 
            validator: Number.isInteger, 
            message: (props : any) => `nombre de places doit etre une nombre entier`
        }
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

const Salle = mongoose.models.Salle || mongoose.model('Salle',salleSchema)
export default Salle