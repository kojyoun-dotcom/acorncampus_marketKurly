//필터창 체크박스
const best_btn = document.querySelectorAll('.best_btn');

best_btn.forEach(button => {   
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
  const best_reset = document.querySelector('.best_reset');
  const best_btns = document.querySelectorAll('.best_btn');

  if (best_reset) {
    best_reset.addEventListener('click', () => {
      best_btns.forEach(btn => btn.classList.remove('active'));
    });
  }
});
