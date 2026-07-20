'use client'
import { useState } from "react";
import ContainerProvider from "../../components/ContainerProvider";
import PageProvider from "../../components/PageProvider";
import Table from "../../components/filiere/Table";
import DrawerAdd from "../../components/filiere/DrawerAdd";
import DrawerUpdate from "../../components/filiere/DrawerUpdate";
import { useTranslations } from "next-intl";
export default function Filiere() {
    const [idUpdated,setIdUpdated] = useState<number | null>(null)

    const [drawerAddOpen,setDrawerAddOpen] = useState<boolean>(false)
    const closeDrawerAdd = () => setDrawerAddOpen(false)
    
    const [drawerUpdateOpen,setDrawerUpdateOpen] = useState<boolean>(false)
    const closeDrawerUpdate = () => setDrawerUpdateOpen(false)
    const handleOpenDrawerUpdate = (id : any) => {
        setIdUpdated(id)
        setDrawerUpdateOpen(true)
    }

    const Majors = useTranslations('Majors')

    
    return <>
        <PageProvider title={Majors('Majors')}>
            <ContainerProvider buttonAddSet={setDrawerAddOpen} search buttonAdd="ajouter" title={Majors('List_of_Majors')} className="mt-4">
                <Table  openDrawerUpdate={handleOpenDrawerUpdate}/>
            </ContainerProvider>
        </PageProvider>


        <DrawerAdd open={drawerAddOpen} closeDrawer={closeDrawerAdd} />
        <DrawerUpdate open={drawerUpdateOpen} closeDrawer={closeDrawerUpdate} idUser={idUpdated}/>
    </>
}