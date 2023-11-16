const useDB = require("../../middleware/db");
const time = require("../function/time");
const today = `${time.time().year}-${time.time().month}-${time.time().date}`

let ordernum = 1000;

const cDetail = async(req, res) => {

    req.session.confirm = true;

    const menuData = req.query.data;
    const menuDataJSON = JSON.parse(menuData)

    const totalInfo = await useDB.query(`
    select * from (조합법 inner join 재료 on 조합법.재료_재료이름 = 재료.재료이름) inner join 메뉴항목 on 조합법.메뉴항목_항목번호 = 메뉴항목.항목번호 where 메뉴항목_항목번호 = ${menuDataJSON.menuId}`)
    // console.log(totalInfo[0])
    // console.log(menuDataJSON.menuName)
    res.render('pDetail', {
        totalInfo : totalInfo[0],
        menuName : menuDataJSON.menuName,
        orderNumber : req.session.orderNum,
        today : today
    })
}


const cOrderDetail = async(req, res) =>{
    if (req.session.loginInfo.loginId != undefined){
        try{
            console.log("주문 테이블에 값(사용자정보) 존재(상세정보쪽)")
            const detailMax = await useDB.query(`
            select max(주문번호) maxnum from 주문`)
            const Maxnum = detailMax[0][0].maxnum
            if(Maxnum != null){
                ordernum = Maxnum + 1
            }else{
                ordernum = 1000
            }
        }catch{
            console.log("주문 테이블에 값(사용자정보) 존재 안함.(상세정보쪽)")
        }
        
        const {detailNumber, detailPrice, detailCount, selected} = req.body

        if (selected == "선택안함"){
            return res.send('<script type = "text/javascript">alert("카드선택을 하세요!"); location.href="/moveMenu";</script>')
        }else{
            const detailOk = await useDB.query(`
            insert into 주문(주문번호, 고객_고객아이디, 주문날짜, 주문방식) values(?,?,?,?)`, [ordernum, req.session.loginInfo.loginId, today, selected])
    
            console.log("주문 테이블에 들어감(상세정보쪽)")
        }


        // try{
            if(detailCount != 0){
                const detailInput = await useDB.query('insert into 주문내역(주문_주문번호, 메뉴항목_항목번호, 총금액, 총수량) values(?,?,?,?)',[ordernum, detailNumber, detailPrice * detailCount, detailCount] )
                console.log("주문내역 성공적!(상세정보쪽)")
            }else{
                console.log("0개는 불가능!(상세정보쪽)")
            }
        // }catch{
            // 어쩌피 페이지 바로 넘어가서 이거는 뜰일 잘 없음
            // console.log("주문내역 중복발생!(상세정보쪽)")
        // }

        req.session.orderNum = ordernum;
        req.session.confirm = true;


    }else{
        return res.send('<script type = "text/javascript">alert("로그인부터 하세요!"); location.href="/moveLogin";</script>')
    }
    return res.redirect("/");
}

module.exports = { cDetail, cOrderDetail }