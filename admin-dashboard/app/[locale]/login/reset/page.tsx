'use client'
import * as React from 'react'
import Icon from '@mdi/react'
import { mdiBellOutline, mdiEye, mdiEyeOff } from "@mdi/js";
import { Button, FormControl , Menu , MenuItem , FormControlLabel , Checkbox , IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Avatar } from "@mui/material";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale , useTranslations } from 'next-intl';
export default function Login(){
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const router = useRouter()
    const lg = useLocale()
    const nav = useTranslations('Nav')
    const currentPage = usePathname()
    const toggleFr = () => {
        const newPath = currentPage.replace('en','fr')
        if(lg=='fr') return
        router.push(newPath)
    }

    React.useEffect(() => { if (!router) return }, [router]);

    const toggleEn = () => {
        const newPath = currentPage.replace('fr','en')
        if(lg=='en') return
        router.push(newPath)
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const [anchorElN, setAnchorElN] = React.useState<null | HTMLElement>(null);
    const openN = Boolean(anchorElN);
    const handleClickN = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElN(event.currentTarget);
    };
    const handleCloseN = () => {
        setAnchorElN(null);
    };

    const Reset = useTranslations('Reset')
    return <>
        <main className="flex h-full justify-center items-center">
            <div className="rounded-lg pt-6 pb-14 shadow-sm bg-white shadow-black/30 flex flex-col justify-center items-center w-[35%]">
                <img className="w-[60%]" src="/est.png"/>
                <h1 className="text-sm text-opacity-60 mt-1 font-semibold text-[#0a0a77]">{Reset('Enter_your_email_to_recover_your_account')}</h1>
                <div className="grid grid-cols-1 gap-y-5 pt-8">
                    <TextField className="col-span-full w-[430px]" label={Reset('recovery_email')}  type="email"/>
                    <Button variant="contained" className="bg-[#0a0a77] font-[Poppins] py-2">{Reset('validate')}</Button>
                </div>
            </div>
        </main>
        <div className="absolute top-3 right-3 ml-auto mr-8 gap-x-4 flex flex-row-reverse items-center">
            <img onClick={handleClick} className="cursor-pointer border-black/50 border-solid border-2 rounded-full hover:border-[#3d7ede] active:border-[#3d7ede] " width="40px"height={"40px"} src={ lg == "en" ? "/lg-en.png" : "/lg-fr.png" } />
        </div>

        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            className='mt-2'
      >
        <MenuItem onClick={()=>{handleClose();toggleFr()}}>
            <div className="flex gap-x-2 justify-center items-center">
                <img width="20px" height="20px"  className="cursor-pointer" src="/lg-fr.png" />
                <p>français</p>
            </div>
        </MenuItem>
        <MenuItem onClick={()=>{handleClose();toggleEn()}}>
            <div className="flex gap-x-2 justify-center items-center">
                <img width="20px" height="20px" className="cursor-pointer" src="/lg-en.png" />
                <p>english</p>
            </div>
        </MenuItem>
      </Menu>
    </>
}