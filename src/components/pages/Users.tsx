import useSWR from "swr";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { paths } from "../../services/user.service";

const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, error, isLoading } = useSWR<
    { email: string; user: string; name: string }[]
  >([paths.getAllUsers()]);

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

  const headers = [{ key: "name" }, { key: "user" }, { key: "email" }];
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
                        {key}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .filter(({ name }) =>
                      searchFilter.value
                        ? name
                            .toLowerCase()
                            .includes(searchFilter.value.toLowerCase())
                        : true
                    )
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.user}</TableCell>
                        <TableCell>{row.email}</TableCell>
                      </TableRow>
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

export { Users };
