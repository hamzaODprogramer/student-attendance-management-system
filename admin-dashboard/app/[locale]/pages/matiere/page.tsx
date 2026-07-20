'use client'
import { useState } from "react";
import ContainerProvider from "../../components/ContainerProvider";
import PageProvider from "../../components/PageProvider";
import Table from "../../components/matiere/Table";
import DrawerAdd from "../../components/matiere/DrawerAdd";
import DrawerUpdate from "../../components/matiere/DrawerUpdate";
import { useTranslations } from "next-intl";
export default function Enseignant() {
    const [idUpdated,setIdUpdated] = useState<number | null>(null)

    const [drawerAddOpen,setDrawerAddOpen] = useState<boolean>(false)
    const closeDrawerAdd = () => setDrawerAddOpen(false)
    
    const [drawerUpdateOpen,setDrawerUpdateOpen] = useState<boolean>(false)
    const closeDrawerUpdate = () => setDrawerUpdateOpen(false)
    const handleOpenDrawerUpdate = (id : any) => {
        setIdUpdated(id)
        setDrawerUpdateOpen(true)
    }

    const Subjects = useTranslations('Subjects')
    
    return <>
        <PageProvider title={Subjects('Subjects')}>
            <ContainerProvider filterFiliere buttonAddSet={setDrawerAddOpen} search buttonAdd="ajouter" title={Subjects('List_of_subjects')} className="mt-4">
                <Table  openDrawerUpdate={handleOpenDrawerUpdate}/>
            </ContainerProvider>
        </PageProvider>


        <DrawerAdd open={drawerAddOpen} closeDrawer={closeDrawerAdd} />
        <DrawerUpdate open={drawerUpdateOpen} closeDrawer={closeDrawerUpdate} idUser={idUpdated}/>
    </>
}