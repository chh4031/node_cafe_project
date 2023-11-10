const useDB = require("../../middleware/db")

const cMypage = async(req, res) => {
    const MemberInfo = await useDB.query(`
    select * from 고객 where 고객아이디 = "${req.session.loginInfo.loginId}"`)
    console.log("마이페이지 로딩 성공")
    // console.log(MemberInfo[0][0])

    const orderInfo = await useDB.query(`
    select * from (주문내역 inner join 메뉴항목 on 주문내역.메뉴항목_항목번호 = 메뉴항목.항목번호) inner join 주문 on 주문내역.주문_주문번호 = 주문.주문번호 where 고객_고객아이디 = "${req.session.loginInfo.loginId}" order by 주문번호 asc`)

    console.log(orderInfo[0])

    res.render('pMypage', {
        memberId : MemberInfo[0][0].고객아이디,
        memberName : MemberInfo[0][0].고객이름,
        memberAddress : MemberInfo[0][0].주소,
        memberPhone: MemberInfo[0][0].휴대폰번호,
        orderList : orderInfo[0]
    })
}

module.exports = {cMypage};