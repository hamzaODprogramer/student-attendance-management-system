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
import { SalleType, TableSalleType } from '../../types/global';
import Icon from '@mdi/react';
import { mdiDeleteOutline, mdiSquareEditOutline } from '@mdi/js';
import { Tooltip } from '@mui/material';
import { Popconfirm } from 'antd';
import { useTranslations } from 'next-intl';

interface Column {
  id: any;
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: number) => string;
}



export default function TableEns({openDrawerUpdate} : TableSalleType) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const Room = useTranslations('Room')

  const columns: readonly Column[] = [
    { id: 'numero', label: Room('number'), minWidth: 170 },
    { id: 'type_salle', label: Room('type_of_room'), minWidth: 100 },
    { id: 'nb_place', label: Room('number_of_places'), minWidth: 100 },
    {
      id: 'action',
      label: 'action',
      minWidth: 200,
      align: 'left',
      format: (value: number) => value.toFixed(2),
    },
  ];

  const rows : SalleType[] = [
    { numero : 'GIM5' ,type_salle : 'amphi' , nb_place : 200 },
    { numero : 'GI8 ' ,type_salle : 'amphi' , nb_place : 200 },
    { numero : 'TIM' ,type_salle : 'amphi' , nb_place : 200 },
    { numero : 'MG' ,type_salle : 'amphi' , nb_place : 200 },
  ];

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
              .map((row : ClasseType) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.nom}>
                    {columns.map((column) => {
                        const value = row[column.id];
                        return (
                            <React.Fragment key={column.id}>
                            {column.id !== 'action' ? (
                                <TableCell  key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                            ) : (
                                <TableCell key={`${row.nom}-edit`} className="flex items-center space-x-2 " align="left">
                                  <Tooltip title="modifier enseignant" arrow>  <span onClick={()=>openDrawerUpdate(row.nom)}><Icon className='cursor-pointer' color={"rgba(0,0,0,0.6)"} path={mdiSquareEditOutline} size={1} /></span></Tooltip>
                                  <Popconfirm
                                    title={Room('Remove_Room')}
                                    description={Room('are_you_sure_?')}
                                    okText={Room('yes')}
                                    cancelText={Room('no')}
                                  >
                                    <Tooltip title="supprimer enseignant" arrow>
                                      <Icon className='cursor-pointer' color={"rgba(0,0,0,0.6)"} path={mdiDeleteOutline} size={1} />
                                    </Tooltip>
                                  </Popconfirm>
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
