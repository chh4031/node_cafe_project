const useDB = require("../../middleware/db");
const time = require("../function/time");
const today = `${time.time().year}-${time.time().month}-${time.time().date}`

let ordernum = 1000;

const cMenu = async(req, res) => {
    try{
        console.log('메뉴페이지 완료');

        const menuList = await useDB.query('select * from 메뉴항목');
        // console.log(req.session.loginInfo.loginId)

        console.log('메뉴 불러오기 성공');

        res.render('pMenu',{
            menuInfo : menuList[0],
            orderList : [],
            sessionLoginName : req.session.loginInfo.loginName,
            orderNumber : req.session.orderNum,
            orderSelect : false
        });
    }catch{
        console.log("메뉴불러오기 오류");
    }
}

// 주문 테이블에 주문한 사람 식별을 위한 정보 넣는 부분(모든 예외처리 가능 -> 메인지 이동간에도 주문 가능하게 구성)
const cOrderOK = async(req, res) => {
    if (req.session.loginInfo.loginId != undefined){
        const menuList = await useDB.query('select * from 메뉴항목');
        try{
            console.log("주문 테이블에 기본값 존재")
            const orderMax = await useDB.query(`
            select max(주문번호) maxnum from 주문`)
            const Maxnum = orderMax[0][0].maxnum
            console.log(Maxnum)
            if(Maxnum != null){
                ordernum = Maxnum + 1;
            }else{
                ordernum = 1000
            }
        }catch{
            console.log("주문 테이블에 값 존재 안함.")
        }

        const orderOK = await useDB.query(`
        insert into 주문(주문번호, 고객_고객아이디, 주문날짜, 주문방식) values(?,?,?,?)`, [ordernum, req.session.loginInfo.loginId, today, "선택안함"])

        req.session.orderNum = ordernum

        console.log("주문 테이블에 들어감")
        res.render("pMenu",{
            menuInfo : menuList[0],
            orderList : [],
            sessionLoginName : req.session.loginInfo.loginName,
            orderNumber : req.session.orderNum,
            orderSelect : true
        })
        ordernum += 1
    }else{
        res.send('<script type = "text/javascript">alert("로그인부터 하세요!"); location.href="/moveMenu";</script>')
    }

}


const cOrder = async(req, res) => {
    const menuList = await useDB.query('select * from 메뉴항목');
    
    const { menuNumber, menuPrice, menuCount } = req.body;
    try{
        if(menuCount != 0){
            const orderInput = await useDB.query('insert into 주문내역(주문_주문번호, 메뉴항목_항목번호, 총금액, 총수량) values(?,?,?,?)',[req.session.orderNum, menuNumber, menuPrice*menuCount, menuCount] )
            console.log("주문내역 성공적!")
        }else{
            console.log("0개는 불가능!")
        }
    }catch{
        console.log("주문내역 중복발생!")
    }

    // 주문내역에서 조인을 통해 메뉴항목과 주문 테이블에서 값을 가져옴
    const orderList = await useDB.query(`
    select * from (주문내역 inner join 메뉴항목 on 주문내역.메뉴항목_항목번호 = 메뉴항목.항목번호) inner join 주문 on 주문내역.주문_주문번호 = 주문.주문번호 where 주문_주문번호 = ${req.session.orderNum}`)
    // console.log(orderList)

    res.render("pMenu", {
        menuInfo : menuList[0],
        orderList : orderList[0],
        sessionLoginName : req.session.loginInfo.loginName,
        orderNumber : req.session.orderNum,
        orderSelect : true})
};

module.exports = { cMenu, cOrder, cOrderOK} ;