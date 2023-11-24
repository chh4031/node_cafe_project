const useDB = require("../../middleware/db")

const menuView = async(req, res) => {

    console.log("메뉴 화면 진입 성공")

    // 메뉴항목에서 메뉴들 가져오기
    const menuList = await useDB.query(`
    select * from 메뉴항목`)

    // 메뉴항목에서 대표 메뉴 보여주기
    const mainMenu = await useDB.query(`
    select * from 메뉴항목 where 특별메뉴 = "대표"`)

    // 메뉴항목에서 추천 메뉴 보여주기
    const goodMenu = await useDB.query(`
    select * from 메뉴항목 where 특별메뉴 = "추천"`)

    // 베스트메뉴 추출하기
    for(let i = 0; menuList.length; i++){
        try{
            let menuNum = menuList[0][i].항목번호
            const bestMenu = await useDB.query(`
            select SUM(수량) as ccc from 주문내역 where 메뉴항목_항목번호 = "${Number(menuList[0][i].항목번호)}"`)
            console.log(bestMenu[0][0].ccc)
            
            const addCount = await useDB.query(`
            update 메뉴항목 set 팔린수량 = "${Number(bestMenu[0][0].ccc)}" where 항목번호 = "${Number(menuNum)}"`)
        }catch{
            console.log("더이상 존재 X")
            break;
        }
    }

    // 베스트 메뉴 뽑기
        const bestView = await useDB.query(`
        select * from 메뉴항목 order by 팔린수량 desc `)
        console.log(bestView)

    return res.render('Menu', {
        uid : req.session.userid,
        menuList : menuList[0],
        mainMenu : mainMenu[0],
        goodMenu : goodMenu[0],
        bestMenu : bestView[0]
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