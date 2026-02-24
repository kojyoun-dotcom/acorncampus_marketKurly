function initializeFooter() {
    // 푸터 영역으로 범위를 좁혀서 요소를 안전하게 찾습니다.
    const footer = document.getElementById("footer-placeholder");
    if (!footer) return;

    const kakaoBtn = footer.querySelector("#kakao");
    const personalBtn = footer.querySelector("#personal");
    const massBtn = footer.querySelector("#mass");
    const modal = footer.querySelector("#footer-modal"); // footer-modal을 찾도록 수정
    const closeBtn = modal.querySelector(".closeBtn");

    // '카카오톡 문의' 버튼 클릭 시 모달 열기
    kakaoBtn.addEventListener("click", function () {
        modal.classList.add("active");
    });

    // 모달의 '확인' 버튼 클릭 시 모달 닫기
    closeBtn.addEventListener("click", function () {
        modal.classList.remove("active");
    });

    // 모달 바깥 영역 클릭 시 닫기
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

    // '1:1 문의' 버튼 클릭 이벤트
    personalBtn.addEventListener("click", () => {
        alert("1:1 문의 페이지로 이동합니다. (구현 필요)");
    });

    // '대량주문 문의' 버튼 클릭 시 구글 폼으로 이동 (새 탭에서 열기)
    massBtn.addEventListener("click", () => {
        window.open("https://docs.google.com/forms/d/e/1FAIpQLScWcjRuN6eWJK-G8x3NwBfE8IyKZIOq7jhD3fUXuKSWwPqzJw/viewform", "_blank");
    });
}