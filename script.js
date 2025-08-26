// Unified Hematopathology Report Generator
// Combines functionality from marrow and lymphoid reference tools

// Text Expansion Data (from Loneman Quick Texts)
const LONEMAN_QUICK_TEXTS = {
    'mmneg': 'An immunostain for CD138 does not reveal any definitive plasma cells. Too few plasma cells are present to evaluate by in-situ hybridization for kappa and lambda.',
    'mmnegtop': '__cellular marrow with maturing trilineage hematopoiesis. There is no morphologic or immunophenotypic evidence of a plasma cell neoplasm.',
    'mmpos': 'An immunostain for CD138 highlights singly scattered and small, perivascular clusters of plasma cells (<5% of cells) which are monotypic for kappa by in-situ hybridization for kappa and lambda light chains.',
    'noplas': 'No circulating plasma cells are seen.',
    'cyclinneg': 'Cyclin D1 is negative in plasma cells.',
    'plasasp': 'Plasma cells: Medium- to large-sized cells with round nuclei, condensed chromatin, and abundant cytoplasm. Occasional binucleate forms are seen.',
    'corrplas': 'COMMENT: Clinical, radiographic, and laboratory correlation are required for definitive classification.',
    'congoneg': 'A Congo red stain is negative for amyloid.',
    'congopos': 'A Congo red stain highlights perivascular amyloid deposition.',
    'knownmm': 'Involvement by the patient\'s known PLASMA CELL NEOPLASM.',
    'mmcyto': 'Cytology: Intermediate- to large-sized cells with round to irregular nuclear contours, coarse chromatin, variably prominent nucleoli, and moderate to abundant cytoplasm. Occasional multinucleated forms are seen.',
    'mmcore': 'Architecture: Patchy interstitial infiltration.',
    'corrcyto': 'COMMENT: Correlation with concurrent cytogenetics is recommended.',
    'polykl': 'polytypic by in-situ hybridization for kappa and lambda light chains.',
    'corrmol': 'COMMENT: Correlation with pending molecular and cytogenetic studies is recommended.',
    'corrmolcyto': 'COMMENT: Correlation with pending molecular and cytogenetic studies is recommended.',
    'corrmolcytochim': 'COMMENT: Correlation with pending molecular, cytogenetic, and chimerism studies is recommended.',
    'corrmolcytomrd': 'COMMENT: Correlation with pending minimal residual disease, molecular, and cytogenetic studies is recommended.',
    'cd34n': 'Blasts are not increased (<5% of cells) by a CD34 immunostain.',
    'p53n': 'A p53 stain shows variably staining, suggestive of wild-type expression.',
    'header': 'A-C. BONE MARROW CORE BIOPSY AND ASPIRATE SMEARS, PERIPHERAL BLOOD SMEAR:',
    'lsbc': 'left-shifted but complete.',
    'limitedbx': 'Limited; predominantly blood and soft tissue with only a small area of evaluable marrow.',
    'fewnormal': 'Normal hematopoietic elements are markedly decreased and [cannot be adequately evaluated]/[difficult to evaluate]',
    'nonheme': 'Note: Most of the cellularity consists of stromal cells; histiocytes (including frequent hemosiderin-laden cells); lymphocytes; and singly scattered and small, perivascular aggregates of mature-appearing plasma cells. The lymphocytes are seen singly scattered in the interstitium and in occasional small, interstitial aggregates. Lymphocytes appear small- to intermediate-sized with round to irregular nuclear contours, condensed to moderately dispersed chromatin, inconspicuous nucleoli, and scant cytoplasm.',
    'nodx': 'No morphologic or flow cytometric features of the patient\'s known ___ are seen.',
    'altcell': 'A recent study has shown that marrow cellularity declines with age at a slower rate than previously assumed, and the mean cellularity for this patient\'s age group is ~44% (standard deviation ~11%, PMID: 37904278).',
    'mgkmf': 'with frequent tight clustering, occasional paratrabecular localization, and exhibiting a morphologic spectrum, from hypolobated to hyperlobated forms and including occasional bulbous, hyperchromatic cells.',
    'mdsmpn': 'with focal clustering and exhibiting morphologic heterogeneity: some cells are overtly dysplastic, including small, hypolobated forms and occasional cells with separated nuclear lobes. Other cells are atypical, including hyperlobated forms and occasional bulbous, hyperchromatic cells with high N:C ratio.',
    'mgknorm': 'adequate in number and with overall normal morphology.',
    'blastcore': 'Architecture: Diffuse sheets. Cytology: Predominantly intermediate-sized cells with ovoid to irregular nuclei, finely dispersed chromatin, variably prominent nucleoli, and scant to moderate amounts of cytoplasm.',
    'inadeq': 'Note: The aspirate smear(s) and touch prep contain inadequate numbers of maturing hematopoietic elements for cellular enumeration or morphologic evaluation.',
    'celllimit': 'Maturing myeloids and erythroids are markedly decreased but without overt morphologic abnormalities.',
    'feneg': 'adequate storage iron. Ring sideroblasts do not appear increased.',
    'felow': 'Storage iron appears decreased, correlation with serum iron studies recommended.',
    'mdys': 'dysplastic, with hypogranular and hyposegmented cells.',
    'edys': 'dysplastic, with occasional nuclear-cytoplasmic asynchrony and multinucleated cells.',
    'mgkdys': 'dysplastic, with hypolobated forms and occasional cells with separated nuclear lobes.',
    'blastasp': 'Predominantly medium-sized cells with round to irregular nuclear countours, finely dispersed chromatin, prominent nucleoli, and scant to moderate basophilic cytoplasm with occasional sparse granulation',
    'pbsleb': 'red cell anisopoikilocytosis with frequent dacrocytes and occasional nucleated red cells; thrombocytopenia with occasional large platelets; and maturing and left-shifted myeloids, including occasional blasts, consistent with an leukoerythroblastic reaction.',
    'pbsmds': 'red cell anisopoikilocytosis; thrombocytopenia with occasional large platelets; and occasional hypogranular and hyposegmented neutrophils, including pseudo-Pelger-Huet cells',
    'lplac': 'Extensive interstitial infiltration by predominantly small lymphocytes with round to slightly irregular nuclei, moderately dispersed chromatin, inconspicuous nucleoli, and scant cytoplasm; a subset of plasmacytoid cells contain moderate amounts of cytoplasm with eccentric nuclei. Admixed plasma cells are also seen.',
    'cllac': 'Lymphocytes: Large paratrabecular aggregates of small cells with round to slightly irregular nuclei, clumped chromatin, inconspicuous nucleoli, and scant cytoplasm. An immunostain reveals the cells to be B cells (PAX5+) with aberrant expression of CD5 and which constitute >90% of the cellularity.',
    'cllasp': 'Lymphocytes: Small- to medium-sized cells with round to slightly irregular nuclei, clumped to moderately dispersed chromatin, inconspicuous nucleoli, and scant cytoplasm.',
    'knownmn': 'Involvement by the patient\'s known MYELOID NEOPLASM.',
    'fdc':'follicular dendritic cell',
    'nmde':'no morphologic diagnostic evidence of the patient\'s neoplasm are seen',
    'alip':'abnormal localization of immature precursors'
};

