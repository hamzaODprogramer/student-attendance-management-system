'use client'
import { useState } from "react";
import ContainerProvider from "../../components/ContainerProvider";
import PageProvider from "../../components/PageProvider";
import Table from "../../components/salle/Table";
import DrawerAdd from "../../components/salle/DrawerAdd";
import DrawerUpdate from "../../components/salle/DrawerUpdate";
import { useTranslations } from "next-intl";
export default function Salle() {
    const [idUpdated,setIdUpdated] = useState<number | null>(null)

    const [drawerAddOpen,setDrawerAddOpen] = useState<boolean>(false)
    const closeDrawerAdd = () => setDrawerAddOpen(false)
    
    const [drawerUpdateOpen,setDrawerUpdateOpen] = useState<boolean>(false)
    const closeDrawerUpdate = () => setDrawerUpdateOpen(false)
    const handleOpenDrawerUpdate = (id : any) => {
        setIdUpdated(id)
        setDrawerUpdateOpen(true)
    }

    const Room = useTranslations('Room')
    
    return <>
        <PageProvider title={Room('Rooms')}>
            <ContainerProvider buttonAddSet={setDrawerAddOpen} search buttonAdd="ajouter" title={Room('List_of_Rooms')} className="mt-4">
                <Table  openDrawerUpdate={handleOpenDrawerUpdate}/>
            </ContainerProvider>
        </PageProvider>


        <DrawerAdd open={drawerAddOpen} closeDrawer={closeDrawerAdd} />
        <DrawerUpdate open={drawerUpdateOpen} closeDrawer={closeDrawerUpdate} idUser={idUpdated}/>
    </>
}