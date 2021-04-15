import React, { useEffect, useState } from "react";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";

import Row from "./Row";

import "./List.css";
import Search from "./Search";

const List = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [input, setInput] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [timeFrame, setTimeFrame] = useState("24h");

  useEffect(() => {
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const updateData = async () => {
    const data = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h,24h,7d,30d,1y`
    );

    setCryptoData(data.data);
  };

  const renderCoinData = () => {
    return cryptoData.map((coin, index) => {
      return (
        <Row
          input={input}
          key={index}
          coinData={cryptoData[index]}
          currency={currency}
          time={timeFrame}
        />
      );
    });
  };

  return (
    <div className="coin-list">
      <div className="coin-list-options" data-aos="fade-right">
        <div className="filters">
          <p className="options-header">Top Cryptocurrencies Today</p>
          <ReactBootStrap.DropdownButton
            id="dropdown-basic-button"
            title={currency.toUpperCase()}
          >
            <ReactBootStrap.Dropdown.Item
              onClick={() => {
                setCurrency("usd");
              }}
            >
              USD (default)
            </ReactBootStrap.Dropdown.Item>
            <ReactBootStrap.Dropdown.Item
              onClick={() => {
                setCurrency("eur");
              }}
            >
              EUR
            </ReactBootStrap.Dropdown.Item>
            <ReactBootStrap.Dropdown.Item
              onClick={() => {
                setCurrency("gbp");
              }}
            >
              GBP
            </ReactBootStrap.Dropdown.Item>
            <ReactBootStrap.Dropdown.Item
              onClick={() => {
                setCurrency("cad");
              }}
            >
              CAD
            </ReactBootStrap.Dropdown.Item>
            <ReactBootStrap.Dropdown.Item
              onClick={() => {
                setCurrency("jpy");
              }}
            >
              JPY
            </ReactBootStrap.Dropdown.Item>
          </ReactBootStrap.DropdownButton>
          <ReactBootStrap.DropdownButton
            id="dropdown-basic-button"
            title={timeFrame.toUpperCase()}
          >
            <ReactBootStrap.Dropdown.Item
              onClick={() => {
                setTimeFrame("1h");
              }}
            >
              1H
            </ReactBootStrap.Dropdown.Item>
            <ReactBootStrap.Dropdown.Item
              onClick={() => {
                setTimeFrame("24h");
              }}
            >
              24H
            </ReactBootStrap.Dropdown.Item>
            <ReactBootStrap.Dropdown.Item
              onClick={() => {
                setTimeFrame("7d");
              }}
            >
              7D
            </ReactBootStrap.Dropdown.Item>
            <ReactBootStrap.Dropdown.Item
              onClick={() => {
                setTimeFrame("30d");
              }}
            >
              30D
            </ReactBootStrap.Dropdown.Item>
            <ReactBootStrap.Dropdown.Item
              onClick={() => {
                setTimeFrame("1y");
              }}
            >
              1Y
            </ReactBootStrap.Dropdown.Item>
          </ReactBootStrap.DropdownButton>
        </div>
        <Search input={input} setInput={setInput} />
      </div>
      <ReactBootStrap.Table borderless={true}>
        <thead data-aos="fade-up">
          <tr>
            <th>Cryptocurreny</th>
            <th className="text-align-end">Price</th>
            <th className="text-align-end">{timeFrame}%</th>
            {window.screen.width >= 1280 ? (
              <th className="text-align-end">Market Cap</th>
            ) : null}
            {window.screen.width >= 1280 ? (
              <th className="text-align-end">Volume</th>
            ) : null}
          </tr>
        </thead>
        {cryptoData.length > 0 ? <tbody>{renderCoinData()}</tbody> : null}
      </ReactBootStrap.Table>
    </div>
  );
};

export default List;
