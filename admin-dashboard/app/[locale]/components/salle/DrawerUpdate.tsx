'use client'
import Image from 'next/image'
import ContainerProvider from "../../components/ContainerProvider";
import { Button, Drawer, InputAdornment , TextField , FormControl , MenuItem , Select , InputLabel} from "@mui/material";
import Icon from "@mdi/react";
import { mdiFormatListNumbered , mdiContentSaveOutline , mdiBookOutline, mdiChairSchool } from "@mdi/js";
import { DrawerAddEnseignantType } from '../../types/global';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function DrawerUpdate({open,closeDrawer} : DrawerAddEnseignantType){
    const [selectTest,setSelectTest] = useState('hamza')
    const Room = useTranslations('Room')
    return <>
        <Drawer BackdropProps={{ invisible: false }}  open={open} onClose={closeDrawer}>
            <ContainerProvider  className="mx-3 mt-2 w-[350px]" title={Room("Edit_Room_Information_Form")}>
                <div className="grid grid-cols-1 m-4 gap-y-4">
                    <TextField 
                        InputProps={{ startAdornment: (
                            <InputAdornment position="start">
                                <Icon path={mdiFormatListNumbered} size={1} />
                            </InputAdornment>
                        )}} 
                        placeholder={Room('number_of_place')}  
                        className="col-span-full" 
                        label={Room('number')}
                        type="text"
                    />
                    <TextField 
                        InputProps={{ startAdornment: (
                            <InputAdornment position="start">
                                <Icon path={mdiChairSchool} size={1} />
                            </InputAdornment>
                        )}} 
                        placeholder={Room('number_of_places')}  
                        className="col-span-full" 
                        label={Room('number_of_places')} 
                        type="number"
                    />
                    <FormControl className=''>
                        <InputLabel id="demo-simple-select-label">{Room('type_of_room')}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"                    
                            id="demo-simple-select"
                            value={selectTest}
                            label="Age"
                            onChange={(e)=>setSelectTest(e.target.value)}
                        >
                            <MenuItem value={10}>salle numérique</MenuItem>
                            <MenuItem value={20}>normal</MenuItem>
                            <MenuItem value={30}>amphi</MenuItem>
                        </Select>
                    </FormControl>
                    <Button className="font-[Poppins]" startIcon={<Icon path={mdiContentSaveOutline} size={1} />} variant="contained">{Room('save')}</Button>
                </div>
            </ContainerProvider>
        </Drawer>
    </>
}

