import { useEffect, useState } from "react";

/**
 * React hook to fetch and manage currency exchange data for a specified currency code.
 *
 * Initiates a fetch request to a public currency API whenever the provided currency code changes. Returns the latest currency data, loading and error states, the timestamp of the last successful update, and a boolean indicating if the data is fresh (updated within the last 5 minutes).
 *
 * @param {string} currency - The currency code to fetch exchange data for.
 * @returns {{ data: object, loading: boolean, error: string|null, lastUpdated: Date|null, isDataFresh: boolean }} An object containing the fetched data, loading status, error message, last update timestamp, and data freshness indicator.
 */
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
