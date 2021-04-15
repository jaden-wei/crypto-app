import React from "react";
import { Link } from "react-router-dom";
import Typical from "react-typical";

import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="home-middle-container">
        <h1 className="home-title">Cryptocurrency</h1>
        <p className="home-description">
          <Typical
            loop={Infinity}
            steps={[
              "a digital currency in which transactions are verified and records maintained by a decentralized system using cryptography, rather than by a centralized authority",
              1000,
            ]}
          />
        </p>
        <Link to="/list" className="learn-more-btn glow-on-hover">
          Learn more
        </Link>
      </div>
    </div>
  );
}

export default Home;
