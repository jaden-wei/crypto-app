import React from "react";
import { Link } from "react-router-dom";

const Coin = ({ input, coinData, currency }) => {
  let currencySymbol = "$";

  switch (currency) {
    case "eur":
      currencySymbol = '€'
      break;
    case 'gbp':
      currencySymbol = '£'
      break;
    case 'cad':
      currencySymbol = '$'
      break;
    case 'jpy':
      currencySymbol = '¥'
      break;
    default:
      break;
  }

  if (input.length === 0 || coinData.id.includes(input)) {
    return (
      <tr className="coin-table-row">
        <td>
          <img src={coinData.image} alt="logo" className="coin-logo" />
          <Link to={`/coinpage/${coinData.id}`}>{coinData.name}</Link>
          <span className="coin-symbol">{coinData.symbol}</span>
        </td>
        <td>
          {currencySymbol}
          {Math.round(coinData.current_price * 100) / 100}
        </td>
        <td
          className={
            coinData.price_change_percentage_24h > 0
              ? "positive-change"
              : "negative-change"
          }
        >
          {Math.round(coinData.price_change_percentage_24h * 100) / 100}%
        </td>
        <td>
        {currencySymbol}
          {Math.round(coinData.market_cap * 100) / 100}
        </td>
        <td>{coinData.total_volume}</td>
      </tr>
    );
  } else return null;
};

export default Coin;
