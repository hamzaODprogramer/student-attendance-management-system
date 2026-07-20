import { PageProviderType } from "../types/global";
export default function PageProvider({ children , title  } : PageProviderType){
    return <>
        <main className="pl-12 mt-5 mr-8">
            <div className="flex items-center">
                <h1 className="text-[#3d7ede] text-[25px] font-medium">{title}</h1>
            </div>
            { children }
        </main>
    </>
}