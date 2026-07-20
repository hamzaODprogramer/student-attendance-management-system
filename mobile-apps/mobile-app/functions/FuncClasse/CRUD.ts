import SyncStorage from "sync-storage";
import { apiKey, apiUrl } from "../../constants/global";
import { STATE } from "../../enums/global";


export async function getClasses() : Promise<dataResponse> {
    try{
        const response = await fetch(`${apiUrl}/en/api/classe`,{
            method : 'GET',
            headers : {
                "Content-Type" : 'application/json',
                "Authorization" : apiKey
            }
        })
        return await response.json()
    }catch(error){
        return { state : STATE.ERROR } as dataResponse
    }
}

export async function getCountStudents() : Promise<number> {
    try {
        const response = await fetch(`${apiUrl}/en/api/classe/getCountStudents/${SyncStorage.get('ClasseStatic')}`,{
            method : 'GET',
            headers : {
                "Content-Type" : 'application/json',
                "Authorization" : apiKey
            }
        })
        return (await response.json()).result
    } catch (error) {
        return 0
    }
}

export async function getStaticsStudents(date:string) : Promise<number[]> {
    try {
        const response = await fetch(`${apiUrl}/en/api/seance/getStaticAbsence/${date}/${SyncStorage.get('id')}`,{
            method : 'GET',
            headers : {
                "Content-Type" : 'application/json',
                "Authorization" : apiKey
            }
        })
        return (await response.json()).result
    } catch (error) {
        return [0,0,0,0,0,0,0]
    }
}