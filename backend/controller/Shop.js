const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const sendShopToken = require('../utils/shopToken');
const { isSeller, isAuthenticated } = require('../middleware/auth');
const ErrorHandler = require('../utils/ErrorHandler');
const Shop = require('../model/Shop');
const catchAsyncError = require('../middleware/catchAsyncError');
const { upload } = require('../multer');


// create-shop
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
    try {
        const { email } = req.body;
        const sellerEmail = await Shop.findOne({ email })
        if (sellerEmail) {
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ message: "Error Deleting file" })
                } // else {
                //     resp.json({ message: "file Deleted Successfully" })
                // }
            })
            return next(new ErrorHandler("User already exist", 400))
        }

        const filename = req.file.filename;
        const fileUrl = path.join(filename);

        const seller = {
            name: req.body.name,
            email: email,
            password: req.body.password,
            avatar: fileUrl,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            zipCode: req.body.zipCode
        }

        const createActivationToken = (user) => {
            return jwt.sign(user, process.env.ACTIVATION_SECRET, {
                expiresIn: "5m",
            })
        }

        const activationToken = createActivationToken(seller);
        const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`
        // console.log("seller token send Successfully", activationUrl)

        try {
            await sendMail({
                email: seller.email,
                subject: "Activate your Shop",
                message: `Hello ${seller.name}, please click on the link to active your shop:${activationUrl}`
            })
            res.status(201).json({
                success: true,
                message: `Please check your email:- ${seller.email} to activate your shop!`
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500))
        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// Activate seller
router.post("/shop/activation", catchAsyncError(async (req, resp, next) => {
    try {
        const { activation_token } = req.body;
        const newSeller = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

        if (!newSeller) {
            return next(new ErrorHandler("Invalid token", 400));
        }
        const { name, email, password, avatar, zipCode, address, phoneNumber } = newSeller;

        let seller = await Shop.findOne({ email });
        if (seller) {
            return next(new ErrorHandler("user already exist"))
        }

        seller = await Shop.create({
            name,
            email,
            avatar,
            password,
            zipCode,
            address,
            phoneNumber
        })
        sendShopToken(seller, 201, resp)
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))

// login to shop

router.post('/login-shop', catchAsyncError(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler('Please provide the all field!', 400))
        }
        const user = await Shop.findOne({ email }).select('+password')
        if (!user) {
            return next(new ErrorHandler("User doesn't exist", 400))
        }
        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid) {
            return next(new ErrorHandler("Please provide the correct information"))
        }
        sendShopToken(user, 201, res)
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))

// load-shop

router.get('/getSeller', isSeller, catchAsyncError(async (req, res, next) => {
    try {
        // console.log(req.seller)
        const seller = await Shop.findById(req.seller._id)
        if (!seller) {
            return next(new ErrorHandler("Seller doesn't exist", 400))
        }
        res.status(200).json({
            success: true,
            seller
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))

// logout from shop
router.get("/logout", catchAsyncError(async (req, res, next) => {
    try {
        res.cookie("seller_token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        res.status(201).json({
            success: true,
            message: "Logout Sucessful!"
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 5000))
    }
}))

// get shop info
router.get(
    "/get-shop-info/:id",
    catchAsyncError(async (req, res, next) => {
        // const {id} = req.query
        try {
            const shop = await Shop.findById(req.params.id);
            res.status(201).json({
                success: true,
                shop,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

// update shop profile picture
router.put(
    "/update-shop-avatar",
    isSeller,
    upload.single("image"),
    catchAsyncError(async (req, res, next) => {
        try {
            const existsUser = await Shop.findById(req.seller?._id);

            const existAvatarPath = `uploads/${existsUser.avatar}`;

            fs.unlinkSync(existAvatarPath);

            const fileUrl = path.join(req.file.filename);

            const seller = await Shop.findByIdAndUpdate(req.seller._id, {
                avatar: fileUrl,
            });

            res.status(200).json({
                success: true,
                seller,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

// update seller info
router.put(
    "/update-seller-info",
    isSeller,
    catchAsyncError(async (req, res, next) => {
        try {
            const { name, description, address, phoneNumber, zipCode } = req.body;

            const shop = await Shop.findOne(req.seller._id);

            if (!shop) {
                return next(new ErrorHandler("User not found", 400));
            }

            shop.name = name;
            shop.description = description;
            shop.address = address;
            shop.phoneNumber = phoneNumber;
            shop.zipCode = zipCode;

            await shop.save();

            res.status(201).json({
                success: true,
                shop,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);


module.exports = router