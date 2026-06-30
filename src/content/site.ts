// ============================================================================
// Central site configuration & content.
//
// i18n NOTE: This file holds English ("en") content only for now. To add a
// Spanish version later, create `content.es.ts` exporting the same shape and
// swap based on a locale value (see `src/lib/i18n.ts`). All UI text lives here
// so translation is a copy-and-translate task with no component changes.
// ============================================================================

export const profile = {
  name: "Sebastian Cuesta Hoyos",
  // EASY TO UPDATE: current role string is used across the site.
  role: "Postdoctoral Research Associate, University of Manchester",
  tagline:
    "Chemist & chemical biologist working across biotechnology, biocatalysis, drug discovery and protein science.",
  // External links — replace placeholders with real URLs.
  links: {
    linkedin: "#", // [paste Sebastian's LinkedIn URL]
    scholar: "#", // [paste Sebastian's Google Scholar URL]
    orcid: "#", // [paste Sebastian's ORCID URL]
    email: "mailto:contact@example.com", // [paste preferred public email]
    cv: "/cv-placeholder.pdf", // [upload final CV PDF to /public/]
  },
  emailDisplay: "contact@example.com", // [paste preferred public email]
};

export const credibility = [
  "30+ peer-reviewed publications",
  "MSCA Postdoctoral Fellowship awarded",
  "10+ years computational chemistry experience",
  "5+ years pharmaceutical R&D experience",
  "Biocatalysis, drug discovery & protein science",
];

export const whatIWorkOn = [
  {
    icon: "FlaskConical",
    title: "Enzyme discovery & biocatalysis",
    text: "Exploring and engineering enzymes for selective transformations and therapeutic biosynthesis.",
  },
  {
    icon: "Cpu",
    title: "Computational & AI-guided drug discovery",
    text: "Applying molecular modelling, docking, molecular dynamics, quantum chemistry and machine learning to therapeutic discovery.",
  },
  {
    icon: "Atom",
    title: "Molecular mechanisms & protein science",
    text: "Connecting chemical reactivity, biochemical function and molecular recognition across enzymes, proteins and drug-like molecules.",
  },
];

export type Project = {
  slug: string;
  title: string;
  short: string;
  keywords: string[];
  overview: string;
  question: string;
  whyItMatters: string;
  approach: string;
  methods: string[];
  relevance: string;
  outputs: string;
  skills: string[];
  draft?: boolean;
};

