// ============================================================================
// Central site configuration & content.
//
// i18n: English ("en") lives here and is the default/source bundle. Spanish
// ("es") lives in `site.es.ts` and mirrors the same shape. The active bundle is
// resolved at runtime via `src/lib/i18n.tsx` (useContent / useLang). Language-
// neutral data (links, emails, slugs) stays here and is reused by both bundles.
// ============================================================================

export type Lang = "en" | "es";

// Shared research themes — language-neutral ids used to filter both projects and
// publications from a single filter bar. Labels per language live in each
// bundle's `themes`.
export type ThemeId =
  | "biocatalysis"
  | "computational"
  | "mechanisms"
  | "proteins"
  | "antimicrobial";

export type Theme = { id: ThemeId; label: string };

// Language-neutral profile data (links, emails, CV). Text fields that differ by
// language (role, tagline) live inside each content bundle's `profile`.
export const profile = {
  name: "Sebastian Cuesta Hoyos",
  links: {
    linkedin: "https://www.linkedin.com/in/sebastiancuesta/",
    scholar:
      "https://scholar.google.com/citations?hl=en&user=5BNhpcIAAAAJ&view_op=list_works&sortby=pubdate",
    orcid: "https://orcid.org/0000-0002-8035-6220",
    email: "mailto:sebastian.cuestahoyos@manchester.ac.uk",
    cv: "/cv-placeholder.pdf", // [upload final CV PDF to /public/]
  },
  emails: ["sebastian.cuestahoyos@manchester.ac.uk", "sebastian_cuesta@yahoo.com"],
  emailDisplay: "sebastian.cuestahoyos@manchester.ac.uk",
};

export type Article = { title: string; url: string };

export type Project = {
  slug: string;
  themeId: ThemeId;
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
  articles?: Article[];
  draft?: boolean;
};

export type PublicationCategory = string;

export type Publication = {
  title: string;
  category: PublicationCategory;
  themeId: ThemeId;
  note?: string;
  doi?: string;
};

export type FocusArea = {
  icon: string;
  title: string;
  text: string;
  keywords: string[];
  slug: string;
};

export type ExpertiseArea = { icon: string; title: string; keywords: string[] };
export type EducationItem = { degree: string; school: string };
export type NoteItem = { title: string; status: string };

// ----------------------------------------------------------------------------
// Shared (language-neutral) article references reused across both bundles.
// ----------------------------------------------------------------------------
const enzymeArticles: Article[] = [
  {
    title: "Cryptic enzymatic assembly of peptides armed with β-lactone warheads — Nature Chemical Biology (2024)",
    url: "https://www.nature.com/articles/s41589-024-01657-7",
  },
];

const mechanismArticles: Article[] = [
  {
    title:
      "ElectroPredictor: predicting Mayr's electrophilicity E via an ensemble machine-learning model — J. Chem. Inf. Model. (2023)",
    url: "https://pubs.acs.org/doi/abs/10.1021/acs.jcim.2c01367",
  },
  {
    title:
      "Fast cleavage of an unconstrained amide bond assisted by an intramolecular nucleophilic attack: a computational study — J. Comput. Chem. (2021)",
    url: "https://onlinelibrary.wiley.com/doi/abs/10.1002/jcc.26501",
  },
];

const drugDiscoveryArticles: Article[] = [
  {
    title:
      "In silico screening of the DrugBank database to search for possible drugs against SARS-CoV-2 — Molecules (2021)",
    url: "https://www.mdpi.com/1420-3049/26/4/1100",
  },
  {
    title:
      "Novel antimicrobial cruzioseptin peptides extracted from the splendid leaf frog — Amino Acids (2021)",
    url: "https://link.springer.com/article/10.1007/s00726-021-02986-w",
  },
];

// ----------------------------------------------------------------------------
// English content bundle
// ----------------------------------------------------------------------------

