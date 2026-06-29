const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {

    try {

        const { userName, fullName, email, mobileNo, password } = req.body;

        console.log(
            "userName: ", userName,
            "fullName: ", fullName,
            "email: ", email,
            "mobileNo: ", mobileNo,
            "password: ", password
        )

        const user = await userModel.findOne({
            $or: [
                { userName: userName },
                { email: email },
                { mobileNo: mobileNo }
            ]
        })

        if (user) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        // console.log("hashPassword: ", hashPassword)

        const newUser = await userModel.create({
            userName,
            fullName,
            email,
            mobileNo,
            password: hashPassword
        })

        return res.status(201).json({
            message: "User registered successfully"
        })

    } catch (err) {
        console.error("Register Error:", err.code, err.message);
        if (err.code === 11000) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        return res.status(500).json({
            message: "Internal server error"
        })
    }

}


async function loginUser(req, res) {

    try {

        const { userName, email, mobileNo, password } = req.body;

        const user = await userModel.findOne({
            $or: [
                { userName: userName },
                { email: email },
                { mobileNo: mobileNo }
            ]
        })

        if (!user) {
            return res.status(400).json({
                message: "User not found register first"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password"
            })
        }

        const token = jwt.sign({
            id: user._id,
            userName: user.userName
        }, process.env.JWT_SECRET)

        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'none',
        //     maxAge: 24 * 60 * 60 * 1000
        // })

        return res.status(200).json({
            message: "Login successful",
            token: token,
            user: user
        })

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }

}

async function logoutUser(req, res) {

    try {

        res.clearCookie("token")

        res.status(200).json({
            message: "user Logout successfully"
        })

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

async function getCurrentUser(req, res) {

    try {

        const { id } = req.body

        if (!id) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }



        const userData = await userModel.findOne({ _id: id }).select("-password")

        if (!userData) {
            return res.status(401).json({
                message: "User data is not register"
            })
        }

        return res.status(200).json({
            message: "data fetched successfully",
            user: userData
        })

    } catch (err) {
        console.error("Error fetching user profile:", err);
        return res.status(500).json({
            message: "Internal server error"
        });

    }
}

async function deleteAccount(req, res) {

    try {

        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const deletedAccount = await userModel.findOneAndDelete({ _id: id })

        if (!deletedAccount) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.clearCookie("token");

        return res.status(200).json({
            message: "user account deleted successfully"
        })

    } catch (error) {
        console.error("Delete account error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

module.exports = { registerUser, loginUser, logoutUser, getCurrentUser, deleteAccount };
