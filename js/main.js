
//1. main 헤더 이미지 넘어가는 부분
const container = document.querySelector('.container');
const images = document.querySelectorAll('.mainBox');

const firstClone = images[0].cloneNode(true);
container.appendChild(firstClone);

let currentIndex = 0;
const totalImages = images.length; // 이미지13개
const imgWidth = 1900;

function slide() {
    currentIndex++;
    
    // 부드럽게 이동 시작
    container.style.transition = '0.5s ease-in-out';
    container.style.transform = `translateX(${-currentIndex * imgWidth}px)`;

    // 마지막 복제본 이미지에 도달했을 때
    if (currentIndex === totalImages) {
        setTimeout(() => {
            // 애니메이션(transition)을 끄고 순식간에 진짜 1번 위치로 점프
            container.style.transition = 'none';
            currentIndex = 0;
            container.style.transform = `translateX(0px)`;
        }, 500); // transition 시간(0.5s)이 끝난 직후 실행
    }
}

setInterval(slide, 5000);



//2. nextButton, backButton
const sections = document.querySelectorAll('section');

sections.forEach((section) => { //현재 section안에서만 요소찾기
  const slideList = section.querySelector('.slide-list');
  const nextBtn = section.querySelector('.nextButton');
  const backBtn = section.querySelector('.backButton');

  if (!slideList || !nextBtn || !backBtn) return; // 요소가 없으면 건너뛰게

  let currentIdx = 0;
  const slideWidth = 1068; // 이동 거리
  const maxIdx = 1; // 총 2페이지 기준

  nextBtn.addEventListener('click', () => {
    if (currentIdx < maxIdx) {
      currentIdx++;
      slideList.style.transform = `translateX(-${currentIdx * slideWidth}px)`;
    }
  });

  backBtn.addEventListener('click', () => {
    if (currentIdx > 0) {
      currentIdx--;
      slideList.style.transform = `translateX(-${currentIdx * slideWidth}px)`;
    }
  });
});