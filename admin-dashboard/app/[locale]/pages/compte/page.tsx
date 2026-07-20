'use client'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import ContainerProvider from "../../components/ContainerProvider";
import PageProvider from "../../components/PageProvider";
import React from "react";
import Icon from '@mdi/react';
import { mdiEye , mdiEyeOff , mdiContentSaveOutline } from '@mdi/js';
import { useTranslations } from "next-intl";
export default function() {

    const Account = useTranslations('Account')

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }
    return (
        <PageProvider title={Account('Account_management')}>
                <ContainerProvider className="mt-4 max-lg:w-full w-full" title={Account('Edit_administrator_account_information')}>
                    <div className="flex items-center">
                        <div className="flex flex-col w-3/4 max-authScrenne:w-full gap-6 px-5 pt-9 pb-4">
                            <TextField label={Account('Username')} type="text"/>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">{Account('Password')}</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {showPassword ? <Icon path={mdiEye} size={1} /> : <Icon path={mdiEyeOff} size={1} />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            <TextField className="col-span-full" label={Account('recovery_email')}  type="email"/>
                            <Button
                                className="w-fit font-[Poppins] font-medium lowercase first-letter:uppercase"
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<Icon path={mdiContentSaveOutline} size={1} />}
                            > {Account('save')} </Button>
                        </div> 
                        <img className="w-[450px] max-authScrenne:hidden px-5" src="/compte_interface.svg"/>
                    </div>                    
                </ContainerProvider>
        </PageProvider>
    );
}