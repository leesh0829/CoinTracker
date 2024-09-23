/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "react-router";
//import coinData from "../../data/coins.json" with { type: "json" };
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import "./styles.css";

function Details() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const { id } = useParams();
  let coinIndex;

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-yellow-100 justify-center min-h-screen items-center grid">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="bg-white rounded-xl">
          {coins.map((coin) => {
            if (coin.id === id)
              coinIndex = coins.findIndex((o) => o.name === coin.name);
          })}
          <Link
            to="/coins"
            className="bg-yellow-700 rounded-full text-white w-36 h-8 grid place-items-center mb-5"
          >
            뒤로 가기
          </Link>
          <h1 className="text-3xl mb-5">{coins[coinIndex].name}`s Detail</h1>
          <hr />
          <div className="grid place-items-center justify-center">
            <h3 className="mt-5">Name (이름): {coins[coinIndex].name}</h3>
            <h3>symbol (약자): {coins[coinIndex].symbol}</h3>
            <h3>rank (순위): {coins[coinIndex].rank}#</h3>
            <h3>total supply (총 공급량): {coins[coinIndex].total_supply}</h3>
            <h3>max supply (최대 공급량): {coins[coinIndex].max_supply}</h3>
            <h3>beta value (변동성): {coins[coinIndex].beta_value}%</h3>
            <h3>price (금액): {coins[coinIndex].quotes.USD.price}$</h3>
            <h3>
              volume 24h (24시간 동안 거래량):{" "}
              {coins[coinIndex].quotes.USD.volume_24h}$
            </h3>
            <h3>
              volume 24h chagne (24시간 동안 바뀐 거래량):{" "}
              {coins[coinIndex].quotes.USD.volume_24h_change_24h}
            </h3>
            <h3>
              market cap (시가총액): {coins[coinIndex].quotes.USD.market_cap}$
            </h3>
            <h3>
              market cap change (시가총액 변화량):{" "}
              {coins[coinIndex].quotes.USD.market_cap_change_24h}%
            </h3>
            <h3>
              percent change 15m (15분 변화율):{" "}
              {coins[coinIndex].quotes.USD.percent_change_15m}%
            </h3>
            <h3>
              percent change 30m (30분 변화율):{" "}
              {coins[coinIndex].quotes.USD.percent_change_30m}%
            </h3>
            <h3>
              percent change 1h (1시간 변화율):{" "}
              {coins[coinIndex].quotes.USD.percent_change_1h}%
            </h3>
            <h3>
              percent change 6h (6시간 변화율):{" "}
              {coins[coinIndex].quotes.USD.percent_change_6h}%
            </h3>
            <h3>
              percent change 12h (12시간 변화율):{" "}
              {coins[coinIndex].quotes.USD.percent_change_12h}%
            </h3>
            <h3>
              percent change 24h (24시간 변화율):{" "}
              {coins[coinIndex].quotes.USD.percent_change_24h}%
            </h3>
            <h3>
              percent change 7d (7일 변화율):{" "}
              {coins[coinIndex].quotes.USD.percent_change_7d}%
            </h3>
            <h3>
              percent change 30d (30일 변화율):{" "}
              {coins[coinIndex].quotes.USD.percent_change_30d}%
            </h3>
            <h3>
              percent change 1y (1년 변화율):{" "}
              {coins[coinIndex].quotes.USD.percent_change_1y}%
            </h3>
            <h3>
              ath price (역대 최고 가격):{" "}
              {coins[coinIndex].quotes.USD.ath_price}$
            </h3>
            <h3>
              percent from price ath (역대 최고 가격 변화율):{" "}
              {coins[coinIndex].quotes.USD.percent_from_price_ath}%
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
