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
import PostDetailModel from "../../models/PostDetailModel";
import { ICategory, IResponseObject } from "../../commons/interface";
import { getCategoryName } from "../../commons/Shared";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";

interface Column {
  id: "title" | "category" | "price" | "email" | "mobileNumber" | "action";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  category?: any;
  action?: any;
}

const ItemPostList: React.FC = () => {
  const [postList, setPostList] = useState<PostDetailModel[]>([]);
  const [categoriesList, setCategoriesList] = useState<ICategory[]>([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShownSnackbar, setIsShownSnackbar] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>("");

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
        return <p>{getCategoryName(categoriesList, id)}</p>;
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
      .then((res: IResponseObject) => {
        if (res.data.result.data) {
          setCategoriesList(res.data.result.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        handleErrorMsg();
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    GetPostList()
      .then((res: IResponseObject) => {
        if (res.data.result.data) {
          const postList = res.data.result.data.filter(
            (post: PostDetailModel) => post.isPublic
          );
          setPostList(postList);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        handleErrorMsg();
      });
  }, []);

  const handleErrorMsg = () => {
    setIsShownSnackbar(true);
    setResponseMessage("Something went to wrong");
  };

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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
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
        {isShownSnackbar && (
          <CustomSnackbar
            message={responseMessage}
            handleClose={setIsShownSnackbar}
          />
        )}
      </Paper>
    </>
  );
};

export default ItemPostList;
