import Icon from "@mdi/react";
import { StaticCardType } from "../../types/global";

export default function StaticCard({ content , icon , total , color } : StaticCardType) {
    return <>
        <div className="w-full shadow-sm shadow-black/25 cursor-pointer">
            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                <div className="p-2 bg-black/5 rounded-full">
                    <Icon path={icon} color={color} size={2}/>
                </div>

                <div className="ml-auto">
                    <h4 className="text-xl font-semibold text-gray-700">{total}</h4>
                    <div className="text-gray-500">{content}</div>
                </div>
            </div>
        </div>
    </>
}
