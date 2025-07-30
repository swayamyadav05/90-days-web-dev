import { useEffect, useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

const App = () => {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("npr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [lastEdited, setLastEdited] = useState("from");

  const fromCurrencyInfo = useCurrencyInfo(from);

  const options = fromCurrencyInfo.data
    ? Object.keys(fromCurrencyInfo.data)
    : [];
  const currencyInfo = fromCurrencyInfo.data;
  const loading = fromCurrencyInfo.loading;
  const error = fromCurrencyInfo.error;
  const lastUpdated = fromCurrencyInfo.lastUpdated;
  const isDataFresh = fromCurrencyInfo.isDataFresh;

  const handleSwap = () => {
    if (!currencyInfo || !currencyInfo[to]) return;

    const currentRate = currencyInfo[to];
    const reverseRate = 1 / currentRate;

    setFrom(to);
    setTo(from);

    if (lastEdited === "from") {
      const newFromAmount = convertedAmount * reverseRate;
      setAmount(Math.round(newFromAmount * 100) / 100);
      setConvertedAmount(amount);
    } else {
      const newToAmount = amount * reverseRate;
      setConvertedAmount(Math.round(newToAmount * 100) / 100);
      setAmount(convertedAmount);
    }

    setLastEdited(lastEdited === "from" ? "to" : "from");
  };

  const handleFromAmountChange = (value) => {
    setAmount(value);
    setLastEdited("from");
  };

  const handleToAmountChange = (value) => {
    setConvertedAmount(value);
    setLastEdited("to");
  };

  useEffect(() => {
    if (!currencyInfo || !currencyInfo[to]) return;

    if (lastEdited === "from") {
      const result = amount * currencyInfo[to];
      setConvertedAmount(Math.round(result * 100) / 100);
    } else if (lastEdited === "to") {
      const rate = currencyInfo[to];
      if (rate !== 0) {
        const result = convertedAmount / rate;
        setAmount(Math.round(result * 100) / 100);
      }
    }
  }, [amount, convertedAmount, from, to, currencyInfo, lastEdited]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto pt-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Currency Converter
          </h1>
          <p className="text-gray-600">
            Convert between world currencies instantly
          </p>
        </div>
        {error && (
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 text-red-700 text-sm">
              <span>⚠️</span>
              {error} - Using cached rates
            </div>
          </div>
        )}
        {!loading && !error && lastUpdated && (
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs">
              <span>✅</span>
              Rates updated {isDataFresh ? "just now" : "recently"}
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl p-6 backdrop-blur-sm border border-white/20">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              From
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 font-medium">
                  {options.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  value={amount === 0 ? "" : amount}
                  onChange={(e) =>
                    handleFromAmountChange(
                      Number(e.target.value) || 0
                    )
                  }
                  placeholder="0.00"
                  step="0.01"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg font-semibold text-gray-800"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <button
              onClick={handleSwap}
              className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              To
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-800 font-medium">
                  {options.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  value={convertedAmount === 0 ? "" : convertedAmount}
                  onChange={(e) =>
                    handleToAmountChange(Number(e.target.value) || 0)
                  }
                  placeholder="0.00"
                  step="0.01"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg font-semibold text-gray-800"
                />
              </div>
            </div>
          </div>

          {currencyInfo && currencyInfo[to] && !loading && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">
                  Exchange Rate
                </p>
                <p className="text-lg font-bold text-gray-800">
                  1 {from.toUpperCase()} ={" "}
                  {currencyInfo[to].toFixed(4)} {to.toUpperCase()}
                </p>
                {lastUpdated && (
                  <p className="text-xs text-gray-500 mt-1">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Real-time exchange rates for accurate conversions
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
