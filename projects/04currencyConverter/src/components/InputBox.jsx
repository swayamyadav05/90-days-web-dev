import React, { useId } from "react";

const InputBox = ({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  disabled = false,
  className = "",
}) => {
  const amoutInputId = useId();

  return (
    <div
      className={`bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl text-sm flex hover:bg-white/15 transition-all duration-200 ${className}`}>
      <div className="w-1/2">
        <label
          htmlFor={amoutInputId}
          className="text-white/80 mb-2 inline-block font-medium text-xs uppercase tracking-wide">
          {label}
        </label>
        <input
          id={amoutInputId}
          className="outline-none w-full bg-transparent py-2 text-white placeholder-white/50 text-lg font-semibold focus:text-white transition-colors"
          type="number"
          disabled={amountDisable || disabled}
          value={amount === 0 ? "" : amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>

      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-white/80 mb-2 w-full font-medium text-xs uppercase tracking-wide">
          Currency
        </p>
        <select
          className="rounded-lg px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 cursor-pointer outline-none text-white font-semibold hover:bg-white/25 focus:bg-white/30 transition-all duration-200"
          value={selectCurrency}
          onChange={(e) =>
            onCurrencyChange && onCurrencyChange(e.target.value)
          }
          disabled={currencyDisable || disabled}>
          {currencyOptions.map((currency) => (
            <option
              key={currency}
              value={currency}
              className="bg-gray-800 text-white">
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InputBox;
