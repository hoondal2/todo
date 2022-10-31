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


/**
 * 10/27 변경사항
 * 1. getElement~ => 함수 밖으로 이동
 * 2. 버튼 생성 함수 추가
 * 3. todoContent 추가시 유효성 검사
 * 4. todoContent 추가후 input창 초기화
 * 5. 삭제 기능 추가
 * 6. input창 초기화
 * 7. 날짜 클릭시 todo 리스트 변경 / 클릭시 해당 클래스네임이 아니면 display:none, 해당 클래스면 block 
 * 8. 완료 기능 추가 => 질문
 */


/**
 * 10/31 변경사항
 * 1. 완료 이벤트 함수 통합
 * 2. 날짜 클릭시 todo 리스트 변경 
 * 3. // 유효성 검사 함수 나누기 (해야됨)
 * 4. 수정 기능 추가
 * 5. // 체크박스로 변경 (해야됨)
 * 6. 엔터키 활성화 
 * 7. 날짜 삭제 (해야됨) -> 반만 삭제됨 .... 
 * 8. 날짜 정렬 (해야됨) -> 
 */


// ========= 1. 날짜 추가하기 (중복 불가) ==========
const dates = document.getElementsByClassName("date");

// 1-1. 날짜 추가 함수
function addDateList(selectDate) {
  const liEl = document.createElement("li");
  liEl.setAttribute('class', "date");

  const textNode = document.createTextNode(selectDate);
  liEl.appendChild(textNode);

  const deleteDateBtn = createBtn(selectDate, "삭제")
  deleteDateBtn.addEventListener("click", () => {
    // 1. 부모 li 삭제
    // 2. 클래스가 부모li innerText와 같은 li 삭제
    console.log(deleteDateBtn.parentElement) // 삭제
    deleteDateBtn.parentElement.remove();

    const parentTodoEl = document.getElementById("todo");
    const todoEl = parentTodoEl.children
    console.log(todoEl.length);
    for (let i = 0; i < todoEl.length; i++) {
      if (todoEl[i].className === selectDate) {
        console.log(selectDate);
        console.log(todoEl[i].className);
        todoEl[i].remove();
      }
    }
  })

  liEl.appendChild(deleteDateBtn);
  liEl.addEventListener("click", () => { headNameClickEvent(selectDate) });

  document.getElementById("date-list").appendChild(liEl);
  //document.getElementById("date-list").insertBefore(앞,뒤);
  // console.log(document.getElementById("date-list").children);

  // document.getElementById("date-list").children.sort;
}

// ++날짜 정렬 함수 
// insertBefore() 사용 => 새로운 노드를 특정 자식 노드 바로 앞에 추가
// 


