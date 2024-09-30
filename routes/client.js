import express from "express"
import { getProducts, getCustomers ,getTransaction, getGeography } from "../controllers/client.controller.js"

const router = express.Router()

router.get("/products",getProducts)
router.get("/customer", getCustomers)
router.get("/transaction", getTransaction)
router.get("/geography", getGeography)

export default router