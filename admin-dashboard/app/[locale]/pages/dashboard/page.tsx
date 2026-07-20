import SideBar from "@/app/[locale]/components/SideBar"
import Nav from "../../components/Nav"
import PageProvider from "../../components/PageProvider"
import StaticCard from "../../components/dashboard/StaticCard"
import { mdiAccountSupervisor } from '@mdi/js';
import ContainerProvider from "../../components/ContainerProvider";
import { useTranslations } from "next-intl";
export default function Home(){
  const Dashboard = useTranslations('Dashboard')
  return <>
    <PageProvider title={Dashboard('Dashboard')}  >
      <div className="grid grid-cols-4 max-lg:grid-cols-2 gap-2 mt-3 ">
        <StaticCard color="#3d7ede" total={200} content="Etudiants" icon={mdiAccountSupervisor} />
        <StaticCard color="red" total={200} content="Etudiants" icon={mdiAccountSupervisor} />
        <StaticCard color="dodgerblue" total={200} content="Etudiants" icon={mdiAccountSupervisor} />
        <StaticCard color="yellow" total={200} content="Etudiants" icon={mdiAccountSupervisor} />
        <ContainerProvider className="mt-4 col-span-full" title={Dashboard('Number_of_absences_per_month')} >
          <br /><br /><br /><br />
        </ContainerProvider>
      </div>
    </PageProvider>
  </>
}