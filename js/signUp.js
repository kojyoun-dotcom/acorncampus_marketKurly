document.addEventListener("DOMContentLoaded", () => {
  // --- Mock DB 초기화 ---
  // 실제로는 서버와 통신해야 하지만, 클라이언트 사이드에서 테스트하기 위해 localStorage를 사용합니다.
  const initializeMockDB = () => {
    if (!localStorage.getItem("userDB")) {
      const mockUsers = [
        { id: "kurly123", email: "kurly123@kurly.com", name: "마켓컬리" },
        { id: "tester", email: "tester@example.com", name: "테스터" },
      ];
      localStorage.setItem("userDB", JSON.stringify(mockUsers));
      console.log("Mock DB가 초기화되었습니다.");
    }
  };
  initializeMockDB();

  // --- 중복 확인 상태를 관리하는 플래그 ---
  let isIdChecked = false;
  let isEmailChecked = false;

  // --- DOM 요소 ---
  const userIdInput = document.getElementById("userId");
  const emailInput = document.getElementById("email");

  // --- 1. 약관 동의 체크박스 로직 ---
  const allAgreeCheckbox = document.getElementById("all-agree");
  // '전체 동의'를 제외한 나머지 개별 동의 체크박스들
  const agreeCheckboxes = document.querySelectorAll(
    ".agreement-wrap .check-item:not(.all-check) .hidden-check",
  );

  /**
   * '전체 동의' 체크박스 상태에 따라 모든 개별 체크박스 상태를 변경합니다.
   */
  const handleAllAgreeChange = (e) => {
    const isChecked = e.target.checked;
    agreeCheckboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
  };

  /**
   * 개별 체크박스들의 상태를 확인하여 '전체 동의' 체크박스 상태를 업데이트합니다.
   */
  const updateAllAgreeCheckbox = () => {
    let allChecked = true;
    // 개별 체크박스 중 하나라도 체크 해제되어 있다면 allChecked는 false가 됩니다.
    agreeCheckboxes.forEach((cb) => {
      if (!cb.checked) {
        allChecked = false;
      }
    });
    allAgreeCheckbox.checked = allChecked;
  };

  // '전체 동의' 체크박스에 이벤트 리스너 추가
  allAgreeCheckbox.addEventListener("change", handleAllAgreeChange);

  // 모든 개별 체크박스에 이벤트 리스너 추가
  agreeCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateAllAgreeCheckbox);
  });

  // --- 2. 중복 확인 로직 ---
  const checkIdBtn = document.getElementById("checkIdBtn");
  const checkEmailBtn = document.getElementById("checkEmailBtn");

  const checkIdDuplication = () => {
    const userId = userIdInput.value;
    if (!userId) {
      alert("아이디를 입력해주세요.");
      return;
    }

    const userDB = JSON.parse(localStorage.getItem("userDB")) || [];
    const isDuplicate = userDB.some((user) => user.id === userId);

    if (isDuplicate) {
      alert("이미 사용 중인 아이디입니다.");
      isIdChecked = false;
    } else {
      alert("사용 가능한 아이디입니다.");
      isIdChecked = true;
    }
  };

  const checkEmailDuplication = () => {
    const email = emailInput.value;
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }

    const userDB = JSON.parse(localStorage.getItem("userDB")) || [];
    const isDuplicate = userDB.some((user) => user.email === email);

    if (isDuplicate) {
      alert("이미 사용 중인 이메일입니다.");
      isEmailChecked = false;
    } else {
      alert("사용 가능한 이메일입니다.");
      isEmailChecked = true;
    }
  };

  checkIdBtn.addEventListener("click", checkIdDuplication);
  checkEmailBtn.addEventListener("click", checkEmailDuplication);

  // 아이디나 이메일 입력값이 변경되면, 중복확인 상태를 초기화
  userIdInput.addEventListener("input", () => {
    isIdChecked = false;
  });
  emailInput.addEventListener("input", () => {
    isEmailChecked = false;
  });

  // --- 3. 회원가입 폼 제출 로직 ---
  const signupForm = document.getElementById("signupForm");

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault(); // 폼의 기본 제출 동작(페이지 새로고침)을 막습니다.

    // 입력 필드 값 가져오기
    const userId = userIdInput.value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    const userName = document.getElementById("userName").value;
    const email = emailInput.value;

    // 약관 동의 여부 가져오기
    const agreeTerms = document.getElementById("agree-terms").checked;
    const agreePrivacy = document.getElementById("agree-privacy").checked;
    const agreeMarketing = document.getElementById("agree-marketing").checked;

    // 간단한 유효성 검사
    if (!userId || !password || !passwordConfirm || !userName || !email) {
      alert("필수 입력 항목을 모두 입력해주세요.");
      return;
    }
    if (!isIdChecked) {
      alert("아이디 중복확인을 완료해주세요.");
      return;
    }
    if (!isEmailChecked) {
      alert("이메일 중복확인을 완료해주세요.");
      return;
    }
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!agreeTerms || !agreePrivacy) {
      alert("필수 이용약관에 동의해주세요.");
      return;
    }

    // 회원가입 정보를 담을 객체 생성
    const memberInfo = {
      id: userId,
      password: password, // 실제 서비스에서는 비밀번호를 절대 평문으로 저장하지 않습니다.
      name: userName,
      email: email,
      address: null, // 주소 API 연동 후 값을 채울 예정
      agreements: {
        termsOfService: agreeTerms,
        privacyPolicy: agreePrivacy,
        marketing: agreeMarketing,
      },
    };

    // DB에 새 회원 정보 추가
    const userDB = JSON.parse(localStorage.getItem("userDB")) || [];
    userDB.push({
      id: memberInfo.id,
      email: memberInfo.email,
      name: memberInfo.name,
      password: memberInfo.password,
    });
    localStorage.setItem("userDB", JSON.stringify(userDB));
    console.log("새로운 회원 정보가 DB에 추가되었습니다.", userDB);

    // sessionStorage에 회원 정보 저장
    // sessionStorage는 브라우저 탭이 닫히기 전까지 데이터를 유지합니다.
    // 객체는 문자열 형태로 저장해야 하므로 JSON.stringify를 사용합니다.
    sessionStorage.setItem("newMember", JSON.stringify(memberInfo));

    console.log("[회원가입 정보]", memberInfo);
    console.log(
      "sessionStorage에 'newMember' 키로 회원 정보가 저장되었습니다.",
    );
    alert(
      `${userName}님, 회원가입이 완료되었습니다. 메인 페이지로 이동합니다.`,
    );

    // 회원가입 완료 후 메인 페이지로 이동
    window.location.href = "/index.html";
  });
});
