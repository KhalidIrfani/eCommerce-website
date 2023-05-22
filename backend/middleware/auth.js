const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('./catchAsyncError');
const jwt = require("jsonwebtoken");
const User = require('../model/user');
const shop = require('../model/Shop');

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token)
    if (!token) {
        return next(new ErrorHandler("Please login to continue", 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id)

    next();
})


exports.isSeller = catchAsyncError(async (req, res, next) => {
    const { seller_token } = req.cookies;
    // console.log(seller_token)
    if (!seller_token) {
        return next(new ErrorHandler("Please login to continue", 401))
    }

    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY)
    req.seller = await shop.findById(decoded.id)

    next();
})