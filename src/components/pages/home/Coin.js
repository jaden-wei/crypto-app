import React from "react";
import { Link } from "react-router-dom";

const Coin = ({ input, coinData }) => {
  if (input.length === 0 || coinData.id.includes(input)) {
    return (
      <tr className="coin-table-row">
        <td>
          <img src={coinData.image} alt="logo" className="coin-logo" />
          <Link to={`/graph/${coinData.id}`}>
            {coinData.name}
          </Link>
          <span className="coin-symbol">{coinData.symbol}</span>
        </td>
        <td>${Math.round(coinData.current_price * 100) / 100}</td>
        <td
          className={
            coinData.price_change_percentage_24h > 0
              ? "positive-change"
              : "negative-change"
          }
        >
          {Math.round(coinData.price_change_percentage_24h * 100) / 100}%
        </td>
        <td>${Math.round(coinData.market_cap * 100) / 100}</td>
        <td>{coinData.total_volume}</td>
      </tr>
    );
  } else return null;
};

export default Coin;
