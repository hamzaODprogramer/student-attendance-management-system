'use client'
import ContainerProvider from "../../components/ContainerProvider";
import { Button, Drawer, InputAdornment, TextField , Box } from "@mui/material";
import Icon from "@mdi/react";
import { mdiEmailOutline , mdiContentSaveOutline, mdiCardAccountDetailsOutline, mdiFormTextboxPassword, mdiSendVariantOutline  } from "@mdi/js";
import { DrawerAddEnseignantType } from '../../types/global';
import { useTranslations } from "next-intl";

export default function DrawerAuth({open,closeDrawer} : DrawerAddEnseignantType){
    const Teacher = useTranslations('Teacher')
    return <>
        <Drawer BackdropProps={{ invisible: false }} className="min-w-[50%]" open={open} onClose={closeDrawer}>
            <ContainerProvider className="mx-3 mt-2" title="Formulaire d'ajoute de nouveau enseignant">
                <div className="grid grid-cols-1 m-4 gap-y-4">
                    <TextField 
                        InputProps={{ startAdornment: (
                            <InputAdornment position="start">
                                <Icon path={mdiCardAccountDetailsOutline} size={1} />
                            </InputAdornment>
                        )}} 
                        placeholder="username"  
                        className="col-span-full" 
                        label="Username" 
                        type="text"
                    />
                    <TextField 
                        InputProps={{ startAdornment: (
                            <InputAdornment position="start">
                                <Icon path={mdiFormTextboxPassword} size={1} />
                            </InputAdornment>
                        )}} 
                        placeholder="password"  
                        className="col-span-full" 
                        label="Mote de passe" 
                        type="password"
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
                    <Button className="font-[Poppins]" startIcon={<Icon path={mdiContentSaveOutline} size={1} />} variant="contained">enregistrer</Button>
                    <Button disabled className="font-[Poppins]" startIcon={<Icon path={mdiSendVariantOutline} size={1} />} variant="contained" color="warning">notifier par email</Button>
                </div>
            </ContainerProvider>
        </Drawer>
    </>
}

