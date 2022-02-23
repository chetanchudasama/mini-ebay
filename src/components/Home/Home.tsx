import React from "react";
import MenuBar from "../MenuBar/MenuBar";
import SellItem from "../SellItem/SellItem";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <>
      <MenuBar />
      <div className="container">
        <h1>POST YOUR AD</h1>
      </div>
      <SellItem />
    </>
  );
};

export default Home;
