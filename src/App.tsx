import "./App.css";
import MenuBar from "./components/MenuBar/MenuBar";
import SellItem from "./components/AddPost/AddPost";
import { Switch, Route } from "react-router-dom";
import ItemPostList from "./components/PostList/PostList";
import Post from "./components/PostDetail/PostDetail";

const App = () => {
  return (
    <div>
      <MenuBar />
      <div className="App">
        <Switch>
          <Route exact path="/" component={ItemPostList} />
          <Route exact path="/add-post" component={SellItem} />
          <Route exact path="/post-view/:id" component={Post} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
