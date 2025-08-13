# Di Zhu - Personal Website

A modern, responsive personal website for Di Zhu, Assistant Professor of Geographic Information Science at the University of Minnesota, Twin Cities.

## Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: Smooth scrolling, publication filtering, and mobile navigation
- **Modular Structure**: Easy to maintain and update content
- **Dynamic Publications**: Publications loaded from JSON file for easy updates
- **Professional Sections**: About, Research, Publications, GeoDI Lab, and Contact sections
- **Accessibility**: Semantic HTML and keyboard navigation support

## Project Structure

```
├── index.html                    # Main HTML file
├── styles.css                    # CSS styles and responsive design
├── config/
│   └── site-config.json         # Site configuration and content
├── js/
│   ├── main.js                  # Main application module
│   └── publications.js          # Publications management module
├── publications/
│   ├── publications.json        # Publications data
│   └── pdfs/                    # PDF files for publications
│       └── README.md            # Instructions for adding PDFs
└── README.md                    # This documentation file
```

## Quick Start

1. Clone or download the files
2. Open `index.html` in a web browser
3. The website is ready to use!

## Content Management

### Adding New Publications

1. **Edit `publications/publications.json`**:
   ```json
   {
     "id": "unique-publication-id",
     "title": "Publication Title",
     "authors": "Author Names",
     "venue": "Journal/Conference Name",
     "year": 2024,
     "category": "journals",
     "doi": "https://doi.org/...",
     "pdf": "filename.pdf",
     "code": "https://github.com/...",
     "abstract": "Brief abstract..."
   }
   ```

2. **Add PDF file** (optional):
   - Place PDF in `publications/pdfs/` folder
   - Use the filename specified in the `pdf` field
   - Follow naming convention: `author-etal-year-journal.pdf`

3. **Categories available**:
   - `journals` - Journal articles
   - `conferences` - Conference papers
   - `books` - Book chapters
   - `reports` - Technical reports

### Updating Site Content

Edit `config/site-config.json` to update:
- Site title and description
- Navigation menu
- Hero section content
- About section information
- Research areas
- Lab information
- Contact details
- Social media links

### Adding New Research Areas

1. Edit `config/site-config.json`
2. Add new research area to the `research.areas` array:
   ```json
   {
     "id": "new-area",
     "title": "New Research Area",
     "description": "Description of the research area",
     "icon": "fas fa-icon-name"
   }
   ```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript**: Modular ES6+ code with classes
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

### Styling

- **Colors**: Modify CSS variables in `styles.css`
- **Fonts**: Change the Google Fonts import in `index.html`
- **Layout**: Adjust grid and flexbox properties in `styles.css`

### Adding New Sections

1. Add HTML structure to `index.html`
2. Add corresponding CSS styles to `styles.css`
3. Update navigation in `config/site-config.json`
4. Add any JavaScript functionality to `js/main.js`

### Images

- Replace the profile placeholder in the hero section with an actual photo
- Add lab photos and research images as needed
- Optimize images for web use

## Deployment

The website can be deployed to any static hosting service:

- **GitHub Pages**: Push to a GitHub repository and enable Pages
- **Netlify**: Drag and drop the folder or connect to Git repository
- **Vercel**: Connect to Git repository for automatic deployments
- **AWS S3**: Upload files to S3 bucket with static website hosting
- **Any web server**: Upload files to any web server

### GitHub Pages Deployment

1. Create a new GitHub repository
2. Push all files to the repository
3. Go to Settings > Pages
4. Select source branch (usually `main`)
5. Your site will be available at `https://username.github.io/repository-name`

## Maintenance

### Regular Updates

- **Publications**: Update `publications/publications.json` when new papers are published
- **Content**: Update `config/site-config.json` for any content changes
- **PDFs**: Add new PDF files to `publications/pdfs/` folder
- **Images**: Replace placeholder images with actual photos

### Adding New Features

1. **New JavaScript modules**: Create new files in `js/` folder
2. **New CSS components**: Add styles to `styles.css`
3. **New content sections**: Update both HTML and configuration files

## Future Enhancements

- [ ] Add a blog section
- [ ] Integrate with Google Scholar API for automatic publication updates
- [ ] Add a projects/portfolio section
- [ ] Include a news/updates section
- [ ] Add dark mode toggle
- [ ] Integrate with social media feeds
- [ ] Add publication search functionality
- [ ] Add citation export features
- [ ] Add lab member profiles
- [ ] Add research project showcase

## Troubleshooting

### Publications Not Loading

- Check that `publications/publications.json` is valid JSON
- Ensure the file path is correct
- Check browser console for JavaScript errors

### PDF Links Not Working

- Verify PDF files exist in `publications/pdfs/` folder
- Check that filenames match exactly in `publications.json`
- Ensure PDF files are accessible

### Styling Issues

- Clear browser cache
- Check CSS file paths
- Verify all CSS classes are properly defined

## Contact

For questions or suggestions about this website, please contact Di Zhu at dizhu@umn.edu.

## License

This website is created for Di Zhu's personal use. All rights reserved. 