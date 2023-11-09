const useDB = require("../../middleware/db")

const cMypage = async(req, res) => {
    res.render('pMypage')
}

module.exports = {cMypage};