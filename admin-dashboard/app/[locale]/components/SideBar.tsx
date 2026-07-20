'use client'
import Icon from '@mdi/react';
import { useLocale, useTranslations } from 'next-intl';
import { mdiLogout , mdiBookOutline , mdiSourceBranch , mdiGoogleClassroom , mdiAccountGroupOutline , mdiHomeOutline , mdiAccountLockOutline , mdiHumanMaleBoard , mdiAccountSchoolOutline   } from '@mdi/js';
import '../globals.css';
import { Fragment } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import isCurrentPage from '../functions/isCurrentPage';
export default function SideBar() {
    const sd = useTranslations('SideBar');
    const pathname = usePathname()
    const router = useRouter()
    const lg = useLocale()
    return (
        <>
            <aside className="bg-[#f4f5fa] h-full min-w-64 w-64 max-lg:min-w-fit max-lg:w-fit">
                <div className="max-lg:hidden" key="logo">
                    <img style={{marginLeft:"-30px"}} src="/est.png" />
                </div>
                <div className="f-full max-lg:w-fit">
                    <ul className="w-full pr-2 mt-8 space-y-1">
                        <li onClick={()=>router.push('/'+lg+'/pages/dashboard')} className={`${isCurrentPage({currentPath:pathname,linkPath:"dashboard"})} py-[9px] cursor-pointer text-black/70 rounded-r-2xl w-full flex pl-5  gap-3 justify-start items-center hover:bg-black/5`}>
                            <Icon size={1} path={mdiHomeOutline} />
                            <span className="max-lg:hidden transition-all duration-1000">{sd('Dashboard')}</span>
                        </li>
                        <li onClick={()=>router.push('/'+lg+'/pages/compte')} className={`${isCurrentPage({currentPath:pathname,linkPath:"compte"})} py-[9px] cursor-pointer text-black/70 rounded-r-2xl w-full flex pl-5  gap-3 justify-start items-center hover:bg-black/5`}>
                            <Icon size={1} path={mdiAccountLockOutline} />
                            <span className="max-lg:hidden ">{sd('AccountManagement')}</span>
                        </li>
                        <li className="flex gap-2 pt-3 items-center">
                            <hr className="w-[10%]  size-[2px] bg-black/25"/>
                            <p className="text-[13px] text-black/35 uppercase">{sd('Resources')}</p>
                            <hr className="w-[70%] size-[2px] bg-black/25"/>
                        </li>
                        <li onClick={()=>router.push('/'+lg+'/pages/enseignant')} className={`${isCurrentPage({currentPath:pathname,linkPath:"enseignant"})} py-[9px] cursor-pointer text-black/70 rounded-r-2xl w-full flex pl-5  gap-3 justify-start items-center hover:bg-black/5`}>
                            <Icon  size={1} path={mdiHumanMaleBoard} />
                            <span className="max-lg:hidden transition-all duration-1000">{sd('Teachers')}</span>
                        </li>
                        <li onClick={()=>router.push('/'+lg+'/pages/etudiant')} className={`${isCurrentPage({currentPath:pathname,linkPath:"etudiant"})} py-[9px] cursor-pointer text-black/70 rounded-r-2xl w-full flex pl-5  gap-3 justify-start items-center hover:bg-black/5`}>
                            <Icon  size={1} path={mdiAccountSchoolOutline} />
                            <span className="max-lg:hidden transition-all duration-1000">{sd('Students')}</span>
                        </li>
                        <li onClick={()=>router.push('/'+lg+'/pages/matiere')} className={`${isCurrentPage({currentPath:pathname,linkPath:"matiere"})} py-[9px] cursor-pointer text-black/70 rounded-r-2xl w-full flex pl-5  gap-3 justify-start items-center hover:bg-black/5`}>
                            <Icon  size={1} path={mdiBookOutline} />
                            <span className="max-lg:hidden transition-all duration-1000">{sd('Subjects')}</span>
                        </li>
                        <li onClick={()=>router.push('/'+lg+'/pages/classe')} className={`${isCurrentPage({currentPath:pathname,linkPath:"classe"})} py-[9px] cursor-pointer text-black/70 rounded-r-2xl w-full flex pl-5  gap-3 justify-start items-center hover:bg-black/5`}>
                            <Icon  size={1} path={mdiAccountGroupOutline} />
                            <span className="max-lg:hidden transition-all duration-1000">{sd('Classes')}</span>
                        </li>
                        <li onClick={()=>router.push('/'+lg+'/pages/filiere')} className={`${isCurrentPage({currentPath:pathname,linkPath:"filiere"})} py-[9px] cursor-pointer text-black/70 rounded-r-2xl w-full flex pl-5  gap-3 justify-start items-center hover:bg-black/5`}>
                            <Icon  size={1} path={mdiSourceBranch} />
                            <span className="max-lg:hidden transition-all duration-1000">{sd('Majors')}</span>
                        </li>
                        <li onClick={()=>router.push('/'+lg+'/pages/salle')} className={`${isCurrentPage({currentPath:pathname,linkPath:"salle"})} py-[9px] cursor-pointer text-black/70 rounded-r-2xl w-full flex pl-5  gap-3 justify-start items-center hover:bg-black/5`}>
                            <Icon  size={1} path={mdiGoogleClassroom} />
                            <span className="max-lg:hidden transition-all duration-1000">{sd('Rooms')}</span>
                        </li>
                        <li className="flex gap-2 pt-3 items-center">
                            <hr className="w-[10%]  size-[2px] bg-black/25"/>
                            <p className="text-[13px] text-black/35 uppercase">{sd('Logout')}</p>
                            <hr className="w-[70%] size-[2px] bg-black/25"/>
                        </li>
                        <li className={`py-[9px] cursor-pointer text-black/70 rounded-r-2xl w-full flex pl-5  gap-3 justify-start items-center hover:bg-black/5`}>
                            <Icon  size={1} path={mdiLogout} />
                            <span className="max-lg:hidden transition-all duration-1000">{sd('Logout')}</span>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}