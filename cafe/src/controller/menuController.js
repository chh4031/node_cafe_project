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

// 검색 기능 라우터
const searchMenu = async(req, res) => {

    // search = 검색값 가져오기
    const { search } = req.body

    // 검색한 목록들 가져오기
    const searchMenu = await useDB.query(`
    select * from 메뉴항목 where 메뉴이름 like "%${search}%"`)

    return res.render("Menu", {
        uid : req.session.userid,
        menuList : searchMenu[0]
    })
}

module.exports = {menuView, searchMenu}