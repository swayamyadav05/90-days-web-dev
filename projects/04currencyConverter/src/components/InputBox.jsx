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
    <div className={`mb-6 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label}
      </label>
      <div className="flex gap-3">
        <div className="flex-1">
          <select
            value={selectCurrency}
            onChange={(e) =>
              onCurrencyChange && onCurrencyChange(e.target.value)
            }
            disabled={currencyDisable || disabled}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 font-medium">
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <input
            id={amoutInputId}
            type="number"
            value={amount === 0 ? "" : amount}
            onChange={(e) =>
              onAmountChange &&
              onAmountChange(Number(e.target.value) || 0)
            }
            disabled={amountDisable || disabled}
            placeholder="0.00"
            step="0.01"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg font-semibold text-gray-800"
          />
        </div>
      </div>
    </div>
  );
};

export default InputBox;
