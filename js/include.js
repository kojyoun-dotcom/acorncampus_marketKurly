
/**
 * 헤더 및 푸터 한번에 관리
 */
function loadComponent(id, url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) {
                callback();
            }
        });
}

// 실행
loadComponent('header-placeholder', 'header.html', initializeHeader);
loadComponent('footer-placeholder', 'footer.html');