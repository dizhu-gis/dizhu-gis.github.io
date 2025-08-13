// Publications Module
class PublicationsManager {
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
            console.error('Error initializing publications:', error);
            this.showErrorMessage();
        }
    }

    async loadPublications() {
        try {
            // Try different paths for the JSON file
            const paths = [
                './publications/publications.json',
                '/publications/publications.json',
                '../publications/publications.json'
            ];
            
            let response = null;
            for (const path of paths) {
                try {
                    response = await fetch(path);
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

        // Custom ranking for "All" tab
        if (this.currentFilter === 'all') {
            filteredPublications.sort((a, b) => {
                // Priority 1: Papers with code (highest priority)
                const aHasCode = a.code ? 1 : 0;
                const bHasCode = b.code ? 1 : 0;
                if (aHasCode !== bHasCode) {
                    return bHasCode - aHasCode;
                }
                
                // Priority 2: Di Zhu as first author (indicated by *)
                const aIsFirstAuthor = a.authors.includes('Di Zhu*') ? 1 : 0;
                const bIsFirstAuthor = b.authors.includes('Di Zhu*') ? 1 : 0;
                if (aIsFirstAuthor !== bIsFirstAuthor) {
                    return bIsFirstAuthor - aIsFirstAuthor;
                }
                
                // Priority 3: Newer publications
                return b.year - a.year;
            });
        } else {
            // For other filters, just sort by year (newest first)
            filteredPublications.sort((a, b) => b.year - a.year);
        }

        // Limit to 5 publications for main page
        const displayPublications = filteredPublications.slice(0, 5);

        // Render each publication
        displayPublications.forEach(publication => {
            const publicationElement = this.createPublicationElement(publication);
            container.appendChild(publicationElement);
        });

        // Add "View All Publications" link
        if (filteredPublications.length > 5) {
            const viewAllLink = document.createElement('div');
            viewAllLink.className = 'view-all-publications';
            viewAllLink.innerHTML = `
                <a href="publications.html" class="view-all-btn">
                    <i class="fas fa-arrow-right"></i>
                    View All Publications
                </a>
            `;
            container.appendChild(viewAllLink);
        }

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

    // Method to add a new publication (for future use)
    addPublication(publication) {
        this.publications.push(publication);
        this.renderPublications();
    }

    // Method to get publication by ID
    getPublication(id) {
        return this.publications.find(pub => pub.id === id);
    }

    // Method to get publications by category
    getPublicationsByCategory(category) {
        return this.publications.filter(pub => pub.category === category);
    }

    // Method to search publications
    searchPublications(query) {
        const lowerQuery = query.toLowerCase();
        return this.publications.filter(pub => 
            pub.title.toLowerCase().includes(lowerQuery) ||
            pub.authors.toLowerCase().includes(lowerQuery) ||
            pub.venue.toLowerCase().includes(lowerQuery) ||
            (pub.abstract && pub.abstract.toLowerCase().includes(lowerQuery))
        );
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PublicationsManager;
} else {
    window.PublicationsManager = PublicationsManager;
} 