const express = require('express');
const router = express.Router();

const { protect, requireRole } = require('../middleware/auth.middleware');
const requestController = require('../controllers/request.controller');

/* =========================
   MAINTENANCE REQUEST ROUTES
========================= */

// Check overdue maintenance requests (Admin / Manager only)
router.post(
  '/check-overdue',
  protect,
  requireRole(['admin', 'manager']),
  requestController.checkOverdueRequests
);

// Example: Create maintenance request
router.post(
  '/',
  protect,
  requestController.createRequest
);

// Example: Get all requests
router.get(
  '/',
  protect,
  requestController.getAllRequests
);

module.exports = router;
