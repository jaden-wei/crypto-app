import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import "./App.css";

import Home from "./components/pages/Home";
import List from "./components/pages/home/List";
import CoinPage from "./components/pages/home/CoinPage";

function App() {
  useEffect(() => {
    Aos.init({ duration: 1500 });
    Aos.refresh();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/list" component={List} />
          <Route path="/coinpage/:id" component={CoinPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
