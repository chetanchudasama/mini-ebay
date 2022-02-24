import React, { useEffect, useState } from "react";
import { Button, Container, Grid, TextField } from "@mui/material";
import "./PostDetail.css";
import PostDetailModel from "../../models/PostDetailModel";
import { useParams } from "react-router-dom";
import { GetPostDetail } from "../../api/PostController";
import { AddNewComments, GetComment } from "../../api/CommentController";
import { IResponseObject } from "../../commons/interface";

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [postDetail, setPostDetail] = useState<PostDetailModel>(
    new PostDetailModel()
  );
  const [comment, setComment] = useState<string>("");
  const [isCommentText, setIsCommentText] = useState<boolean>(false);

  useEffect(() => {
    GetPostDetail(id)
      .then((res: IResponseObject) => {
        if (res.data.result.data) {
          setPostDetail(res.data.result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    GetComment(id)
      .then((res: IResponseObject) => {
        if (res.data.result.data) {
          setComment(res.data.result.data.comment);
          setIsCommentText(true);
        }
      })
      .catch((error) => {});
  }, []);

  const handleCommentSubmit = () => {
    AddNewComments({ postId: id, comment })
      .then((res: any) => {
        if (res.data.result.data) {
          setIsCommentText(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
                  <p>Mobile</p>
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
        </Container>
      )}
    </>
  );
};

export default Post;
