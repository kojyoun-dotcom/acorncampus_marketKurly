const countSpan = document.querySelector('.count-stepper span');
const plusBtn = document.querySelector('.plus-btn');
const minusBtn = document.querySelector('.minus-btn');
const totalPrice = document.querySelector('.total-price'); 

// 초기 데이터 설정
const price = 38800; 
let currentCount = 1; //1부터 시작하게

// 금액에 콤마를 찍어주는 함수
function formatPrice(result) {
    return result.toLocaleString(); // 38800 -> "38,800"
}

// 화면에 보여주는 함수
function updateAll() {
    // 수량 업데이트
    countSpan.textContent = currentCount;
    
    // 총 금액 계산 및 업데이트
    const total = price * currentCount;
    totalPrice.innerHTML = `${formatPrice(total)}<span>원</span>`;
}

// 이벤트 리스너

// 플러스 버튼
plusBtn.addEventListener('click', () => {
    currentCount++;
    updateAll();
});

// 마이너스 버튼
minusBtn.addEventListener('click', () => {
    if (currentCount > 1) {
        currentCount--;
        updateAll();
    }
});
