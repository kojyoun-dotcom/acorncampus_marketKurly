function initializeHeaderNav() {
    const btn = document.querySelector(".hamberger_btn");
    const c_title = document.querySelector(".category_title");
    const menu = document.querySelector(".category");

    btn.addEventListener('click', function () {
        menu.classList.toggle('active');
    });
    c_title.addEventListener('click', function () {
        menu.classList.toggle('active');
    });


    const subTitles = document.querySelectorAll(".subcategory_title");

    subTitles.forEach(function (title) {

        title.addEventListener('click', function () {

            const currentMenu = this.nextElementSibling;

            // 1️⃣ 모든 subcategory 닫기
            document.querySelectorAll(".subcategory")
                .forEach(function (menu) {
                    if (menu !== currentMenu) {
                        menu.classList.remove("active");
                    }
                });

            // 2️⃣ 현재 것만 토글
            currentMenu.classList.toggle("active");
        });
    });

    const openBtn = document.getElementById("submit");
    const modal = document.getElementById("modal");
    const closeBtn = document.querySelector(".closeBtn");
    const searchInput = document.querySelector(".hd_searchbar input");

    openBtn.addEventListener("click", function () {
        if (searchInput.value.trim() === "") {
            modal.classList.add("active");
        } else {
            // 실제 검색 기능은 여기에 구현합니다.
            alert(`'${searchInput.value}'(으)로 검색합니다.`);
        }
    });

    closeBtn.addEventListener("click", function () {
        modal.classList.remove("active");
    });

    // 바깥 영역 클릭 시 닫기
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
}