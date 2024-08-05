import express from 'express';
import {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getFeaturedProducts,
    getProductsByPrice,
    getProductsByRating
} from '../controllers/productController.mjs';
import { registerUser, login } from '../controllers/userController.mjs';
import { authentication } from '../auth/authentication.mjs';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', login);
router.get('/', authentication, getProduct);
router.post('/createProduct', authentication, createProduct);
router.put('/:id', authentication, updateProduct);
router.delete('/:id', authentication, deleteProduct);
router.get('/price/:maxPrice', authentication, getProductsByPrice);
router.get('/rating/:minRating', authentication, getProductsByRating);

export default router;
