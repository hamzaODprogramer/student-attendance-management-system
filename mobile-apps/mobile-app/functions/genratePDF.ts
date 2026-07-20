import { View, StyleSheet, Button, Platform, Text } from 'react-native';
import * as Print from 'expo-print';
import React from 'react';
import SyncStorage from 'sync-storage';

const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Expo!
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`;

const jsonData = [
  { cne: 'K10003698574', nom : 'ouadoud',prenom:'hamza', etat:'presente' },
  { cne: 'K10003698574', nom : 'ouadoud',prenom:'hamza', etat:'presente' },
  { cne: 'K10003698574', nom : 'ouadoud',prenom:'hamza', etat:'presente' },
  { cne: 'K10003698574', nom : 'ouadoud',prenom:'hamza', etat:'presente' },
  { cne: 'K10003698574', nom : 'ouadoud',prenom:'hamza', etat:'presente' },
];



const generatePDF = async (etudiants:EtudiantItemType[]) => {
  await Print.printAsync({
    html: createDynamicTable(etudiants),

  });
};


const printToFile = async () => {
  const { uri } = await Print.printToFileAsync({
    html
  });
}


const createDynamicTable = (etudiants:EtudiantItemType[]) => {
  let rows = ''
  etudiants.forEach(etudiant=>{
    rows += `
      <tr>
        <td>${etudiant.cne}</td>
        <td>${etudiant.nom}</td>
        <td>${etudiant.prenom}</td>
        <td>${etudiant.etat}</td>
      </tr>
    `
  })
  const html = `
  <!DOCTYPE html>
    <html>
      <head>
      <style>
        *{font-family: arial, sans-serif;}
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }
        
        td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }
        
        tr:nth-child(even) {
          background-color: #dddddd;
        }
      </style>
      </head>
      <body>
      <div>
          <h3 style="font-size: 16px;">Université Cadi Ayyad</h3>
          <h3 style="font-size: 16px;margin-top: -9px;">Ecole supérieure de technologie safi</h3>
          <span style="display: flex;align-items: center;margin-top: -25px;"><h3 style="font-size: 16px;">Enseignant : </h3> &ensp;${SyncStorage.get('name')}</span>
          <span style="display: flex;align-items: center;margin-top: -25px;"><h3 style="font-size: 16px;">Classe : </h3> &ensp;${SyncStorage.get('classeCameraNumero')} </span>      
          <h3 style="font-size: 16px;margin-top:-8px;">${(new Date()).toISOString().split('T')[0].replace(/(\d{4})-(\d{2})-(\d{2})/, '$1-$2-$3')}</h3>
      </div>
    
      <table>
        <tr>
          <th>cne</th>
          <th>nom</th>
          <th>prénom</th>
          <th>état</th>
        </tr>
        ${rows}
      </table>
    
    </body>
  </html>
    `;
  return html;
}

export default generatePDF