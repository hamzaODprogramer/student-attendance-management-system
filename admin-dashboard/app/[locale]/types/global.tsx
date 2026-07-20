export interface PageProviderType {
    children : React.ReactNode,
    title : String,
}

export interface StaticCardType {
    content : string,
    icon : string,
    total : number,
    color : string
}

export interface ContainerProviderType {
    children : React.ReactNode | null ,
    title : string,
    className? : string,
    buttonAdd? : string,
    buttonAddSet? : any,
    buttonAddOpen? : any,
    search? : boolean,
    closer? : boolean,
    filterFiliere? : any,
    filterClasse? : any
}

export interface EnseignantType {
    id? : number,
    cin? : string,
    nom? : string,
    prenom? : string,
    image? : string,
    telephone? : string,
    email? : string,
    date_naissance? : Date
}

export interface MatiereType {
    id? : number,
    nom? : string,
    filiere? : any
}

export interface ClasseType{
    numero? : string,
    filiere? : any
}

export interface SalleType{
    numero? : string,
    nb_place? : number,
    type_salle? :string
}

export interface FiliereType{
    nom : string,
    matieres? : any
}

export interface EtudiantType {
    id? : number,
    cin? : string,
    cne? : string,
    nom? : string,
    prenom? : string,
    image? : string,
    telephone? : string,
    email? : string,
    date_naissance? : Date,
    filiere? : any
}

export interface TableEnseignantType {
    openDrawerUpdate : any,
    openDrawerInfo : any,
    openDrawerAuth : any
}

export interface TableMatiereType {
    openDrawerUpdate : any,
}

export interface TableClasseType {
    openDrawerUpdate : any,
}

export interface TableSalleType {
    openDrawerUpdate : any,
}

export interface TableFiliereType {
    openDrawerUpdate : any,
}

export interface DrawerAddEnseignantType {
    open : any,
    closeDrawer : any,
}

export interface DrawerUpdateEnseignantType {
    open : any,
    closeDrawer : any,
    idUser : any
}

export interface DrawerAddFiliereType {
    open : any,
    closeDrawer : any,
}

export interface DrawerUpdateFiliereType {
    open : any,
    closeDrawer : any,
    idUser : any
}

export interface TableEtudiantType {
    openDrawerUpdate : any,
    openDrawerInfo : any
}

export interface DrawerAddEtudiantType {
    open : any,
    closeDrawer : any
}

export interface DrawerUpdateEtudiantType {
    open : any,
    closeDrawer : any,
    idUser : any
}


export interface isCurrentPageType {
    currentPath : string,
    linkPath : string,
}

