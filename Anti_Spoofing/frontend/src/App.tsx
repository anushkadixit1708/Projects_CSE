import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Access from "./views/Access";
import Home from "./views/Home";
import Update from "./views/Update";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/access" component={Access} />
        <Route exact path="/update" component={Update} />
      </Switch>
    </Router>
  );
};

export default App;
