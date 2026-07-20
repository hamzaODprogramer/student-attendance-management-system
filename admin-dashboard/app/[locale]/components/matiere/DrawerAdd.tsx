'use client'
import Image from 'next/image'
import ContainerProvider from "../../components/ContainerProvider";
import { Button, Drawer, InputAdornment , TextField , FormControl , MenuItem , Select , InputLabel} from "@mui/material";
import Icon from "@mdi/react";
import { mdiEmailOutline , mdiContentSaveOutline , mdiPhoneOutline, mdiTrayArrowUp , mdiCardAccountDetailsOutline , mdiAccountOutline, mdiBookOutline } from "@mdi/js";
import { DrawerAddEnseignantType } from '../../types/global';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function DrawerAdd({open,closeDrawer} : DrawerAddEnseignantType){
    const [selectTest,setSelectTest] = useState('hamza')
    const Subject = useTranslations('Subjects')
    return <>
        <Drawer BackdropProps={{ invisible: false }} className="min-w-[50%]" open={open} onClose={closeDrawer}>
            <ContainerProvider  className="mx-3 mt-2" title={Subject('Form_for_adding_a_new_subject')}>
                <div className="grid grid-cols-1 m-4 gap-y-4">
                    <TextField 
                        InputProps={{ startAdornment: (
                            <InputAdornment position="start">
                                <Icon path={mdiBookOutline} size={1} />
                            </InputAdornment>
                        )}} 
                        placeholder={Subject('name_of_subject')}  
                        className="col-span-full" 
                        label={Subject('name')} 
                        type="text"
                    />
                    <FormControl className=''>
                        <InputLabel id="demo-simple-select-label">{Subject('majors')}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"                    
                            id="demo-simple-select"
                            value={selectTest}
                            label="Age"
                            onChange={(e)=>setSelectTest(e.target.value)}
                        >
                            <MenuItem value={10}>genei informatique</MenuItem>
                            <MenuItem value={20}>genei electrique</MenuItem>
                            <MenuItem value={30}>management</MenuItem>
                        </Select>
                    </FormControl>
                    <Button className="font-[Poppins]" startIcon={<Icon path={mdiContentSaveOutline} size={1} />} variant="contained">{Subject('save')}</Button>
                </div>
            </ContainerProvider>
        </Drawer>
    </>
}

