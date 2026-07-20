import { apiServerHandleUrl } from "../../constants/global";

export default async function getPresences(image:string){
    const response = await fetch(`${apiServerHandleUrl}/getPersences`,{
        body : JSON.stringify({ image }),
        method : 'POST',
        headers : { 'Content-Type' : 'application/json' }
    })
    return (await response.json())
}