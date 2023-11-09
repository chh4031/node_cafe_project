const useDB = require("../../middleware/db");
const time = require("../function/time");
const today = `${time.time().year}-${time.time().month}-${time.time().date}`

let ordernum = 1000;
let ordercount = 0;

const cMenu = async(req, res) => {
    // console.log(req.session.selectOption)

    req.session.selectOption = false;
    req.session.confirm = false;
    req.session.searchInfo = "";

    // 여기까지

    ordercount = 0;
    // console.log(ordercount)
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
            orderSelect : false,
            selectOption : req.session.selectOption,
            selectPay : "선택안함",
            orderSelect : false
        });
    }catch{
        console.log("메뉴불러오기 오류");
    }
}

// 주문 테이블에 주문한 사람 식별을 위한 정보 넣는 부분(모든 예외처리 가능 -> 메인지 이동간에도 주문 가능하게 구성)
const cOrderOK = async(req, res) => {
    if (ordercount == 1){
        ordercount = 0;
        const lastDelete = await useDB.query(`
        delete from 주문 where 주문번호 = ${req.session.orderNum}`)
        return res.send('<script type = "text/javascript">alert("주문하기를 두번 누를수 없습니다. 다시 시도하세요!"); location.href="/moveMenu";</script>')
    }else{
        ordercount += 1
    }
    let menuList = undefined;
    if (req.session.loginInfo.loginId != undefined){
            menuList = await useDB.query('select * from 메뉴항목');
        try{
            console.log("주문 테이블에 기본값(사용자정보) 존재(메뉴쪽)")
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
            console.log("주문 테이블에 값(사용자정보) 존재 안함.(메뉴쪽)")
        }

        const orderOK = await useDB.query(`
        insert into 주문(주문번호, 고객_고객아이디, 주문날짜, 주문방식) values(?,?,?,?)`, [ordernum, req.session.loginInfo.loginId, today, "선택안함"])

        req.session.orderNum = ordernum
        req.session.orderUseSearch = true;

        console.log("주문 테이블에 들어감(메뉴쪽)")
        res.render("pMenu",{
            menuInfo : menuList[0],
            orderList : [],
            sessionLoginName : req.session.loginInfo.loginName,
            orderNumber : req.session.orderNum,
            orderSelect : true,
            selectPay : "선택안함",
            selectOption : req.session.selectOption
        })
        ordernum += 1
    }else{
        res.send('<script type = "text/javascript">alert("로그인부터 하세요!"); location.href="/moveLogin";</script>')
    }

}

const cOrder = async(req, res) => {
    let menuList = undefined;
    if(req.session.searchInfo == ""){
        menuList = await useDB.query('select * from 메뉴항목');
    }else{
        menuList = await useDB.query(`
    select * from 메뉴항목 where 이름 like "%${req.session.searchInfo}%"`)
    }
    
    const { menuNumber, menuPrice, menuCount} = req.body;
    try{
        if(menuCount != 0){
            const orderInput = await useDB.query('insert into 주문내역(주문_주문번호, 메뉴항목_항목번호, 총금액, 총수량) values(?,?,?,?)',[req.session.orderNum, menuNumber, menuPrice*menuCount, menuCount] )
            console.log("주문내역 성공적!(메뉴쪽")
        }else{
            console.log("0개는 불가능!(메뉴쪽)")
        }
    }catch{
        console.log("주문내역 중복발생!(메뉴쪽)")
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
        orderSelect : true,
        selectPay : "선택안함",
        selectOption : req.session.selectOption
    })
};

