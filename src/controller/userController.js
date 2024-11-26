const { date } = require('joi');
const User = require('../model/userModel')
const { createUserVaidation } = require('../validation/userValidation')
const bcrypt = require('bcryptjs');


const createUser = async (req, res) => {
    try {

        const { error } = createUserVaidation(req.body);

        if (error) {
            res.status(200).json({ success: true, message: error.details[0].message })
        }

        const hashPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashPassword

        const userInfo = await User.create(req.body)

        if (!userInfo) return res.status(400).json({ success: false, message: 'user not added' })
        return res.status(200).json({ success: true, message: 'user added', data: userInfo })

    }
    catch (error) {
        console.log(error)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const getUserInfo = await User.find()
        if (getUserInfo.lenght === 0) return res.status(200).json({ success: true, message: 'User not found' })
        return res.status(200).json({ success: true, message: 'All Users', data: getUserInfo })
    }
    catch (error) {
        console.log(error)
    }
}


const getUserById = async (req, res) => {
    try {
        const userId = req.query.userId
        if (!userId) return res.status(400).json({ success: false, message: 'userId is Invalid' })

        const getUserInfoById = await User.findOne({ _id: userId })

        if (!getUserInfoById) {
            return res.status(200).json({ success: true, message: 'user Not found' })
        }
        return res.status(200).json({ success: true, message: 'User found succesfully', data: getUserInfoById })
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Enter Valid userId' })
    }

}

const deleteUserById = async (req, res) => {
    try {
        const userId = req.query.userId;
        if (!userId) {
            return res.status(400).json({ success: false, message: 'userId is required' });
        }

        const deleteUserInfo = await User.findOneAndDelete({ _id: userId });

        if (!deleteUserInfo) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, message: 'User deleted successfully', data: deleteUserInfo });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


const updateUserById = async (req, res) => {
    try {
        const { userId } = req.body;

        const updateUserInfo = await User.findOneAndUpdate({ _id: userId }, { $set: req.body });

        if (!updateUserInfo) {
            return res.status(400).json({ success: false, message: 'user not found' })
        }

        return res.status(200).json({ success: true, message: 'user Update successfully', data: updateUserInfo })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Enter Valid userId' })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        if (!user) {
            return res.status(500).json({ success: false, message: 'User password not set. Please contact support.' });
        }

        // Compare the password using bcrypt
        const isPasswordMatch = bcrypt.compareSync(password, User.hashPassword);

        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // If email and password are correct, return success
        return res.status(200).json({ success: true, message: 'Login successful', data: user });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
module.exports = { createUser, getAllUsers, getUserById, deleteUserById, updateUserById, loginUser }