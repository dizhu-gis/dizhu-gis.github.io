# Publications PDFs

This folder contains PDF files for publications referenced in `publications.json`.

## How to Add a New Publication PDF

1. **Add the PDF file** to this folder with the filename specified in the `publications.json` file
2. **Update the publications.json** file with the correct filename in the `pdf` field
3. **Ensure the filename matches** exactly what's specified in the JSON file

## File Naming Convention

Use the following naming convention for PDF files:
- `author-lastname-etal-year-journal.pdf`
- Example: `zhu-etal-2021-nature.pdf`

## Supported Formats

- PDF files only
- Keep file sizes reasonable (under 10MB recommended)
- Use descriptive filenames that match the publication

## Example

If you have a publication in `publications.json`:
```json
{
  "id": "zhu-etal-2021-nature",
  "title": "Revealing the spatial shifting pattern of COVID-19 pandemic",
  "pdf": "zhu-etal-2021-nature.pdf"
}
```

Then the PDF file should be named `zhu-etal-2021-nature.pdf` and placed in this folder.

## Notes

- The website will automatically create links to these PDFs
- Make sure PDFs are accessible and properly formatted
- Consider adding a DOI link as an alternative to the PDF 