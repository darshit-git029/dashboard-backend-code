import mongoose from "mongoose"

const ProductStatSchema = new mongoose.Schema(
    {
        productId: String,
        yearlySalesTotal: Number,
        yearlyTotalSoldUnits: Number,
        year: Number,
        monthlyData: [
            {
                month: String,
                TotalSales: Number,
                TotalUnits: Number,

            }
        ],
        dailyData: [
            {
                date: String,
                TotalSales: Number,
                TotalUnits: Number,
            }
        ]
    },
    { timestamps: true }
)

const ProductStat = mongoose.model("ProductStat", ProductStatSchema)
export default ProductStat;