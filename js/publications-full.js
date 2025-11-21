// Full Publications Module
class FullPublicationsManager {
    constructor() {
        this.publications = [];
        this.categories = {};
        this.currentFilter = 'all';
        this.init();
    }

    async init() {
        try {
            await this.loadPublications();
            this.setupEventListeners();
            this.renderPublications();
        } catch (error) {
            console.error('Error initializing full publications:', error);
            this.showErrorMessage();
        }
    }

    async loadPublications() {
        try {
            // Add cache-busting query parameter to ensure fresh data
            const cacheBuster = `?v=${Date.now()}`;
            
            // Try different paths for the JSON file
            const paths = [
                './publications/publications.json',
                '/publications/publications.json',
                '../publications/publications.json'
            ];
            
            let response = null;
            for (const path of paths) {
                try {
                    // Add cache-busting to prevent stale cached data
                    response = await fetch(path + cacheBuster, {
                        cache: 'no-store',
                        headers: {
                            'Cache-Control': 'no-cache'
                        }
                    });
                    if (response.ok) break;
                } catch (e) {
                    continue;
                }
            }
            
            if (response && response.ok) {
                const data = await response.json();
                this.publications = data.publications;
                this.categories = data.categories;
            } else {
                throw new Error('Could not load publications.json');
            }
        } catch (error) {
            console.error('Error loading publications:', error);
            throw error;
        }
    }

    showErrorMessage() {
        const container = document.querySelector('.publications-list');
        if (container) {
            container.innerHTML = `
                <div class="publications-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Publications Not Available</h3>
                    <p>Unable to load publications data. Please check that the publications.json file exists and is accessible.</p>
                    <p><small>If you're viewing this locally, you may need to serve the files through a web server.</small></p>
                </div>
            `;
        }
    }

    setupEventListeners() {
        // Setup filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterPublications(filter);
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    filterPublications(category) {
        this.currentFilter = category;
        this.renderPublications();
    }

    renderPublications() {
        const container = document.querySelector('.publications-list');
        if (!container) return;

        // Clear existing content
        container.innerHTML = '';

        // Filter publications
        const filteredPublications = this.currentFilter === 'all' 
            ? this.publications 
            : this.publications.filter(pub => pub.category === this.currentFilter);

        // Sort by year (newest first) for all filters
        filteredPublications.sort((a, b) => b.year - a.year);

        // Render all publications (no limit)
        filteredPublications.forEach(publication => {
            const publicationElement = this.createPublicationElement(publication);
            container.appendChild(publicationElement);
        });

        // Show message if no publications found
        if (filteredPublications.length === 0) {
            container.innerHTML = '<p class="no-publications">No publications found in this category.</p>';
        }
    }

    createPublicationElement(publication) {
        const div = document.createElement('div');
        div.className = 'publication-item';
        div.setAttribute('data-category', publication.category);
        div.setAttribute('data-id', publication.id);

        const links = [];
        if (publication.doi) {
            links.push(`<a href="${publication.doi}" target="_blank" class="pub-link doi-link"><i class="fas fa-external-link-alt"></i> DOI</a>`);
        }
        if (publication.pdf) {
            links.push(`<a href="./publications/pdfs/${publication.pdf}" target="_blank" class="pub-link pdf-link"><i class="fas fa-file-pdf"></i> PDF</a>`);
        }
        if (publication.code) {
            links.push(`<a href="${publication.code}" target="_blank" class="pub-link code-link"><i class="fab fa-github"></i> Code</a>`);
        }

        const linksHtml = links.length > 0 ? `<div class="publication-links">${links.join(' ')}</div>` : '';

        div.innerHTML = `
            <div class="publication-header">
                <div class="publication-title">
                    <h3>${publication.title}</h3>
                </div>
                ${linksHtml}
            </div>
            <p class="authors">${publication.authors}</p>
            <p class="venue">${publication.venue}, ${publication.year}</p>
        `;

        return div;
    }
}

// Initialize the full publications manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.fullPublicationsManager = new FullPublicationsManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FullPublicationsManager;
} else {
    window.FullPublicationsManager = FullPublicationsManager;
} 