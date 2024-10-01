import Product from "../models/Product.js"
import ProductStat from "../models/ProductStat.js"
import User from "../models/User.js"
import Transaction from "../models/Transaction.js"
import getCountryIso3 from "country-iso-2-to-3"

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        
        const ProductWithStat = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id
                })
                return {
                    ...product._doc,
                    stat,
                }
            })
        )

        res.status(200).json(ProductWithStat)
        
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message })
    }
}

export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: "user" }).select("-password")
        
        res.status(200).json(customers)

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message })
    }
}

export const getTransaction = async (req, res) => {
    try {
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
        const generateSort = () => {
            const sortParsed = JSON.parse(sort)
            const sortFormate = { 
                [sortParsed.field]: sortParsed.sort = "asc" ? 1 : -1
            }
            return sortFormate
        }

        const sortFormate = Boolean(sort) ? generateSort() : {}

        const transaction = await Transaction.find({
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { userId: { $regex: new RegExp(search, "i") } }
            ]
        })
            .sort(sortFormate)
            .skip(page * pageSize)
            .limit(pageSize)

        const total = await Transaction.countDocuments({
            name: { $regex: search, $options: "i" }
        }) 
        
        res.status(200).json({
            transaction,
            total
        })
        
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message })
    }
}

export const getGeography = async (req,res) => {
    try {
        const users = await User.find()
        const mappedLocation = users.reduce((acc,{country}) => {
            const countryiso3 = getCountryIso3(country)
            if(!acc[countryiso3]){
                acc[countryiso3] = 0
            }
            acc[countryiso3]++
            return acc;
        },{})

        const formettedLocation = Object.entries(mappedLocation).map(
            ([country,count]) => {
                return {id:country,value:count}
            }
        )
        res.status(200).json(formettedLocation)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}