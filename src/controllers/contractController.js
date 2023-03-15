const Contract = require("../models/contractModel");

const contractController = {
  updatePdf: async (req, res, next) => {
    console.log("123");
    try {
        // let name = req.body.name
        const fileImg = req.files
        const arrImg = []
        for (let i = 0; i < fileImg.length; i++) {
            const url = `http://localhost:8001/${fileImg[i].filename}`
            arrImg.push(url)
            console.log("456",fileImg);
        }
        const response = await Contract.create({ pdf_contract: arrImg})
        console.log("minh");
        res.send({ data: response })

    } catch (error) {
        res.send({ message: 'loi roi123' })
    }
  }
}



module.exports = contractController;