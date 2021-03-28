import React, { useEffect, useState } from "react";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";

import Coin from "./Coin";

import "./List.css";
import Search from "./Search";

const List = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [input, setInput] = useState("");
  const [currency, setCurrency] = useState('usd');

  useEffect(() => {
    updateData();
  }, [currency]);

  const updateData = async () => {
    const data = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
    );

    setCryptoData(data.data);
  };

  const renderCoinData = () => {
    return cryptoData.map((coin, index) => {
      return <Coin input={input} key={index} coinData={cryptoData[index]} currency={currency} />;
    });
  };

  return (
    <div className="coin-list">
      <div className="coin-list-options">
        <ReactBootStrap.DropdownButton
          id="dropdown-basic-button"
          title={currency.toUpperCase()}
        >
          <ReactBootStrap.Dropdown.Item onClick={() => {setCurrency('usd')}}>
            USD (default)
          </ReactBootStrap.Dropdown.Item>
          <ReactBootStrap.Dropdown.Item onClick={() => {setCurrency('eur')}}>
            EUR
          </ReactBootStrap.Dropdown.Item>
          <ReactBootStrap.Dropdown.Item onClick={() => {setCurrency('gbp')}}>
            GBP
          </ReactBootStrap.Dropdown.Item>
          <ReactBootStrap.Dropdown.Item onClick={() => {setCurrency('cad')}}>
            CAD
          </ReactBootStrap.Dropdown.Item>
          <ReactBootStrap.Dropdown.Item onClick={() => {setCurrency('jpy')}}>
            JPY
          </ReactBootStrap.Dropdown.Item>
        </ReactBootStrap.DropdownButton>

        <Search input={input} setInput={setInput} />
      </div>
      <ReactBootStrap.Table variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>24h %</th>
            <th>Market Cap</th>
            <th>Total supply</th>
          </tr>
        </thead>
        {cryptoData.length > 0 ? <tbody>{renderCoinData()}</tbody> : null}
      </ReactBootStrap.Table>
    </div>
  );
};

export default List;
