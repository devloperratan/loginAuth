const express = require('express');
const { createUser, getAllUsers, getUserById, deleteUserById, updateUserById, loginUser } = require('../controller/userController');

const router = express.Router();

router.post('/createUser', createUser)
router.get('/getAllUsers', getAllUsers)
router.get('/getUserById', getUserById)
router.delete('/deleteUserById', deleteUserById)
router.put('/updateUserById', updateUserById)
router.post('/loginUser', loginUser)



module.exports = router;