const cDelete = async(req, res) => {
    const menuList = await useDB.query('select * from 메뉴항목');

    const { DeleteOrderNum, DeleteMenuNum } = req.body
    const DeleteOrder = await useDB.query(`
    delete from 주문내역 where 주문_주문번호 = ${DeleteOrderNum} and 메뉴항목_항목번호 = ${DeleteMenuNum} `)

    const orderList = await useDB.query(`
    select * from (주문내역 inner join 메뉴항목 on 주문내역.메뉴항목_항목번호 = 메뉴항목.항목번호) inner join 주문 on 주문내역.주문_주문번호 = 주문.주문번호 where 주문_주문번호 = ${req.session.orderNum}`)

    res.render("pMenu", {
        menuInfo : menuList[0],
        orderList : orderList[0],
        sessionLoginName : req.session.loginInfo.loginName,
        orderNumber : req.session.orderNum,
        orderSelect : true,
        selectPay : "선택안함",
        selectOption : req.session.selectOption
    })
}

const cConfrim = async(req, res) =>{
    req.session.confirm = true
    console.log(req.session.orderNum)
    const updateOrder = await useDB.query(`
    update 주문 set 주문방식 = "${req.session.selectPay}" where 주문번호 = "${req.session.orderNum}"`)
    return res.redirect("/")
}

const cSelect = async(req, res) => {
    const menuList = await useDB.query('select * from 메뉴항목');
    const orderList = await useDB.query(`
    select * from (주문내역 inner join 메뉴항목 on 주문내역.메뉴항목_항목번호 = 메뉴항목.항목번호) inner join 주문 on 주문내역.주문_주문번호 = 주문.주문번호 where 주문_주문번호 = ${req.session.orderNum}`)

    const { selected } = req.body
    if (selected == "선택안함"){
        req.session.selectOption = false;
        return res.render("pMenu", {
            menuInfo : menuList[0],
            orderList : orderList[0],
            sessionLoginName : req.session.loginInfo.loginName,
            orderNumber : req.session.orderNum,
            orderSelect : false,
            selectOption : req.session.selectOption,
            selectPay : selected
        })
    }else{
        req.session.selectOption = true;
        console.log(selected+"이다")
        req.session.selectPay = selected;
        return res.render("pMenu", {
            menuInfo : menuList[0],
            orderList : orderList[0],
            sessionLoginName : req.session.loginInfo.loginName,
            orderNumber : req.session.orderNum,
            orderSelect : true,
            selectOption : req.session.selectOption,
            selectPay : selected
        })
    }
}

const cSearch = async(req, res) => {
    const { search } = req.body

    const menuSearch = await useDB.query(`
    select * from 메뉴항목 where 이름 like "%${search}%"`)
    // console.log(menuSearch)

    req.session.searchInfo = search;

    let check = false;
    let orderList = undefined;
    if(req.session.orderUseSearch == true){
        check = true;
        orderList = await useDB.query(`
    select * from (주문내역 inner join 메뉴항목 on 주문내역.메뉴항목_항목번호 = 메뉴항목.항목번호) inner join 주문 on 주문내역.주문_주문번호 = 주문.주문번호 where 주문_주문번호 = ${req.session.orderNum}`)
        // req.session.orderUseSearch = false;
    }else{
        check = false;
        orderList = [[]]
    }

    return res.render("pMenu", {
        menuInfo : menuSearch[0],
        orderList : orderList[0],
        sessionLoginName : req.session.loginInfo.loginName,
        orderNumber : req.session.orderNum,
        orderSelect : check,
        selectOption : req.session.selectOption,
        selectPay : "선택안함"
    })
}

module.exports = { cMenu, cOrder, cOrderOK, cDelete, cConfrim, cSelect, cSearch } ;

/*
주문항목의 번호 들어가는 로직
기본적으로는 1000번부터 시작한다.

주문버튼을 누르면 아래 내용들이 실행된다.
만약 DB에 1000번이 존재하면 중복임.
그래서 DB 주문내역에서 최대 항목번호를 들고와서 +1시킨걸로 시작한다.
존재하지 않는다면 1000번이 시작이다.

위 과정 실행이후에 주문내역에 정보가 다 들어갔다면 
주문항목번호를 +1시켜서 다음 주문에 대비한다.

*/