import React from "react";
import { Link } from "react-router-dom";

const Coin = ({ input, coinData, currency, time }) => {
  let currencySymbol = "$";

  switch (currency) {
    case "eur":
      currencySymbol = "€";
      break;
    case "gbp":
      currencySymbol = "£";
      break;
    case "cad":
      currencySymbol = "$";
      break;
    case "jpy":
      currencySymbol = "¥";
      break;
    default:
      break;
  }

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
    return num.toFixed(2);
  };

  const getPercentChange = () => {
    console.log(time);
    switch (time) {
      case "1h":
        return coinData.price_change_percentage_1h_in_currency;
      case "24h":
        return coinData.price_change_percentage_24h;
      case "7d":
        return coinData.price_change_percentage_7d_in_currency;
      case "30d":
        return coinData.price_change_percentage_30d_in_currency;
      case "1y":
        return coinData.price_change_percentage_1y_in_currency;
      default:
        return "0";
    }
  };

  if (input.length === 0 || coinData.id.includes(input)) {
    if (window.screen.width > 1280)
      return (
        <tr className="coin-table-row" data-aos="fade-up">
          <td>
            <img src={coinData.image} alt="logo" className="coin-logo" />
            <Link to={`/coinpage/${coinData.id}`}>{coinData.name}</Link>
            <span className="coin-symbol"> {coinData.symbol}</span>
          </td>
          <td className="text-align-end">
            {currencySymbol}
            {simplify(coinData.current_price)}
          </td>
          <td
            className={`text-align-end
              ${
                getPercentChange() >= 0 ? "positive-change" : "negative-change"
              }`}
          >
            {simplify(getPercentChange())}%
          </td>
          <td className="text-align-end">
            {currencySymbol}
            {simplify(coinData.market_cap)}
          </td>
          <td className="text-align-end">${simplify(coinData.total_volume)}</td>
        </tr>
      );
    else
      return (
        <tr className="coin-table-row">
          <td>
            <img src={coinData.image} alt="logo" className="coin-logo" />
            <Link to={`/coinpage/${coinData.id}`}>
              {coinData.symbol.toUpperCase()}
            </Link>
          </td>
          <td>
            {currencySymbol}
            {simplify(coinData.current_price)}
          </td>
          <td
            className={
              coinData.price_change_percentage_24h >= 0
                ? "positive-change"
                : "negative-change"
            }
          >
            {simplify(coinData.price_change_percentage_24h)}%
          </td>
        </tr>
      );
  } else return null;
};

export default Coin;
