// 首页特定功能
document.addEventListener('DOMContentLoaded', function() {
    // 搜索框自动补全功能
    const searchBox = document.getElementById('searchBox');
    const searchResults = document.getElementById('searchResults');
    
    if (searchBox && searchResults) {
        // 示例搜索数据
        const searchData = [
            { title: '主页', url: 'index.html', date: '2024-01-01' },
            { title: '个人介绍', url: 'self_introduction.html', date: '2024-01-01' },
            { title: '开源项目', url: 'open_project/open_project.html', date: '2025-05-05' },
            { title: 'ai-galgame', url: 'open_project/open_project_labor_game.html', date: '2025-05-05' },
            { title: 'torch-learning', url: 'open_project/open_project_torch_leaning.html', date: '2025-05-04' },
            { title: 'AI文本总结与思维导图生成', url: 'open_project/open_project_summary_mindmap.html', date: '2025-04-20' },
            { title: '算法笔记整理', url: 'open_project/open_project_algorithm_note.html', date: '2025-03-15' },
            { title: '摄影作品', url: 'photograph_work/photograph_work.html', date: '2024-10-20' },
            { title: '秋日的紫金山', url: 'photograph_work/photograph_ZiJinMount.html', date: '2024-10-20' },
            { title: '苏州园林', url: 'photograph_work/photograph_Suzhou.html', date: '2025-04-10' },
            { title: '文章', url: 'articles/articles.html', date: '2025-05-20' },
            { title: '《罗生门》与马克思主义真理观', url: 'articles/articles_film_commend.html', date: '2025-05-20' },
            { title: '《幻象》阅读记录', url: 'articles/articles_book_phantom.html', date: '2025-02-15' },
            { title: '秋日的紫金山（随笔）', url: 'articles/articles_prose.html', date: '2024-10-20' },
            { title: '推荐资源', url: 'recommend.html', date: '2024-01-01' },
            { title: '留言板', url: 'message.html', date: '2024-01-01' }
        ];

        searchBox.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }

            // 过滤匹配的结果
            const filteredResults = searchData.filter(item => 
                item.title.toLowerCase().includes(query)
            );

            // 按日期排序（如果有重复内容）
            filteredResults.sort((a, b) => new Date(b.date) - new Date(a.date));

            // 显示结果
            if (filteredResults.length > 0) {
                searchResults.innerHTML = '';
                filteredResults.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'search-item';
                    div.textContent = item.title;
                    div.addEventListener('click', function() {
                        window.location.href = item.url;
                    });
                    searchResults.appendChild(div);
                });
                searchResults.style.display = 'block';
            } else {
                searchResults.style.display = 'none';
            }
        });

        // 点击外部时隐藏搜索结果
        document.addEventListener('click', function(e) {
            if (!searchBox.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }

    // 轮播图功能
    const carousel = document.getElementById('carousel');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (carousel && dots.length > 0) {
        let currentIndex = 0;
        
        // 自动轮播
        function autoSlide() {
            currentIndex = (currentIndex + 1) % 5;
            updateCarousel();
        }
        
        let slideInterval = setInterval(autoSlide, 5000);
        
        // 点击控制点切换图片
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                currentIndex = parseInt(this.dataset.index);
                updateCarousel();
                // 重置自动轮播定时器
                clearInterval(slideInterval);
                slideInterval = setInterval(autoSlide, 5000);
            });
        });
        
        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 20}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
    }
}); 