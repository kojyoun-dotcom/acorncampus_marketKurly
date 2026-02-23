const container = document.querySelector('.container');
const images = document.querySelectorAll('.mainBox');

// 1. 첫 번째 이미지 복제하여 마지막에 추가
const firstClone = images[0].cloneNode(true);
container.appendChild(firstClone);

let currentIndex = 0;
const totalImages = images.length; // 원본 개수 (13개)
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

// 3초마다 실행
setInterval(slide, 5000);