 const btn=document.querySelector(".hamberger_btn");
        const c_title=document.querySelector(".category_title");
        const menu=document.querySelector(".category");

        btn.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
            c_title.addEventListener('click', function() {
                menu.classList.toggle('active');
            });
        
        
        const subTitles = document.querySelectorAll(".subcategory_title");

        subTitles.forEach(function(title) {

            title.addEventListener('click', function() {

                const currentMenu = this.nextElementSibling;

                // 1️⃣ 모든 subcategory 닫기
                document.querySelectorAll(".subcategory")
                    .forEach(function(menu) {
                        if(menu !== currentMenu) {
                            menu.classList.remove("active");
                        }
                    });

                // 2️⃣ 현재 것만 토글
                currentMenu.classList.toggle("active");
            });
        });

        //js 쓸 것인가!
        const openBtn = document.getElementById("submit");
        const modal = document.getElementById("modal");
        const closeBtn = document.querySelector(".closeBtn");

        openBtn.addEventListener("click", function() {
            modal.classList.add("active");
        });

        closeBtn.addEventListener("click", function() {
            modal.classList.remove("active");
        });

        // 바깥 영역 클릭 시 닫기
        modal.addEventListener("click", function(e) {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });