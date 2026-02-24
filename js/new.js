//필터창 체크박스
const new_btn = document.querySelectorAll('.new_btn');

new_btn.forEach(button => {   
button.addEventListener('click',() => {
        button.classList.toggle('active');
     });
}) ;


//필터창 스크롤
document.addEventListener('DOMContentLoaded', () => {
  const scrollBox = document.querySelector('.scroll_box');
  if (scrollBox) {
    scrollBox.addEventListener('scroll', function() {
      console.log('영역 스크롤 중');
      console.log(scrollBox.scrollTop);
    });
  }
});



//필터창 초기화
document.addEventListener('DOMContentLoaded', () => {
  const new_reset = document.querySelector('.new_reset');
  const new_btns = document.querySelectorAll('.new_btn');

  if (new_reset) {
    new_reset.addEventListener('click', () => {
      new_btns.forEach(btn => btn.classList.remove('active'));
    });
  }
});