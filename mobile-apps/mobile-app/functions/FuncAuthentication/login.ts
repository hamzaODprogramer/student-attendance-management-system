import { apiKey, apiUrl } from "../../constants/global";
import { STATE } from "../../enums/global";
import SyncStorage from 'sync-storage'
export default async function login(username:string,password:string) : Promise<dataResponse> {
    try{
        const response = await fetch(`${apiUrl}/en/api/enseignant/auth/login`,{
            method : 'POST',
            body : JSON.stringify({ username,password }),
            headers : { 
                "Content-Type" : "application/json",
                'Authorization': apiKey,
            }
        })
        const data : dataResponse = await response.json()
        if(data.state == STATE.OK) {await SyncStorage.set('login',true);await SyncStorage.set('id',data?.id);await SyncStorage.set('name',data?.name)}
        return data
    }catch(error){
        console.log(error)
        return { state : STATE.ERROR } as dataResponse
    }
}