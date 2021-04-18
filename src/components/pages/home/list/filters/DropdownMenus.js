import React from "react";
import * as ReactBootStrap from "react-bootstrap";

import "./Dropdown.css";

function DropdownMenus({ currency, timeFrame, setCurrency, setTimeFrame }) {
  return (
    <>
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
    </>
  );
}

export default DropdownMenus;
