'use client'
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import { Avatar } from "@mui/material"
import { useLocale } from 'next-intl';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { deepOrange } from '@mui/material/colors';
import { Button } from '@mui/material'
import Divider from '@mui/material/Divider';



export default function Notifications({ openN,anchorElN,handleCloseN,btnContent } : any) {
    return <>
        <Menu
            id="basic-menu"
            anchorEl={anchorElN}
            open={openN}
            onClose={handleCloseN}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            className='mt-2 mr-28'
        >
            <div className="w-[400px]">
                <p className='pl-4 font-medium mb-1'>Notifications</p>
                
                <MenuItem onClick={()=>null} className="w-full border-y-[1px] border-y-black/40 border-y-solid">
                    <div className='w-full flex items-center py-2'>
                        <Avatar sx={{bgcolor: deepOrange[500]}} alt="Remy Sharp" className='cursor-pointer '>S</Avatar>
                        <div className='ml-2'>
                            <p className="type font-normal">Reclamation</p>
                            <p className="text-[12px]">bonjoure hamza pou ....</p>
                        </div>
                        <p className="opacity-50 text-[13px] ml-auto">Aujourd'hui</p>
                    </div>
                </MenuItem>
                <MenuItem onClick={()=>null}>
                    <div className='w-full flex items-center py-2'>
                        <Avatar sx={{bgcolor: deepOrange[500]}} alt="Remy Sharp" className='cursor-pointer '>R</Avatar>
                        <div className='ml-2'>
                            <p className="type font-normal">Reclamation</p>
                            <p className="text-[12px]">bonjoure hamza pou ....</p>
                        </div>
                        <p className="opacity-50 text-[13px] ml-auto">Mer 5,2003</p>
                    </div>
                </MenuItem>
                <div className="w-full pt-[8px] flex justify-center mt-2 border-t-solid border-t-black/10 border-opacity-10 border-t-[2px]">
                    <Button className="min-w-[90%] gap-x-2 space-x-2" variant="contained">
                        <Icon path={mdiDelete} size={1} />
                        {btnContent}
                    </Button>
                </div>
            </div>
        </Menu>
    </>
}
