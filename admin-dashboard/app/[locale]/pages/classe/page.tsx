'use client'
import { useState } from "react";
import ContainerProvider from "../../components/ContainerProvider";
import PageProvider from "../../components/PageProvider";
import Table from "../../components/classe/Table";
import DrawerAdd from "../../components/classe/DrawerAdd";
import DrawerUpdate from "../../components/classe/DrawerUpdate";
import { useTranslations } from "next-intl";
export default function Classe() {
    const [idUpdated,setIdUpdated] = useState<number | null>(null)

    const [drawerAddOpen,setDrawerAddOpen] = useState<boolean>(false)
    const closeDrawerAdd = () => setDrawerAddOpen(false)
    
    const [drawerUpdateOpen,setDrawerUpdateOpen] = useState<boolean>(false)
    const closeDrawerUpdate = () => setDrawerUpdateOpen(false)
    const handleOpenDrawerUpdate = (id : any) => {
        setIdUpdated(id)
        setDrawerUpdateOpen(true)
    }

    const Classe = useTranslations('Classe')


    
    return <>
        <PageProvider title={Classe('Classes')}>
            <ContainerProvider filterFiliere buttonAddSet={setDrawerAddOpen} search buttonAdd="ajouter" title={Classe('List_of_classes')} className="mt-4">
                <Table  openDrawerUpdate={handleOpenDrawerUpdate}/>
            </ContainerProvider>
        </PageProvider>


        <DrawerAdd open={drawerAddOpen} closeDrawer={closeDrawerAdd} />
        <DrawerUpdate open={drawerUpdateOpen} closeDrawer={closeDrawerUpdate} idUser={idUpdated}/>
    </>
}