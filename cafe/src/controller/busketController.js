const useDB = require("../../middleware/db");
const time = require("../function/time")

// 오늘 날짜 추출하는 함수
const today = `${time.time().year}-${time.time().month}-${time.time().date}`

// 장바구니 화면 보여주기
const busketView = async(req, res) => {

    console.log("장바구니 화면 성공")

    // 접속 유저의 장바구니번호 가져오기
    const busketNum = await useDB.query(`
    select 장바구니번호 from 장바구니식별 where 고객_아이디 = "${req.session.userid}"`)

    console.log("장바구니 식별 번호 가져옴.")

    // 장바구니번호로 장바구니 리스트를 가져옴, 메뉴항목번호와 조인사용
    const busketList = await useDB.query(`
    select * from 장바구니 inner join 메뉴항목 on 장바구니.메뉴항목_항목번호 = 메뉴항목.항목번호 where 장바구니식별_장바구니번호 = "${busketNum[0][0].장바구니번호}"`)

    console.log("장바구니 리스트 가져오기 성공")

    return res.render("Busket", {
        uid : req.session.userid,
        busketList : busketList[0]
    })
}

// 장바구니에서 수량수정, 삭제를 선택해서 하는 부분
const busketOption = async(req, res) => {

    // 선택부분에서 중요한것
    // option은 수량변경이랑 취소 관련임
    // option = 1 수량변경, option = 0 삭제
    // 선택한 버튼의 값이 아니면 보통 undefiend로 들어와짐

    // menunum = 항목번호
    // count = 현재 수량

    console.log("장바구니에서 선택부분 진입")

    const {option, menunum, count} = req.body

    if(option == "1"){
    // 장바구니 리스트에서 수량 변경하는 경우

        // 메뉴항목에서 우선 메뉴가격부터 가져옴. (가격 * 갯수) 계산 목적
        const menuPrice = await useDB.query(`
        select 메뉴가격 from 메뉴항목 where 항목번호 = "${Number(menunum)}"`)

        // 장바구니에서 메뉴 수량 수정과 그에 따른 총금액 수정
        try{
            const countChange = await useDB.query(`
            update 장바구니 set 수량 = "${Number(count)}", 수량금액 = "${Number(count * menuPrice[0][0].메뉴가격)}" where 메뉴항목_항목번호 = "${Number(menunum)}"`)

            console.log("장바구니에서 해당 메뉴 수정 성공")

            return res.redirect("/moveBusket")
        }catch{

            console.log("장바구니 수량 변경 과정에서 문제 발생")

        }
        

    }else if(option == "0"){
    // 장바구니 리스트에서 삭제하는 경우

        const menuDelete = await useDB.query(`
        delete from 장바구니 where 메뉴항목_항목번호 = "${Number(menunum)}"`)

        console.log("장바구니에서 해당 메뉴 삭제 성공")

        return res.redirect("/moveBusket")
    }

    return res.render("Busket")
}

// 장바구니의 내용들 구매확인 또는 삭제를 위한 체커역할
const busketChecker = async(req, res) => { 

    // pay = 1 주문하기
    // pay = 0 주문취소(장바구니 내용들 삭제)
    // selected = 결제수단 
    const { pay, selected } = req.body

    // 현재 사용자의 장바구니 번호 가져오기
    const bringBusketId = await useDB.query(`
    select 장바구니번호 from 장바구니식별 where 고객_아이디 = "${req.session.userid}"`)

    console.log("현재 사용자 장바구니 번호 가져오기 성공")

    // 총금액 계산을 위한 가격들 들고오기
    const bringBusketPrice = await useDB.query(`
    select 수량금액 from 장바구니 where 장바구니식별_장바구니번호 = "${bringBusketId[0][0].장바구니번호}"`)

    console.log("총금액 계산 가격들고오기 성공")

    let totalPrice = 0;

    // 총금액 계산
    for(i = 0; i < bringBusketPrice.length; i++){
        totalPrice += bringBusketPrice[0][i].수량금액
    }

    console.log("총금액 계산완료")

    if(pay == "1"){
        // 장바구니 내용들 주문내역으로 옮기고 장바구니 안에 것들 삭제

        // 주문 테이블에 주문자 정보 우선 저장
        const orderAdd = await useDB.query(`
        insert into 주문(고객_아이디, 주문날짜, 주문방식, 총금액) values(?,?,?,?)`, [req.session.userid, today, selected, totalPrice ])

        console.log("주문자 우선 저장 성공")

        // 마지막에 주문한 주문번호 우선 가져옴.
        const orderUser = await useDB.query(`
        select max(주문번호) maxorder from 주문 where 고객_아이디 = "${req.session.userid}"`)

        console.log("주문테이블의 현재 사용자의 마지막 주문번호 가져오기 성공")

        // 현재 사용자의 장바구니 목록 전체 가져오기
        const userBusket = await useDB.query(`
        select * from 장바구니 where 장바구니식별_장바구니번호 = "${bringBusketId[0][0].장바구니번호}"`)
        
        console.log("장바구니 목록 가져오기 성공")

        // 현재 장바구니 테이블의 현재 사용자의 장바구니 항목 갯수 계산
        // 주문내역에 넣기
        for(i = 0; i < bringBusketPrice.length; i++){
            const orderListAdd = await useDB.query(`
            insert into 주문내역(주문_주문번호, 메뉴항목_항목번호, 수량금액, 수량) values(?,?,?,?)`, [orderUser[0][0].maxorder, userBusket[0][i].메뉴항목_항목번호, userBusket[0][i].수량금액, userBusket[0][i].수량])
        }

        console.log("주문내역에 장바구니의 내용들 넣기 성공")

        // 원래 장바구니에 있는거는 삭제
        const deleteBusket = await useDB.query(`
        delete from 장바구니 where 장바구니식별_장바구니번호 = "${bringBusketId[0][0].장바구니번호}"`)

        console.log("원래 장바구니에 있던거 초기화")

        return res.redirect("/moveBusket")
    }else{
        // 주문취소라서 그냥 장바구니 내용들 삭제

        const deleteBusket = await useDB.query(`
        delete from 장바구니 where 장바구니식별_장바구니번호 = "${bringBusketId[0][0].장바구니번호}"`)

        console.log('장바구니 담은거 취소 완료')

        return res.redirect("/moveBusket")
    }
    
}

module.exports = { busketView, busketOption, busketChecker }