function initializeHeader() {
  // 이 함수는 include.js에 의해 header.html이 로드된 후 호출됩니다.
  const memberMenuList = document.getElementById("member-menu-list");
  if (!memberMenuList) return; // 헤더에 메뉴 리스트가 없으면 중단

  // 1. 로그인 상태 확인 (localStorage)
  // login.js에서 로그인 성공 시 'loggedInUser' 키로 사용자 정보를 저장합니다.
  const loggedInUserJSON = localStorage.getItem("loggedInUser");

  // 고객센터 메뉴 HTML은 구조가 복잡하므로 미리 저장해둡니다.
  const customerServiceHTML = `
    <li>
        <a href="#">고객센터▼</a>
        <ul class="customer">
            <li><a href="#">공지사항</a></li>
            <li><a href="#">자주하는질문</a></li>
            <li><a href="#">1:1문의</a></li>
            <li><a href="#">대량주문 문의</a></li>
        </ul>
    </li>
  `;

  if (loggedInUserJSON) {
    // 로그인된 사용자가 있으면 환영 메시지와 로그아웃 버튼을 표시
    const loggedInUser = JSON.parse(loggedInUserJSON);

    memberMenuList.innerHTML = `
      <li><span class="user-name">${loggedInUser.name}님 접속중</span></li>
      <li><a href="#" id="logoutBtn">로그아웃</a></li>
      ${customerServiceHTML}
    `;

    // 로그아웃 버튼 이벤트 리스너 추가
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("로그아웃 하시겠습니까?")) {
        localStorage.removeItem("loggedInUser"); // localStorage에서 사용자 정보 삭제
        alert("로그아웃 되었습니다.");
        window.location.reload(); // 페이지 새로고침하여 상태 반영
      }
    });
  } else {
    // 로그인되지 않은 상태일 때 로그인/회원가입 버튼 표시
    memberMenuList.innerHTML = `
      <li><a href="/signUp.html">회원가입</a></li>
      <li><a href="/login.html">로그인</a></li>
      ${customerServiceHTML}
    `;
  }

  // 2. 신규 회원가입 후 리디렉션 확인 (sessionStorage)
  const newMemberJSON = sessionStorage.getItem("newMember");
  if (newMemberJSON) {
    const newMember = JSON.parse(newMemberJSON);
    alert(`회원가입을 환영합니다, ${newMember.name}님! 로그인 후 서비스를 이용해주세요.`);
    sessionStorage.removeItem("newMember");
  }
}