import User from "../models/User.js"
import overAllStat from "../models/OverAllStat.js"
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
        // Hardcoded values
        const currentMonth = "November";
        const currentYear = 2021;
        const currentDay = "2021-11-15";

        // Recent transactions
        const transaction = await Transaction.find().limit(50).sort({ createdOn: -1 });

        // Overall stats
        const overallStat = await overAllStat.find({ year: currentYear });

        if (!overallStat || overallStat.length === 0) {
            throw new Error('No stats found for the given year.');
        }

        const {
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory
        } = overallStat[0];

        const thisMonthStat = monthlyData.find(({ month }) => month === currentMonth);
        const todayStat = overallStat[0].dailyData.find(({ date }) => date === currentDay);

     
        res.status(200).json({
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
            thisMonthStat,
            todayStat,
            transaction
        });

    } catch (error) {
        console.error(error.message);
        res.status(404).json({ message: error.message });
    }
};
