const useDB = require("../../middleware/db");
const time = require("../function/time");
const today = `${time.time().year}-${time.time().month}-${time.time().date}`


const cMenu = async(req, res) => {
    console.log('메뉴페이지 완료');
    const menuList = await useDB.query('select * from 메뉴항목');
    try{
        // console.log(menuList[0]);
        console.log('메뉴 불러오기 성공');
    }catch{
        console.log("메뉴불러오기 오류");
    }
    res.render('pMenu',{
        menuInfo : menuList[0],
        sessionLoginName : req.session.loginInfo.loginName,
    });
}


// 주문항목들을 추가하기 위한 밑작업
const cOrder = async(req, res) => {
    console.log("주문 버튼 누름");
    const { menuNumber, menuPrice, menuCount } = req.body;
    const menuUnit = await useDB.query('select * from 메뉴단위');
    console.log(menuUnit[0])
    if (menuCount > 0){
        const addMenu = await useDB.query(`
        insert into 메뉴단위(주문_주문날짜, 메뉴항목_항목번호, 주문수량, 주문가격,고객_고객아이디 ) values(?,?,?,?,?)
        `,[today, menuNumber, menuCount, menuPrice * menuCount, req.session.loginInfo.loginId]);

        return res.redirect("/moveMenu")
    }else{
        console.log("0보다 작음")
        res.send(
            `<script type = "text/javascript">alert("0개는 불가능합니다."); location.href="/moveMenu"</script>`
        )
    }
}

module.exports = { cMenu, cOrder};