import "./App.css";
import MenuBar from "./components/MenuBar/MenuBar";
import SellItem from "./components/SellItem/SellItem";
import { Switch, Route } from "react-router-dom";
import ItemPostList from "./components/ItemPostList/ItemPostList";
import Post from "./components/Post/Post";

function App() {
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
}

export default App;