// Lymphoid Templates
const LYMPHOID_TEMPLATES = {
    reactive: `RLHSYN (Reactive lymphoid hyperplasia Synoptic Report)

Reactive lymphoid hyperplasia. (See note.)

Note: The specimen is a [slightly/moderately/markedly] enlarged lymph node with architecture that is [intact/distorted but not obliterated/effaced]. The lymph node shows [prominent follicular hyperplasia/crowded, poorly-delineated follicles/diffuse infiltrate], with [small/large/small and large/round to oval/irregular] follicles with active germinal centers. Mantle zones are [intact/expanded/attenuated/absent]. The paracortex is [hyperplastic/occupied by small lymphocytes], and is occupied by small lymphocytes, scattered histiocytic/dendritic cells, [none/scattered/many] eosinophils, [few/occasional/many] [mature/immature] plasma cells.

Concurrent flow cytometry (see below) shows no clonal B-cell or atypical T-cell population.

In summary, the findings are consistent with reactive lymphoid hyperplasia, with no specific evidence of lymphoma or of any other neoplasm.`,

    follicular: `FLSYN (Follicular lymphoma Synoptic Report)

Follicular lymphoma, [follicular/follicular and diffuse/predominantly diffuse] pattern, grade [1 to 2 of 3/3A/3B] [with a high proliferation index]. (See note.)

Note: The specimen is a [slightly/markedly] enlarged lymph node that is almost entirely replaced by a proliferation of crowded, poorly-delineated follicles composed of centrocytes and [occasional/many] centroblasts, with [fewer than 15 centroblasts per hpf/many centroblasts (>15 per hpf)] in a background of centrocytes. Mantles are [attenuated/absent]. [Few mitotic figures/Many mitotic figures] are seen. [Areas of necrosis are present/No necrosis identified].

Immunostains show numerous B cells (CD20+) in a follicular pattern. B cells in follicles co-express [CD10/Bcl6/Bcl2], and are negative for [CD5/cyclin D1]. Ki67 shows a proliferation index of [XX%]. 

Concurrent flow cytometry (see below) demonstrates ----------

The histologic and immunophenotypic features together support a diagnosis of follicular lymphoma.`,

    dlbcl: `DLBSYN (Diffuse large B-cell lymphoma Synoptic Report)

Diffuse large B-cell lymphoma. (See note.)

Note: The specimen is a [slightly/markedly] enlarged lymph node that is almost entirely replaced by a diffuse infiltrate of large atypical lymphoid cells with [oval/irregular/lobated] nuclei, [prominent] nucleoli, and [scant/moderate] quantity of pale cytoplasm. [Scattered mitotic figures are seen/Many mitotic figures are present]. [Areas of necrosis are present/No necrosis identified].

Immunostains show numerous B cells (CD20+) in a diffuse pattern. B cells show the following immunophenotype: CD10 [positive/negative], BCL6 [positive/negative], MUM1 [positive/negative]. BCL2 is [positive/negative] and MYC is [positive/negative]. Based on Hans criteria, this represents a [GCB/Non-GCB/unclassifiable] type DLBCL. [This represents a double hit/triple hit lymphoma]. Ki67 shows a proliferation index of [XX%].

Concurrent flow cytometry (see below) demonstrates ----------

The histologic and immunophenotypic features together support a diagnosis of diffuse large B-cell lymphoma of [germinal center/activated B-cell] origin [with double hit features].`,

    hodgkin: `CHLSYN (Classical Hodgkin lymphoma Synoptic Report)

Classic Hodgkin lymphoma, [nodular sclerosis/mixed cellularity/lymphocyte rich/lymphocyte depleted] sub-type. (See note.)

Note: The specimen is a markedly enlarged lymph node with architectural effacement by a mixed inflammatory cell infiltrate consisting of small lymphocytes, histiocytes, granulocytes including eosinophils, plasma cells and large atypical cells. The latter have large [oval/irregular/lobated] nuclei, prominent eosinophilic nucleoli, and [scant/moderate] quantity of pale cytoplasm. [Occasional binucleate/multinucleate] forms are seen, as well as [lacunar cells/mummified cells]. The appearance of the large cells is consistent with Reed-Sternberg cells and variants.

Immunostains show that the large atypical cells are positive for [CD30/CD15/MUM1] and negative for [CD20/CD45]. In situ hybridization for Epstein-Barr virus (EBER) shows [no staining/staining of large cells]. The small lymphocytes are a mixture of T cells (CD3+) and fewer small B cells (CD20+).

Concurrent flow cytometry (see below) shows no abnormal B or T-cell population.

The histologic and immunophenotypic findings together support a diagnosis of classic Hodgkin lymphoma, [sub-type].`,

    tissue: `A. LEFT AXILLARY LYMPH NODE EXCISIONAL BIOPSY:

DIFFUSE LARGE B-CELL LYMPHOMA, NOT OTHERWISE SPECIFIED, (see comment).

COMMENT: 
Correlation with clinical, cytogenetics, molecular and additional laboratory findings is recommended. 
__________________________________________________
MICROSCOPIC DESCRIPTION:
The H&E sections show ***

Immunostains reveal ***. The Ki67 proliferation index is ***.

FLOW CYTOMETRY (***): 
***PENDING***

(Clinical summary: yo h/o .)

The immunohistochemical (IHC) stains performed on this case are deemed medically necessary. Some of the antigens may also have been evaluated by flow cytometry. Concurrent evaluation by IHC on tissue sections is indicated in this case in order to correlate immunophenotype with cell morphology and/or determine extent of involvement, spatial pattern and focality of potential disease distribution.

The immunoperoxidase, immunofluorescence and in-situ hybridization tests performed at Brigham and Women's Hospital were developed and their performance characteristics determined by the Immunohistochemistry Laboratories in the Department of Pathology at BWH. They have not been cleared or approved by the U.S. Food and Drug Administration (FDA). The FDA has determined that such clearance or approval is not necessary.

Additional immunostains performed at BWH show that the atypical lymphoid cells are positive for CD45(weak), ___, and ___, and negative for CD30, ___, and ___. In situ hybridization for Epstein Barr virus encoded RNA (EBER) is ____.
    `
};

