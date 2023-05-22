const express = require("express")
const catchAsyncErrors = require("../middleware/catchAsyncError")
const { isSeller, isAuthenticated } = require("../middleware/auth")
const router = express.Router()
const Product = require("../model/product")
const { upload } = require("../multer")
const ErrorHandler = require("../utils/ErrorHandler")
const Shop = require("../model/Shop")
const Order = require("../model/order")

// create product 
router.post("/create-product", upload.array("images"), catchAsyncErrors(async (req, res, next) => {
    try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId)
        if (!shop) {
            return next(new ErrorHandler("Shop Id is invalid", 404))
        } else {
            const files = req.files;
            const imageUrls = files.map((file) => `${file.filename}`);
            const productData = req.body;
            productData.images = imageUrls
            productData.shop = shop

            const product = await Product.create(productData)
            res.status(201).json({
                success: true,
                product,
            })
            // console.log(product)
        }
    } catch (error) {
        return next(new ErrorHandler(error, 404))
    }

}))


//get-All-Products shop

router.get("/get-all-products-shop", catchAsyncErrors(async (req, res, next) => {
    const { id } = req.query
    try {

        const products = await Product.find({ shopId: id });
        // console.log(products)
        res.status(201).json({
            success: true,
            products
        })

    } catch (error) {
        return next(new ErrorHandler(error, 404))

    }
}))


// delete shop product
router.delete("/delete-shop-product", isSeller, catchAsyncErrors(async (req, res, next) => {
    const { id } = req.query
    try {
        const productId = id
        const product = await Product.findByIdAndDelete(productId);

        if (!product) {
            return next(new ErrorHandler('Product not foundwith this id', 500))
        }
        res.status(201).json({
            success: true,
            message: "Product delete Successfully"
        })
    } catch (error) {
        return next(new ErrorHandler(error, 404))

    }
}))

// get all products
router.get(
    "/get-all-products",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 });
            // console.log(products)
            res.status(201).json({
                success: true,
                products,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }));

// review for a product
router.put(
    "/create-new-review",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { user, rating, comment, productId, orderId } = req.body;

            const product = await Product.findById(productId);

            const review = {
                user,
                rating,
                comment,
                productId,
            };

            const isReviewed = product.reviews.find(
                (rev) => rev.user._id === req.user._id
            );

            if (isReviewed) {
                product.reviews.forEach((rev) => {
                    if (rev.user._id === req.user._id) {
                        (rev.rating = rating), (rev.comment = comment), (rev.user = user);
                    }
                });
            } else {
                product.reviews.push(review);
            }

            let avg = 0;

            product.reviews.forEach((rev) => {
                avg += rev.rating;
            });

            product.ratings = avg / product.reviews.length;

            await product.save({ validateBeforeSave: false });

            await Order.findByIdAndUpdate(
                orderId,
                { $set: { "cart.$[elem].isReviewed": true } },
                { arrayFilters: [{ "elem._id": productId }], new: true }
            );

            res.status(200).json({
                success: true,
                message: "Reviwed succesfully!",
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// all products --- for admin
// router.get(
//     "/admin-all-products",
//     isAuthenticated,
//     isAdmin("Admin"),
//     catchAsyncErrors(async (req, res, next) => {
//         try {
//             const products = await Product.find().sort({
//                 createdAt: -1,
//             });
//             res.status(201).json({
//                 success: true,
//                 products,
//             });
//         } catch (error) {
//             return next(new ErrorHandler(error.message, 500));
//         }
//     })
// );

module.exports = router