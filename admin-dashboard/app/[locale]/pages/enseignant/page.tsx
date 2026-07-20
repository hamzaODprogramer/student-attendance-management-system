'use client'
import { useState } from "react";
import ContainerProvider from "../../components/ContainerProvider";
import PageProvider from "../../components/PageProvider";
import Table from "../../components/enseignant/Table";
import DrawerAdd from "../../components/enseignant/DrawerAdd";
import DrawerUpdate from "../../components/enseignant/DrawerUpdate";
import DrawerInfo from "../../components/enseignant/DrawerInfo";
import DrawerAuth from "../../components/enseignant/DrawerAuth";
import { useTranslations } from "next-intl";
export default function Enseignant() {
    const [idUpdated,setIdUpdated] = useState<number | null>(null)

    const [drawerAddOpen,setDrawerAddOpen] = useState<boolean>(false)
    const closeDrawerAdd = () => setDrawerAddOpen(false)

    const [drawerInfoOpen,setDrawerInfoOpen] = useState<boolean>(false)
    const closeDrawerInfo = () => setDrawerInfoOpen(false)

    const [drawerAuthOpen,setDrawerAuthOpen] = useState<boolean>(false)
    const closeDrawerAuth = () => setDrawerAuthOpen(false)
    
    const [drawerUpdateOpen,setDrawerUpdateOpen] = useState<boolean>(false)
    const closeDrawerUpdate = () => setDrawerUpdateOpen(false)
    const handleOpenDrawerUpdate = (id : any) => {
        setIdUpdated(id)
        setDrawerUpdateOpen(true)
    }

    const handleOpenDrawerInfo = () => {
        setDrawerInfoOpen(true)
    } 
    
    const handleOpenDrawerAuth = () => {
        setDrawerAuthOpen(true)
    }

    const Teacher = useTranslations('Teacher')

    return <>
        <PageProvider title={Teacher('Teachers')}>
            <ContainerProvider buttonAddSet={setDrawerAddOpen} search buttonAdd="ajouter" title={Teacher('List_of_teachers')} className="mt-4">
                <Table openDrawerAuth={handleOpenDrawerAuth} openDrawerInfo={handleOpenDrawerInfo} openDrawerUpdate={handleOpenDrawerUpdate}/>
            </ContainerProvider>
        </PageProvider>


        <DrawerAdd open={drawerAddOpen} closeDrawer={closeDrawerAdd}/>
        <DrawerAuth open={drawerAuthOpen} closeDrawer={closeDrawerAuth}/>
        <DrawerInfo open={drawerInfoOpen} closeDrawer={closeDrawerInfo}/>
        <DrawerUpdate open={drawerUpdateOpen} closeDrawer={closeDrawerUpdate} idUser={idUpdated}/>
    </>
}