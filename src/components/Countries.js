import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { UserContext } from '../context/UserProvider';
import { Link } from '@mui/material';

function createData(country) {
  return {
    flag : country.flags.png,
    name : country.name.common,
    region : country.region,
    capital : country.capital,
    languages : country.languages,
    population : country.population,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: 'flag',
    numeric: false,
    disablePadding: false,
    label: 'Flag',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'region',
    numeric: false,
    disablePadding: false,
    label: 'Region',
  },
  {
    id: 'capital',
    numeric: false,
    disablePadding: false,
    label: 'Capital',
  },
  {
    id: 'languages',
    numeric: false,
    disablePadding: false,
    label: 'Languages',
  },
  {
    id: 'population',
    numeric: true,
    disablePadding: false,
    label: 'Population',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function Countries() {
  const [ state, ] = React.useContext(UserContext);

  const [ order, setOrder ] = React.useState('asc');
  const [ orderBy, setOrderBy ] = React.useState('calories');
  const [ page, setPage ] = React.useState(0);
  const [ rowsPerPage, setRowsPerPage ] = React.useState(5);

  const rows = state.fetching === false 
    ? state.countries
        .filter(country => country.name.common.toLowerCase().includes(state.query.toLowerCase()))
        .map(country => createData(country))
    : []

  console.log(rows);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {

                  return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.name}
                      >
                          <TableCell
                            component='a'
                            id={index}
                            scope="row"
                            padding="normal"
                            href={`/country/${row.name}`}
                          >
                            <img src={row.flag}></img>
                          </TableCell>
                          <TableCell 
                            align="right"
                            component='a'
                            href={`/country/${row.name}`}
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.region}</TableCell>
                          <TableCell align="right">{row.capital}</TableCell>
                          <TableCell align="left" padding= 'normal'>
                            <ul>
                              {
                                row.languages !== null && row.languages !== undefined
                                ? Object.keys(row.languages).map(
                                    key => <li key={key}>{row.languages[key]}</li>
                                  )
                                : <li>None</li>
                              }
                            </ul>
                          </TableCell>
                          <TableCell align="right" padding= 'normal'>{row.population}</TableCell>
                      </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