// Core Biopsy Templates
const CORE_TEMPLATES = {
    header: `A-C. BONE MARROW, CORE BIOPSY, ASPIRATE AND PERIPHERAL BLOOD SMEAR: 

*** cellular marrow with maturing trilineage hematopoiesis (see comment).

COMMENT: 
Correlation with clinical, cytogenetics, molecular and additional laboratory findings is recommended.`,

    basic: `CORE BIOPSY:
Biopsy adequacy: Adequate.
Marrow biopsy cellularity: XX%; age-adjusted normo/hypo/hypercellular.
Myeloid:Erythroid ratio is normal/increased/decreased/reversed].
Myeloid lineage maturation is complete/left-shifted/dysplastic/atypical.
Erythroid lineage maturation is complete/left-shifted/dysplastic/atypical.
Megakaryocytes are adequate/decreased/increased in number, with ___ forms.
Lymphoid aggregates: ____.]
Scattered hemosiderin-laden macrophages are seen.
Other findings: `,

    detailed: `CORE BIOPSY:
Biopsy specimen quality/adequacy: Adequate.
Marrow biopsy cellularity: ***%; age-adjusted ***cellular.
Plasma cells: ***% of cellularity (***% of the intertrabecular space). 
  Architecture: singly scattered, and small clusters. 
  Cytology: small to intermediate-sized mature forms.
  IHC: The plasma cells are positive for CD138 and ***. 

Of the remaining cellularity:
Myeloid:erythroid ratio: normal.
Myeloid maturation: complete.
Erythroid maturation: complete.
Blasts appear to be less than 5% of the cellularity.
Megakaryocytes: adequate in number, consisting of a spectrum of normal forms.
Lymphocytes: ***% of cellularity (***% of the intertrabecular space).
Lymphoid aggregates are not seen.  
A Giemsa special stain was performed to evaluate mast cells and plasma cells.
Reticulin special stain shows no increase in bone marrow fibrosis, best classified as WHO grade MF-0. 
Congo Red special stain is negative for amyloid deposition.`,

    other: `OTHER: XX% of cellularity. 
  Immunohistochemistry: IHC.
  Architecture: ARCHITECTURE.
  Cytology: CYTOLOGY.

Of the remaining cellularity:`,

    clot: `CLOT SECTION:
The clot section contains particles of marrow with features similar to the core biopsy.`
};

