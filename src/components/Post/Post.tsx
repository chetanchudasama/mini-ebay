import React from "react";
import { Container, Grid } from "@mui/material";
import "./Post.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Post: React.FC = () => {
  return (
    <>
      <h1> Post View</h1>
      <Container maxWidth="lg" className="post-container">
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <div className="item-carousel">
              <Carousel width={300} showThumbs={false}>
                <div>
                  <img src="https://m.media-amazon.com/images/I/51+Uw6N7BnL._AC_SX466_.jpg" />
                  <p className="legend">Legend 1</p>
                </div>
                <div>
                  <img src="https://cdn.arstechnica.net/wp-content/uploads/2019/09/iPhone-11-Pro-and-11-Pro-Max-back-1-640x467.jpg" />
                  <p className="legend">Legend 2</p>
                </div>
                <div>
                  <img src="https://m.media-amazon.com/images/I/51+Uw6N7BnL._AC_SX466_.jpg" />
                  <p className="legend">Legend 3</p>
                </div>
              </Carousel>
            </div>
          </Grid>
          <Grid item xs={4} className="price-container">
            <div>
              <div className="price-detail">
                <h3>Price</h3>
                <b> $12.22</b>
                <p> Address here</p>
              </div>
              <div className="price-detail">
                <h3>Seller Detail</h3>
                <b> Chetan Chudasama</b>
                <p> 1231231123</p>
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
              <p> sdsd </p>
              <h3> Comments </h3>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Post;
