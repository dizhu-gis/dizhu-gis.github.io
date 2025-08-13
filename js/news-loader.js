// News Loader for GeoDI Lab
class NewsLoader {
    constructor() {
        this.newsContainer = document.querySelector('.news-list');
        this.loadingElement = document.querySelector('.loading-news');
        this.errorElement = document.querySelector('.news-error');
        this.maxNewsItems = 3;
    }

    async loadNews() {
        try {
            // Show loading state
            this.showLoading();
            
            // Fetch news from GeoDI lab website
            const newsItems = await this.fetchNewsFromGeoDI();
            
            // Display the news
            this.displayNews(newsItems);
            
        } catch (error) {
            console.error('Error loading news:', error);
            this.showError();
        }
    }

    async fetchNewsFromGeoDI() {
        // Since we can't directly fetch from the website due to CORS,
        // we'll use a proxy service or create a simple fallback
        // For now, we'll use a structured approach that can be easily updated
        
        // This would ideally be replaced with an actual API call
        // For now, we'll simulate the structure
        return this.getLatestNews();
    }

    getLatestNews() {
        // This function simulates fetching news from the GeoDI website
        // In a real implementation, this would be replaced with actual API calls
        // or server-side scraping
        
        const newsData = [
            {
                title: "Deep panel flow inference paper published on IJGIS",
                description: "New research publication on deep panel flow inference in the International Journal of Geographical Information Science.",
                date: "Jan 2025",
                url: "https://geodi.umn.edu/deep-panel-flow-inference-paper-published-ijgis"
            },
            {
                title: "Research paper published on International Journal of Geographical Information Science",
                description: "Latest research findings published in the International Journal of Geographical Information Science.",
                date: "Jan 2025",
                url: "https://geodi.umn.edu/research-paper-published-international-journal-geographical-information-science"
            },
            {
                title: "Research paper published on Scientific Data",
                description: "New publication in Scientific Data showcasing innovative research methodologies and findings.",
                date: "Jan 2025",
                url: "https://geodi.umn.edu/research-paper-published-scientific-data"
            }
        ];

        return newsData.slice(0, this.maxNewsItems);
    }

    displayNews(newsItems) {
        if (!this.newsContainer) return;

        // Clear existing content
        this.newsContainer.innerHTML = '';

        // Create news items
        newsItems.forEach(news => {
            const newsElement = this.createNewsElement(news);
            this.newsContainer.appendChild(newsElement);
        });

        // Hide loading
        this.hideLoading();
    }

    createNewsElement(news) {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        
        newsItem.innerHTML = `
            <div class="news-date">${news.date}</div>
            <div class="news-content">
                <h4>${news.title}</h4>
                <p>${news.description}</p>
            </div>
        `;

        // Add click handler to open the news URL
        newsItem.style.cursor = 'pointer';
        newsItem.addEventListener('click', () => {
            window.open(news.url, '_blank');
        });

        return newsItem;
    }

    showLoading() {
        if (this.loadingElement) {
            this.loadingElement.style.display = 'block';
        }
        if (this.newsContainer) {
            this.newsContainer.style.display = 'none';
        }
    }

    hideLoading() {
        if (this.loadingElement) {
            this.loadingElement.style.display = 'none';
        }
        if (this.newsContainer) {
            this.newsContainer.style.display = 'grid';
        }
    }

    showError() {
        this.hideLoading();
        if (this.errorElement) {
            this.errorElement.style.display = 'block';
        }
    }
}

// Initialize news loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const newsLoader = new NewsLoader();
    newsLoader.loadNews();
});

// For future implementation with actual API:
// You could replace the getLatestNews() method with:
/*
async fetchNewsFromAPI() {
    const response = await fetch('https://your-api-endpoint.com/geodi-news');
    const data = await response.json();
    return data.news.slice(0, this.maxNewsItems);
}
*/ 