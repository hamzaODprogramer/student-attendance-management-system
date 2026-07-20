'use client'
import { useState } from "react";
import Image from 'next/image'
import ContainerProvider from "../../components/ContainerProvider";
import PageProvider from "../../components/PageProvider";
import Table from "../../components/etudiant/Table";
import { Button, Drawer, InputAdornment, TextField } from "@mui/material";
import Icon from "@mdi/react";
import { mdiEmailOutline , mdiContentSaveOutline , mdiCalendarBadgeOutline , mdiPhoneOutline, mdiTrayArrowUp , mdiCardAccountDetailsOutline , mdiAccountOutline } from "@mdi/js";
import DrawerAdd from "../../components/etudiant/DrawerAdd";
import DrawerUpdate from "../../components/etudiant/DrawerUpdate";
import DrawerInfo from "../../components/etudiant/DrawerInfo";
import { useTranslations } from "next-intl";
export default function Etudiant() {
    const [idUpdated,setIdUpdated] = useState<number | null>(null)

    const [drawerAddOpen,setDrawerAddOpen] = useState<boolean>(false)
    const closeDrawerAdd = () => setDrawerAddOpen(false)

    const [drawerInfoOpen,setDrawerInfoOpen] = useState<boolean>(false)
    const closeDrawerInfo = () => setDrawerInfoOpen(false)
    
    const [drawerUpdateOpen,setDrawerUpdateOpen] = useState<boolean>(false)
    const closeDrawerUpdate = () => setDrawerUpdateOpen(false)
    
    const handleOpenDrawerUpdate = (id : any) => {
        setIdUpdated(id)
        setDrawerUpdateOpen(true)
    }

    const handleOpenDrawerInfo = () => {
        setDrawerInfoOpen(true)
    } 

    const Student = useTranslations('Student')
    
    return <>
        <PageProvider title={Student('Students')}>
            <ContainerProvider filterClasse buttonAddSet={setDrawerAddOpen} search buttonAdd="ajouter" title={Student('List_of_students')} className="mt-4">
                <Table openDrawerInfo={handleOpenDrawerInfo} openDrawerUpdate={handleOpenDrawerUpdate}/>
            </ContainerProvider>
        </PageProvider>


        <DrawerAdd open={drawerAddOpen} closeDrawer={closeDrawerAdd}/>
        <DrawerInfo open={drawerInfoOpen} closeDrawer={closeDrawerInfo}/>
        <DrawerUpdate open={drawerUpdateOpen} closeDrawer={closeDrawerUpdate} idUser={idUpdated}/>
    </>
}