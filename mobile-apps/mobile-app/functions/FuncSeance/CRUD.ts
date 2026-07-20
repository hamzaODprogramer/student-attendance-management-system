import { apiKey, apiUrl } from "../../constants/global"
import { STATE } from "../../enums/global"

export async function addSeance({
    date,heure,cnes,id_ens,id_class,count
} : {
    date:string,
    heure:string,
    id_ens:string,
    id_class:string,
    cnes : string[],
    count:any
}) : Promise<dataResponse> {

    try{
        const response = await fetch(`${apiUrl}/en/api/seance`,{
            body : JSON.stringify({ date,heure,cnes,id_ens,id_class,count }),
            method : 'POST',
            headers : {
                'Content-Type'  : 'application/json',
                'Authorization' : apiKey
            }
        })
        return await response.json()
    }catch(error){
        return { state : STATE.ERROR } as dataResponse
    }

}

export async function getSeance( date : string ) : Promise<dataResponse> {
    try {
        const response = await fetch(`${apiUrl}/en/api/seance/${date}`,{
            method : 'GET',
            headers : {
                'Content-Type'  : 'application/json',
                'Authorization' : apiKey
            }
        })
        return await response.json()
    } catch (error) {
        return { state : STATE.ERROR } as dataResponse
    }
}