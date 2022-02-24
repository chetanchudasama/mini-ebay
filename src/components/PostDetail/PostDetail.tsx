import React, { useEffect, useState } from "react";
import { Button, Container, Grid, TextField } from "@mui/material";
import "./PostDetail.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PostDetailModel from "../../models/PostDetailModel";
import { useParams } from "react-router-dom";
import { GetPostDetail } from "../../api/PostController";
import { AddNewComments } from "../../api/CommentController";

interface PostProps {
  item: PostDetailModel;
}

const Post: React.FC<PostProps> = ({ item }) => {
  const { id } = useParams<{ id: string }>();
  const [postDetail, setPostDetail] = useState<any>(null);
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    GetPostDetail(id)
      .then((res: any) => {
        if (res.data.result.data) {
          let postDetailTemp = { ...postDetail };
          postDetailTemp = res.data.result.data;
          postDetailTemp.fileSrc = res.data.result.data.images;
          setPostDetail(postDetailTemp);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCommentSubmit = () => {
    AddNewComments(comment)
      .then((res: any) => {
        console.log(res);
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
                <img src={postDetail.fileSrc} alt="" width="300" height="300" />
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
                  <p> {postDetail.mobile}</p>
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
                <h3> Comments </h3>
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
              </div>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Post;
