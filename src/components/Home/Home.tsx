import React from "react";
import ItemPost from "../ItemPostList/ItemPostList";
import MenuBar from "../MenuBar/MenuBar";
import SellItem from "../SellItem/SellItem";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <>
      <MenuBar />
      <div className="container">
        {/* <h1>POST YOUR AD</h1> */}
        <h1>Post List</h1>
      </div>
      {/* <SellItem /> */}
      <ItemPost />
    </>
  );
};

export default Home;
