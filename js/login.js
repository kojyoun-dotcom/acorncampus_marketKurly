document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;

    if (!userId || !password) {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    // localStorage에서 가상 DB 가져오기
    const userDB = JSON.parse(localStorage.getItem('userDB')) || [];

    // 입력된 아이디와 비밀번호가 일치하는 사용자 찾기
    const foundUser = userDB.find(user => user.id === userId && user.password === password);

    if (foundUser) {
      // 로그인 성공
      alert(`${foundUser.name}님, 환영합니다!`);

      // 로그인 상태 유지를 위해 localStorage에 현재 로그인한 사용자 정보 저장
      // (주의: 실제 서비스에서는 민감한 정보를 localStorage에 저장하지 않습니다.)
      localStorage.setItem('loggedInUser', JSON.stringify(foundUser));

      // 메인 페이지로 이동
      window.location.href = '/index.html';
    } else {
      // 로그인 실패
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  });
});