const projects: Project[] = [
  {
    slug: "enzyme-engineering-biosynthesis",
    themeId: "biocatalysis",
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
    articles: enzymeArticles,
  },
  {
    slug: "computational-ai-drug-discovery",
    themeId: "computational",
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
    articles: drugDiscoveryArticles,
  },
  {
    slug: "molecular-mechanisms-reactivity",
    themeId: "mechanisms",
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
    articles: mechanismArticles,
  },
  {
    slug: "membrane-proteins-nutrient-acquisition",
    themeId: "proteins",
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

export const en = {
  profile: {
    role: "Postdoctoral Research Associate, University of Manchester",
    tagline:
      "From molecular mechanisms to therapeutic discovery.",
  },
  credibility: [
    "30+ peer-reviewed publications",
    "MSCA Postdoctoral Fellowship awarded",
    "10+ years computational chemistry experience",
    "5+ years pharmaceutical R&D experience",
    "Biocatalysis, drug discovery & protein science",
  ],
  whatIWorkOn: [
    {
      icon: "FlaskConical",
      title: "Enzyme discovery & biocatalysis",
      text: "Exploring and engineering enzymes for selective transformations and therapeutic biosynthesis.",
      keywords: ["Enzyme discovery", "Biocatalysis", "Substrate scope", "Biosynthesis"],
      slug: "enzyme-engineering-biosynthesis",
    },
    {
      icon: "Cpu",
      title: "Computational & AI-guided drug discovery",
      text: "Applying molecular modelling, docking, molecular dynamics, quantum chemistry and machine learning to therapeutic discovery.",
      keywords: ["Docking", "Molecular dynamics", "Machine learning", "QSAR"],
      slug: "computational-ai-drug-discovery",
    },
    {
      icon: "Atom",
      title: "Molecular mechanisms & protein science",
      text: "Connecting chemical reactivity, biochemical function and molecular recognition across enzymes, proteins and drug-like molecules.",
      keywords: ["DFT", "Reaction mechanisms", "Selectivity", "Quantum chemistry"],
      slug: "molecular-mechanisms-reactivity",
    },
  ] as FocusArea[],
  projects,
  expertiseAreas: [
    {
      icon: "FlaskConical",
      title: "Enzyme discovery, enzyme engineering & biocatalysis",
      keywords: [
        "Enzyme discovery",
        "Biocatalysis",
        "Biosynthesis of therapeutics",
        "Mutagenesis",
        "Directed evolution",
        "Substrate scope optimisation",
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
        "Python",
        "scikit-learn",
        "WEKA",
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
  ] as ExpertiseArea[],
  themes: [
    { id: "biocatalysis", label: "Biocatalysis" },
    { id: "computational", label: "Computational & AI" },
    { id: "mechanisms", label: "Mechanisms & reactivity" },
    { id: "proteins", label: "Protein science" },
    { id: "antimicrobial", label: "Antimicrobial & anti-infective" },
  ] as Theme[],
  publicationCategories: [
    "Enzyme discovery & biocatalysis",
    "Computational drug discovery",
    "Molecular mechanisms & chemical reactivity",
    "Antimicrobial peptides & anti-infective discovery",
  ] as PublicationCategory[],
  publications: [
    {
      title: "Enzyme-mediated amide bond assembly — [add full citation]",
      category: "Enzyme discovery & biocatalysis",
      themeId: "biocatalysis",
      note: "Add authors, journal and year.",
    },
    {
      title: "Beta-lactone biosynthesis and enzymatic cascades — [add full citation]",
      category: "Enzyme discovery & biocatalysis",
      themeId: "biocatalysis",
      note: "Add authors, journal and year.",
    },
    {
      title: "LRRK2 inhibitors: computational study — [add full citation]",
      category: "Computational drug discovery",
      themeId: "computational",
      note: "Add authors, journal and year.",
    },
    {
      title: "DPP-4 inhibitors via molecular modelling — [add full citation]",
      category: "Computational drug discovery",
      themeId: "computational",
      note: "Add authors, journal and year.",
    },
    {
      title: "Tyrosinase inhibitors and QSAR — [add full citation]",
      category: "Computational drug discovery",
      themeId: "computational",
      note: "Add authors, journal and year.",
    },
    {
      title: "SARS-CoV-2 drug repurposing — [add full citation]",
      category: "Computational drug discovery",
      themeId: "computational",
      note: "Add authors, journal and year.",
    },
    {
      title: "ElectroPredictor: molecular property prediction — [add full citation]",
      category: "Computational drug discovery",
      themeId: "computational",
      note: "Add authors, journal and year.",
    },
    {
      title: "Nucleophilic substitution mechanisms — [add full citation]",
      category: "Molecular mechanisms & chemical reactivity",
      themeId: "mechanisms",
      note: "Add authors, journal and year.",
    },
    {
      title: "Amide bond cleavage reactivity — [add full citation]",
      category: "Molecular mechanisms & chemical reactivity",
      themeId: "mechanisms",
      note: "Add authors, journal and year.",
    },
    {
      title: "Fructose/tagatose dehydration pathways — [add full citation]",
      category: "Molecular mechanisms & chemical reactivity",
      themeId: "mechanisms",
      note: "Add authors, journal and year.",
    },
    {
      title: "Antimicrobial peptides: design and activity — [add full citation]",
      category: "Antimicrobial peptides & anti-infective discovery",
      themeId: "antimicrobial",
      note: "Add authors, journal and year.",
    },
    {
      title: "Anti-infective discovery approaches — [add full citation]",
      category: "Antimicrobial peptides & anti-infective discovery",
      themeId: "antimicrobial",
      note: "Add authors, journal and year.",
    },
  ] as Publication[],
  scientificNotes: [
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
  ] as NoteItem[],
  education: [
    { degree: "PhD in Chemical Biology", school: "University of Manchester" },
    { degree: "MSc in Drug Discovery and Translational Biology", school: "University of Edinburgh" },
    { degree: "BSc in Chemistry", school: "Pontifical Catholic University of Ecuador" },
  ] as EducationItem[],
  professionalBackground: [
    "Pharmaceutical R&D, scale-up, technology transfer, formulation and quality control",
    "Computational chemistry and molecular modelling",
    "Chemical biology and biocatalysis",
    "Protein science and biochemical methods",
  ],
  awards: [
    "Marie Skłodowska-Curie Actions Postdoctoral Fellowship — awarded, starting July 2027",
    "Dean's Doctoral Scholarship Award, University of Manchester",
    "SENESCYT Scholarship",
    "Best Graduate in Chemistry",
  ],
  ui: {
    nav: {
      home: "Home",
      about: "About",
      research: "Research / Expertise",
      projects: "Projects",
      publications: "Publications",
      work: "Projects & publications",
      notes: "Scientific Notes",
      contact: "Contact",
    },
    common: {
      downloadCv: "Download CV",
      viewCv: "View CV",
      readMore: "Read more",
      contact: "Contact",
      getInTouch: "Get in touch",
      connectLinkedin: "Connect on LinkedIn",
      relatedArticles: "Related research articles",
    },
    home: {
      heroTitlePre: "From molecular mechanisms to",
      heroTitleAccent: "therapeutic discovery",
      heroTitlePost: "",
      heroIntro:
        "From molecular mechanisms to therapeutic discovery — I combine computational chemistry, pharmaceutical R&D experience and experimental biochemistry to study enzymes, proteins and molecular recognition, with applications in biocatalysis, biotechnology and drug discovery.",
      viewResearch: "View Research",
      viewProjects: "View Projects",
      focusEyebrow: "Focus areas",
      focusTitle: "What I work on",
      selectedEyebrow: "Selected work",
      featuredTitle: "Featured projects",
      allProjects: "All projects",
      ctaTitle:
        "Let's build something together — whether it's a collaboration, scientific consulting, or a biotech/pharma opportunity, I'd love to hear from you.",
      headshotNote: "Headshot placeholder — upload professional photo",
    },
    about: {
      eyebrow: "About",
      title: "A multidisciplinary chemist & chemical biologist",
      intro:
        "Sebastian Cuesta Hoyos is a multidisciplinary chemist and chemical biologist with experience spanning computational chemistry, pharmaceutical R&D, enzyme discovery, biocatalysis, drug discovery and experimental biochemistry. His work integrates computational and experimental approaches to understand molecular mechanisms and accelerate the discovery of therapeutic molecules.",
      currentRole: "Current role",
      expertise: "Areas of expertise",
      education: "Education",
      background: "Professional background",
      awards: "Fellowship & awards",
      mentoring: "Scientific mentoring & capacity building",
      mentoringText:
        "Sebastian mentors students and early-career researchers in Ecuador, supporting thesis development, research design, data analysis, scientific writing and publication-oriented research. This work aims to strengthen scientific capacity and help emerging researchers produce rigorous, internationally relevant science.",
    },
    research: {
      eyebrow: "Research / Expertise",
      title: "Expertise across chemistry, biology and computation",
      intro:
        "A multidisciplinary toolkit spanning enzyme science, computational and AI-guided drug discovery, protein biochemistry, analytical and pharmaceutical R&D, and the study of molecular mechanisms.",
    },
    work: {
      eyebrow: "Selected work",
      title: "Projects & publications",
      intro:
        "Method-focused scientific case studies and peer-reviewed publications, filterable by research theme.",
      tabProjects: "Projects",
      tabPublications: "Publications",
      all: "All",
    },
    projects: {
      eyebrow: "Projects",
      title: "Method-focused scientific case studies",
      intro:
        "High-level overviews of research directions and methodologies. These case studies focus on scientific questions, approaches and skills rather than confidential or unpublished details.",
      currentWork: "Current work",
      backToProjects: "Back to projects",
      overview: "Overview",
      question: "Scientific question",
      whyItMatters: "Why it matters",
      approach: "Approach",
      relevance: "Relevance to biotech/pharma",
      outputs: "Selected outputs / publications",
      methods: "Methods & tools",
      skills: "Skills demonstrated",
      viewPublications: "View publications",
      notFound: "Project not found",
      notFoundText: "This project doesn't exist or has been moved.",
    },
    publications: {
      eyebrow: "Publications",
      title: "Peer-reviewed research",
      intro:
        "Sebastian has authored 30+ peer-reviewed publications across computational chemistry, drug discovery, molecular modelling, antimicrobial peptides, chemical reactivity, enzyme mechanisms and biocatalysis.",
      all: "All",
      footer:
        "For the most updated citation metrics, please visit Google Scholar. Publication entries shown here are placeholders — replace titles and add DOI links once verified.",
    },
    notes: {
      eyebrow: "Scientific Notes",
      title: "Short technical articles",
      intro:
        "A space for upcoming short, practical articles on methods and concepts at the intersection of chemistry, biology and computation. New notes are in preparation.",
      inPreparation: "Article in preparation",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's connect",
      intro:
        "Please get in touch for biotech/pharma opportunities, scientific collaborations, consulting discussions, invited talks, mentoring initiatives or research-related enquiries.",
      directContact: "Direct contact",
      sendMessage: "Send a message",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      sentNote:
        "Thank you — your message is noted. This is a placeholder form; connect it to an email service or backend to receive submissions.",
    },
    footer: {
      blurb:
        "From molecular mechanisms to therapeutic discovery.",
      connect: "Connect",
      contact: "Contact",
      rights: "All rights reserved.",
    },
  },
};

export type Content = typeof en;
