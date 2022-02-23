import React from "react";
import { EditNotifications } from "@mui/icons-material";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface Column {
  id: "title" | "category" | "price" | "email" | "mobileNumber" | "action";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  action?: any;
}

const ItemPostList: React.FC = () => {
  const onEditRow = (id: string) => {};

  const columns: Column[] = [
    {
      id: "title",
      label: "Title",
      minWidth: 200,
    },
    {
      id: "category",
      label: "Category",
      minWidth: 100,
      align: "center",
    },
    {
      id: "price",
      label: "Price",
      minWidth: 100,
      align: "center",
    },
    {
      id: "email",
      label: "Email",
      minWidth: 150,
      align: "center",
    },
    {
      id: "mobileNumber",
      label: "Mobile Number",
      minWidth: 150,
      align: "center",
    },
    {
      id: "action",
      label: "",
      minWidth: 100,
      align: "right",
      action: (id: string) => {
        return (
          <>
            <Button onClick={() => onEditRow(id)}>
              <EditNotifications
                color="primary"
                style={{
                  fontSize: 28,
                }}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const postRecord = [
    {
      id: 1,
      title: "Iphone 11",
      category: "Mobile",
      price: "33122",
      email: "chetanit2013@gmail.com",
      mobileNumber: "9712122233",
      action: "asd",
    },
    {
      id: 2,
      title: "Iphone 12",
      category: "Mobile",
      price: "43122",
      email: "chetanit2013@gmail.com",
      mobileNumber: "9812122233",
      action: "asd",
    },
  ];

  return (
    <>
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {postRecord.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.action ? column.action(row.id, row) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default ItemPostList;
