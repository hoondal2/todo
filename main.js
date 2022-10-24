/* 규칙. 
1. html event 금지
2. addEventListener 사용하기
3. var 사용금지
4. css 너무 신경쓰지 말기.
5. css 하고 싶다 -> display flex grid
*/

/**
 * 구현할 기능 목록
 * 1. 날짜선택으로 todo 추가 가능 (중복 불가)
 * 2. todo 추가 (여러개 가능)
 * 3. todo 수정, 삭제, 완료, 완료취소 기능
 * 4. 날짜 클릭으로 펼치기,닫기
 */


// ========= 1. 날짜 추가하기 (중복 불가) ==========

// 1-1. 날짜 추가 함수
function addDateList(selectDate) {
  const li = document.createElement("li");
  li.setAttribute('class', "date");
  li.setAttribute('id', selectDate);

  const textNode = document.createTextNode(selectDate);
  li.appendChild(textNode);

  document.getElementById("date-list").appendChild(li);
}

// 1-2. 날짜 중복 검사 함수
function checkDuplicate(selectDate) {
  try {
    Array.from(dates).forEach((date) => {
      if (date.innerText === selectDate)
        throw new Error("stop loop");
    })
  } catch (e) {
    alert("이미 있어요");
    return false;
  }
  return true;
}

// 1-3. 이벤트추가
const addClickEvent = (e) => {
  const selectDate = document.getElementById("date-select").value;

  if (checkDuplicate(selectDate))
    addDateList(selectDate);
}


// ========= 2. 해당 날짜에 todo 추가하기 ==========

// 추가버튼 변수
const addBtn = document.getElementById("date-add");

// 추가버튼에 이벤트 추가
addBtn.addEventListener("click", addClickEvent);


//////////////////////////////////////////////////////////

const dates = document.getElementsByClassName("date");

const clickEvent = (e) => {
  console.log(e);
};

Array.from(dates).forEach((date) => {
  date.addEventListener("click", clickEvent);
});
