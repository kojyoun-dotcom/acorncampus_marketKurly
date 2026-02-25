/*
 *  공통 HTML 컴포넌트(헤더, 푸터 등)를 동적으로 불러오고,
 *              관련 스크립트를 초기화하는 역할을 합니다.
 *              이 방식을 사용하면 여러 페이지에서 헤더와 푸터를 재사용할 수 있어 유지보수가 용이해집니다.
 */

/**
 * 지정된 URL에서 HTML 컴포넌트를 비동기적으로 불러와 특정 ID를 가진 요소에 삽입합니다.
 * 로딩이 완료된 후에는 선택적으로 콜백 함수를 실행합니다.
 *
 * @param {string} id - HTML을 삽입할 대상 요소의 ID. 예: 'header-placeholder'
 * @param {string} url - 불러올 HTML 파일의 경로. 예: 'header.html'
 * @param {function} [callback] - HTML 삽입이 완료된 후 실행할 콜백 함수.
 *                                이 콜백은 동적으로 로드된 HTML 요소에 이벤트 리스너를 바인딩하는 등
 *                                후속 작업을 처리하는 데 매우 중요합니다.
 */
function loadComponent(id, url, callback) { // 1. fetch API를 사용하여 지정된 URL의 HTML 파일을 가져옵니다.
  fetch(url)
    .then((response) => response.text()) // 2. 응답(response)을 텍스트 형태로 변환합니다.
    .then((data) => { // 3. 텍스트로 변환된 HTML 데이터(data)를 처리합니다.
      document.getElementById(id).innerHTML = data; // 4. 지정된 ID를 가진 요소의 내부 HTML을 가져온 데이터로 교체합니다.
      //   이 시점에 비로소 header.html의 내용이 index.html에 삽입됩니다.
      if (callback) { // 5. 콜백 함수가 인자로 전달되었다면, HTML 삽입이 완료된 후에 실행합니다.
        callback(); //    이를 통해 스크립트가 존재하지 않는 DOM 요소에 접근하려는 타이밍 문제를 해결합니다.
      }
    });
}

// --- 페이지 로드 시 컴포넌트 실행 ---

// 1. 헤더 컴포넌트 로드
// 'header-placeholder' ID를 가진 요소에 'header.html'을 삽입하고,
// 완료되면 헤더 관련 스크립트 초기화 함수들을 실행합니다.
loadComponent("header-placeholder", "header.html", () => {
  initializeHeader(); // 로그인/로그아웃 UI 처리 (header_seuil.js)
  initializeHeaderNav(); // 햄버거 메뉴, 검색 등 상호작용 처리 (header_jy.js)
});

// 2. 푸터 컴포넌트 로드
// 'footer-placeholder' ID를 가진 요소에 'footer.html'을 삽입하고,
// 완료되면 푸터 관련 스크립트 초기화 함수를 실행합니다.
loadComponent("footer-placeholder", "footer.html", () => {
  initializeFooter(); // 푸터 버튼 및 모달 상호작용 처리 (footer.js)
});
