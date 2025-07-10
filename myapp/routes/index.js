import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/convert', async (req, res) => {
  const { amount, fromCurrency, toCurrency } = req.body;

  if (!amount || !fromCurrency || !toCurrency) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();

    if (!data.rates[toCurrency]) {
      return res.status(400).json({ error: 'Invalid target currency' });
    }

    const rate = data.rates[toCurrency];
    const result = (amount * rate).toFixed(2);

    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Conversion failed' });
  }
});

export default router;
