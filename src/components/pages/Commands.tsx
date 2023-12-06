import useSWR from "swr";
import { format, parse } from "date-fns";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelIcon from "@mui/icons-material/Cancel";

import React, { Fragment, useState } from "react";
import { paths, ICommand } from "../../services/command.service";
import { useCommands } from "../../hooks/useCommands";

const Commands = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, error, isLoading } = useSWR<ICommand[]>([
    paths.getAllCommands(),
  ]);

  const { finishCommand } = useCommands();

  const [searchFilter, setSearchFilter] = useState({ value: "", state: "" });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(Math.max(newPage, 0));
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const headers = [
    { key: "id" },
    { key: "mesa" },
    { key: "criado por" },
    { key: "finalizado por" },
    { key: "criado em" },
    { key: "finalizado em" },
    { key: "ações" },
  ];

  return (
    <>
      <Paper
        elevation={4}
        sx={{
          height: 50,
          margin: "80px 5px 30px 5px",
          borderRadius: "20px",
          borderWidth: 20,
          borderColor: ({ palette }) => palette.primary.main,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          onChange={(event) =>
            setSearchFilter((s) => ({ ...s, state: event.target.value }))
          }
          value={searchFilter.state}
          size="small"
          placeholder="Pesquisar"
          sx={{
            width: "100%",
            marginRight: "-14px",
            "& fieldset": { borderRadius: "25px", marginRight: "14px" },
          }}
          InputProps={{
            endAdornment: (
              <Button
                sx={{ borderRadius: "0px 25px 25px 0px" }}
                onClick={() =>
                  setSearchFilter((s) => ({ ...s, value: s.state }))
                }
                variant="contained"
                color="primary"
              >
                <SearchIcon fontWeight="bold" />
              </Button>
            ),
          }}
        />
      </Paper>
      <Box overflow={"auto"} height="75%">
        {data ? (
          <>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {headers.map(({ key }) => (
                      <TableCell
                        key={key}
                        sx={{
                          backgroundColor: ({ palette }) =>
                            palette.primary.main,
                        }}
                      >
                        <Typography fontWeight="bold" color="#FFF">
                          {key}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .filter(({ tableNumber }) =>
                      searchFilter.value
                        ? String(tableNumber)
                            .toLowerCase()
                            .includes(searchFilter.value.toLowerCase())
                        : true
                    )
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((row) => (
                      <Fragment key={row._id + "-fragment"}>
                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row._id.substring(18)}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.tableNumber}
                          </TableCell>
                          <TableCell>{row.createdBy.name}</TableCell>
                          <TableCell>
                            {row.finishedBy
                              ? row.finishedBy.name
                              : "Não finalizado"}
                          </TableCell>
                          <TableCell>
                            {format(
                              new Date(row.orderedIn),
                              "dd/MM/yyyy HH:mm:ss"
                            )}
                          </TableCell>
                          <TableCell>
                            {row.finishedIn
                              ? format(
                                  new Date(row.finishedIn),
                                  "dd/MM/yyyy HH:mm:ss"
                                )
                              : "Não finalizado"}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              aria-label="finish"
                              disabled={row.status != "PREPARING"}
                              color="success"
                              onClick={async () => {
                                await finishCommand(row._id, "DONE");
                              }}
                            >
                              <TaskAltIcon />
                            </IconButton>
                            <IconButton
                              aria-label="cancel"
                              disabled={row.status != "PREPARING"}
                              color="error"
                              onClick={async () => {
                                await finishCommand(row._id, "CANCELED");
                              }}
                            >
                              <CancelIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                        <TableRow key={row._id + "-items"}>
                          <TableCell padding="none" align="center">
                            <Paper sx={{ mb: 2 }}>
                              {row.items.map(({ item, quantity }) => (
                                <Typography key={row._id + "-typography"} noWrap>
                                  {quantity} x {item.product.name}:{" "}
                                  {item.product.price.sale}R$
                                </Typography>
                              ))}
                            </Paper>
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={data ? data.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <>Sem Dados</>
        )}
      </Box>
    </>
  );
};

export { Commands };
