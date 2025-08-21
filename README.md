# 🩸 Hematopathology Report Generator

A comprehensive web-based text editor specifically designed for hematopathology report generation. This application combines functionality from bone marrow and lymphoid tissue reporting tools into one unified, user-friendly interface.

## ✨ Features

### 🔤 Text Expansion (F8 Hotkey)
- **60+ Medical Abbreviations**: Type any code and press F8 to expand
- **Examples**: 
  - `mmneg` → CD138 immunostain negative text
  - `lsbc` → "left-shifted but complete"
  - `mgkmf` → megakaryocytes with clustering description
- **Case Insensitive**: Works with any capitalization
- **Interactive Help**: View all codes with searchable reference

### 📋 Template System
- **Core Biopsy Templates**: Adequacy, cellularity, M:E ratio, cell line descriptions
- **Aspirate Templates**: Adequacy, spicules, touch prep, morphology
- **Lymphoid Templates**: Reactive hyperplasia, follicular lymphoma, DLBCL, Hodgkin lymphoma
- **One-Click Insertion**: Templates insert at cursor position with proper formatting

### 🏥 Epic Data Parser
- **Smart CBC Parsing**: Automatically extracts WBC, RBC, HGB, HCT, PLT, etc.
- **Differential Analysis**: Handles both auto and manual differentials
- **Morphology Detection**: Finds toxic granulation, giant platelets, NRBC
- **Narrative Generation**: Creates formatted paragraphs ready for reports
- **Error Handling**: Robust parsing with helpful error messages

### 💻 Modern Interface
- **Collapsible Sidebar**: Hide/show template panels as needed
- **Clean Editor**: Large text area with syntax highlighting hints
- **Real-time Features**: Character count, auto-save, notifications
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### 🔒 Privacy & Security
- **100% Local Processing**: No data sent to external servers
- **HIPAA Compliant**: All information stays on your device
- **Auto-save**: Work saved locally in browser storage
- **Offline Capable**: Works without internet connection

## 🚀 Getting Started

### Quick Start
1. Open `index.html` in any modern web browser
2. Start typing in the main editor
3. Use F8 to expand medical abbreviations
4. Insert templates from the sidebar as needed
5. Parse Epic data for automatic CBC formatting

### Using Text Expansion
1. Type any medical code (e.g., `mmneg`, `lsbc`, `mgkmf`)
2. Press **F8** to expand the code into full medical text
3. Click the **❓** button to view all available codes

### Using Templates
1. Click any template button in the sidebar
2. Template text will be inserted at your cursor position
3. Fill in the bracketed placeholders with specific values
4. Use the interactive forms (coming soon) for guided input

### Using Epic Data Parser
1. Copy CBC and differential data from Epic
2. Paste into the Epic Data Parser section
3. Click "Parse Data" to extract values
4. Click the generated paragraph to insert into your report

## 📁 File Structure

```
heme-report/
├── index.html          # Main application interface
├── styles.css          # Modern, responsive styling
├── script.js           # Application logic and functionality
├── README.md           # This documentation
└── reference-*/        # Original reference implementations
```

## 🔧 Technical Features

- **No Dependencies**: Pure HTML, CSS, and JavaScript
- **Modern CSS**: Flexbox/Grid layouts, custom properties, animations
- **ES6+ JavaScript**: Classes, arrow functions, async/await
- **Local Storage**: Auto-save and data persistence
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: Keyboard navigation, focus management, screen reader support

## 🩺 Medical Code Reference

The application includes 60+ medical abbreviations from Dr. Loneman's quick texts, including:

**Myeloma & Plasma Cells**
- `mmneg`, `mmpos`, `plasasp`, `polykl`

**Bone Marrow General**
- `lsbc`, `mgkmf`, `mgknorm`, `cd34n`

**Core Biopsy**
- `blastcore`, `mgkmf`, `mdsmpn`

**Aspirate**
- `inadeq`, `feneg`, `mdys`, `edys`

**Lymphoid**
- `lplac`, `cllac`, `cllasp`

**Peripheral Blood**
- `pbsleb`, `pbsmds`

[View complete reference by clicking the ❓ button in the application]

## 🙏 Acknowledgments

This application incorporates medical templates and expertise generously contributed by:

- **Dr. Megan Fitzpatrick** - Lymphoid tissue pathology templates and clinical insights
- **Dr. Derek Loneman** - Text expansion codes and bone marrow pathology templates  
- **Mass General Brigham Pathology** - Institutional support and template validation

Their contributions to the hematopathology community make tools like this possible, improving efficiency and consistency in diagnostic reporting.

## 🤝 Contributing

This is a medical tool designed for pathologists and medical professionals. Contributions should maintain medical accuracy and HIPAA compliance.

## 📄 License

For medical and educational use. Please ensure compliance with your institution's software policies.

## ⚠️ Disclaimer

This tool is designed to assist in report generation but does not replace medical judgment. All reports should be reviewed by qualified medical professionals before use in patient care.

---

**Created for the hematopathology community** 🔬  
*Streamlining report generation while maintaining accuracy and compliance*

*With gratitude to Dr. Megan Fitzpatrick, Dr. Derek Loneman, and Mass General Brigham Pathology*
