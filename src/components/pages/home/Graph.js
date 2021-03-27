import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import Chart from "chart.js";

import "./Graph.css";

const Graph = () => {
  const [coinData, setCoinData] = useState([]);
  const [coinInfo, setCoinInfo] = useState([]);

  const location = useLocation();
  const parts = location.pathname.split("/");
  const id = parts[parts.length - 1];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`
    );
    const info = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false
    `);

    await setCoinInfo(info.data);

    await setCoinData(data.data.prices);
    console.log(coinInfo);
  };

  const renderGraph = () => {
    let dates = [];
    let prices = [];

    for (var i = 0; i < coinData.length; i++) {
      dates.push(i);
      prices.push(coinData[i][1]);
    }

    const ctx1 = document.getElementById("chart");

    const data = {
      labels: dates,
      datasets: [
        {
          label: "Price",
          data: prices,
          fill: false,
          borderColor: "rgb(153, 153, 153)",
        },
      ],
    };
    const options = {
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
            },
          },
        ],
      },
    };

    new Chart(ctx1, {
      type: "line",
      data: data,
      options: options,
    });
  };

  const renderTitle = () => {
    return (
      <div className="graph-title">
        <img src={coinInfo.image.thumb} alt="logo" className="coin-logo" />
        <span>{id}</span>
      </div>
    );
  };

  return (
    <div className="graph-container">
      {coinInfo.length > 1 ? renderTitle() : null}
      <canvas id="chart" />
      {coinData.length > 0 ? renderGraph() : null}
    </div>
  );
};

export default Graph;
