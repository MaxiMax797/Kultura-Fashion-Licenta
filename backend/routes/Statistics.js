const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/Statistics');
const { verifyToken } = require('../middleware/VerifyToken');

// Statistici disponibile numai administratorilor
router.get('/', verifyToken, statisticsController.getStatistics);
router.get('/by-date', verifyToken, statisticsController.getOrderStatsByDate);
router.get('/category-stats', verifyToken, statisticsController.getCategoryStatsByDate);

module.exports = router;