export const projects: Project[] = [
  {
    slug: "enzyme-engineering-biosynthesis",
    title: "Enzyme Engineering for the Biosynthesis of Therapeutics",
    short:
      "Exploring, characterising and evolving enzymes involved in the biosynthesis of therapeutically relevant molecules, with emphasis on selectivity, substrate scope and biocatalytic potential.",
    keywords: ["Enzyme discovery", "Biocatalysis", "Substrate scope", "Biosynthesis"],
    overview:
      "A method-focused case study in discovering, characterising and engineering enzymes that build therapeutically relevant molecules, combining biochemical and computational interpretation.",
    question:
      "How can enzymes be discovered and engineered to enable selective, sustainable routes to complex therapeutic molecules?",
    whyItMatters:
      "Enzymes can enable selective and sustainable routes to complex therapeutic molecules, reducing reliance on harsh reagents and improving stereo- and regioselectivity.",
    approach:
      "Combine biochemical characterisation, enzyme assays, substrate-scope analysis, structural/computational interpretation and machine-learning-guided thinking.",
    methods: [
      "Protein expression & purification",
      "Enzymatic assays",
      "Substrate-scope profiling",
      "Biosynthetic pathway analysis",
      "Structural & computational interpretation",
    ],
    relevance:
      "Biocatalysis is increasingly central to green chemistry and pharmaceutical manufacturing, supporting selective synthesis, scalable processes and novel therapeutic chemistries.",
    outputs:
      "Selected publications relate to enzymatic cascades, beta-lactone biosynthesis and enzyme-mediated amide bond assembly. See the Publications page for the full list.",
    skills: [
      "Enzyme discovery",
      "Biocatalysis",
      "Protein expression",
      "Purification",
      "Enzymatic assays",
      "Substrate scope",
      "Biosynthetic pathway analysis",
    ],
  },
  {
    slug: "computational-ai-drug-discovery",
    title: "Computational and AI-Guided Drug Discovery",
    short:
      "Using molecular modelling, docking, molecular dynamics, quantum chemistry and machine learning to explore therapeutic targets, predict molecular properties and support drug discovery workflows.",
    keywords: ["Docking", "Molecular dynamics", "Machine learning", "QSAR"],
    overview:
      "A case study in applying computational and data-driven methods to prioritise compounds, predict molecular properties and guide experimental decisions in early-stage discovery.",
    question:
      "How can computational and machine-learning methods accelerate the identification and prioritisation of promising therapeutic molecules?",
    whyItMatters:
      "Computational methods can accelerate early-stage discovery, prioritise compounds and guide experimental decisions before committing laboratory resources.",
    approach:
      "Molecular docking, molecular dynamics, QSAR, quantum descriptors, machine learning, protein modelling and data-driven interpretation.",
    methods: [
      "AutoDock Vina (docking)",
      "Gromacs (molecular dynamics)",
      "Gaussian (quantum chemistry)",
      "AlphaFold & SWISS-MODEL (protein modelling)",
      "Python, scikit-learn, WEKA (machine learning)",
    ],
    relevance:
      "Computational and AI-guided approaches are core to modern pharma R&D, reducing time and cost in hit identification, lead optimisation and property prediction.",
    outputs:
      "Selected publications cover LRRK2 inhibitors, DPP-4 inhibitors, tyrosinase inhibitors, SARS-CoV-2 drug repurposing, QSAR studies and ElectroPredictor.",
    skills: [
      "Python",
      "scikit-learn",
      "WEKA",
      "AutoDock Vina",
      "Gromacs",
      "Gaussian",
      "AlphaFold",
      "SWISS-MODEL",
    ],
  },
  {
    slug: "molecular-mechanisms-reactivity",
    title: "Molecular Mechanisms and Chemical Reactivity",
    short:
      "Investigating how molecular structure controls chemical reactivity, selectivity and biological function through quantum chemistry, molecular modelling and mechanistic reasoning.",
    keywords: ["DFT", "Reaction mechanisms", "Selectivity", "Quantum chemistry"],
    overview:
      "A case study in using quantum chemistry and mechanistic reasoning to explain reactivity, selectivity and the link between chemical principles and biological function.",
    question:
      "How does molecular structure control chemical reactivity and selectivity, and what does that reveal about biological function?",
    whyItMatters:
      "Understanding mechanisms helps explain reactivity, improve molecular design and connect chemical principles with biological systems.",
    approach:
      "Quantum chemical calculations, transition-state analysis, structure-reactivity relationships, reaction-pathway modelling and mechanistic interpretation.",
    methods: [
      "Density functional theory (DFT)",
      "Transition-state analysis",
      "Reaction-pathway modelling",
      "Structure-reactivity analysis",
      "Mechanistic interpretation",
    ],
    relevance:
      "Mechanistic insight underpins rational molecular design, catalyst development and the interpretation of enzyme function relevant to biotech and pharma.",
    outputs:
      "Selected publications address nucleophilic substitution, amide bond cleavage, fructose/tagatose dehydration, ether decomposition and chemical reactivity.",
    skills: [
      "DFT",
      "Quantum chemistry",
      "Computational mechanistic chemistry",
      "Reaction mechanisms",
      "Selectivity",
      "Molecular interpretation",
    ],
  },
  {
    slug: "membrane-proteins-nutrient-acquisition",
    title: "Membrane Proteins and Bacterial Nutrient Acquisition",
    short:
      "Current work focuses on biochemical and biophysical approaches to understand mycobacterial nutrient acquisition and membrane-protein function.",
    keywords: ["Membrane proteins", "Biophysics", "Biochemistry"],
    overview:
      "An ongoing line of work applying biochemical and biophysical methods to membrane-protein function. Details are kept high-level while the research is in progress.",
    question:
      "How do membrane proteins contribute to bacterial nutrient acquisition and overall membrane-protein function?",
    whyItMatters:
      "Membrane proteins are central to cellular function and represent important targets across anti-infective and therapeutic research.",
    approach:
      "Biochemical and biophysical characterisation of membrane proteins using established protein-science workflows.",
    methods: [
      "Protein expression & purification",
      "Membrane-protein handling",
      "Biophysical characterisation",
      "Biochemical assays",
    ],
    relevance:
      "Membrane-protein biochemistry supports anti-infective discovery and a broad range of therapeutic programmes.",
    outputs: "Outputs from this current work will be added as results become publicly shareable.",
    skills: ["Membrane proteins", "Protein purification", "Biophysical methods", "Biochemical assays"],
    draft: true,
  },
];

export const expertiseAreas = [
  {
    icon: "FlaskConical",
    title: "Enzyme discovery, enzyme engineering & biocatalysis",
    keywords: [
      "Enzyme discovery",
      "Biocatalysis",
      "Enzyme assays",
      "Biosynthesis of therapeutics",
      "Substrate scope",
      "Amide bond ligases",
      "Biosynthetic pathways",
    ],
  },
  {
    icon: "Cpu",
    title: "Computational chemistry & AI-guided drug discovery",
    keywords: [
      "Molecular docking",
      "Molecular dynamics",
      "Quantum chemistry",
      "QSAR",
      "Machine learning",
      "Protein modelling",
      "Drug repurposing",
      "Molecular property prediction",
      "ElectroPredictor",
    ],
  },
  {
    icon: "Dna",
    title: "Protein science, biochemistry & biotechnology",
    keywords: [
      "Protein expression",
      "Protein purification",
      "Membrane proteins",
      "Biochemical assays",
      "FPLC",
      "PCR",
      "Cloning",
      "Mutagenesis",
      "X-ray crystallography",
      "Metagenomics",
    ],
  },
  {
    icon: "TestTubes",
    title: "Analytical and pharmaceutical R&D",
    keywords: [
      "HPLC",
      "LC-MS",
      "GC-MS",
      "UV-Vis",
      "NMR",
      "IR",
      "Analytical method development",
      "Formulation development",
      "Scale-up",
      "Technology transfer",
      "GxP",
      "ICH and USP guidelines",
    ],
  },
  {
    icon: "Atom",
    title: "Molecular mechanisms and chemical reactivity",
    keywords: [
      "Reaction mechanisms",
      "Structure-reactivity relationships",
      "Transition states",
      "Nucleophilic substitution",
      "Enzyme mechanisms",
      "Chemical selectivity",
    ],
  },
];

