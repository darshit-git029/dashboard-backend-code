import OverAllStat from "../models/OverAllStat.js";

export const getSales = async (req,res) => {
    try {
        const overAllStat = await OverAllStat.find()
        res.status(200).json(overAllStat[0])
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}