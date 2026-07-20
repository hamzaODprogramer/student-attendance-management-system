'use client'
import Icon from '@mdi/react';
import { mdiMagnify , mdiBellOutline } from '@mdi/js';
import { Avatar } from "@mui/material"
import { useLocale, useTranslations } from 'next-intl';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter , usePathname } from 'next/navigation';
import Notifications from './Notifications';
import NextTopLoader from 'nextjs-toploader';
export default function Nav() {
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

  return (
    <nav className="w-full pl-10 flex h-16  items-center">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
          <Icon 
            path={mdiMagnify} 
            size={1} 
            color="#a1a8b3"
          />
        </div>
        <input
          type="text"
          className="transition-all text-[16px] font-normal duration-500 w-72 pl-12 border-black/10 bg-[#f4f5fa] outline-none rounded-full py-[7px] border-2 border-solid focus:border-[#3d7ede]"
          placeholder={`${nav("Search")} ...`}
        />
      </div>
      <div className="ml-auto mr-8 gap-x-4 flex flex-row-reverse items-center">
        <Avatar alt="Remy Sharp" className='border-2 cursor-pointer hover:border-[#3d7ede] border-black/50 border-solid' src="/user.jpg" />
        <img onClick={handleClick} className="cursor-pointer border-black/50 border-solid border-2 rounded-full hover:border-[#3d7ede] active:border-[#3d7ede] " width="40px"height={"40px"} src={ lg == "en" ? "/lg-en.png" : "/lg-fr.png" } />
        <div onClick={handleClickN} className="cursor-pointer rounded-full p-[7px] hover:bg-black/5" style={{ transform: 'scale(1.2)'}}>
            <Icon  path={mdiBellOutline} size={1} color="black" />
        </div>
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

      <Notifications btnContent={nav('Delete_all_notifications')} anchorElN={anchorElN} openN={openN} handleCloseN={handleCloseN}/>
    </nav>

    
  );
}