export type PublicationCategory =
  | "Enzyme discovery & biocatalysis"
  | "Computational drug discovery"
  | "Molecular mechanisms & chemical reactivity"
  | "Antimicrobial peptides & anti-infective discovery";

export const publicationCategories: PublicationCategory[] = [
  "Enzyme discovery & biocatalysis",
  "Computational drug discovery",
  "Molecular mechanisms & chemical reactivity",
  "Antimicrobial peptides & anti-infective discovery",
];

export type Publication = {
  title: string;
  category: PublicationCategory;
  note?: string;
  doi?: string; // e.g. "10.xxxx/xxxxx" — leave undefined when unavailable
};

// NOTE: These entries are placeholders describing the topic areas of Sebastian's
// 30+ publications. Replace titles/DOIs with the verified citation details.
export const publications: Publication[] = [
  {
    title: "Enzyme-mediated amide bond assembly — [add full citation]",
    category: "Enzyme discovery & biocatalysis",
    note: "Add authors, journal and year.",
  },
  {
    title: "Beta-lactone biosynthesis and enzymatic cascades — [add full citation]",
    category: "Enzyme discovery & biocatalysis",
    note: "Add authors, journal and year.",
  },
  {
    title: "LRRK2 inhibitors: computational study — [add full citation]",
    category: "Computational drug discovery",
    note: "Add authors, journal and year.",
  },
  {
    title: "DPP-4 inhibitors via molecular modelling — [add full citation]",
    category: "Computational drug discovery",
    note: "Add authors, journal and year.",
  },
  {
    title: "Tyrosinase inhibitors and QSAR — [add full citation]",
    category: "Computational drug discovery",
    note: "Add authors, journal and year.",
  },
  {
    title: "SARS-CoV-2 drug repurposing — [add full citation]",
    category: "Computational drug discovery",
    note: "Add authors, journal and year.",
  },
  {
    title: "ElectroPredictor: molecular property prediction — [add full citation]",
    category: "Computational drug discovery",
    note: "Add authors, journal and year.",
  },
  {
    title: "Nucleophilic substitution mechanisms — [add full citation]",
    category: "Molecular mechanisms & chemical reactivity",
    note: "Add authors, journal and year.",
  },
  {
    title: "Amide bond cleavage reactivity — [add full citation]",
    category: "Molecular mechanisms & chemical reactivity",
    note: "Add authors, journal and year.",
  },
  {
    title: "Fructose/tagatose dehydration pathways — [add full citation]",
    category: "Molecular mechanisms & chemical reactivity",
    note: "Add authors, journal and year.",
  },
  {
    title: "Antimicrobial peptides: design and activity — [add full citation]",
    category: "Antimicrobial peptides & anti-infective discovery",
    note: "Add authors, journal and year.",
  },
  {
    title: "Anti-infective discovery approaches — [add full citation]",
    category: "Antimicrobial peptides & anti-infective discovery",
    note: "Add authors, journal and year.",
  },
];

export const scientificNotes = [
  {
    title: "Choosing biophysical methods for ligand screening in protein science",
    status: "Draft topic",
  },
  {
    title: "How computational chemistry can support experimental biochemistry",
    status: "Coming soon",
  },
  {
    title: "From reaction mechanisms to enzyme function: why mechanistic thinking matters",
    status: "Draft topic",
  },
];

export const education = [
  { degree: "PhD in Chemical Biology", school: "University of Manchester" },
  { degree: "MSc in Drug Discovery and Translational Biology", school: "University of Edinburgh" },
  { degree: "BSc in Chemistry", school: "Pontifical Catholic University of Ecuador" },
];

export const professionalBackground = [
  "Pharmaceutical R&D, scale-up, technology transfer, formulation and quality control",
  "Computational chemistry and molecular modelling",
  "Chemical biology and biocatalysis",
  "Protein science and biochemical methods",
];

export const awards = [
  "Marie Skłodowska-Curie Actions Postdoctoral Fellowship — awarded, starting July 2027",
  "Dean's Doctoral Scholarship Award, University of Manchester",
  "SENESCYT Scholarship",
  "Best Graduate in Chemistry",
];
