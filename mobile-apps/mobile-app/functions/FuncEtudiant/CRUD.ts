import { apiKey, apiUrl } from "../../constants/global";
import { STATE } from "../../enums/global";

export async function getEtudiants() : Promise<dataResponse> {
    try {
        const response = await fetch(`${apiUrl}/en/api/etudiant`,{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': apiKey
            }
        })
        return await response.json() 
    } catch(error) {
        console.log(error)
        return { state : STATE.ERROR } as dataResponse
    }
}