// Aspirate Templates
const ASPIRATE_TEMPLATES = {
    basic: `ASPIRATE:
Aspirate adequacy: Adequate, spicular
Touch prep: Adequate.

Myeloid lineage maturation is complete and without significant abnormalities.
Erythroid lineage maturation is complete and without significant abnormalities.
Megakaryocytes are present and without significant abnormalities.
Plasma cells: occasional intermediate sized and nucleolated forms.
Iron stain reveals minimal storage iron. Ring sideroblasts are not identified.
`,

    detailed: `ASPIRATE:
Aspirate adequacy: [Adequate/Limited/Inadequate], spicules: [Present/Absent/Scant], touch prep: [Adequate/Limited/Inadequate].
Myeloid lineage maturation is [complete/left-shifted/dysplastic/atypical] with features including [left shift/maturation arrest/hyposegmentation/hypogranulation/toxic granulation/Auer rods/dysmyelopoiesis].
Erythroid lineage maturation is [complete/left-shifted/dysplastic/atypical] with features including [megaloblastic change/nuclear budding/hypochromia/dyserythropoiesis/maturation patterns].
Megakaryocytes are [adequate/decreased/increased] with [micromegakaryocytes/giant megakaryocytes/hypolobated nuclei/hyperlobated nuclei/dysplastic features/normal morphology].
Lymphocytes and plasma cells demonstrate [small mature lymphocytes/reactive lymphocytes/atypical lymphocytes/plasmacytoid features/distribution patterns] [occasional intermediate sized and nucleolated forms].
Iron stain reveals minimal storage iron. Ring sideroblasts are not identified.

FLOW CYTOMETRY (***, marrow): 
****PENDING****

PERIPHERAL BLOOD:
***

(Clinical summary: yo h/o .)
`
};

// Epic Data Parser Class
class EpicDataParser {
    constructor() {
        this.cbcPatterns = {
            date: /(\d{1,2}\/\d{1,2}\/\d{2,4}|\d{1,2}-\d{1,2}-\d{2,4})/,
            wbc: /WBC[:\s]*(\d+\.?\d*)/i,
            rbc: /RBC[:\s]*(\d+\.?\d*)/i,
            hgb: /H[GH]B[:\s]*(\d+\.?\d*)/i,
            hct: /HCT[:\s]*(\d+\.?\d*)/i,
            mcv: /MCV[:\s]*(\d+\.?\d*)/i,
            mch: /MCH[:\s]*(\d+\.?\d*)/i,
            mchc: /MCHC[:\s]*(\d+\.?\d*)/i,
            plt: /PLT[:\s]*(\d+\.?\d*)/i,
            mpv: /MPV[:\s]*(\d+\.?\d*)/i,
            rdw: /RDW[:\s]*(\d+\.?\d*)/i
        };

        this.morphologyPatterns = {
            toxicGranulation: /Toxic\s+Granulation[:\s]*([A-Z]+)/i,
            giantPlatelets: /PLTS,\s*giant[:\s]*([A-Z]+)/i,
            rbcMorph: /RBC\s+MORPH[:\s]*([A-Z\s]+)/i,
            atypicalLymphs: /Lymphs,\s*atypical\/reactive[:\s]*(\d+\.?\d*)/i
        };
    }

    parseCBC(text) {
        const results = {};
        if (!text) return results;

        Object.keys(this.cbcPatterns).forEach(key => {
            const match = text.match(this.cbcPatterns[key]);
            if (match) {
                results[key] = key === 'date' ? match[1] : parseFloat(match[1]);
            }
        });

        return results;
    }

    parseDifferential(text) {
        const results = {};
        if (!text) return results;

        const diffMethodMatch = text.match(/Diff Method[:\s]*(.+)/i);
        const diffMethod = diffMethodMatch ? diffMethodMatch[1].trim() : null;
        
        if (diffMethod && diffMethod.includes('not performed')) {
            results.diffMethod = diffMethod;
            return results;
        }

        results.diffMethod = diffMethod || 'Unknown';

        const lines = text.split('\n');
        const allMatches = [];
        
        for (const line of lines) {
            if (line.includes('#')) continue;
            
            const percentMatch = line.match(/^([^:]+?)(?:\s*\([^)]*\))?\s*:\s*(\d+\.?\d*)/);
            
            if (percentMatch) {
                const cellType = percentMatch[1].trim();
                const percentage = parseFloat(percentMatch[2]);
                
                const normalizedType = this.normalizeCellType(cellType);
                if (normalizedType && !isNaN(percentage)) {
                    let priority = 0;
                    if (cellType.includes('(%)') || cellType.includes('% (')) {
                        priority = 3;
                    } else if (cellType.includes('(')) {
                        priority = 2;
                    } else {
                        priority = 1;
                    }
                    
                    allMatches.push({
                        normalizedType,
                        percentage,
                        priority,
                        originalLine: line
                    });
                }
            }
        }
        
        const typeGroups = {};
        allMatches.forEach(match => {
            if (!typeGroups[match.normalizedType] || 
                typeGroups[match.normalizedType].priority < match.priority) {
                typeGroups[match.normalizedType] = match;
            }
        });
        
        Object.values(typeGroups).forEach(match => {
            results[match.normalizedType] = match.percentage;
        });

