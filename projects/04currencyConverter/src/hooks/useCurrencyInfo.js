import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    setError(null); // Clear previous errors

    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        setData(res[currency] || {});
        setLastUpdated(new Date());
        setError(null);
      })
      .catch((error) => {
        console.error("Fetch Failed", error);
        setError(error.message);
        // Don't clear existing data on error - progressive enhancement!
      })
      .finally(() => setLoading(false));
  }, [currency]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    // Helper to check if data is fresh (less than 5 minutes old)
    isDataFresh:
      lastUpdated && new Date() - lastUpdated < 5 * 60 * 1000,
  };
}

export default useCurrencyInfo;
