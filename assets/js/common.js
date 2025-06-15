// 侧边栏收缩功能
document.addEventListener('DOMContentLoaded', function() {
    // 侧边栏切换功能
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const toggleBtn = document.getElementById('toggleBtn');
    
    if (toggleBtn && sidebar && mainContent) {
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡，防止立即关闭
            sidebar.classList.toggle('sidebar-expanded');
            mainContent.classList.toggle('main-content-shifted');
            
            // 切换图标
            if (sidebar.classList.contains('sidebar-expanded')) {
                toggleBtn.innerHTML = '&times;'; // 显示关闭图标 (×)
            } else {
                toggleBtn.innerHTML = '☰'; // 显示菜单图标
            }
        });

        // 点击侧边栏时阻止冒泡
        sidebar.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // 点击页面其他区域时自动收起侧边栏
        document.addEventListener('click', function(e) {
            if (sidebar.classList.contains('sidebar-expanded')) {
                sidebar.classList.remove('sidebar-expanded');
                mainContent.classList.remove('main-content-shifted');
                toggleBtn.innerHTML = '☰';
            }
        });
    }
}); 