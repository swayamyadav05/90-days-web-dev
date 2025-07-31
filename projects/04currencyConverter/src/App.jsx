import { useEffect, useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

const App = () => {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("npr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [lastEdited, setLastEdited] = useState("from");

  // Get currency data for both directions to enable instant swap
  const fromCurrencyInfo = useCurrencyInfo(from);

  // Extract options and data
  const options = fromCurrencyInfo.data
    ? Object.keys(fromCurrencyInfo.data)
    : [];
  const currencyInfo = fromCurrencyInfo.data;
  const loading = fromCurrencyInfo.loading;
  const error = fromCurrencyInfo.error;
  const lastUpdated = fromCurrencyInfo.lastUpdated;
  const isDataFresh = fromCurrencyInfo.isDataFresh;

  // Enhanced swap function - instant calculation without API refetch
  const handleSwap = () => {
    if (!currencyInfo || !currencyInfo[to]) return;

    // Calculate the reverse rate instantly
    const currentRate = currencyInfo[to]; // 1 USD = X EUR
    const reverseRate = 1 / currentRate; // 1 EUR = Y USD

    // Swap currencies
    setFrom(to);
    setTo(from);

    // Swap amounts with proper conversion
    if (lastEdited === "from") {
      // User was editing "from", so keep "to" amount, calculate new "from"
      const newFromAmount = convertedAmount * reverseRate;
      setAmount(Math.round(newFromAmount * 100) / 100);
      setConvertedAmount(amount);
    } else {
      // User was editing "to", so keep "from" amount, calculate new "to"
      const newToAmount = amount * reverseRate;
      setConvertedAmount(Math.round(newToAmount * 100) / 100);
      setAmount(convertedAmount);
    }

    // Switch the last edited state
    setLastEdited(lastEdited === "from" ? "to" : "from");
  };

  // Handle when user types in "From" amount
  const handleFromAmountChange = (value) => {
    setAmount(value);
    setLastEdited("from");
  };

  // Handle when user types in "To" amount
  const handleToAmountChange = (value) => {
    setConvertedAmount(value);
    setLastEdited("to");
  };

  // Auto-conversion with bidirectional logic
  useEffect(() => {
    if (!currencyInfo || !currencyInfo[to]) return;

    if (lastEdited === "from") {
      // Convert from → to (round to 2 decimal places)
      const result = amount * currencyInfo[to];
      setConvertedAmount(Math.round(result * 100) / 100);
    } else if (lastEdited === "to") {
      // Reverse convert to → from (round to 2 decimal places)
      const rate = currencyInfo[to];
      if (rate !== 0) {
        const result = convertedAmount / rate;
        setAmount(Math.round(result * 100) / 100);
      }
    }
  }, [amount, convertedAmount, from, to, currencyInfo, lastEdited]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-md mx-auto pt-12">
        {/* Header */}
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
          <h1 className="text-3xl font-bold text-white mb-2">
            Currency Converter
          </h1>
          <p className="text-gray-300">
            Convert between world currencies instantly
          </p>
        </div>
        {/* Status Indicator - Only show when actually needed */}
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

        {/* Converter Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 backdrop-blur-sm border border-white/20">
          {/* From Currency */}
          <InputBox
            label="From"
            amount={amount}
            onAmountChange={handleFromAmountChange}
            onCurrencyChange={setFrom}
            currencyOptions={options}
            selectCurrency={from}
          />

          {/* Swap Button */}
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

          {/* To Currency */}
          <InputBox
            label="To"
            amount={convertedAmount}
            onAmountChange={handleToAmountChange}
            onCurrencyChange={setTo}
            currencyOptions={options}
            selectCurrency={to}
          />

          {/* Exchange Rate Info */}
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

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Real-time exchange rates for accurate conversions
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
