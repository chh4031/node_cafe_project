const useDB = require("../../middleware/db");

// 관리자 화면 보여주기
const adminView = async(req, res) => {

    console.log("관리자 화면 진입 성공");

    // 관리자 아니면 무조건 팅궈내기
    if(req.session.userid != "admin"){
        console.log("관리자 아닌 유저 감지!")
        return res.redirect("/");
    }

    // 현재 재료의 재고량을 가져온다.
    const itemCount = await useDB.query(`
    select * from 재료`)

    // 공급업체를 통한 재료 주문 가져오기
    const companyList = await useDB.query(`
    select * from 공급업체 inner join 공급 on 공급업체.공급업체번호 = 공급.공급업체_공급업체번호
    `)

    // 현재 메뉴 리스트 보여주기
    const mainMenu = await useDB.query(`
    select * from 메뉴항목`)

    return res.render("Admin", {
        uid : req.session.userid,
        companyList : companyList[0],
        itemCount :itemCount[0],
        mainMenu : mainMenu[0]
    })
}

// 관리자가 공급업체를 통해 재료를 주문해서 재료양이 증가하는 부분
const companyOrder = async(req, res) => {

    // 해당 테이블의 공급업체 번호와 주문양, 재료이름을 가져온다.
    const {companynum, itemcount, itemname} = req.body

    const increaseItem = await useDB.query(`
    update 재료 set 재료량 = 재료.재료량 + "${Number(itemcount)}" where 재료이름 = "${itemname}"`)

    console.log(`[${itemname}] 재료의 재료량이 [${itemcount}] 더 증가했습니다.`)

    return res.redirect("/moveAdmin");
}

// 특별메뉴에 설정하기
const goodMenu = async(req, res) =>{
    const {menunum, goodmenu} = req.body

    if(goodmenu == "대표" || goodmenu == "추천" || goodmenu == "없음"){
        // 특별메뉴 항목 업데이트 기능
        const updateGood = await useDB.query(`
        update 메뉴항목 set 특별메뉴 = "${goodmenu}" where 항목번호 = "${Number(menunum)}"`)

        // 공급업체를 통한 재료 주문 가져오기
        const companyList = await useDB.query(`
        select * from 공급업체 inner join 공급 on 공급업체.공급업체번호 = 공급.공급업체_공급업체번호
        `)

        // 현재 재료의 재고량을 가져온다.
        const itemCount = await useDB.query(`
        select * from 재료`)

        // 현재 메뉴 리스트 보여주기
        const mainMenu = await useDB.query(`
        select * from 메뉴항목`)

        console.log('특별메뉴 업데이트 완료')

        return res.render("Admin", {
            uid : req.session.userid,
            companyList : companyList[0],
            itemCount :itemCount[0],
            mainMenu : mainMenu[0]
        })
    }else{
        console.log('값입력이 잘못되었음.')
        return res.send('<script type = "text/javascript">alert("입력값이 잘못됨"); location.href="/moveAdmin";</script>')
    }
}

module.exports = {adminView, companyOrder, goodMenu}