'use client'
import Image from 'next/image'
import ContainerProvider from "../../components/ContainerProvider";
import { Button, Drawer, InputAdornment , TextField , FormControl , MenuItem , Select , InputLabel} from "@mui/material";
import Icon from "@mdi/react";
import { mdiFormatListNumbered , mdiContentSaveOutline , mdiBookOutline } from "@mdi/js";
import { DrawerAddEnseignantType } from '../../types/global';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function DrawerAdd({open,closeDrawer} : DrawerAddEnseignantType){
    const [selectTest,setSelectTest] = useState('hamza')
    const Classe = useTranslations('Classe')
    return <>
        <Drawer BackdropProps={{ invisible: false }} className="min-w-[50%]" open={open} onClose={closeDrawer}>
            <ContainerProvider  className="mx-3 mt-2" title={Classe('Form_for_adding_a_new_classe')}>
                <div className="grid grid-cols-1 m-4 gap-y-4">
                    <TextField 
                        InputProps={{ startAdornment: (
                            <InputAdornment position="start">
                                <Icon path={mdiFormatListNumbered} size={1} />
                            </InputAdornment>
                        )}} 
                        placeholder={Classe('number_of_classe')}  
                        className="col-span-full" 
                        label={Classe('number')}
                        type="text"
                    />
                    <FormControl className=''>
                        <InputLabel id="demo-simple-select-label">{Classe('majors')}</InputLabel>
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
                    <Button className="font-[Poppins]" startIcon={<Icon path={mdiContentSaveOutline} size={1} />} variant="contained">{Classe('save')}</Button>
                </div>
            </ContainerProvider>
        </Drawer>
    </>
}

