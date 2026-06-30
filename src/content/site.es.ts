// ============================================================================
// Spanish ("es") content bundle. Mirrors the shape of `en` from site.ts.
// Language-neutral data (article links, project slugs, technical keyword chips)
// is reused from the English bundle; prose and UI strings are translated.
// ============================================================================

import { en, type Content, type Project } from "./site";

const projects: Project[] = [
  {
    ...en.projects[0],
    title: "Ingeniería de Enzimas para la Biosíntesis de Terapéuticos",
    short:
      "Exploración, caracterización y evolución de enzimas implicadas en la biosíntesis de moléculas de interés terapéutico, con énfasis en selectividad, alcance de sustratos y potencial biocatalítico.",
    overview:
      "Un caso de estudio centrado en métodos para descubrir, caracterizar e ingenierizar enzimas que construyen moléculas de interés terapéutico, combinando interpretación bioquímica y computacional.",
    question:
      "¿Cómo pueden descubrirse e ingenierizarse enzimas para habilitar rutas selectivas y sostenibles hacia moléculas terapéuticas complejas?",
    whyItMatters:
      "Las enzimas pueden habilitar rutas selectivas y sostenibles hacia moléculas terapéuticas complejas, reduciendo el uso de reactivos agresivos y mejorando la estereo- y regioselectividad.",
    approach:
      "Combina caracterización bioquímica, ensayos enzimáticos, análisis del alcance de sustratos, interpretación estructural/computacional y razonamiento guiado por aprendizaje automático.",
    methods: [
      "Expresión y purificación de proteínas",
      "Ensayos enzimáticos",
      "Perfilado del alcance de sustratos",
      "Análisis de rutas biosintéticas",
      "Interpretación estructural y computacional",
    ],
    relevance:
      "La biocatálisis es cada vez más central en la química verde y la fabricación farmacéutica, apoyando síntesis selectivas, procesos escalables y nuevas químicas terapéuticas.",
    outputs:
      "Publicaciones seleccionadas se relacionan con cascadas enzimáticas, biosíntesis de beta-lactonas y ensamblaje de enlaces amida mediado por enzimas. Consulta la página de Publicaciones para la lista completa.",
    skills: en.projects[0].skills,
  },
  {
    ...en.projects[1],
    title: "Descubrimiento de Fármacos Computacional y Guiado por IA",
    short:
      "Uso de modelado molecular, docking, dinámica molecular, química cuántica y aprendizaje automático para explorar dianas terapéuticas, predecir propiedades moleculares y apoyar flujos de descubrimiento de fármacos.",
    overview:
      "Un caso de estudio sobre la aplicación de métodos computacionales y basados en datos para priorizar compuestos, predecir propiedades moleculares y guiar decisiones experimentales en etapas tempranas.",
    question:
      "¿Cómo pueden los métodos computacionales y de aprendizaje automático acelerar la identificación y priorización de moléculas terapéuticas prometedoras?",
    whyItMatters:
      "Los métodos computacionales pueden acelerar el descubrimiento temprano, priorizar compuestos y guiar decisiones experimentales antes de comprometer recursos de laboratorio.",
    approach:
      "Docking molecular, dinámica molecular, QSAR, descriptores cuánticos, aprendizaje automático, modelado de proteínas e interpretación basada en datos.",
    methods: [
      "AutoDock Vina (docking)",
      "Gromacs (dinámica molecular)",
      "Gaussian (química cuántica)",
      "AlphaFold y SWISS-MODEL (modelado de proteínas)",
      "Python, scikit-learn, WEKA (aprendizaje automático)",
    ],
    relevance:
      "Los enfoques computacionales y guiados por IA son centrales en la I+D farmacéutica moderna, reduciendo tiempo y coste en la identificación de hits, optimización de líderes y predicción de propiedades.",
    outputs:
      "Publicaciones seleccionadas cubren inhibidores de LRRK2, inhibidores de DPP-4, inhibidores de tirosinasa, reposicionamiento de fármacos para SARS-CoV-2, estudios QSAR y ElectroPredictor.",
    skills: en.projects[1].skills,
  },
  {
    ...en.projects[2],
    title: "Mecanismos Moleculares y Reactividad Química",
    short:
      "Investigación sobre cómo la estructura molecular controla la reactividad química, la selectividad y la función biológica mediante química cuántica, modelado molecular y razonamiento mecanístico.",
    overview:
      "Un caso de estudio sobre el uso de la química cuántica y el razonamiento mecanístico para explicar la reactividad, la selectividad y el vínculo entre principios químicos y función biológica.",
    question:
      "¿Cómo controla la estructura molecular la reactividad y la selectividad químicas, y qué revela esto sobre la función biológica?",
    whyItMatters:
      "Comprender los mecanismos ayuda a explicar la reactividad, mejorar el diseño molecular y conectar los principios químicos con los sistemas biológicos.",
    approach:
      "Cálculos químico-cuánticos, análisis de estados de transición, relaciones estructura-reactividad, modelado de rutas de reacción e interpretación mecanística.",
    methods: [
      "Teoría del funcional de la densidad (DFT)",
      "Análisis de estados de transición",
      "Modelado de rutas de reacción",
      "Análisis estructura-reactividad",
      "Interpretación mecanística",
    ],
    relevance:
      "La comprensión mecanística sustenta el diseño molecular racional, el desarrollo de catalizadores y la interpretación de la función enzimática relevante para biotecnología y farma.",
    outputs:
      "Publicaciones seleccionadas abordan sustitución nucleofílica, ruptura de enlaces amida, deshidratación de fructosa/tagatosa, descomposición de éteres y reactividad química.",
    skills: en.projects[2].skills,
  },
  {
    ...en.projects[3],
    title: "Proteínas de Membrana y Adquisición de Nutrientes Bacterianos",
    short:
      "El trabajo actual se centra en enfoques bioquímicos y biofísicos para comprender la adquisición de nutrientes en micobacterias y la función de proteínas de membrana.",
    overview:
      "Una línea de trabajo en curso que aplica métodos bioquímicos y biofísicos a la función de proteínas de membrana. Los detalles se mantienen a alto nivel mientras la investigación está en progreso.",
    question:
      "¿Cómo contribuyen las proteínas de membrana a la adquisición de nutrientes bacterianos y a la función general de las proteínas de membrana?",
    whyItMatters:
      "Las proteínas de membrana son centrales para la función celular y representan dianas importantes en la investigación antiinfecciosa y terapéutica.",
    approach:
      "Caracterización bioquímica y biofísica de proteínas de membrana usando flujos de trabajo establecidos en ciencia de proteínas.",
    methods: [
      "Expresión y purificación de proteínas",
      "Manejo de proteínas de membrana",
      "Caracterización biofísica",
      "Ensayos bioquímicos",
    ],
    relevance:
      "La bioquímica de proteínas de membrana apoya el descubrimiento antiinfeccioso y una amplia gama de programas terapéuticos.",
    outputs:
      "Los resultados de este trabajo actual se añadirán a medida que puedan compartirse públicamente.",
    skills: en.projects[3].skills,
  },
];

