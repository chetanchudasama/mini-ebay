import React, { useEffect, useState } from "react";
import { Button, Container, Grid, TextField } from "@mui/material";
import "./PostDetail.css";
import PostDetailModel from "../../models/PostDetailModel";
import { useParams } from "react-router-dom";
import { GetCategories, GetPostDetail } from "../../api/PostController";
import { AddNewComments, GetComment } from "../../api/CommentController";
import { ICategory, IResponseObject } from "../../commons/interface";
import { getCategoryName } from "../../commons/Shared";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [postDetail, setPostDetail] = useState<PostDetailModel>(
    new PostDetailModel()
  );
  const [comment, setComment] = useState<string>("");
  const [isCommentText, setIsCommentText] = useState<boolean>(false);
  const [categoriesList, setCategoriesList] = useState<ICategory[]>([]);
  const [isShownSnackbar, setIsShownSnackbar] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>("");

  useEffect(() => {
    GetPostDetail(id)
      .then((res: IResponseObject) => {
        if (res.data.result.data) {
          setPostDetail(res.data.result.data);
        }
      })
      .catch((error) => {
        handleErrorMsg();
      });
    GetComment(id)
      .then((res: IResponseObject) => {
        if (res.data.result.data) {
          setComment(res.data.result.data.comment);
          setIsCommentText(true);
        }
      })
      .catch((error) => {
        handleErrorMsg();
      });
    GetCategories()
      .then((res: IResponseObject) => {
        if (res.data.result.data) {
          setCategoriesList(res.data.result.data);
        }
      })
      .catch((error) => {
        handleErrorMsg();
      });
    // eslint-disable-next-line
  }, []);

  const handleCommentSubmit = () => {
    AddNewComments({ postId: id, comment })
      .then((res: IResponseObject) => {
        if (res.data.result.data) {
          setIsShownSnackbar(true);
          setResponseMessage("Comment Added successfully");
        }
      })
      .catch((error) => {
        handleErrorMsg();
      });
  };

  const handleErrorMsg = () => {
    setIsShownSnackbar(true);
    setResponseMessage("Something went to wrong");
  };

  return (
    <>
      {postDetail && (
        <Container maxWidth="lg" className="post-container">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <div className="item-carousel">
                <img
                  src={postDetail.imageUrl}
                  alt=""
                  width="300"
                  height="300"
                />
              </div>
            </Grid>
            <Grid item xs={4} className="price-container">
              <div>
                <div className="price-detail">
                  <h3>Price</h3>
                  <b> ${postDetail.price}</b>
                </div>
                <div className="price-detail">
                  <h3>Seller Detail</h3>
                  <b> {postDetail.name}</b>
                  <p> {postDetail.mobileNumber}</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={8}>
              <div className="item-detail">
                <h3> Detail</h3>
                <div className="item-category">
                  <p>Category</p>
                  <p>{getCategoryName(categoriesList, postDetail.category)}</p>
                </div>
                <h3> Description</h3>
                <p> {postDetail.description} </p>
                <h3> {isCommentText ? "" : "Add "}Comment </h3>
                {isCommentText ? (
                  <p> {comment}</p>
                ) : (
                  <>
                    <TextField
                      id="description"
                      value={comment}
                      multiline
                      rows={4}
                      fullWidth
                      onChange={(event) => setComment(event.target.value)}
                    />
                    <div className="comment-submit-button">
                      <Button
                        variant="contained"
                        size="large"
                        onClick={handleCommentSubmit}
                      >
                        Add Comment
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Grid>
          </Grid>
          {isShownSnackbar && (
            <CustomSnackbar
              message={responseMessage}
              handleClose={setIsShownSnackbar}
            />
          )}
        </Container>
      )}
    </>
  );
};

export default Post;
