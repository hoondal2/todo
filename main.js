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

const dates = document.getElementsByClassName("date");

const clickEvent = (e) => {
  console.log(e);
};

Array.from(dates).forEach((date) => {
  date.addEventListener("click", clickEvent);
});