// 1-2. 날짜 널,중복 검사 함수
function checkDate(selectDate) {
  if (selectDate === "") {
    alert("날짜를 선택해주세요!");
    return false;
  }

  // if(isEmpty(selectDate)){
  //   alert("날짜를 선택해주세요!");
  // }

  // 함수 만들기
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
const addDateClickEvent = () => {
  const selectDate = document.getElementById("date-select").value;

  if (checkDate(selectDate))
    addDateList(selectDate);
}

// 1-4. '추가' 버튼에 이벤트 추가
const addBtn = document.getElementById("date-add");
addBtn.addEventListener("click", () => {
  addDateClickEvent();
});

// 1-5 날짜 리스트 정렬



// ========= 2. 해당 날짜에 todo 추가하기 ==========

// todo feed에 input 추가

// 2-1. 오른쪽 헤드 이름 바꾸는 함수
// ++추가 : '추가' 버튼에 날짜 데이터 전달
const headNameClickEvent = (date) => {
  //const date = e.srcElement.innerText; //target.value
  const headName = document.querySelector(".feed-right-head");
  headName.innerText = date + " 의 TODO";

  const todoAddBtn = document.getElementById("todo-add");
  todoAddBtn.dataset.date = date;

  // addFirstInput(date);
  // 클릭시 해당 날짜의 클래스만 나오도록함
  changeTodoList(date);
};

const changeTodoList = (date) => {
  // 부모(ul)의 아이디가 "todo"인 li 찾기
  const todoListParentEl = document.getElementById("todo");
  const todoListEl = todoListParentEl.children;

  for (let i = 0; i < todoListEl.length; i++) {
    if (todoListEl[i].className === date) {
      todoListEl[i].style.display = "block";
    } else {
      todoListEl[i].style.display = "none";
    }
  }

}

// todoContent추가시 유효성 검사 / 나누기
const validateContent = (date, content) => {
  if (date === "") {
    alert("날짜를 선택해주세요!");
    return false;
  } else if (content === "") {
    alert("내용을 입력해주세요!");
    return false;
  }
  return true;
}

// 2-2. 오른쪽 '추가' 클릭시, 인풋 value 아래에 찍힘
const addTodoClickEvent = (e) => {
  const todoDate = document.getElementById("todo-add").dataset.date; // 날짜
  const todoContent = document.getElementById("todo-input").value; // 할일

  if (!validateContent(todoDate, todoContent)) { return; }

  const todoEl = document.createElement("li");
  todoEl.setAttribute('class', todoDate);

  const textEl = document.createElement("span");
  const textNode = document.createTextNode(todoContent);
  textEl.appendChild(textNode);
  todoEl.appendChild(textEl);


  const completeBtn = createBtn(todoDate, "완료");
  const deleteBtn = createBtn(todoDate, "삭제");
  const modifyBtn = createBtn(todoDate, "수정");


  // 버튼 이벤트 추가
  completeBtn.addEventListener("click", () => { todoComplete(textEl, completeBtn) }) // ?????
  deleteBtn.addEventListener("click", () => {
    if (confirm("정말 삭제하시겠어요?"))
      todoEl.remove()
  })
  modifyBtn.addEventListener("click", () => { todoModify(textEl, modifyBtn, todoContent) })

  todoEl.appendChild(completeBtn);
  todoEl.appendChild(modifyBtn);
  todoEl.appendChild(deleteBtn);

  document.getElementById("todo").appendChild(todoEl);

  // 인풋창 초기화
  document.getElementById("todo-input").value = "";
}

// 수정 이벤트
const todoModify = (textEl, modifyBtn, todoContent) => {
  if (modifyBtn.innerText === "수정") {
    textEl.innerHTML = '<input id = "modify-input" value="' + textEl.innerText + '">';
    modifyBtn.innerText = "수정완료";
  } else {
    // input 삭제
    // innerText에 input value 넣기
    // 입력안하면 리셋
    modValue = document.getElementById("modify-input").value;
    if (modValue === '') {
      alert("내용을 입력하세요")
      textEl.innerHTML = '';
      textEl.innerText = todoContent;
      modifyBtn.innerText = "수정";
      return;
    }
    textEl.innerHTML = '';
    textEl.innerText = modValue;
    modifyBtn.innerText = "수정";
  }
}

// 완료 이벤트
// 버튼 클릭시 완료 버튼은 완료취소로 바뀌고, 빗금 생김
// 함수형 프로그래밍
const todoComplete = (textEl, completeBtn) => {
  if (textEl.style.textDecorationLine === "line-through") {
    textEl.style.textDecorationLine = '';
    completeBtn.innerText = "완료";
  } else {
    textEl.style.textDecorationLine = "line-through";
    completeBtn.innerText = "취소";
  }
}

// todo-list 이벤트 추가
// ++ 엔터키 활성화
const todoAdd = document.getElementById("todo-add");
todoAdd.addEventListener("click", addTodoClickEvent);

const todoContent = document.getElementById("todo-input");
todoContent.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodoClickEvent();
  }
});

// 버튼 만드는 함수
const createBtn = (date, btnName) => {
  const newBtn = document.createElement("button");
  newBtn.setAttribute('class', date);
  newBtn.innerText = btnName;
  return newBtn;
}