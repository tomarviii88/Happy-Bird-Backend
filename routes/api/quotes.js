const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Quote = require('../../models/Quotes');

router.post(
  '/add',
  [
    check('name', 'Name of the author is required')
      .not()
      .isEmpty(),
    check('quote', 'Quote is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, quote } = req.body;
    try {
      const new_quote = new Quote({
        name,
        quote
      });
      await new_quote.save();
      return res.json(new_quote);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/', async (req, res) => {
  const quotes = await Quote.find();
  const random_no = Math.floor(Math.random() * Math.floor(quotes.length));
  return res.json(quotes[random_no]);
});

router.get('/all', async (req, res) => {
  const quotes = await Quote.find();
  return res.json(quotes);
});

module.exports = router;
