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

    const {option, menunum, count, pay} = req.body

    if(option == "1" && pay == undefined){
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
        

    }else if(option == "0" && pay == undefined){
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
    const { option, pay, selected } = req.body

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
    for(i = 0; i < bringBusketPrice[0].length; i++){
        totalPrice += bringBusketPrice[0][i].수량금액
        console.log(totalPrice)
    }

    console.log("총금액 계산완료")

    if(pay == "1" && option == undefined){
        // 장바구니 내용들 주문내역으로 옮기고 장바구니 안에 것들 삭제

        // bringBusketPrice가 자주 쓰일거임
        // 이거 역할은 가격만 뽑아오는건데 어쩌피 장바구니 안에
        // 리스트 다 뽑아올 수 있어서 걍 이걸로씀

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
        for(i = 0; i < bringBusketPrice[0].length; i++){
            const orderListAdd = await useDB.query(`
            insert into 주문내역(주문_주문번호, 메뉴항목_항목번호, 수량금액, 수량) values(?,?,?,?)`, [orderUser[0][0].maxorder, userBusket[0][i].메뉴항목_항목번호, userBusket[0][i].수량금액, userBusket[0][i].수량])
        }

        console.log("주문내역에 장바구니의 내용들 넣기 성공")

        // 장바구니에 있는 제품들에 대한 필요량 가져오기
        // 우선 현재 사용자 장바구니에서 메뉴 항목들 가져옴
        // userBusket에 관련 정보들이 담겨있음.

        // 현재 장바구니의 메뉴들의 필요량 가져오기
        for(let i = 0; i < bringBusketPrice[0].length; i++){
            // 우선 필요량 부터 가져옴
            const needItem = await useDB.query(`
            select 재료_재료이름, 필요양 from 레시피 where 메뉴항목_항목번호 = "${userBusket[0][i].메뉴항목_항목번호}"`)

            // 가져온 필요량을 바탕으로 재료에서 양을 줄임
            const reduceItem = await useDB.query(`
                update 재료 set 재료량 = 재료.재료량 - "${Number(needItem[0][i].필요양 * userBusket[0][i].수량)}" where 재료이름 = "${needItem[0][i].재료_재료이름}"`)
            }

         // 재고량 줄일때 주의! 아직 재고량이 필요양 보다 작을때 생기는 문제에 대한 예외 처리는 없음!
        console.log("장바구니에 있는 재료들 재료량 줄이기 성공")

        // 원래 장바구니에 있는거는 삭제
        const deleteBusket = await useDB.query(`
        delete from 장바구니 where 장바구니식별_장바구니번호 = "${bringBusketId[0][0].장바구니번호}"`)

        console.log("원래 장바구니에 있던거 초기화")

        return res.redirect("/moveBusket")
    }else if(pay == "0" && option == undefined){
        // 주문취소라서 그냥 장바구니 내용들 삭제

        const deleteBusket = await useDB.query(`
        delete from 장바구니 where 장바구니식별_장바구니번호 = "${bringBusketId[0][0].장바구니번호}"`)

        console.log('장바구니 담은거 취소 완료')

        return res.redirect("/moveBusket")
    }
    
}

module.exports = { busketView, busketOption, busketChecker }