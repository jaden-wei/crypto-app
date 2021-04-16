import React, { useEffect, useState } from "react";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";

import Row from "./Row";

import "./List.css";
import Search from "./filters/Search";
import DropdownMenus from "./filters/DropdownMenus";

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
    let data;
    try {
      data = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h,24h,7d,30d,1y`
      );
    } catch (err) {
      console.error(err);
    }
    setCryptoData(data.data);
  };

  const renderCoinData = () => {
    return cryptoData.map((coin, index) => {
      return (
        <Row
          input={input}
          index={index}
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
          <DropdownMenus
            currency={currency}
            timeFrame={timeFrame}
            setCurrency={setCurrency}
            setTimeFrame={setTimeFrame}
          />
        </div>
        <Search input={input} setInput={setInput} />
      </div>
      <ReactBootStrap.Table borderless={true}>
        <thead data-aos="fade-up">
          <tr>
            <th>#</th>
            <th>Cryptocurreny</th>
            <th className={window.screen.width >= 1280 ? "text-align-end" : ""}>
              Price
            </th>
            <th className={window.screen.width >= 1280 ? "text-align-end" : ""}>
              {timeFrame}%
            </th>
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
