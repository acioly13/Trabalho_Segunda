const { Router } = require('express');

const ProductController = require('./app/controllers/ProductController');

const router = Router();

router.get('/produtos', ProductController.index);
router.get('/produtos/:id', ProductController.show);
router.delete('/produtos/:id', ProductController.delete);
router.post('/produtos', ProductController.store);
router.put('/produtos/:id', ProductController.update);

module.exports = router;
