'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { EnseignantType, EtudiantType, TableEnseignantType, TableEtudiantType } from '../../types/global';
import Icon from '@mdi/react';
import { mdiAccountLockOutline, mdiDeleteOutline, mdiEyeOutline, mdiSquareEditOutline } from '@mdi/js';
import { CircularProgress, Tooltip } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Popconfirm } from 'antd';
interface Column {
  id: any;
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: number) => string;
}



const rows : EtudiantType[] = [
  { nom : 'hamza aoudoud' , cin :'HA241722' , email:'hamzaouadoud116@gmail.com' , cne :'k100093831' },
  { nom : 'hamza aoudoud' , cin :'HA241722' , email:'hamzaouadoud116@gmail.com' , cne :'k100093831' },
  { nom : 'kamal aoudoud' , cin :'HA241722' , email:'hamzaouadoud116@gmail.com' , cne :'k100093831' },
  { nom : 'hamza aoudoud' , cin :'HA241722' , email:'hamzaouadoud116@gmail.com' , cne :'k100093831' },
];

export default function TableEns({openDrawerUpdate,openDrawerInfo} : TableEtudiantType) {
  
  const Student = useTranslations('Student')
  
  const columns: readonly Column[] = [
    
    { id: 'nom', label: Student('name'), minWidth: 170 },
    { id: 'cin', label: 'cin', minWidth: 100 },
    {
      id: 'cne',
      label: 'cne',
      minWidth: 170,
      align: 'left',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'email',
      label: 'email',
      minWidth: 170,
      align: 'left',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'action',
      label: 'action',
      minWidth: 200,
      align: 'left',
      format: (value: number) => value.toFixed(2),
    },
  ];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{fontWeight:700}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{maxHeight:150,overflow:'scroll'}}>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row : EtudiantType) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.nom}>
                    {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <React.Fragment key={column.id}>
                          {column.id !== 'action' ? (
                              <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                          ) : (
                              <TableCell key={`${row.nom}-edit`} className="flex items-center space-x-2 " align="left">
                                <Tooltip title="modifier enseignant" arrow>  <span onClick={()=>openDrawerUpdate(row.nom)}><Icon className='cursor-pointer' color={"rgba(0,0,0,0.6)"} path={mdiSquareEditOutline} size={1} /></span></Tooltip>
                                <Popconfirm
                                  title={Student('Remove_student')}
                                  description={Student('are_you_sure_?')}
                                  okText={Student('yes')}
                                  cancelText={Student('no')}
                                >
                                  <Tooltip title="supprimer enseignant" arrow>
                                    <Icon className='cursor-pointer' color={"rgba(0,0,0,0.6)"} path={mdiDeleteOutline} size={1} />
                                  </Tooltip>
                                </Popconfirm>
                                <Tooltip title="afficher les donnees enseignant" arrow> <span onClick={()=>openDrawerInfo()}><Icon className='cursor-pointer' color={"rgba(0,0,0,0.6)"} path={mdiEyeOutline} size={1} /></span></Tooltip>
                              </TableCell>
                          )}
                          </React.Fragment>
                      );
                    })}

                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
