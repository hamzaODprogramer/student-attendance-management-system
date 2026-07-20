'use client'
import Image from 'next/image'
import ContainerProvider from "../../components/ContainerProvider";
import { Button, Drawer, InputAdornment , TextField , FormControl , MenuItem , Select , InputLabel , Box, Chip, OutlinedInput, useTheme, SelectChangeEvent, Theme} from "@mui/material";
import Icon from "@mdi/react";
import { mdiFormatListNumbered , mdiContentSaveOutline , mdiBookOutline, mdiSourceBranch } from "@mdi/js";
import { DrawerAddFiliereType } from '../../types/global';
import { useState } from 'react';
import React from 'react';
import { useTranslations } from 'next-intl';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


export default function DrawerAdd({open,closeDrawer} : DrawerAddFiliereType){
    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
        target: { value },
        } = event;
        setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const Majors = useTranslations('Majors')

    return <>
        <Drawer BackdropProps={{ invisible: false }} className="min-w-[50%]" open={open} onClose={closeDrawer}>
            <ContainerProvider  className="mx-3 mt-2" title={Majors('Form_for_adding_a_new_Majors')}>
                <div className="grid grid-cols-1 m-4 gap-y-4">
                    <TextField 
                        InputProps={{ startAdornment: (
                            <InputAdornment position="start">
                                <Icon path={mdiSourceBranch} size={1} />
                            </InputAdornment>
                        )}} 
                        placeholder={Majors('name_of_majors')}  
                        className="col-span-full" 
                        label={Majors('name')}
                        type="text"
                    />
                    <FormControl className="w-full">
                        <InputLabel id="demo-multiple-chip-label">{Majors('subjects')}</InputLabel>
                        <Select
                            className="min-w-[400px] w-full"
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                        {names.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, personName, theme)}
                            >
                            {name}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <Button className="font-[Poppins]" startIcon={<Icon path={mdiContentSaveOutline} size={1} />} variant="contained">{Majors('save')}</Button>
                </div>
            </ContainerProvider>
        </Drawer>
    </>
}

