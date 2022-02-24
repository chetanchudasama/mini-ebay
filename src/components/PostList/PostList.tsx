import React, { useEffect, useState } from "react";
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
import RateReviewIcon from "@mui/icons-material/RateReview";
import { GetCategories, GetPostList } from "../../api/PostController";
import { useHistory } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

interface Column {
  id: "title" | "category" | "price" | "email" | "mobile" | "action";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  category?: any;
  action?: any;
}

const ItemPostList: React.FC = () => {
  const [postList, setPostList] = useState<any>([]);
  const [categoriesList, setCategoriesList] = useState<any>([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCategoryName = (id: string) => {
    return categoriesList.length > 0
      ? categoriesList.find((x: any) => x._id === id)?.item
      : "";
  };

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
      category: (id: string) => {
        return <p>{getCategoryName(id)}</p>;
      },
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
      id: "mobile",
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
            <Button
              onClick={() => {
                history.push(`/post-view/${id}`);
              }}
            >
              <RateReviewIcon
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

  useEffect(() => {
    setIsLoading(false);
    GetCategories()
      .then((res: any) => {
        if (res.data.result.data) {
          setCategoriesList(res.data.result.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(false);
    GetPostList()
      .then((res: any) => {
        if (res.data.result.data) {
          setPostList(res.data.result.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, []);

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
              {postList.map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {categoriesList.length > 0 &&
                      columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.action
                              ? column.action(row._id)
                              : column.category
                              ? column.category(row.category)
                              : value}
                          </TableCell>
                        );
                      })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {isLoading && <Spinner />}
      </Paper>
    </>
  );
};

export default ItemPostList;
