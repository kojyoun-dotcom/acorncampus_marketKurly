/**
 * 헤더 및 푸터 한번에 관리
 */
function loadComponent(id, url, callback) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
      if (callback) {
        callback();
      }
    });
}

// 실행
loadComponent("header-placeholder", "header.html", () => {
  initializeHeader(); // 로그인/로그아웃 UI 처리
  initializeHeaderNav(); // 햄버거 메뉴, 검색 등 상호작용 처리
});
loadComponent("footer-placeholder", "footer.html", () => {
  initializeFooter(); // 푸터 버튼 및 모달 상호작용 처리
});
