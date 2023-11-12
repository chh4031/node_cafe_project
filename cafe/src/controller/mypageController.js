const useDB = require("../../middleware/db");

// 주문내역 화면 보여주기
const mypageView = async(req, res) =>{

    // 주문내역에 보여줄 내용 가져오기 
    // 주문이랑 주문내역 조인후 메뉴항목이랑 한번 더 조인
    const orderList = await useDB.query(`
    select * from (주문 inner join 주문내역 on 주문.주문번호 = 주문내역.주문_주문번호) inner join 메뉴항목 on 주문내역.메뉴항목_항목번호 = 메뉴항목.항목번호 where 주문.고객_아이디 = "${req.session.userid}"`)

    console.log('주문내역 불러오기 성공!')

    // for문을 위해 현재 접속자의 주문번호 전부 가져오기
    const orderNum = await useDB.query(`
    select 주문번호 from 주문 where 고객_아이디 = "${req.session.userid}"`)

    console.log('현재 아이디의 주문번호 정보 가져오기 성공')

    // 총금액을 보여주기 위해 주문정보를 통해 가져오기
    const orderPrice = await useDB.query(`
    select 총금액 from 주문 where 고객_아이디 = "${req.session.userid}"`)

    console.log('현재 아이디의 주문번호 정보에서 총금액 가져오기 성공')

    return res.render("mypage",{
        uid : req.session.userid,
        orderList : orderList[0],
        orderNum : orderNum[0],
        orderPrice : orderPrice[0],
    })
}

module.exports = { mypageView }