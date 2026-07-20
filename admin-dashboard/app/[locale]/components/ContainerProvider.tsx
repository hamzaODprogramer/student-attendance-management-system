'use client'
import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { ContainerProviderType } from "../types/global";
import { mdiFilterOutline, mdiPlusCircle , mdiWindowClose } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import { useTranslations } from "next-intl";
export default function({ title , children , className , buttonAdd , search , buttonAddSet , closer , filterFiliere , filterClasse } : ContainerProviderType) {
    const [selectTest,setSelectTest] = useState('Filitrer par filiere')
    const Container = useTranslations('Container')
    return (
        <div className={"rounded-lg relative bg-white shadow-sm shadow-black/25 "+className}>
            <div className="flex items-center">
                <h1 className="py-3 pl-5 text-black/55 text-xl font-medium">{title}</h1>
                <div className="ml-auto mr-2 gap-1 flex flex-row-reverse items-center">
                    {
                        buttonAdd &&  
                        <Button onClick={()=>buttonAddSet(true)} startIcon={<Icon path={mdiPlusCircle} size={1} />} variant="contained" className='rounded-3xl'>
                            {Container('add')}
                        </Button> 
                    }
                    {
                        filterClasse && <FormControl className="w-44">
                            <Select
                                className="rounded-3xl h-9"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectTest}
                                onChange={(e)=>setSelectTest(e.target.value)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Icon className="opacity-60" path={mdiFilterOutline} size={1} />
                                    </InputAdornment>
                                }
                            >
                                <MenuItem disabled value="">
                                    {Container('Filter_by_class')}
                                </MenuItem>
                                <MenuItem value={10}>Classe 1</MenuItem>
                                <MenuItem value={20}>Classe 2</MenuItem>
                                <MenuItem value={30}>Classe 3</MenuItem>
                            </Select>
                        </FormControl>
                    }
                    {
                        filterFiliere && <FormControl className="w-44">
                            <Select
                                className="rounded-3xl h-9"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectTest}
                                onChange={(e)=>setSelectTest(e.target.value)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Icon className="opacity-60" path={mdiFilterOutline} size={1} />
                                    </InputAdornment>
                                }
                            >
                                <MenuItem disabled value="">
                                    {Container('Filter_by_Majors')}
                                </MenuItem>
                                <MenuItem value={10}>genei informatique</MenuItem>
                                <MenuItem value={20}>genie electrique</MenuItem>
                                <MenuItem value={30}>management</MenuItem>
                            </Select>
                        </FormControl>
                    }
                    {
                        search && 
                        <input placeholder={Container('search')+" ..."} className="w-40 outline-none border-2 p-1 pl-3 border-solid focus:border-[#1974d0] hover:border-[#1974d0] border-[#dbdce1] rounded-3xl"/>
                    }
                    {
                        closer && <button onFocus={()=>buttonAddSet(false)}><Icon  className="opacity-50 cursor-pointer" path={mdiWindowClose} size={1} /></button> 
                    }                   
                </div> 
            </div>
            <hr className="absolute h-[1px] bg-black/40 w-full"/>
            { children }
        </div>
    );
}