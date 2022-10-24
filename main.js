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
  const liForDate = document.createElement("li");
  liForDate.setAttribute('class', "date");

  const textNode = document.createTextNode(selectDate);
  liForDate.appendChild(textNode);

  liForDate.addEventListener("click", modHeadNameClickEvent);

  document.getElementById("date-list").appendChild(liForDate);
}

// 1-2. 날짜 널,중복 검사 함수
function checkDate(selectDate) {
  if (selectDate === "") {
    alert("날짜를 선택해주세요!");
    return false;
  }

  try {
    Array.from(dates).forEach((date) => {
      if (date.innerText === selectDate)
        throw new Error("stop loop");
    })
  } catch (e) {
    alert("날짜가 이미 있어요!");
    return false;
  }
  return true;
}

// 1-3. 이벤트 추가
const addDateClickEvent = (e) => {
  const selectDate = document.getElementById("date-select").value;

  if (checkDate(selectDate))
    addDateList(selectDate);
}

// 1-4. '추가' 버튼에 이벤트 추가
const addBtn = document.getElementById("date-add");
addBtn.addEventListener("click", addDateClickEvent);



// ========= 2. 해당 날짜에 todo 추가하기 ==========

// todo feed에 input 추가
const dates = document.getElementsByClassName("date"); // 1-2에서도 쓰임...

// 2-1. 오른쪽 헤드 이름 바꾸는 함수
// ++추가 : '추가' 버튼에 날짜 데이터 전달
const modHeadNameClickEvent = (e) => {
  const date = e.srcElement.innerText;

  const headName = document.querySelector(".feed-right-head");
  headName.innerText = date + " 의 TODO";

  const todoAddBtn = document.getElementById("todo-add");
  todoAddBtn.dataset.date = date;

  // addFirstInput(date);
};

// 2-2. 인풋에 정보 입력시 아래에 li / div / btn 3개 (완료,삭제, +수정)




// function addFirstInput(date) {
//   const liForTodo = document.createElement("li");
//   liForTodo.setAttribute('class', date);

//   const inputForTodo = document.createElement("input");
//   inputForTodo.setAttribute('class', date);

//   liForTodo.appendChild(inputForTodo);

//   const completeBtn = document.createElement(button);
//   const deleteBtn = document.createElement(button);


//   document.getElementById("todo").appendChild(liForTodo);
//   document.getElementById("todo").appendChild(completeBtn);
//   document.getElementById("todo").appendChild(deleteBtn);

// }

// 2-2. 오른쪽 '추가' 클릭시, 인풋 value 아래에 찍힘
const addTodoClickEvent = (e) => {
  const todoDate = document.getElementById("todo-add").dataset.date; // 날짜
  const addContent = document.getElementById("todo-input").value; // 할일

  const liForTodo = document.createElement("li");
  liForTodo.setAttribute('class', todoDate);

  const textNode = document.createTextNode(addContent);
  liForTodo.appendChild(textNode);

  // 완료버튼 생성
  const completeBtn = document.createElement("button")
  completeBtn.setAttribute('class', todoDate)
  completeBtn.setAttribute('id', todoDate + "-completeBtn")
  completeBtn.innerText = "완료";
  completeBtn.addEventListener("click", completeClickEvent);

  // 삭제버튼 생성
  const deleteBtn = document.createElement("button")
  deleteBtn.setAttribute('class', todoDate)
  deleteBtn.setAttribute('id', todoDate + "-deleteBtn")
  deleteBtn.innerText = "삭제";

  liForTodo.appendChild(completeBtn);
  liForTodo.appendChild(deleteBtn);
  document.getElementById("todo").appendChild(liForTodo);
}

const todoAdd = document.getElementById("todo-add");
todoAdd.addEventListener("click", addTodoClickEvent);


// Array.from(dates).forEach((date) => {
//   date.addEventListener("click", addTodoClickEvent);
// });

// ========= 3. 해당 날짜의 input만 보이게 하기 ========

// 3-1. 날짜 클릭시 (해당날짜) -> '해당날짜'

// ========= 4. 완료 - 빗금 =========--
// const completeClickEvent = (e) => {
//   const
// }

