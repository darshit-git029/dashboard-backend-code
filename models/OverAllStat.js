import mongoose from "mongoose"

const OverAllStatSchema = new mongoose.Schema(
    {
        totalCustomers: Number,
        yearlySalesTotal: Number,
        yearlyTotalSoldUnits: Number,
        year: Number,
        monthlyData: [
            {
                month: String,
                totalSales: Number,
                totalUnits: Number,

            }
        ],
        dailyData: [
            {
                date: String,
                totalSales: Number,
                totalUnits: Number,
            }
        ],
        salesByCategory:{
            type:Map,
            of:Number
        }
    },
    { timestamps: true }
)

export const overAllStat = mongoose.model("overAllStat",OverAllStatSchema)
export default overAllStat;