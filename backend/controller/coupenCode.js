const express = require('express')
const catchAsyncError = require("../middleware/catchAsyncError");
const Shop = require("../model/Shop");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");
const CoupenCode = require("../model/coupenCode");
const router = express.Router();


// create coupen 
router.post("/create-coupen-code", isSeller, catchAsyncError(async (req, res, next) => {
    try {
        console.log(req.body)
        const isCoupenCodeExist = await CoupenCode.find({ name: req.body.name });

        // console.log(isCoupenCodeExist)
        if (isCoupenCodeExist.length !== 0) {
            return next(new ErrorHandler("Coupen Code Already exist!", 400))
        }
        const couponCode = await CoupenCode.create(req.body);
        res.status(201).json({
            success: true,
            couponCode
        })
        // console.log(couponCode)
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}))

// get all  copen of shop 
router.get(
    "/get-coupon",
    isSeller,
    catchAsyncError(async (req, res, next) => {
        const { id } = req.query
        try {
            const couponCodes = await CoupenCode.find({ shopId: id });
            res.status(201).json({
                success: true,
                couponCodes,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);


// delete coupoun code of a shop
router.delete(
    "/delete-coupon",
    isSeller,
    catchAsyncError(async (req, res, next) => {
        const { id } = req.query
        try {
            const couponCode = await CoupenCode.findByIdAndDelete(id);

            if (!couponCode) {
                return next(new ErrorHandler("Coupon code dosen't exists!", 400));
            }
            res.status(201).json({
                success: true,
                message: "Coupon code deleted successfully!",
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// get coupon code value by its name
router.get(
    "/get-coupen-value/:name",
    catchAsyncError(async (req, res, next) => {
        try {
            const coupenCode = await CoupenCode.findOne({ name: req.params.name });
            // console.log(coupenCode)
            res.status(200).json({
                success: true,
                coupenCode,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

module.exports = router