document.addEventListener('DOMContentLoaded', function() {
    // 浏览量点击+1功能
    const catalogItems = Array.from(document.querySelectorAll('.catalog-item'));
    
    if (catalogItems.length > 0) {
        catalogItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // 只在主链接点击时增加浏览量，防止冒泡到父元素
                if (e.target.closest('.catalog-item') !== item) return;
                let views = parseInt(item.getAttribute('data-views')) || 0;
                views++;
                item.setAttribute('data-views', views);
                // 找到显示浏览量的元素并更新
                const viewsElem = item.querySelector('.item-views');
                if (viewsElem) {
                    viewsElem.innerHTML = '<i class="fas fa-eye item-icon"></i> ' + views + '次浏览';
                }
            });
        });
        
        // 获取排序按钮和目录列表
        const sortByDateBtn = document.getElementById('sortByDate');
        const sortByViewsBtn = document.getElementById('sortByViews');
        const catalogList = document.querySelector('.catalog-list');
        
        if (sortByDateBtn && sortByViewsBtn && catalogList) {
            // 按日期排序（默认）
            sortByDateBtn.addEventListener('click', function() {
                sortByDateBtn.classList.add('active');
                sortByViewsBtn.classList.remove('active');
                
                const sortedItems = catalogItems.sort((a, b) => {
                    const dateA = new Date(a.getAttribute('data-date'));
                    const dateB = new Date(b.getAttribute('data-date'));
                    return dateB - dateA; // 降序排列，最新的在前
                });
                
                // 清空并重新添加排序后的项目
                catalogList.innerHTML = '';
                sortedItems.forEach(item => catalogList.appendChild(item));
            });
            
            // 按浏览量排序
            sortByViewsBtn.addEventListener('click', function() {
                sortByDateBtn.classList.remove('active');
                sortByViewsBtn.classList.add('active');
                
                const sortedItems = catalogItems.sort((a, b) => {
                    const viewsA = parseInt(a.getAttribute('data-views'));
                    const viewsB = parseInt(b.getAttribute('data-views'));
                    return viewsB - viewsA; // 降序排列，浏览量高的在前
                });
                
                // 清空并重新添加排序后的项目
                catalogList.innerHTML = '';
                sortedItems.forEach(item => catalogList.appendChild(item));
            });
        }
    }
    
    // 分页功能
    const pageBtns = document.querySelectorAll('.page-btn');
    
    if (pageBtns.length > 0) {
        pageBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.classList.contains('active') || this.classList.contains('prev') || this.classList.contains('next')) {
                    return; // 如果是当前页、上一页或下一页按钮，不执行操作
                }
                
                // 移除所有按钮的活动状态
                pageBtns.forEach(btn => btn.classList.remove('active'));
                
                // 将点击的按钮设为活动状态
                this.classList.add('active');
                
                console.log(`切换到第${this.textContent}页`);
            });
        });
    }
}); 