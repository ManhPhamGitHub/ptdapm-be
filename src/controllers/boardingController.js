const boardingModel = require("../models/boardingModel");

exports.addUpdateBoarding = async (req, res) => {
    try {
        const { boardingId, startDate, endDate, status } = req.body;
        if (boardingId == "" || !boardingId) {
            await boardingModel.create({ startDate: startDate, endDate: endDate, status: status })
            res.send(res.status(200).json({ success: true, message: "create boarding success" }))
        }
        await boardingModel.findByIdAndUpdate(boardingId, { startDate: startDate, endDate: endDate, status: status })
        res.send(res.status(200).json({ success: true, message: "update boarding success" }))
    } catch (error) {
        next(error);
    }
}




exports.getBoarding = async (req, res) => {
    try {
        if (req.params.boardingId) {
            const boardingList = await boardingModel.findById(req.params.boardingId)
            return res.status(200).json({ success: true, data: [boardingList] });
        }
        const limit = 5
        let activePage = parseInt(req.query.activePage)
        const totalData = await boardingModel.countDocuments();
        const totalPage = Math.ceil(totalData / limit);

        activePage > 0 ? activePage > 0 && activePage > totalPage ? activePage = totalPage : activePage : activePage = 1
        const skip = (activePage - 1) * limit;

        const boardingList = await boardingModel.find().skip(skip).limit(limit);
        return res.status(200).json({ success: true, data: [boardingList], totalPage: totalPage, activePage: activePage });
    } catch (error) {
        next(error);
    }
}



exports.delBoarding = async (req, res) => {
    try {
        await boardingModel.findByIdAndDelete(req.params.boardingId)
        res.status(200).json({ success: true, message: "delete boarding successfully" });
    } catch (error) {
        next(error);
    }
}