        return results;
    }

    parseMorphology(text) {
        const results = {};
        if (!text) return results;

        Object.keys(this.morphologyPatterns).forEach(key => {
            const match = text.match(this.morphologyPatterns[key]);
            if (match) {
                results[key] = match[1].trim();
            }
        });

        const nrbcMatch = text.match(/NRBC%[^:]*:\s*(\d+\.?\d*)/i);
        if (nrbcMatch) {
            results.nrbc = parseFloat(nrbcMatch[1]);
        }

        return results;
    }

    normalizeCellType(cellType) {
        const normalized = cellType.toLowerCase().trim();
        
        const typeMap = {
            'neutrophils': 'neutrophils', 'neutrophil': 'neutrophils', 'polys': 'neutrophils', 'poly': 'neutrophils',
            'lymphs': 'lymphocytes', 'lymphocytes': 'lymphocytes', 'lymph': 'lymphocytes',
            'monos': 'monocytes', 'monocytes': 'monocytes', 'mono': 'monocytes',
            'eos': 'eosinophils', 'eosinophils': 'eosinophils', 'eosinophil': 'eosinophils',
            'basos': 'basophils', 'basophils': 'basophils', 'basophil': 'basophils',
            'bands': 'bands', 'band': 'bands',
            'blasts': 'blasts', 'blast': 'blasts',
            'metamyelocytes': 'metamyelocytes', 'metamyelo': 'metamyelocytes', 'meta': 'metamyelocytes',
            'myelocytes': 'myelocytes', 'myelo': 'myelocytes',
            'promyelocytes': 'promyelocytes', 'promyelo': 'promyelocytes',
            'atypical lymphs': 'atypical_lymphocytes', 'reactive lymphs': 'atypical_lymphocytes',
            'lymphs, atypical/reactive (auto)': 'atypical_lymphocytes',
            'granulocytes, immature': 'immature_granulocytes', 'granulocytes,immature': 'immature_granulocytes',
            'granulocytes, immature (%)': 'immature_granulocytes', 'granulocytes,immature (%)': 'immature_granulocytes',
            'immature granulocytes': 'immature_granulocytes',
            'nrbc% (auto)': 'nrbc', 'nrbc%': 'nrbc'
        };

        return typeMap[normalized] || null;
    }

    parseAll(text) {
        const cbc = this.parseCBC(text);
        const differential = this.parseDifferential(text);
        const morphology = this.parseMorphology(text);
        
        return { cbc, differential, morphology, raw: text };
    }
}

// Main Application Class
class HemeReportApp {
    constructor() {
        this.epicParser = new EpicDataParser();
        this.currentModalType = null;
        this.initialize();
    }

    initialize() {
        this.setupEventListeners();
        this.setupTextExpansion();
        this.loadSavedData();
        this.updateCharacterCount();
    }

    setupEventListeners() {
        // Sidebar toggle
        document.getElementById('sidebar-toggle').addEventListener('click', this.toggleSidebar);
        
        // Editor functionality
        const editor = document.getElementById('main-editor');
        editor.addEventListener('input', () => {
            this.updateCharacterCount();
            this.autoSave();
        });

        // Modal close
        document.addEventListener('click', (e) => {
            if (e.target.id === 'form-modal') {
                this.closeModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById('form-modal').style.display === 'block') {
                this.closeModal();
            }
        });
    }

    setupTextExpansion() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'F8') {
                event.preventDefault();
                this.handleTextExpansion(event.target);
            }
        });
    }

    handleTextExpansion(targetElement) {
        if (!this.isTextInputElement(targetElement)) return;

        const cursorPosition = targetElement.selectionStart;
        const textBeforeCursor = targetElement.value.substring(0, cursorPosition);
        
        const wordMatch = textBeforeCursor.match(/\S+$/);
        if (!wordMatch) return;

        const word = wordMatch[0];
        const wordStartPosition = cursorPosition - word.length;
        
        const matchingCode = this.findMatchingCode(word);
        if (matchingCode) {
            const expandedText = LONEMAN_QUICK_TEXTS[matchingCode];
            
            const textBefore = targetElement.value.substring(0, wordStartPosition);
            const textAfter = targetElement.value.substring(cursorPosition);
            
            targetElement.value = textBefore + expandedText + textAfter;
            
            const newCursorPosition = wordStartPosition + expandedText.length;
            targetElement.selectionStart = newCursorPosition;
            targetElement.selectionEnd = newCursorPosition;
            
            targetElement.dispatchEvent(new Event('input', { bubbles: true }));
            
            // Text expanded silently
        }
    }

    isTextInputElement(element) {
        return element && (
            element.tagName === 'TEXTAREA' ||
            (element.tagName === 'INPUT' && element.type === 'text')
        );
    }

    findMatchingCode(word) {
        const lowerWord = word.toLowerCase();
        if (LONEMAN_QUICK_TEXTS[lowerWord]) return lowerWord;
        
        for (const code in LONEMAN_QUICK_TEXTS) {
            if (code.toLowerCase() === lowerWord) return code;
        }
        
        return null;
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('collapsed');
    }

    updateCharacterCount() {
        const editor = document.getElementById('main-editor');
        const charCount = document.getElementById('char-count');
        const count = editor.value.length;
        charCount.textContent = `${count.toLocaleString()} characters`;
    }

    autoSave() {
        const editor = document.getElementById('main-editor');
        localStorage.setItem('heme-report-content', editor.value);
    }

    loadSavedData() {
        const savedContent = localStorage.getItem('heme-report-content');
        if (savedContent) {
            document.getElementById('main-editor').value = savedContent;
            this.updateCharacterCount();
        }
    }

    showNotification(message, type = 'info') {
        // Notifications disabled for minimal interface
        return;
    }

    closeModal() {
        document.getElementById('form-modal').style.display = 'none';
        this.currentModalType = null;
    }
}

// Global Functions
function toggleSection(sectionId) {
    const content = document.getElementById(sectionId);
    const header = content.previousElementSibling;
    const icon = header.querySelector('.toggle-icon');
    
    content.classList.toggle('collapsed');
    header.classList.toggle('active');
    
    if (content.classList.contains('collapsed')) {
        icon.textContent = '▶';
    } else {
        icon.textContent = '▼';
    }
}

