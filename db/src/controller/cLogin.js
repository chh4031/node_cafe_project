const userDB = require("../../middleware/db");

const cLogin = async(req, res) => {
    console.log('로그인 페이지 완료')
    res.render('pLogin')
}

module.exports = { cLogin }