const useDB = require("../../middleware/db");

const cMenu = async(req, res) => {
    console.log('메뉴페이지 완료');
    const menuList = await useDB.query('select * from 메뉴항목');
    try{
        console.log(menuList[0]);
        console.log('메뉴 불러오기 성공');
    }catch{
        console.log("메뉴불러오기 오류");
    }
    res.render('pMenu',{
        menuInfo : menuList[0]
    });
}

module.exports = { cMenu };