// Epic Data Parser Functions
function parseEpicData() {
    const inputText = document.getElementById('epic-data-input').value;
    const resultsDiv = document.getElementById('parsing-results');
    const cbcDiv = document.getElementById('cbc-values');
    const autoDiffDiv = document.getElementById('auto-diff-values');
    const manualDiffDiv = document.getElementById('manual-diff-values');

    if (!inputText.trim()) {
        return;
    }

    try {
        const parsed = window.app.epicParser.parseAll(inputText);
        
        resultsDiv.style.display = 'block';
        
        // Display CBC results
        cbcDiv.innerHTML = '';
        if (Object.keys(parsed.cbc).length > 0) {
            Object.keys(parsed.cbc).forEach(key => {
                const value = parsed.cbc[key];
                const span = document.createElement('span');
                span.className = 'parsed-value';
                span.innerHTML = `<strong>${key.toUpperCase()}:</strong> ${value}`;
                cbcDiv.appendChild(span);
            });
        } else {
            cbcDiv.innerHTML = '<em>No CBC data found</em>';
        }
        
        // Display Differential results
        autoDiffDiv.innerHTML = '<h5>Differential Results:</h5>';
        const diffData = parsed.differential;
        
        if (diffData.diffMethod) {
            const methodSpan = document.createElement('div');
            methodSpan.style.fontStyle = 'italic';
            methodSpan.style.marginBottom = '8px';
            methodSpan.innerHTML = `Method: ${diffData.diffMethod}`;
            autoDiffDiv.appendChild(methodSpan);
        }
        
        if (diffData.diffMethod && diffData.diffMethod.includes('not performed')) {
            autoDiffDiv.innerHTML += '<em>Differential not performed</em>';
        } else {
            const diffKeys = Object.keys(diffData).filter(key => key !== 'diffMethod');
            if (diffKeys.length > 0) {
                diffKeys.forEach(key => {
                    const value = diffData[key];
                    const span = document.createElement('span');
                    span.className = 'parsed-value';
                    span.innerHTML = `<strong>${key.replace('_', ' ')}:</strong> ${value}%`;
                    autoDiffDiv.appendChild(span);
                });
            } else {
                autoDiffDiv.innerHTML += '<em>No differential data found</em>';
            }
        }
        
        // Display Morphology results
        manualDiffDiv.innerHTML = '<h5>Morphology & Special Findings:</h5>';
        const morphData = parsed.morphology;
        
        if (Object.keys(morphData).length > 0) {
            Object.keys(morphData).forEach(key => {
                const value = morphData[key];
                const span = document.createElement('span');
                span.className = 'parsed-value';
                if (key === 'nrbc') {
                    span.innerHTML = `<strong>NRBC:</strong> ${value}%`;
                } else {
                    span.innerHTML = `<strong>${key.replace(/([A-Z])/g, ' $1').trim()}:</strong> ${value}`;
                }
                manualDiffDiv.appendChild(span);
            });
        } else {
            manualDiffDiv.innerHTML += '<em>No morphology findings</em>';
        }
        
        // Generate narrative paragraph
        generateCBCParagraph(parsed);
        
    } catch (error) {
        console.error('Parsing error:', error);
    }
}

function clearEpicData() {
    document.getElementById('epic-data-input').value = '';
    document.getElementById('parsing-results').style.display = 'none';
}

function generateCBCParagraph(parsed) {
    let paragraph = '';
    
    if (Object.keys(parsed.cbc).length > 0) {
        const cbc = parsed.cbc;
        if (cbc.date) {
            paragraph += `CBC results from ${cbc.date} are as follows: `;
        } else {
            paragraph += 'CBC results are as follows: ';
        }
        
        const cbcParts = [];
        if (cbc.wbc) cbcParts.push(`WBC ${cbc.wbc} K/μL`);
        if (cbc.rbc) cbcParts.push(`RBC ${cbc.rbc} M/μL`);
        if (cbc.hgb) cbcParts.push(`HGB ${cbc.hgb} g/dL`);
        if (cbc.hct) cbcParts.push(`HCT ${cbc.hct}%`);
        if (cbc.mcv) cbcParts.push(`MCV ${cbc.mcv} fL`);
        if (cbc.mch) cbcParts.push(`MCH ${cbc.mch} pg`);
        if (cbc.mchc) cbcParts.push(`MCHC ${cbc.mchc} g/dL`);
        if (cbc.plt) cbcParts.push(`PLT ${cbc.plt} K/μL`);
        if (cbc.rdw) cbcParts.push(`RDW ${cbc.rdw}%`);
        
        paragraph += cbcParts.join(', ') + '.';
    }
    
    // Add differential info
    const diff = parsed.differential;
    const morphology = parsed.morphology;
    
    if (diff && Object.keys(diff).length > 1) {
        if (diff.diffMethod && diff.diffMethod.includes('not performed')) {
            paragraph += ` Differential was not performed due to low WBC count.`;
        } else {
            const method = diff.diffMethod || 'Unknown method';
            paragraph += ` ${method} differential shows `;
            
            const diffParts = [];
            const orderedTypes = ['neutrophils', 'bands', 'lymphocytes', 'atypical_lymphocytes', 'monocytes', 
                                'eosinophils', 'basophils', 'metamyelocytes', 'myelocytes', 'promyelocytes', 'blasts', 'other'];
            
            orderedTypes.forEach(type => {
                if (diff[type] !== undefined) {
                    const displayName = type.replace('_', ' ');
                    diffParts.push(`${diff[type]}% ${displayName}`);
                }
            });
            
            // Add NRBC to differential if present
            if (morphology && morphology.nrbc) {
                diffParts.push(`${morphology.nrbc}% nucleated red blood cells`);
            }
            
            paragraph += diffParts.join(', ') + '.';
        }
    }
    
    // Add other morphology findings (excluding NRBC which was handled above)
    if (morphology && Object.keys(morphology).length > 0) {
        const morphParts = [];
        
        // Handle other morphology findings (skip NRBC as it's included with differential)
        Object.keys(morphology).forEach(key => {
            if (key !== 'nrbc' && morphology[key]) {
                const displayName = key.replace(/([A-Z])/g, ' $1').trim().toLowerCase();
                morphParts.push(`${displayName}: ${morphology[key]}`);
            }
        });
        
        if (morphParts.length > 0) {
            paragraph += ` Special findings include ${morphParts.join(', ')}.`;
        }
    }
    
    // Store for potential insertion
    window.cbcParagraph = paragraph;
    
    // Show generated paragraph
    let paragraphDiv = document.getElementById('generated-paragraph');
    if (!paragraphDiv) {
        paragraphDiv = document.createElement('div');
        paragraphDiv.id = 'generated-paragraph';
        paragraphDiv.className = 'parsed-section';
        paragraphDiv.innerHTML = '<h5>Generated Paragraph:</h5><div id="paragraph-text"></div>';
        document.getElementById('parsing-results').appendChild(paragraphDiv);
    }
    
    const paragraphText = document.getElementById('paragraph-text');
    if (paragraphText) {
        paragraphText.innerHTML = `<div style="font-style: italic; padding: 8px; background: #e7f3ff; border: 1px solid #b3d9ff; border-radius: 4px; cursor: pointer;" onclick="insertParsedParagraph()">${paragraph}<br><small style="color: #666;">Click to insert into report</small></div>`;
    }
}

