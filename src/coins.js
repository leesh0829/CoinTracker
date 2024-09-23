import { useEffect, useState } from "react";
//import coinData from "../../data/coins.json" with { type: "json" };
import { Link } from "react-router-dom";
import "./styles.css";

function Coins() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  let [recentCoins, setRecentCoins] = useState(
    JSON.parse(localStorage.getItem("recentCoin")) || [0, 0, 0, 0, 0]
  );

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  function findRecentCoin(coin) {
    let copyRecentCoins = [...recentCoins];
    copyRecentCoins.unshift(coins[coin]);
    copyRecentCoins.pop();
    setRecentCoins([copyRecentCoins]);
    recentCoins = copyRecentCoins;
    localStorage.setItem("recentCoin", JSON.stringify(recentCoins));
  }

  function removeRecent() {
    localStorage.removeItem("recentCoin");
    setRecentCoins([0, 0, 0, 0, 0]);
  }

  // useEffect(() => {
  //   setCoins(coinData);
  //   setLoading(false);
  // }, []);

  useEffect(() => {}, [recentCoins]);

  return (
    <div className="bg-yellow-100">
      <h1 className="text-3xl place-items-center grid justify-center">
        Recent
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-5">
        {recentCoins !== null &&
          recentCoins.map((item, idx) => (
            <div key={idx}>
              {item.id !== undefined ? (
                <h3
                  key={idx}
                  className="place-items-center grid justify-center bg-white rounded-xl mb-4 w-72 h-20 ml-5"
                >
                  <div>
                    <Link
                      to={`/coins/${item.id}`}
                      onClick={() => {
                        findRecentCoin(idx);
                      }}
                      className="text-xl bg-yellow-700 rounded-xl text-orange-300"
                    >
                      {item.id !== undefined
                        ? item.name.length > 20
                          ? `${item.name.slice(0, 20)}...`
                          : item.name
                        : ""}
                    </Link>
                    {item.id !== undefined ? ` (${item.symbol})` : ""}
                  </div>
                  {item.id !== undefined
                    ? `$${item.quotes ? item.quotes.USD.price : ""} USD`
                    : ""}
                </h3>
              ) : (
                <div />
              )}
            </div>
          ))}
      </div>
      <div className="justify-center grid place-items-center">
        <Link
          onClick={removeRecent}
          className="bg-yellow-700 rounded-full text-white w-36 h-8 grid place-items-center mb-5"
        >
          최근 기록 지우기
        </Link>
      </div>
      <hr className="text-black" />
      <h1 className="text-3xl place-items-center grid justify-center">
        The Coins {loading ? "" : `(${coins.length})`}
      </h1>
      {loading ? (
        <strong>Loading..</strong>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5">
          {coins.map((item, idx) => (
            <h3
              key={item.id}
              className="place-items-center grid justify-center bg-white rounded-xl mb-4 w-72 h-28 ml-5"
            >
              <div className="text-3xl">{idx + 1}</div>
              <div>
                <Link
                  to={`/coins/${item.id}`}
                  onClick={() => {
                    findRecentCoin(idx);
                  }}
                  className="text-xl bg-yellow-700 rounded-xl text-orange-300"
                >
                  {item.name.length > 20
                    ? `${item.name.slice(0, 20)}...`
                    : item.name}
                </Link>{" "}
                ({item.symbol})
              </div>
              ${item.quotes.USD.price} USD
            </h3>
          ))}
        </div>
      )}
    </div>
  );
}

export default Coins;
