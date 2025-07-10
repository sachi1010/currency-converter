import { useState, useEffect } from 'react';
import './cur.css'

function Currency() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [result, setResult] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await res.json();
        setCurrencies(Object.keys(data.rates));
      } catch (error) {
        setErrorMsg('Failed to fetch currency list');
      }
    };
    fetchCurrencies();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (amount && !isNaN(amount)) {
        handleConvert();
      }
    }, 500); // debounce
    return () => clearTimeout(timeout);
  }, [amount, fromCurrency, toCurrency]);

  const handleConvert = async () => {
  if (!amount || isNaN(amount)) {
    setResult(null);
    return;
  }

  setIsLoading(true);
  setErrorMsg('');

  try {
    const res = await fetch('https://currency-converter-1-xn2q.onrender.com/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, fromCurrency, toCurrency })
    });

    const data = await res.json();

    if (data.result) {
      setResult(new Intl.NumberFormat().format(data.result));
    } else {
      setErrorMsg(data.error || 'Unknown error');
    }
  } catch (err) {
    setErrorMsg('Server not reachable');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="converter">
        <div className="money-container">
  {[...Array(20)].map((_, i) => (
    <img
      key={i}
      src="./money.png" 
      className="money-drop"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        width: `${40 + Math.random() * 30}px`,
      }}
      alt="money"
    />
  ))}
</div>

      <div className="box">
        <img src="./img.png" alt="Currency Converter" />
      </div>

      <div className="data">
        <h1>Currency Converter</h1>

        <div className="input">
          <label htmlFor="amt">Amount :</label>
          <input
            type="number"
            id="amt"
            value={amount}
            placeholder="Enter amount"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="from">From :</label>
          <select
            id="from"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>

          <br />

          <label htmlFor="to">To :</label>
          <select
            id="to"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>

          <button onClick={handleConvert}>Convert</button>
        </div>

        <div className="result">
          <h2>Result :</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : errorMsg ? (
            <p style={{ color: 'red' }}>{errorMsg}</p>
          ) : result !== null ? (
            <p>
              {amount} {fromCurrency} = {result} {toCurrency}
            </p>
          ) : (
            <p>Enter amount and select currencies</p>
          )}
        </div>
      </div>
       <footer >
      <h2 >Created by Sachithananthan © 2025</h2>
    </footer>
    </div>
  );
}

export default Currency;
