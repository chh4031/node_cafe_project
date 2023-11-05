const useDB = require("../../middleware/db");

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
        sessionLoginName : req.session.loginInfo.loginName
    });
}


// 주문항목들을 추가하기 위한 밑작업
const cOrder = async(req, res) => {
    console.log("주문 버튼 누름");
    const { menuNumber, menuName, menuPrice, menuClass, menuCount } = req.body;
    console.log(menuNumber, menuName, menuPrice, menuClass, menuCount);

    // const {} = req.body
    // const orderMenu = await useDB.query(`
    // insert into 메뉴단위

    // `    )
    return res.redirect("/moveMenu")
}

module.exports = { cMenu, cOrder };