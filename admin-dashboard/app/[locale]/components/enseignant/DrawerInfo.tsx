'use client'
import Image from 'next/image'
import ContainerProvider from "../../components/ContainerProvider";
import PageProvider from "../../components/PageProvider";
import Table from "../../components/enseignant/Table";
import { Button, Drawer, InputAdornment, TextField , Box } from "@mui/material";
import Icon from "@mdi/react";
import { mdiEmailOutline , mdiContentSaveOutline , mdiCalendarBadgeOutline , mdiPhoneOutline, mdiTrayArrowUp , mdiCardAccountDetailsOutline , mdiAccountOutline } from "@mdi/js";
import { DrawerAddEnseignantType } from '../../types/global';
import { useTranslations } from 'next-intl';

export default function DrawerInfo({open,closeDrawer} : DrawerAddEnseignantType){
    const Teacher = useTranslations('Teacher')
    return <>
        <Drawer BackdropProps={{ invisible: false }} className="w-[400px]" open={open} onClose={closeDrawer}>
            <ContainerProvider className="mx-5 mt-2 w-[400px]" title={Teacher('Teacher_Information')}>
                <div className="flex flex-col justify-center items-center pt-3 px-3 pb-2 gap-y-2 min">
                    <Image width={120} alt='user' height={120} src={'/user.svg'} className="rounded-xl shadow-sm  bg-black/5  border-black/40 p-2"/>
                    <div className="flex items-center justify-between rounded-lg shadow-sm bg-black/5 border-solid  border-opacity-30 min-w-full py-1 px-4 mx-3">
                        <span className="flex font-medium gap-1 text-center">cin</span>
                        <span className='text-black/60'>HA213125</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg shadow-sm bg-black/5 border-solid  border-opacity-30 min-w-full py-1 px-4 mx-3">
                        <span className="flex font-medium gap-1 text-justify">{Teacher('name')}</span>
                        <span className='text-black/60'>Hamza Ouadoud</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg shadow-sm bg-black/5 border-solid  border-opacity-30 min-w-full py-1 px-4 mx-3">
                        <span className="flex font-medium gap-1 text-justify">Email</span>
                        <span className='text-black/60'>hamzaouadoud116@gmail.com</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg shadow-sm bg-black/5 border-solid  border-opacity-30 min-w-full py-1 px-4 mx-3">
                        <span className="flex font-medium gap-1 text-justify">{Teacher('phone')}</span>
                        <span className='text-black/60'>06 88 95 48 75</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg shadow-sm bg-black/5 border-solid  border-opacity-30 min-w-full py-1 px-4 mx-3">
                        <span className="flex font-medium gap-1 text-justify">{Teacher('date_of_birth')}</span>
                        <span className='text-black/60'>01-01-2003</span>
                    </div>
                </div>
            </ContainerProvider>
        </Drawer>
    </>
}

