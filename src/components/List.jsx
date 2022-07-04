import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getAddress, selectTask } from '../store/address/addressSlice';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css'


export default function List({setEditPage}) {
  const { allAddresses, isLoading  } = useSelector((state) => state.address);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {

    dispatch(getAddress());

  }, [navigate]);

  return (
    <TableContainer   sx={{
      maxHeight: 400,
    }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className={styles.tableHeadStyle}>
          <TableRow>
            <TableCell >Name</TableCell>
            <TableCell align="right">Area</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">floor_number&nbsp;(g)</TableCell>
            <TableCell align="right">apartment_number</TableCell>
            <TableCell align="right"></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {allAddresses.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.area}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.floor_number}</TableCell>
              <TableCell align="right">{row.apartment_number}</TableCell>
              <TableCell className={styles.buttonsContainer}  align="right">
                            <Button
                            className={styles.editButton}
                              variant="text"
                              onClick={() => {
                                setEditPage(true);
                                dispatch(selectTask(row));
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() =>
                                dispatch(
                                  deleteTask({
                                    id: row.id,
                                  })
                                )
                              }
                              className={styles.tableDeleteButton}
                              variant="text"
                            >
                              Delete
                            </Button>
                          </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
