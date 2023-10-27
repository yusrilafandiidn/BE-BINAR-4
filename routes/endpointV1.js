const express = require("express");
const router = express.Router();
const { createUsers, getAllUsers, getDetailUsers, deleteUsers, updateUsers } = require("../handler/v1/users");
const { createAccounts, getAllAccounts, getDetailAccounts, deleteAccounts, updateAccounts } = require("../handler/v1/accounts");
const { createTransactions, getAllTransactions, getDetailTransactions } = require("../handler/v1/transactions");

router.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: 'welcome to Basic Banking System',
        data: null
    });
});

//users
router.post("/users", createUsers);
router.get("/users", getAllUsers);
router.get("/users/:id", getDetailUsers);
router.put("/users/:id", updateUsers);
router.delete("/users/:id", deleteUsers);

//accounts
router.post("/accounts", createAccounts);
router.get("/accounts", getAllAccounts);
router.get("/accounts/:id", getDetailAccounts);
router.put("/accounts/:id", updateAccounts);
router.delete("/accounts/:id", deleteAccounts);

//transactions
router.post("/transactions", createTransactions);
router.get("/transactions", getAllTransactions);
router.get("/transactions/:id", getDetailTransactions);

module.exports = router;