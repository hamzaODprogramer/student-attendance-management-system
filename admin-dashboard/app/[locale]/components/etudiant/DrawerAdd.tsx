'use client'
import Image from 'next/image'
import ContainerProvider from "../../components/ContainerProvider";
import PageProvider from "../../components/PageProvider";
import Table from "../../components/enseignant/Table";
import { FormControl , MenuItem , Button, Drawer, InputAdornment, TextField , Box, Select, InputLabel } from "@mui/material";
import Icon from "@mdi/react";
import { mdiEmailOutline , mdiContentSaveOutline , mdiCalendarBadgeOutline , mdiPhoneOutline, mdiTrayArrowUp , mdiCardAccountDetailsOutline , mdiAccountOutline } from "@mdi/js";
import { DrawerAddEnseignantType } from '../../types/global';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function DrawerAdd({open,closeDrawer} : DrawerAddEnseignantType){
    const [selectTest,setSelectTest] = useState('hamza')
    const Student = useTranslations('Student')
    return <>
        <Drawer BackdropProps={{ invisible: false }} className="min-w-[50%]" open={open} onClose={closeDrawer}>
            <ContainerProvider closer className="mx-3 mt-2" title={Student('Form_for_adding_a_new_student')}>
                <div className="grid grid-cols-1 m-4 gap-y-4">
                    <div className="image-person flex items-center gap-3">
                        <Image className="rounded-xl p-2 border-2 border-solid border-[#1974d0]" width={100} height={100} src={"/user.svg"} alt={"image personnel"}/>
                        <div className="flex flex-col space-y-3 justify-between"> {/* Utilisez justify-between pour espacer les boutons */}
                            <Button startIcon={<Icon path={mdiTrayArrowUp} size={1}/>} className="font-[Poppins]" variant="contained">{Student('upload_an_image')}</Button>
                            <Button variant="outlined" color="error">{Student('reset')}</Button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
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
                        <TextField 
                            InputProps={{ startAdornment: (
                                <InputAdornment position="start">
                                    <Icon path={mdiCardAccountDetailsOutline} size={1} />
                                </InputAdornment>
                            )}} 
                            placeholder="K1XXXXX"  
                            className="col-span-full" 
                            label="cne" 
                            type="text"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <TextField 
                            InputProps={{ startAdornment: (
                                <InputAdornment position="start">
                                    <Icon path={mdiAccountOutline} size={1} />
                                </InputAdornment>
                            )}} 
                            placeholder={Student('First_name')}  
                            className="col-span-full" 
                            label={Student('First_name')}  
                            type="text"
                        />
                        <TextField 
                            InputProps={{ startAdornment: (
                                <InputAdornment position="start">
                                    <Icon path={mdiAccountOutline} size={1} />
                                </InputAdornment>
                            )}} 
                            placeholder={Student('Second_name')}  
                            className="col-span-full" 
                            label={Student('Second_name')} 
                            type="text"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <TextField 
                            InputProps={{ startAdornment: (
                                <InputAdornment position="start">
                                    <Icon path={mdiPhoneOutline} size={1} />
                                </InputAdornment>
                            )}} 
                            placeholder="06 25 25 00 00 00"  
                            className="col-span-full" 
                            label={Student('phone')} 
                            type="tel"
                        />
                        <FormControl className='w-[50%]'>
                            <InputLabel id="demo-simple-select-label">Classe</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"                    
                                id="demo-simple-select"
                                value={selectTest}
                                label="Age"
                                onChange={(e)=>setSelectTest(e.target.value)}
                            >
                                <MenuItem value={10}>class 1 </MenuItem>
                                <MenuItem value={20}>class 2 </MenuItem>
                                <MenuItem value={30}>class 2</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <TextField 
                        className="col-span-full " 
                        label={Student('date_of_birth')} 
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
                    <Button className="font-[Poppins]" startIcon={<Icon path={mdiContentSaveOutline} size={1} />} variant="contained">{Student('save')}</Button>
                </div>
            </ContainerProvider>
        </Drawer>
    </>
}