export const es: Content = {
  profile: {
    role: "Investigador Postdoctoral, Universidad de Manchester",
    tagline:
      "Químico y biólogo químico que trabaja en biotecnología, biocatálisis, descubrimiento de fármacos y ciencia de proteínas.",
  },
  credibility: [
    "Más de 30 publicaciones revisadas por pares",
    "Beca Postdoctoral MSCA otorgada",
    "Más de 10 años de experiencia en química computacional",
    "Más de 5 años de experiencia en I+D farmacéutica",
    "Biocatálisis, descubrimiento de fármacos y ciencia de proteínas",
  ],
  whatIWorkOn: [
    {
      ...en.whatIWorkOn[0],
      title: "Descubrimiento de enzimas y biocatálisis",
      text: "Exploración e ingeniería de enzimas para transformaciones selectivas y biosíntesis terapéutica.",
    },
    {
      ...en.whatIWorkOn[1],
      title: "Descubrimiento de fármacos computacional y guiado por IA",
      text: "Aplicación de modelado molecular, docking, dinámica molecular, química cuántica y aprendizaje automático al descubrimiento terapéutico.",
    },
    {
      ...en.whatIWorkOn[2],
      title: "Mecanismos moleculares y ciencia de proteínas",
      text: "Conexión entre reactividad química, función bioquímica y reconocimiento molecular en enzimas, proteínas y moléculas tipo fármaco.",
    },
  ],
  projects,
  expertiseAreas: [
    {
      ...en.expertiseAreas[0],
      title: "Descubrimiento e ingeniería de enzimas y biocatálisis",
    },
    {
      ...en.expertiseAreas[1],
      title: "Química computacional y descubrimiento de fármacos guiado por IA",
    },
    {
      ...en.expertiseAreas[2],
      title: "Ciencia de proteínas, bioquímica y biotecnología",
    },
    {
      ...en.expertiseAreas[3],
      title: "I+D analítica y farmacéutica",
    },
    {
      ...en.expertiseAreas[4],
      title: "Mecanismos moleculares y reactividad química",
    },
  ],
  publicationCategories: [
    "Descubrimiento de enzimas y biocatálisis",
    "Descubrimiento de fármacos computacional",
    "Mecanismos moleculares y reactividad química",
    "Péptidos antimicrobianos y descubrimiento antiinfeccioso",
  ],
  publications: en.publications.map((p, i) => ({
    ...p,
    category: [
      "Descubrimiento de enzimas y biocatálisis",
      "Descubrimiento de enzimas y biocatálisis",
      "Descubrimiento de fármacos computacional",
      "Descubrimiento de fármacos computacional",
      "Descubrimiento de fármacos computacional",
      "Descubrimiento de fármacos computacional",
      "Descubrimiento de fármacos computacional",
      "Mecanismos moleculares y reactividad química",
      "Mecanismos moleculares y reactividad química",
      "Mecanismos moleculares y reactividad química",
      "Péptidos antimicrobianos y descubrimiento antiinfeccioso",
      "Péptidos antimicrobianos y descubrimiento antiinfeccioso",
    ][i],
    note: "Añadir autores, revista y año.",
  })),
  scientificNotes: [
    {
      title: "Cómo elegir métodos biofísicos para el cribado de ligandos en ciencia de proteínas",
      status: "Tema en borrador",
    },
    {
      title: "Cómo la química computacional puede apoyar la bioquímica experimental",
      status: "Próximamente",
    },
    {
      title:
        "De los mecanismos de reacción a la función enzimática: por qué importa el pensamiento mecanístico",
      status: "Tema en borrador",
    },
  ],
  education: [
    { degree: "Doctorado en Biología Química", school: "Universidad de Manchester" },
    {
      degree: "Máster en Descubrimiento de Fármacos y Biología Traslacional",
      school: "Universidad de Edimburgo",
    },
    { degree: "Licenciatura en Química", school: "Pontificia Universidad Católica del Ecuador" },
  ],
  professionalBackground: [
    "I+D farmacéutica, escalado, transferencia tecnológica, formulación y control de calidad",
    "Química computacional y modelado molecular",
    "Biología química y biocatálisis",
    "Ciencia de proteínas y métodos bioquímicos",
  ],
  awards: [
    "Beca Postdoctoral Marie Skłodowska-Curie Actions — otorgada, inicio en julio de 2027",
    "Dean's Doctoral Scholarship Award, Universidad de Manchester",
    "Beca SENESCYT",
    "Mejor Graduado en Química",
  ],
  ui: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      research: "Investigación / Experiencia",
      projects: "Proyectos",
      publications: "Publicaciones",
      notes: "Notas Científicas",
      contact: "Contacto",
    },
    common: {
      downloadCv: "Descargar CV",
      viewCv: "Ver CV",
      readMore: "Leer más",
      contact: "Contacto",
      getInTouch: "Ponte en contacto",
      connectLinkedin: "Conectar en LinkedIn",
      relatedArticles: "Artículos de investigación relacionados",
    },
    home: {
      heroTitlePre: "Químico y biólogo químico que trabaja en",
      heroTitleAccent: "biotecnología, biocatálisis, descubrimiento de fármacos",
      heroTitlePost: "y ciencia de proteínas.",
      heroIntro:
        "De los mecanismos moleculares al descubrimiento terapéutico: combino química computacional, experiencia en I+D farmacéutica y bioquímica experimental para estudiar enzimas, proteínas y reconocimiento molecular, con aplicaciones en biocatálisis, biotecnología y descubrimiento de fármacos.",
      viewResearch: "Ver Investigación",
      viewProjects: "Ver Proyectos",
      focusEyebrow: "Áreas de enfoque",
      focusTitle: "En qué trabajo",
      selectedEyebrow: "Trabajo seleccionado",
      featuredTitle: "Proyectos destacados",
      allProjects: "Todos los proyectos",
      ctaTitle:
        "Construyamos algo juntos: ya sea una colaboración, consultoría científica o una oportunidad en biotech/farma, me encantaría saber de ti.",
      headshotNote: "Foto de muestra — sube una foto profesional",
    },
    about: {
      eyebrow: "Sobre mí",
      title: "Un químico y biólogo químico multidisciplinar",
      intro:
        "Sebastian Cuesta Hoyos es un químico y biólogo químico multidisciplinar con experiencia en química computacional, I+D farmacéutica, descubrimiento de enzimas, biocatálisis, descubrimiento de fármacos y bioquímica experimental. Su trabajo integra enfoques computacionales y experimentales para comprender mecanismos moleculares y acelerar el descubrimiento de moléculas terapéuticas.",
      currentRole: "Puesto actual",
      education: "Formación",
      background: "Experiencia profesional",
      awards: "Beca y premios",
      mentoring: "Mentoría científica y fortalecimiento de capacidades",
      mentoringText:
        "Sebastian asesora a estudiantes e investigadores en etapas tempranas en Ecuador, apoyando el desarrollo de tesis, el diseño de investigación, el análisis de datos, la escritura científica y la investigación orientada a la publicación. Este trabajo busca fortalecer la capacidad científica y ayudar a los nuevos investigadores a producir ciencia rigurosa y de relevancia internacional.",
    },
    research: {
      eyebrow: "Investigación / Experiencia",
      title: "Experiencia en química, biología y computación",
      intro:
        "Un conjunto de herramientas multidisciplinar que abarca la ciencia enzimática, el descubrimiento de fármacos computacional y guiado por IA, la bioquímica de proteínas, la I+D analítica y farmacéutica, y el estudio de mecanismos moleculares.",
    },
    projects: {
      eyebrow: "Proyectos",
      title: "Casos de estudio científicos centrados en métodos",
      intro:
        "Resúmenes de alto nivel de direcciones de investigación y metodologías. Estos casos de estudio se centran en preguntas científicas, enfoques y habilidades, no en detalles confidenciales o no publicados.",
      currentWork: "Trabajo actual",
      backToProjects: "Volver a proyectos",
      overview: "Resumen",
      question: "Pregunta científica",
      whyItMatters: "Por qué importa",
      approach: "Enfoque",
      relevance: "Relevancia para biotech/farma",
      outputs: "Resultados / publicaciones seleccionadas",
      methods: "Métodos y herramientas",
      skills: "Habilidades demostradas",
      viewPublications: "Ver publicaciones",
      notFound: "Proyecto no encontrado",
      notFoundText: "Este proyecto no existe o ha sido movido.",
    },
    publications: {
      eyebrow: "Publicaciones",
      title: "Investigación revisada por pares",
      intro:
        "Sebastian es autor de más de 30 publicaciones revisadas por pares en química computacional, descubrimiento de fármacos, modelado molecular, péptidos antimicrobianos, reactividad química, mecanismos enzimáticos y biocatálisis.",
      all: "Todas",
      footer:
        "Para las métricas de citación más actualizadas, visita Google Scholar. Las entradas mostradas aquí son provisionales — reemplaza los títulos y añade enlaces DOI una vez verificados.",
    },
    notes: {
      eyebrow: "Notas Científicas",
      title: "Artículos técnicos breves",
      intro:
        "Un espacio para próximos artículos breves y prácticos sobre métodos y conceptos en la intersección de la química, la biología y la computación. Nuevas notas en preparación.",
      inPreparation: "Artículo en preparación",
    },
    contact: {
      eyebrow: "Contacto",
      title: "Conectemos",
      intro:
        "Ponte en contacto para oportunidades en biotech/farma, colaboraciones científicas, consultoría, charlas invitadas, iniciativas de mentoría o consultas relacionadas con la investigación.",
      directContact: "Contacto directo",
      sendMessage: "Enviar un mensaje",
      name: "Nombre",
      email: "Correo electrónico",
      message: "Mensaje",
      send: "Enviar mensaje",
      sentNote:
        "Gracias — tu mensaje ha sido registrado. Este es un formulario de muestra; conéctalo a un servicio de correo o backend para recibir envíos.",
    },
    footer: {
      blurb:
        "Químico y biólogo químico que trabaja en biotecnología, biocatálisis, descubrimiento de fármacos y ciencia de proteínas.",
      connect: "Conectar",
      contact: "Contacto",
      rights: "Todos los derechos reservados.",
    },
  },
};