function insertParsedParagraph() {
    if (window.cbcParagraph) {
        const editor = document.getElementById('main-editor');
        const cursorPos = editor.selectionStart;
        const textBefore = editor.value.substring(0, cursorPos);
        const textAfter = editor.value.substring(cursorPos);
        
        editor.value = textBefore + window.cbcParagraph + '\n\n' + textAfter;
        editor.focus();
        
        const newPos = cursorPos + window.cbcParagraph.length + 2;
        editor.setSelectionRange(newPos, newPos);
        
        window.app.updateCharacterCount();
        window.app.autoSave();
    }
}

// Peripheral Blood Templates
const PERIPHERAL_BLOOD = {
    normal: 'Review of the peripheral smear reveals mature normal leukocytes.',
    no_pathology: 'Review of the peripheral smear reveals no specific pathologic abnormality.',
    confirms_cbc: 'Review of the peripheral smear confirms the CBC findings.',
    not_available: 'A peripheral smear is not available for review.',
    left_shift: 'Review of the peripheral smear reveals a left shift with increased bands and immature granulocytes.',
    blasts: 'Review of the peripheral smear reveals circulating blasts comprising X% of leukocytes.',
    no_blasts: 'Circulating blasts are not identified.',
    no_plasma_cells: 'No circulating plasma cells are identified.',
    atypical_lymphs: 'Review of the peripheral smear reveals atypical/reactive lymphocytes.',
    leukoerythroblastic: 'Review of the peripheral smear reveals a leukoerythroblastic picture with nucleated red cells, tear drop cells, and left-shifted granulocytes.',
    dysplastic: 'Review of the peripheral smear reveals dysplastic changes including hypogranular and hyposegmented neutrophils.',
    tear_drops: 'Review of the peripheral smear reveals tear drop cells (dacrocytes) and anisopoikilocytosis.'
};

// IHC & Special Stains Templates
const IHC_STAINS = {
    outside_ihc: 'The above immunohistochemistry studies and special stains were submitted by the originating institution and reviewed at ***.',
    reticulin: 'Reticulin special stain shows X+ (out of 3) fiber staining.',
    trichrome: 'Trichrome special stain shows .',
    iron: 'Iron special stain shows .',
    congo: 'Congo Red special stain shows .',
    giemsa: 'A Giemsa special stain was performed to evaluate mast cells and plasma cells.',
    p53: 'P53 stain shows scattered staining.',
    blasts: 'CD34+ CD117+ blasts are X% of cellularity by CD34 immunostain and CD117/GATA-1 double stains.',
    monotypic_lc: 'Plasma cells are monotypic for kappa/lambda light chains by immunohistochemistry/in situ hybridization.',
    polytypic_lc: 'Plasma cells are polytypic by in situ hybridization/immunohistochemistry for kappa and lambda light chains.'
};

// Template Functions
function insertCoreHeaderTemplate() {
    insertTemplate(CORE_TEMPLATES.header);
}

function insertCoreBasicTemplate() {
    insertTemplate(CORE_TEMPLATES.basic);
}

function insertCoreDetailedTemplate() {
    insertTemplate(CORE_TEMPLATES.detailed);
}

function insertCoreOtherTemplate() {
    insertTemplate(CORE_TEMPLATES.other);
}

function insertCoreClotTemplate() {
    insertTemplate(CORE_TEMPLATES.clot);
}

function insertAspirateBasicTemplate() {
    insertTemplate(ASPIRATE_TEMPLATES.basic);
}

function insertAspirateDetailedTemplate() {
    insertTemplate(ASPIRATE_TEMPLATES.detailed);
}

function insertPeripheralBlood(findingType) {
    try {
        if (PERIPHERAL_BLOOD && PERIPHERAL_BLOOD[findingType]) {
            insertTemplate(PERIPHERAL_BLOOD[findingType]);
        }
    } catch (error) {
        console.error('Error in insertPeripheralBlood:', error);
    }
}

