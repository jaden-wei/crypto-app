import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/pages/Home";
import News from "./components/pages/News";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";


function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/news" component={News}/>
                    <Route path="/about" component={About}/>
                    <Route path="/contact" component={Contact}/>
                </Switch>
            </Router>
            {/* <List /> */}
        </div>
    );
}

export default App;
