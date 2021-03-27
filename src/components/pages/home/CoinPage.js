import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import Chart from "chart.js";

import "./CoinPage.css";

const CoinPage = () => {
  const [coinData, setCoinData] = useState([]);
  const [coinInfo, setCoinInfo] = useState([]);
  const [interval, setInterval] = useState(100000);

  const location = useLocation();
  const parts = location.pathname.split("/");
  const id = parts[parts.length - 1];

  useEffect(() => {
    getData();
  }, [interval]);

  const getData = async () => {
    const data = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${interval}`
    );
    const info = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false
    `);

    await setCoinData(data.data.prices);

    await setCoinInfo(info.data);
  };

  function convertTime(unix) {
    const a = new Date(unix);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  }

  const renderGraph = () => {
    let dates = [];
    let prices = [];

    for (let i = 0; i < coinData.length; i++) {
      dates.push(convertTime(coinData[i][0]));
      prices.push(Math.round(coinData[i][1] * 100) / 100);
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
      animation: {
        duration: 0,
      },
      hover: {
        animationDuration: 0,
      },
      responsiveAnimationDuration: 0,
      elements: {
        point: {
          radius: 2,
        },
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "rgb(230,230,230)",
              fontSize: 18,
              beginAtZero: false,
              callback: function (value, index, values) {
                return "$" + value;
              },
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              fontColor: "rgb(230,230,230)",
              fontSize: 18,
              autoSkip: true,
              maxTicksLimit: 5,
              beginAtZero: false
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
        <img src={coinInfo.image.small} alt="logo" />
        <span className="graph-title-name">{id}</span>
      </div>
    );
  };

  return (
    <div className="graph-container">
      <div className="graph-heading">
        {coinInfo.length !== 0 ? renderTitle() : null}
        <div className="interval-selector">
          <button onClick={() => setInterval(1)} className="interval">
            1d
          </button>
          <button onClick={() => setInterval(7)} className="interval">
            7d
          </button>
          <button onClick={() => setInterval(30)} className="interval">
            1m
          </button>
          <button onClick={() => setInterval(356)} className="interval">
            1y
          </button>
          <button onClick={() => setInterval(100000)} className="interval">
            Max
          </button>
        </div>
      </div>
      <canvas id="chart" />
      {coinData.length !== 0 ? renderGraph() : null}
    </div>
  );
};

export default CoinPage;
