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

    return res.render("Admin", {
        uid : req.session.userid,
        companyList : companyList[0],
        itemCount :itemCount[0]
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

module.exports = {adminView, companyOrder}