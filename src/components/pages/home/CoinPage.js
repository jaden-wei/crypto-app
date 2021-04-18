import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js";
import { AiFillCaretLeft } from "react-icons/ai";

import "./CoinPage.css";
import { useHistory } from "react-router-dom";

const CoinPage = (props) => {
  let history = useHistory();

  const [coinData, setCoinData] = useState([]);
  const [coinInfo, setCoinInfo] = useState([]);
  const [interval, setInterval] = useState(10000);

  const id = props.match.params.id;

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval]);

  const getData = async () => {
    const data = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${interval}`
    );
    const info = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}
    `);

    setCoinData(data.data.prices);

    setCoinInfo(info.data);
  };

  const convertTime = (unix) => {
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
    if (interval === 1) {
      return `${((hour + 11) % 12) + 1}${hour < 12 ? "AM" : "PM"}`;
    }
    if (interval <= 30) return `${date} ${month}`;
    return `${month} ${year}`;
  };

  const simplify = (num) => {
    if (num === null) {
      return 0;
    }
    if (num > 1000000000000) {
      return (num / 1000000000000).toFixed(2) + "T";
    }
    if (num > 1000000000) {
      return (num / 1000000000).toFixed(2) + "B";
    }
    if (num > 1000000) {
      return (num / 1000000).toFixed(2) + "M";
    }
    if (num > 1000) {
      return (num / 1000).toFixed() + "K";
    }
    return num.toFixed(2);
  };

  const renderGraph = () => {
    let dates = [];
    let prices = [];

    for (let i = 0; i < coinData.length; i++) {
      dates.push(convertTime(coinData[i][0]));
      prices.push(Math.round(coinData[i][1] * 100) / 100);
    }

    const ctx = document.getElementById("chart");

    const data = {
      labels: dates,
      datasets: [
        {
          label: "Price",
          // backgroundColor:
          //   prices[prices.length - 1] - prices[0] > 0 ? "#a6de9b" : "#e8a9a7",
          borderColor:
            prices[prices.length - 1] - prices[0] > 0 ? "#36854b" : "#ba2613",
          borderWidth: 2,
          data: prices,
          fill: false,
        },
      ],
    };
    const options = {
      aspectRatio: window.screen.width < 1000 ? 0.5 : "",
      type: "LineWithLine",
      tooltips: {
        intersect: false,
      },
      elements: {
        point: {
          radius: 0,
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
              fontSize: Math.round(
                document.getElementById("chart").width / 150
              ),
              padding: 40,
              callback: function (value) {
                return "$ " + simplify(value);
              },
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              fontColor: "rgb(230,230,230)",
              fontSize: Math.round(
                document.getElementById("chart").width / 200
              ),
              padding: 50,
              maxRotation: 0,
              minRotation: 0,
              maxTicksLimit: window.screen.width < 1000 ? 5 : 11,
            },
          },
        ],
      },
      animation: {
        duration: 0,
      },
      responsiveAnimationDuration: 0,
    };

    if (window.myCharts !== undefined) window.myCharts.destroy();

    window.myCharts = new Chart(ctx, {
      type: "line",
      data: data,
      options: options,
    });
  };

  const renderTitle = () => {
    return (
      <div className="graph-title">
        <AiFillCaretLeft
          onClick={() => history.goBack()}
          className="back-btn"
        />
        {window.screen.width >= 1280 ? (
          <>
            <img src={coinInfo.image.small} alt="logo" />
            <h1 className="graph-title-name">{id}</h1>
          </>
        ) : (
          <>
            <img src={coinInfo.image.thumb} alt="logo" />
            <h1 className="graph-title-name">{id}</h1>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="chart-page-container">
      <div className="page-heading">
        {coinInfo.length !== 0 ? renderTitle() : null}
        <div className="interval-selector">
          <button
            onClick={() => setInterval(1)}
            className={interval === 1 ? "interval underline" : "interval"}
          >
            1d
          </button>
          <button
            onClick={() => setInterval(7)}
            className={interval === 7 ? "interval underline" : "interval"}
          >
            7d
          </button>
          <button
            onClick={() => setInterval(30)}
            className={interval === 30 ? "interval underline" : "interval"}
          >
            1m
          </button>
          <button
            onClick={() => setInterval(356)}
            className={interval === 356 ? "interval underline" : "interval"}
          >
            1y
          </button>
          <button
            onClick={() => setInterval(10000)}
            className={interval === 10000 ? "interval underline" : "interval"}
          >
            Max
          </button>
        </div>
      </div>
      <canvas id="chart"></canvas>

      {coinData.length !== 0 ? renderGraph() : null}
    </div>
  );
};

export default CoinPage;
