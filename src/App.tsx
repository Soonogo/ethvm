import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState({});
  useEffect(() => {
    setInterval(() => {
      fetch("https://api-v2.ethvm.dev/", {
        method: "POST", // or 'PUT'
        mode: "cors",
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin",
        body: JSON.stringify({
          operationName: "getAllTxs",
          query:
            "query getAllTxs($_limit: Int, $_nextKey: String) {\n  getAllEthTransfers(limit: $_limit, nextKey: $_nextKey) {\n    ...EthTransfers\n    __typename\n  }\n}\n\nfragment EthTransfers on ETHTransfers {\n  ...TxSummary\n  nextKey\n  __typename\n}\n\nfragment TxSummary on ETHTransfers {\n  transfers {\n    transfer {\n      ...Summary\n      __typename\n    }\n    value\n    __typename\n  }\n  __typename\n}\n\nfragment Summary on Transfer {\n  transactionHash\n  to\n  block\n  timestamp\n  from\n  txFee\n  status\n  __typename\n}",
          variables: { _limit: 10, _nextKey: null },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", setData(data));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, 1000);
  }, []);

  return (
    <div className="App">
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

export default App;
