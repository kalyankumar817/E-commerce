const express=require('express')
const productController=require('../controllers/productController')
const userController=require('../controllers/userController')
const router=express.Router()
const {authenticateToken}=require('../middlewares/authenticateToken')

//creating request
router.post('/post',authenticateToken,productController.createProduct)
router.put('/put/:id',authenticateToken,productController.updateProduct)
router.delete('/delete/:id',authenticateToken,productController.deleteProduct)


//for users later
// Protected Route (Requires Authentication)
router.get('/getall',authenticateToken,productController.getAll);

// Protected Route to Get Product By ID (Requires Authentication)
router.get('/get/:id', authenticateToken, productController.getById);

router.get('/validate-session', authenticateToken, userController.validateSession);


router.get('/refresh-token', authenticateToken);
module.exports = router;

module.exports=router;