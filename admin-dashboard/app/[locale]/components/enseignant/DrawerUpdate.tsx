'use client'
import Image from 'next/image'
import ContainerProvider from "../../components/ContainerProvider";
import { Button, Drawer, InputAdornment, TextField } from "@mui/material";
import Icon from "@mdi/react";
import { mdiEmailOutline , mdiContentSaveOutline , mdiCalendarBadgeOutline , mdiPhoneOutline, mdiTrayArrowUp , mdiCardAccountDetailsOutline , mdiAccountOutline } from "@mdi/js";
import {  DrawerUpdateEnseignantType } from '../../types/global';
import { useTranslations } from 'next-intl';
const DrawerUpdate = ({open,closeDrawer,idUser} : DrawerUpdateEnseignantType) =>  {
    const Teacher = useTranslations('Teacher')
    return <>
        <Drawer className="min-w-[50%]" open={open} onClose={closeDrawer}>
            <ContainerProvider closer className="mx-3 mt-2" title={Teacher('Edit_Teacher_Information_Form')}>
                <div className="grid grid-cols-1 m-4 gap-y-4">
                    <div className="image-person flex items-center gap-3">
                        <Image className="rounded-xl p-2 border-2 border-solid border-[#1974d0]" width={100} height={100} src={"/user.svg"} alt={"image personnel"}/>
                        <div className="flex flex-col space-y-3 justify-between"> {/* Utilisez justify-between pour espacer les boutons */}
                            <Button startIcon={<Icon path={mdiTrayArrowUp} size={1}/>} className="font-[Poppins]" variant="contained">{Teacher('upload_an_image')}</Button>
                            <Button variant="outlined" color="error">{Teacher('reset')}</Button>
                        </div>
                    </div>
                    <TextField 
                        InputProps={{ startAdornment: (
                            <InputAdornment position="start">
                                <Icon path={mdiCardAccountDetailsOutline} size={1} />
                            </InputAdornment>
                        )}} 
                        placeholder="HAXXXXX"  
                        className="col-span-full" 
                        label="cin" 
                        type="text"
                    />
                    <div className="flex items-center gap-4">
                        <TextField 
                            InputProps={{ startAdornment: (
                                <InputAdornment position="start">
                                    <Icon path={mdiAccountOutline} size={1} />
                                </InputAdornment>
                            )}} 
                            placeholder={Teacher('First_name')}  
                            className="col-span-full" 
                            label={Teacher('First_name')} 
                            type="text"
                        />
                        <TextField 
                            InputProps={{ startAdornment: (
                                <InputAdornment position="start">
                                    <Icon path={mdiAccountOutline} size={1} />
                                </InputAdornment>
                            )}} 
                            placeholder={Teacher('Second_name')}  
                            className="col-span-full" 
                            label={Teacher('Second_name')}  
                            type="text"
                        />
                    </div>
                    <TextField 
                        InputProps={{ startAdornment: (
                            <InputAdornment position="start">
                                <Icon path={mdiPhoneOutline} size={1} />
                            </InputAdornment>
                        )}} 
                        placeholder="06 25 25 00 00 00"  
                        className="col-span-full" 
                        label={Teacher('phone')}  
                        type="tel"
                    />
                    <TextField 
                        placeholder={Teacher('date_of_birth')}   
                        className="col-span-full " 
                        label={Teacher('date_of_birth')}  
                        type="date"
                    />
                    <TextField 
                        InputProps={{ startAdornment: (
                            <InputAdornment position="start">
                                <Icon path={mdiEmailOutline} size={1} />
                            </InputAdornment>
                        )}} 
                        placeholder="example@com"  
                        className="col-span-full" 
                        label="Email" 
                        type="email"
                    />
                    <Button className="font-[Poppins]" startIcon={<Icon path={mdiContentSaveOutline} size={1} />} variant="contained">{Teacher('save')}</Button>
                </div>
            </ContainerProvider>
        </Drawer>
    </>
}

export default DrawerUpdate;