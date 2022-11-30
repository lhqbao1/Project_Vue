// import express 
import express from "express";
// import functions from controller 
import {
    showFoods,
    showFoodById,
    createFood,
    updateFood,
    deleteFood,
} from "../controllers/food.js";

import {
    showAUser,
    createAccount
} from "../controllers/user.js";

import {
    addItems,
    getItem,
    updateItem,
    allItems,
    deleteItem,
    deleteItems
} from "../controllers/cart.js";

import {
    createBooking
} from "../controllers/booktable.js";

import {
    createBillDetails, getBillDetailsById
} from "../controllers/billdetails.js";

import {
    showNewestStatusId,
    createBillStatus,
    getAllBillsByUser,
    getAllBillsByBill,
    getAllBills,
    updateBillStatus,
    updateBillPaid,
    cancelBillStatus
} from "../controllers/billstatus.js";

// init express router
const router = express.Router();

////////////////////////// FOOD ////////////////////////////////
router.get("/api/foods", showFoods);
router.get("/api/foods/:id", showFoodById);
router.post("/api/foods", createFood);
router.put("/api/foods/:id", updateFood);
router.delete("/api/foods/:id", deleteFood);

////////////////////////// USER ////////////////////////////////
router.get("/api/users/:email", showAUser);
router.post("/api/users/", createAccount);

////////////////////////// CART ////////////////////////////////
router.post("/api/cartItem", addItems);
router.get("/api/cartItem/:user_id/:food_id", getItem);
router.get("/api/cartItem/:id", allItems);
router.put("/api/cartItem/", updateItem);
router.delete("/api/cartItem/:user_id/:food_id", deleteItem);
router.delete("/api/cartItem/:id", deleteItems);

////////////////////////// Booking ////////////////////////////////
router.post("/api/booking", createBooking);

////////////////////////// Bill Details ////////////////////////////////
router.post("/api/billdetails", createBillDetails);
router.get("/api/billdetails/:id", getBillDetailsById);

////////////////////////// Bill Status ////////////////////////////////
router.get("/api/billstatus/new", showNewestStatusId);
router.post("/api/billstatus", createBillStatus);
router.get("/api/billstatus/user/:id", getAllBillsByUser);
router.get("/api/billstatus/bill/:id", getAllBillsByBill);
router.get("/api/billstatus", getAllBills);
router.put("/api/billstatus/:id", updateBillStatus);
router.put("/api/billstatus/paid/:id", updateBillPaid);
router.put("/api/billstatus/cancel/:id", cancelBillStatus);





// export default router
export default router;








