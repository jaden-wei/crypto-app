import React from "react";

const Coin = ({ index, coinData }) => {
  return (
    <tr className="coin-table-row">
      <td>
        <span>{coinData.name}</span>
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
};

export default Coin;
