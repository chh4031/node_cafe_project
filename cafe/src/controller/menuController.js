const useDB = require("../../middleware/db")

const menuView = async(req, res) => {

    console.log("메뉴 화면 진입 성공")

    // 메뉴항목에서 메뉴들 가져오기
    const menuList = await useDB.query(`
    select * from 메뉴항목`)

    return res.render('Menu', {
        uid : req.session.userid,
        menuList : menuList[0]
    })
}

module.exports = {menuView}