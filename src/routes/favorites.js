// M26B13/019 KITUNZI ZION MUKISA - Feature 1: Database-backed Favourites
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// GET /api/favorites - List my favourites with product details
router.get('/', auth, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT p.* FROM favorites f JOIN products p ON f.product_id = p.id WHERE f.user_id = ?`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/favorites {product_id}
router.post('/', auth, async (req, res) => {
  const { product_id } = req.body;
  if (!product_id) return res.status(400).json({ message: 'product_id required' });
  try {
    await db.query('INSERT INTO favorites (user_id, product_id) VALUES (?, ?)', [req.user.id, product_id]);
    res.status(201).json({ message: 'Added to favourites' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.json({ message: 'Already in favourites' });
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/favorites/:productId
router.delete('/:productId', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM favorites WHERE user_id = ? AND product_id = ?', [req.user.id, req.params.productId]);
    res.json({ message: 'Removed from favourites' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
