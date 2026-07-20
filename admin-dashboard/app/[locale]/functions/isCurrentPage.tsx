import { isCurrentPageType } from "../types/global"

export default function isCurrentPage({currentPath,linkPath}:isCurrentPageType) : string {
    if(currentPath.includes('pages/'+linkPath)) return 'active'
    return ''
}
