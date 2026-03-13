// 监听滚动事件，控制个人信息模块的显示和隐藏
window.addEventListener('scroll', function() {
    const body = document.body;
    if (window.scrollY > 50) {
        body.classList.add('scrolled');
    } else {
        body.classList.remove('scrolled');
    }
});