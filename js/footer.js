const openBtn = document.getElementById("kakao");
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
        const personalBtn=document.getElementById("personal");
        // console.log(personalBtn);
        function personal(){
            //로그인창 이동
            window.open("");
        }
        const massBtn=document.getElementById("mass");
        function mass(){
            window.open("https://docs.google.com/forms/d/e/1FAIpQLScWcjRuN6eWJK-G8x3NwBfE8IyKZIOq7jhD3fUXuKSWwPqzJw/viewform");
        }