function insertIHCStain(stainType) {
    try {        
        if (IHC_STAINS && IHC_STAINS[stainType]) {
            insertTemplate(IHC_STAINS[stainType]);
        }
    } catch (error) {
        console.error('Error in insertIHCStain:', error);
    }
}

function insertLymphoidTemplate(type) {
    if (LYMPHOID_TEMPLATES[type]) {
        insertTemplate(LYMPHOID_TEMPLATES[type]);
    }
}

function insertTemplate(template) {
    const editor = document.getElementById('main-editor');
    const cursorPos = editor.selectionStart;
    const textBefore = editor.value.substring(0, cursorPos);
    const textAfter = editor.value.substring(cursorPos);
    
    editor.value = textBefore + template + '\n\n' + textAfter;
    editor.focus();
    
    const newPos = cursorPos + template.length + 2;
    editor.setSelectionRange(newPos, newPos);
    
    window.app.updateCharacterCount();
    window.app.autoSave();
}

// Modal Functions
function showCoreForm() {
    // This would open a detailed form for core biopsy
    // Interactive form coming soon
}

function showAspirateForm() {
    // This would open a detailed form for aspirate
    // Interactive form coming soon
}

function showLymphoidForm() {
    // This would open a detailed form for lymphoid
    // Interactive form coming soon
}

function insertFromForm() {
    // This would process form data and insert into editor
    window.app.closeModal();
}

function closeModal() {
    window.app.closeModal();
}

// Editor Functions
function copyToClipboard() {
    const editor = document.getElementById('main-editor');
    if (editor.value.trim() === '') {
        return;
    }
    
    navigator.clipboard.writeText(editor.value).then(() => {
        // Copied silently
    }).catch(() => {
        // Fallback
        editor.select();
        document.execCommand('copy');
    });
}

function clearEditor() {
    if (confirm('Are you sure you want to clear the entire report? This action cannot be undone.')) {
        document.getElementById('main-editor').value = '';
        window.app.updateCharacterCount();
        window.app.autoSave();
    }
}

function downloadReport() {
    const editor = document.getElementById('main-editor');
    if (editor.value.trim() === '') {
        return;
    }
    
    const blob = new Blob([editor.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `heme_report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function printReport() {
    const editor = document.getElementById('main-editor');
    if (editor.value.trim() === '') {
        return;
    }
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Hematopathology Report</title>
                <style>
                    body { 
                        font-family: 'Courier New', monospace; 
                        font-size: 12px; 
                        line-height: 1.4; 
                        margin: 20px; 
                        white-space: pre-wrap;
                    }
                    .header { 
                        text-align: center; 
                        font-size: 18px; 
                        font-weight: bold; 
                        margin-bottom: 20px; 
                        font-family: Arial, sans-serif;
                    }
                </style>
            </head>
            <body>
                <div class="header">Hematopathology Report</div>
                <div>${editor.value}</div>
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Text Expansion Help
function showExpansionHelp() {
    const modal = document.getElementById('form-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Text Expansion Reference';
    
    let helpHTML = `
        <div style="background: #e3f2fd; padding: 12px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #2196F3;">
            <strong>How to use:</strong> Type any CODE (case insensitive) and press <kbd style="background: #f5f5f5; padding: 2px 6px; border-radius: 3px; border: 1px solid #ccc;">F8</kbd> to expand it to the full text.
        </div>
        
        <div style="margin-bottom: 20px;">
            <input type="text" id="search-expansions" placeholder="Search codes or text..." style="width: 100%; padding: 10px; border: 2px solid #e1e8ed; border-radius: 6px; font-size: 1rem;">
        </div>
        
        <div style="max-height: 400px; overflow-y: auto; border: 1px solid #e1e8ed; border-radius: 6px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                <thead>
                    <tr style="background: #f8f9fa;">
                        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6; font-weight: 600; color: #495057; width: 120px;">CODE</th>
                        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6; font-weight: 600; color: #495057;">TEXT</th>
                    </tr>
                </thead>
                <tbody id="expansions-table-body">
    `;
    
    const sortedCodes = Object.keys(LONEMAN_QUICK_TEXTS).sort();
    sortedCodes.forEach((code, index) => {
        const text = LONEMAN_QUICK_TEXTS[code];
        helpHTML += `
            <tr style="${index % 2 === 0 ? 'background: #fff;' : 'background: #f8f9fa;'}" class="expansion-row">
                <td style="padding: 10px; border-bottom: 1px solid #e1e8ed; font-family: 'Courier New', monospace; font-weight: 600; color: #2c3e50; vertical-align: top;">${code.toUpperCase()}</td>
                <td style="padding: 10px; border-bottom: 1px solid #e1e8ed; line-height: 1.4; color: #495057;">${text}</td>
            </tr>
        `;
    });
    
    helpHTML += `
                </tbody>
            </table>
        </div>
    `;
    
    modalBody.innerHTML = helpHTML;
    modal.style.display = 'block';
    
    // Add search functionality
    const searchInput = document.getElementById('search-expansions');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('.expansion-row');
        
        rows.forEach(row => {
            const code = row.querySelector('td:first-child').textContent.toLowerCase();
            const text = row.querySelector('td:last-child').textContent.toLowerCase();
            
            if (code.includes(searchTerm) || text.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
    
    setTimeout(() => searchInput.focus(), 100);
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    window.app = new HemeReportApp();
});
