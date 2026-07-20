import SyncStorage from "sync-storage";
import { apiKey, apiUrl } from "../../constants/global";
import { STATE } from "../../enums/global";

export async function getEnseignant(id:unknown) : Promise<dataResponse> {
    try {
        const response = await fetch(`${apiUrl}/en/api/enseignant/getOne/${id}`,{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : apiKey
            }
        })
        return await response.json()
    } catch (error) {
        return { state : STATE.ERROR } as dataResponse
    }
}

export async function updateEnseignant({nom,prenom,email,telephone}:EnseignantType) : Promise<dataResponse> {
    try{
        const response = await fetch(`${apiUrl}/en/api/enseignant/updateOneMobile/${SyncStorage.get("id")}`,{
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization':  apiKey
            },
            body : JSON.stringify({nom,prenom,email,telephone})
        })
        return await response.json()
    }catch(error){
        console.log('error : '+error)
        return { state : STATE.ERROR } as dataResponse
    }
}

export async function sendReclamation({content}:ReclamationType) : Promise<dataResponse>{
    try {
        const response = await fetch(`${apiUrl}/en/api/reclamation`,{
            body : JSON.stringify({ content , id : SyncStorage.get('id')  } as ReclamationType),
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : apiKey
            }
        })
        return await response.json()
    } catch (error) {
        return { state : STATE.ERROR } as dataResponse
    }
}

export async function resetAccount(email:string) : Promise<dataResponse> {
    try {
        const response = await fetch(`${apiUrl}/en/api/enseignant/recovery`,{
            body : JSON.stringify({ email }),
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : apiKey
            }
        })
        return await response.json()
    } catch (error) {
        return { state : STATE.ERROR } as dataResponse
    }
}