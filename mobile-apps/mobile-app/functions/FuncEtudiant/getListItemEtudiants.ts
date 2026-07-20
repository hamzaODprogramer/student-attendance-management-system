import { useEffect, useState } from "react";
import getPresences from "./getPresences";
import { getEtudiants } from "./CRUD";
export default async function getListItemEtudiants(urlImage:string) : Promise<EtudiantItemType[]> {
    const [etudiants,setEtudiants] = useState<EtudiantType[]>([])
    const [listItemsEtudiant,setListItemsEtudiant] = useState<EtudiantItemType[]>([])
    const [cnes,setCnes] = useState<string[]>([])
    useEffect(()=>{
        const Test = async () => {
            setCnes(await getPresences(urlImage))
            setEtudiants((await getEtudiants()).result)
            console.log("cnes : ",cnes)
            console.log("etudiants : ",etudiants)
            etudiants.map((etudiant:EtudiantType)=>{
                if(cnes.includes(etudiant.cne)){
                    listItemsEtudiant.push({
                        key  : etudiant._id, 
                        name : etudiant.image,
                        calories : etudiant.prenom+' '+etudiant.nom,
                        fat : 'présente'
                    });
                }else{
                    listItemsEtudiant.push({
                        key  : etudiant._id, 
                        name : etudiant.image,
                        calories : etudiant.prenom+' '+etudiant.nom,
                        fat : 'absente'
                    });
                }
            })
        }
        Test()
    },[])
    
    return listItemsEtudiant
}
