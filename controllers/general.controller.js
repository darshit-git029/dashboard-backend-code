import User from "../models/User.js"
import OverAllStat, { overAllStat } from "../models/OverAllStat.js"
import Transaction from "../models/Transaction.js"

export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json({
            message: "User Data Get Successfully",
            success: true,
            user
        })

    } catch (error) {
        console.log(error);

    }
}

export const getDashboard = async (req, res) => {
    try {
        const currentMonth = "November"
        currentYear = 2021
        currentDay = "2021-11-15"

        const transaction = Transaction.find().limit(50).sort({ createdOn: -1 })
        const overallState = OverAllStat.find({year:currentYear})
        const{} = overAllStat

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}