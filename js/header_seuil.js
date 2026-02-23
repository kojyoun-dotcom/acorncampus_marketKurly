function initializeHeader() {
  // 이 함수는 include.js에 의해 header.html이 로드된 후 호출됩니다.
  const userMenuDiv = document.getElementById("header-user-menu");
  if (!userMenuDiv) return; // 헤더에 user-menu가 없으면 중단

  // 1. 로그인 상태 확인 (localStorage)
  const loggedInUserJSON = localStorage.getItem("loggedInUser");

  if (loggedInUserJSON) {
    // 로그인된 사용자가 있으면 환영 메시지와 로그아웃 버튼을 표시
    const loggedInUser = JSON.parse(loggedInUserJSON);
    console.log("[헤더] 로그인된 사용자 정보:", loggedInUser);

    userMenuDiv.innerHTML = `
      <span class="user-name">${loggedInUser.name}님</span>
      <span class="bar">|</span>
      <a href="#" id="logoutBtn">로그아웃</a>
    `;

    // 로그아웃 버튼 이벤트 리스너 추가
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("로그아웃 되었습니다.");
      localStorage.removeItem("loggedInUser"); // localStorage에서 사용자 정보 삭제
      window.location.reload(); // 페이지 새로고침하여 상태 반영
    });
  } else {
    // 로그인되지 않은 상태일 때 로그인/회원가입 버튼 표시
    userMenuDiv.innerHTML = `
      <a href="/signUp.html">회원가입</a>
      <span class="bar">|</span>
      <a href="/login.html">로그인</a>
    `;
  }

  // 2. 신규 회원가입 후 리디렉션 확인 (sessionStorage)
  const newMemberJSON = sessionStorage.getItem("newMember");
  if (newMemberJSON) {
    const newMember = JSON.parse(newMemberJSON);
    alert(`회원가입을 환영합니다, ${newMember.name}님!`);
    sessionStorage.removeItem("newMember");
  }
}