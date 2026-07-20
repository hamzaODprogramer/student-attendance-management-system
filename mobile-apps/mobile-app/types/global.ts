import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { STATE } from '../enums/global';
import { ReactNode } from 'react';

export default interface listeItemStaticClassType {
    title : string,
    filiere : string,
    navigation? : any
}

declare global{
    interface dataResponse {
        state? : STATE
        error? : any,
        result? : any,
        id? : unknown,
        name? : string
    }
    interface ClasseType{
        id? : string,
        _id? : string,
        numero? : string,
        filiere? : FiliereType
    }
    interface FiliereType{
        id? : string,
        _id? : string,
        nom : string,
        matieres? : MatiereType[]
    }
    export interface MatiereType {
        id? : number,
        nom? : string,
        filiere? : any,
        language?:string;
        _id? : any
    }
    export interface EnseignantType {
        _id? : any,
        id? : number,
        cin? : string,
        nom? : string,
        prenom? : string,
        image? : string,
        telephone? : string,
        email? : string,
        date_naissance? : Date,
        OB? : string | null,
        username? : string,
        password? : string
    }
    interface EtudiantType {
        _id? : string,
        id? : string,
        cin? : string,
        cne? : string,
        nom? : string,
        prenom? : string,
        image? : string,
        telephone? : string,
        email? : string,
        date_naissance? : Date,
        filiere? : any,
        classe? : ClasseType
    }
    interface EtudiantItemType {
        key? : string,
        name? : any,
        calories? : string,
        fat? : any,
        cne? : any,
        nom? : any,
        prenom?:any,
        etat? : any
    }
    interface SeanceType {
        id? : string,
        _id? : string,
        date_seance? : string,
        heure_seance? : string,
        enseignant? : EnseignantType,
        classe? : ClasseType,
        presences? : EtudiantType[],
        presentes? : any,
        count?: any
    }
    interface ReclamationType {
        id? : string,
        _id? : string,
        content? : string,
        enseignant? : any,
        date? : string
    }
}
