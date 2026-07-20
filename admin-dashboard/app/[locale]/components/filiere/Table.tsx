import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { FiliereType } from '../../types/global';
import Icon from '@mdi/react';
import { mdiDeleteOutline, mdiSquareEditOutline } from '@mdi/js';
import { List, Popconfirm, Tooltip } from 'antd';
import { Button, Popover } from 'antd';
import { useTranslations } from 'next-intl';

interface TableFiliereType {
  openDrawerUpdate: (nom: string) => void;
}

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left';
}



const rows : FiliereType[] = [
  { nom : 'informatique' ,matieres : 'Genie informatique' },
  { nom : 'management ' ,matieres : 'Genie informatique' },
  { nom : 'informatique' ,matieres : 'Genie informatique' },
  { nom : 'informatique' ,matieres : 'Genie informatique' },
];

export default function TableEns({ openDrawerUpdate }: TableFiliereType) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const Majors = useTranslations('Majors')

  const columns: Column[] = [
    { id: 'nom', label: Majors('name'), minWidth: 170 },
    { id: 'matieres', label: Majors('subjects'), minWidth: 100 },
    { id: 'actions', label: 'Actions', minWidth: 200, align: 'left' },
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
                  sx={{ fontWeight: 700 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: FiliereType) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.nom}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <React.Fragment key={column.id}>
                        {column.id === 'matieres' && (
                          <TableCell key={column.id} className="py-0">
                            <Popover className='pb-1 space-y-1' placement="bottom" title={Majors('subjects')} content={
                              <div className="pb-2 mt-2 pt-2">
                                <List
                                  size="small"
                                  header={<div>database</div>}
                                  footer={<div>java</div>}
                                  bordered
                                  className='max-h-32 overflow-y-auto my-[-10px]'
                                  dataSource={['c++']}
                                  renderItem={(item : any) => <List.Item>{item}</List.Item>}
                                />
                              </div>
                            }>
                              <Button>{"Matières de filiére"}</Button>
                            </Popover>
                          </TableCell>
                        )}
                        {column.id === 'actions' && (
                          <TableCell key={column.id} className="flex items-center space-x-2" align="left">
                            <Tooltip title="Modifier l'enseignant" arrow>
                              <span onClick={() => openDrawerUpdate(row.nom)}>
                                <Icon className="cursor-pointer" color={"rgba(0,0,0,0.6)"} path={mdiSquareEditOutline} size={1} />
                              </span>
                            </Tooltip>
                            <Popconfirm
                              title={Majors('Remove_Majors')}
                              description={Majors('are_you_sure_?')}
                              okText={Majors('yes')}
                              cancelText={Majors('no')}
                            >
                              <Tooltip title="Supprimer l'enseignant" arrow>
                                <Icon className="cursor-pointer" color={"rgba(0,0,0,0.6)"} path={mdiDeleteOutline} size={1} />
                              </Tooltip>
                            </Popconfirm>
                          </TableCell>
                        )}
                        {column.id !== 'matieres' && column.id !== 'actions' && (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        )}
                      </React.Fragment>
                    );
                  })}
                </TableRow>
              ))}
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
