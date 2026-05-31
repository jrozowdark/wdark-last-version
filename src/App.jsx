import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Menu,
  X,
  Code2,
  Camera,
  Megaphone,
  Layers3,
  Users,
  Rocket,
  Target,
  Search,
  PenTool,
  ShieldCheck,
  Globe2,
  Database,
  Cloud,
  Workflow,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import HeroMeshCanvas from './components/HeroMeshCanvas';
import { useWdarkSeo } from './seo';

const visualAssets = {
  logo: '/assets/logo-wdark.webp',
  hero: '/assets/orb.png',
  background: '/assets/fondo-espacial-tech.png',
};

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  {
    label: 'Nosotros',
    href: '#nosotros',
    children: [
      { label: 'Metodología', href: '/metodologia' },
      { label: 'Aliados', href: '#aliados' },
    ],
  },
  {
    label: 'Servicios',
    href: '#servicios',
    // children: [
    //   { label: 'Capacidades', href: '/capacidades' },
    // ],
  },
  { label: 'Capacidades', href: '/capacidades' },
  { label: 'Portafolio', href: '/portafolio' },
  { label: 'Blog', href: '/blog' },
  // { label: 'Contacto', href: '/contacto' },
];

const services = [
  {
    icon: Code2,
    title: 'Plataformas Web Drupal',
    text: 'Portales, CMS empresariales, landings y arquitecturas administrables para crecer con control.',
  },
  {
    icon: Layers3,
    title: 'Diseño UX/UI',
    text: 'Interfaces claras, modernas y orientadas a conversión para usuarios reales.',
  },
  {
    icon: PenTool,
    title: 'Branding & Diseño',
    text: 'Identidades visuales, piezas gráficas y sistemas de marca coherentes.',
  },
  {
    icon: Workflow,
    title: 'Integraciones & APIs',
    text: 'Conectamos formularios, CRMs, servicios externos, automatizaciones y datos.',
  },
  {
    icon: Camera,
    title: 'Fotografía & Contenido',
    text: 'Imágenes, narrativa visual y contenido digital para elevar la percepción de marca.',
  },
  {
    icon: Megaphone,
    title: 'Marketing Digital',
    text: 'SEO, campañas, analítica y estrategias orientadas a visibilidad y crecimiento.',
  },
];

const enterpriseCapabilities = [
  {
    icon: Code2,
    title: 'Drupal Enterprise',
    text: 'Arquitectura CMS, tipos de contenido, roles, permisos, workflows editoriales, módulos custom y gobierno de contenido.',
  },
  {
    icon: Layers3,
    title: 'Arquitectura Digital',
    text: 'Modelamos plataformas escalables, integraciones, componentes reutilizables, flujos de publicación y experiencia editorial.',
  },
  {
    icon: Globe2,
    title: 'Headless & Frontend',
    text: 'Experiencias desacopladas con React, Next.js, JSON:API, consumo de servicios y diseño orientado a rendimiento.',
  },
  {
    icon: Cloud,
    title: 'DevOps & Despliegue',
    text: 'Ambientes, automatización, Git, Docker, Pantheon, Acquia, Azure y flujos seguros para producción.',
  },
  {
    icon: ShieldCheck,
    title: 'Calidad y Seguridad',
    text: 'Buenas prácticas, QA, revisión técnica, control de accesos, rendimiento, estabilidad y reducción de riesgo.',
  },
  {
    icon: Database,
    title: 'Migraciones & Datos',
    text: 'Estrategias de migración, normalización de contenido, importaciones, integridad de datos y transición controlada.',
  },
  {
    icon: Globe2,
    title: 'Apps móviles con React Native',
    text: 'Implementación de aplicaciones móviles conectadas a APIs y servicios para extender la operación digital más allá del navegador.',
  },
];

const techLogos = [
  'Drupal',
  'WordPress',
  'React',
  'React Native',
  'Next.js',
  'Angular',
  'HTML5',
  'CSS3',
  'Bootstrap',
  'Tailwind',
  'PHP',
  'Symfony',
  'Python',
  'SQL',
  'Excel',
  'Machine Learning',
  'AutoML',
  'Unreal Engine',
  'Blender',
  'Sketch',
  'Docker',
  'Pantheon',
  'Acquia',
  'Azure',
  'Git',
  'REST API',
  'Headless CMS',
];

const dataAnalyticsCapabilities = [
  {
    title: 'Dominio técnico aplicado',
    text: 'Dominio de Python, SQL y Excel para análisis, automatización y toma de decisiones basada en datos.',
  },
  {
    title: 'Machine Learning y AutoML',
    text: 'Experiencia con algoritmos de Machine Learning y herramientas de AutoML para acelerar ciclos de descubrimiento.',
  },
  {
    title: 'Traducción ejecutiva',
    text: 'Capacidad para traducir hallazgos complejos a audiencias no técnicas con foco en impacto de negocio.',
  },
  {
    title: 'Pensamiento crítico',
    text: 'Enfoque analítico con orientación a resultados, priorizando hipótesis medibles y decisiones accionables.',
  },
  {
    title: 'Analítica avanzada',
    text: 'Experiencia previa con bases de datos y analítica avanzada para detectar oportunidades y riesgos con anticipación.',
  },
  {
    title: 'Enfoque multisolución',
    text: 'No nos quedamos con el primer camino: evaluamos alternativas técnicas y elegimos la de mayor valor.',
  },
];

const projectTypes = [
  'Portal Drupal',
  'Rediseño web',
  'Migración Drupal',
  'Headless / Next.js',
  'Integración CRM / ERP',
  'Soporte evolutivo',
  'Otro',
];

const budgetRanges = [
  'Menos de $10M COP',
  '$10M - $30M COP',
  '$30M - $80M COP',
  'Más de $80M COP',
  'Aún no definido',
];

const startDates = [
  'Inmediato',
  '1 a 2 meses',
  '3 a 6 meses',
  'Exploratorio',
];

const newsletterTopics = [
  'Drupal',
  'Drupal Enterprise',
  'UX/UI',
  'Arquitectura digital',
  'Headless / Next.js',
  'Integraciones API (CRM / ERP)',
  'SEO técnico y Core Web Vitals',
  'Performance y escalabilidad',
  'Seguridad y cumplimiento',
  'Data y analítica (GA4)',
];

const companyPrinciples = [
  'Arquitectura antes que diseño.',
  'Gobernanza antes que expansión.',
  'Escalabilidad antes que volumen.',
  'Medición antes que optimización.',
];

const strategicServices = [
  {
    title: 'Estrategia Digital',
    items: [
      'Diagnóstico digital',
      'Arquitectura de información',
      'Gobernanza',
      'Roadmap tecnológico',
      'KPIs y planificación',
    ],
  },
  {
    title: 'Ingeniería y Arquitectura',
    items: [
      'Drupal Enterprise',
      'Arquitectura Multisite',
      'Headless / APIs',
      'Integraciones CRM y ERP',
      'Seguridad y escalabilidad',
    ],
  },
  {
    title: 'Experiencia y Producto Digital',
    items: [
      'UX / UI',
      'Optimización de conversión',
      'Diseño estructural',
      'Componentes reutilizables',
      'Escalabilidad SEO por dominio',
    ],
  },
  {
    title: 'SEO y Performance',
    items: [
      'SEO técnico',
      'Core Web Vitals',
      'Optimización estructural',
      'Escalabilidad SEO por dominio',
    ],
  },
  {
    title: 'Data y Analítica',
    items: [
      'GA4',
      'Medición por eventos',
      'Paneles ejecutivos',
      'Análisis de rendimiento',
    ],
  },
  {
    title: 'Producción Digital Avanzada',
    items: [
      'Render y visualización',
      'Experiencias digitales inmersivas',
      'Contenido visual estratégico',
    ],
  },
];

const technicalStackGroups = [
  {
    title: 'Core CMS',
    items: [
      'Drupal Enterprise',
      'WordPress',
      'Arquitectura Multisite',
      'Headless CMS',
    ],
  },
  {
    title: 'Frontend',
    items: [
      'React',
      'Next.js',
      'Headless / APIs',
      'SSR / SSG',
      'Arquitectura de componentes',
    ],
  },
  {
    title: 'Backend e Integraciones',
    items: [
      'PHP',
      'SQL / Oracle',
      'APIs REST / SOAP',
      'Integraciones CRM / ERP',
      'OAuth2 / SSO',
    ],
  },
  {
    title: 'Data y Performance',
    items: [
      'Google Analytics 4',
      'Google Tag Manager',
      'SEO Técnico',
      'Core Web Vitals',
      'Paneles ejecutivos',
    ],
  },
  {
    title: 'DevOps y Control',
    items: [
      'Git',
      'CI / CD',
      'Entornos DEV / STG / PROD',
      'Testing automatizado',
    ],
  },
];

const buildAllySources = (slug) => [
  `/assets/allies/${slug}.webp`,
  `/assets/allies/${slug}.png`,
  `/assets/allies/${slug}.svg`,
];

const clientLogos = [
  { name: 'Acquia', slug: 'acquia', surface: 'dark', imageClassName: 'max-w-[92%]' },
  { name: 'SOS Consulting', slug: 'sos-consulting', surface: 'light', imageClassName: 'max-w-[86%]' },
  { name: 'Universidad de Las Américas', slug: 'universidad-de-las-americas', surface: 'light', imageClassName: 'max-w-[94%]' },
  { name: 'Denicolás', slug: 'denicolas', surface: 'light', imageClassName: 'max-w-[90%]' },
  { name: 'Quadi', slug: 'quadi', surface: 'dark', imageClassName: 'max-w-[86%]' },
  { name: 'VML', slug: 'vml', surface: 'light', imageClassName: 'max-w-[90%]' },
  { name: 'CONAFIZ', slug: 'conafiz', surface: 'light', imageClassName: 'max-w-[90%]' },
  { name: 'ONIX Digital', slug: 'onix-digital', surface: 'light', imageClassName: 'max-w-[88%]' },
  { name: 'Proninez', slug: 'proninez', surface: 'dark', imageClassName: 'max-w-[90%]' },
  { name: 'Tecnobi S.A.S.', slug: 'tecnobi', surface: 'light', imageClassName: 'max-w-[92%]' },
  { name: 'Hogarth', slug: 'hogarth', surface: 'light', imageClassName: 'max-w-[82%]' },
  { name: 'Inclup', slug: 'inclup', surface: 'dark', imageClassName: 'max-w-[86%]' },
  { name: 'Ogilvy & Mather', slug: 'ogilvy-mather', surface: 'dark', imageClassName: 'max-w-[94%]' },
  { name: 'Micrositios', slug: 'micrositios', surface: 'light', imageClassName: 'max-w-[80%]' },
  { name: 'Ariadna', slug: 'ariadna', surface: 'light', imageClassName: 'max-w-[88%]' },
  { name: 'Outer Space Coders', slug: 'outer-space-coders', surface: 'dark', imageClassName: 'max-w-[94%]' },
].map((logo) => ({
  ...logo,
  sources: buildAllySources(logo.slug),
}));

const highlightedExperience = [
  'Denicolás',
  'Acquia',
  'SOS Consulting',
];

const processSteps = [
  { icon: Search, number: '01', title: 'Descubrimos', text: 'Entendemos tu negocio, reto y oportunidades.' },
  { icon: Target, number: '02', title: 'Estrategia', text: 'Definimos la solución, alcance y arquitectura.' },
  { icon: PenTool, number: '03', title: 'Diseñamos', text: 'Creamos experiencias que conectan y convierten.' },
  { icon: Code2, number: '04', title: 'Desarrollamos', text: 'Construimos con calidad, seguridad y escalabilidad.' },
  { icon: Rocket, number: '05', title: 'Lanzamos', text: 'Medimos, optimizamos y hacemos crecer.' },
];

const allyPreviewOrder = [
  'Acquia',
  'SOS Consulting',
  'Universidad de Las Américas',
  'Denicolás',
  'ONIX Digital',
  'VML',
];
const allies = allyPreviewOrder.map((name) => clientLogos.find((logo) => logo.name === name)).filter(Boolean);

const metrics = [
  { value: '+200', label: 'Proyectos exitosos' },
  { value: '+120', label: 'Clientes satisfechos' },
  { value: '99.9%', label: 'Disponibilidad y seguridad' },
  { value: '-40%', label: 'Reducción en tiempos' },
  { value: '+65%', label: 'Mejora en conversión' },
];

const portfolioProjects = [
  {
    slug: 'portal-drupal-enterprise-multimarca',
    title: 'Portal Drupal Enterprise Multimarca',
    category: 'Drupal Enterprise',
    client: 'Cliente corporativo (dummie)',
    summary: 'Plataforma corporativa con gobierno editorial, multisitio y operación distribuida.',
    challenge: 'Unificar sitios dispersos con distintos equipos editoriales, manteniendo consistencia y trazabilidad.',
    solution: 'Arquitectura Drupal enterprise con roles, workflows, librería de componentes y lineamientos de publicación.',
    results: ['-42% en tiempos de publicación', '+38% en eficiencia editorial', 'Mejor control de calidad de contenidos'],
    tech: ['Drupal', 'PHP', 'Symfony', 'SQL', 'Acquia'],
  },
  {
    slug: 'ecosistema-headless-react-next',
    title: 'Ecosistema Headless con React y Next.js',
    category: 'Headless & Frontend',
    client: 'Unidad digital regional (dummie)',
    summary: 'Experiencia desacoplada para alto rendimiento y evolución continua por releases.',
    challenge: 'Escalar el frontend sin comprometer el CMS central ni la velocidad de carga.',
    solution: 'Arquitectura headless con JSON:API, capa frontend en Next.js y componentes reutilizables.',
    results: ['Core Web Vitals en verde', '+57% en velocidad percibida', 'Reducción de deuda técnica en front'],
    tech: ['Next.js', 'React', 'Tailwind', 'REST API', 'Headless CMS'],
  },
  {
    slug: 'app-comercial-react-native',
    title: 'App comercial en React Native',
    category: 'App Móvil',
    client: 'Equipo comercial nacional (dummie)',
    summary: 'Aplicación móvil para consultas, seguimiento y actualización de oportunidades en campo.',
    challenge: 'Necesidad de operación móvil con sincronización estable e integración al backend existente.',
    solution: 'Implementación React Native conectada a APIs de negocio con enfoque offline-first en módulos críticos.',
    results: ['+29% en velocidad de gestión comercial', 'Menor reproceso operativo', 'Mejor adopción móvil del equipo'],
    tech: ['React Native', 'React', 'REST API', 'SQL', 'Azure'],
  },
  {
    slug: 'integraciones-crm-erp',
    title: 'Integraciones CRM/ERP y automatización',
    category: 'Integraciones API',
    client: 'Holding de servicios (dummie)',
    summary: 'Conectividad de formularios, CRM y sistemas internos para cerrar ciclos de datos.',
    challenge: 'Datos fragmentados en múltiples plataformas con baja trazabilidad comercial.',
    solution: 'Orquestación de integraciones vía APIs y normalización de eventos para analítica confiable.',
    results: ['Visibilidad de punta a punta', 'Menos errores de captura manual', 'Mejor calidad de datos para decisiones'],
    tech: ['REST API', 'SQL', 'Python', 'Docker', 'Git'],
  },
  {
    slug: 'optimizacion-seo-performance',
    title: 'Optimización SEO técnico y performance',
    category: 'SEO & Performance',
    client: 'Marca regional de consumo (dummie)',
    summary: 'Plan de mejora técnica para posicionamiento y experiencia de navegación.',
    challenge: 'Baja visibilidad orgánica y tiempos de carga inestables en páginas clave.',
    solution: 'Auditoría técnica, mejoras estructurales y monitoreo continuo con métricas accionables.',
    results: ['+44% en tráfico orgánico', 'Mejora en LCP y CLS', 'Mayor calidad de sesión'],
    tech: ['SEO Técnico', 'Core Web Vitals', 'GA4', 'Google Tag Manager'],
  },
  {
    slug: 'laboratorio-data-ia-automl',
    title: 'Laboratorio de Data e IA aplicada',
    category: 'Data & IA',
    client: 'Área de estrategia digital (dummie)',
    summary: 'Modelos analíticos para priorizar acciones de negocio y oportunidades de crecimiento.',
    challenge: 'Muchos datos, baja claridad estratégica y decisiones lentas entre áreas.',
    solution: 'Pipeline analítico con SQL/Python, experimentación de modelos ML y lectura ejecutiva de hallazgos.',
    results: ['Hipótesis priorizadas por impacto', 'Mejor velocidad de decisión', 'Alineación entre negocio y tecnología'],
    tech: ['Python', 'SQL', 'Excel', 'Machine Learning', 'AutoML'],
  },
];

const blogPosts = [
  {
    slug: 'drupal-enterprise-gobernanza-real',
    title: 'Drupal Enterprise con gobernanza real: qué cambia en operación',
    category: 'Drupal',
    readTime: '8 min',
    date: 'Mayo 2026',
    excerpt: 'Cómo estructurar roles, workflows y arquitectura para escalar sin perder control editorial.',
    content: [
      'Cuando una organización crece, el reto ya no es solo publicar, sino gobernar contenido con calidad y trazabilidad.',
      'Un modelo enterprise combina arquitectura, procesos y métricas para que la operación sea sostenible en el tiempo.',
    ],
  },
  {
    slug: 'headless-cuando-si-cuando-no',
    title: 'Headless: cuándo sí y cuándo no para una organización grande',
    category: 'Arquitectura',
    readTime: '7 min',
    date: 'Mayo 2026',
    excerpt: 'Un marco práctico para decidir si una arquitectura desacoplada realmente genera valor en tu contexto.',
    content: [
      'Headless no es una moda: es una decisión de arquitectura que depende del modelo operativo y de tus objetivos.',
      'La clave está en evaluar costos de mantenimiento, velocidad de evolución y madurez del equipo técnico.',
    ],
  },
  {
    slug: 'react-native-ecosistema-digital',
    title: 'React Native como extensión natural del ecosistema digital',
    category: 'App Móvil',
    readTime: '6 min',
    date: 'Mayo 2026',
    excerpt: 'Cómo conectar canales web y móvil con una visión de producto coherente y medible.',
    content: [
      'En muchos casos, el valor aparece cuando el canal móvil se integra al stack digital en lugar de operar aislado.',
      'La arquitectura API-first y la observabilidad permiten escalar experiencias móviles con menos fricción.',
    ],
  },
  {
    slug: 'sql-python-automl-decision-ejecutiva',
    title: 'De SQL y Python a decisiones ejecutivas accionables',
    category: 'Data & IA',
    readTime: '9 min',
    date: 'Mayo 2026',
    excerpt: 'Convertir hallazgos complejos en decisiones de negocio claras y priorizadas.',
    content: [
      'La analítica no termina en dashboards: debe terminar en decisiones concretas que cambian resultados.',
      'Traducir complejidad técnica a lenguaje de negocio es una capacidad estratégica de alto impacto.',
    ],
  },
  {
    slug: 'seo-tecnico-en-plataformas-corporativas',
    title: 'SEO técnico en plataformas corporativas: prioridades reales',
    category: 'SEO & Performance',
    readTime: '5 min',
    date: 'Mayo 2026',
    excerpt: 'Qué corregir primero para mejorar visibilidad sin perder foco en objetivos comerciales.',
    content: [
      'No todo en SEO técnico tiene el mismo peso. Priorizar bien evita desgaste del equipo y acelera impacto.',
      'Core Web Vitals, arquitectura de información y rendimiento backend suelen ser palancas iniciales clave.',
    ],
  },
  {
    slug: 'ux-estructural-para-conversion-b2b',
    title: 'UX estructural para conversión B2B',
    category: 'UX / UI',
    readTime: '6 min',
    date: 'Mayo 2026',
    excerpt: 'Diseñar recorridos claros para que usuarios y compradores avancen con menos fricción.',
    content: [
      'En B2B, la claridad de la información y el orden de contenidos influyen directamente en la conversión.',
      'Una arquitectura de decisiones bien pensada reduce dudas y mejora la calidad de los leads.',
    ],
  },
];

const socialItems = [
  { label: 'Facebook', text: 'f' },
  { label: 'LinkedIn', text: 'in' },
  { label: 'Instagram', text: 'ig' },
];

const heroSlides = [
  {
    lines: ['CREANDO', 'MUNDOS', 'CONECTANDO', 'REALIDADES'],
    accent: [false, true, false, true],
    description: 'Diseñamos experiencias digitales que inspiran, conectan y transforman negocios.',
    primary: { label: 'Conoce nuestro portafolio', href: '#portafolio' },
    secondary: { label: 'Conocenos', href: '#nosotros' },
  },
  {
    lines: ['DISEÑANDO', 'PRODUCTOS', 'IMPULSANDO', 'NEGOCIOS'],
    accent: [false, true, false, true],
    description: 'Unimos diseño, ingeniería y estrategia para acelerar marcas con enfoque medible.',
    primary: { label: 'Conoce nuestro portafolio', href: '#portafolio' },
    secondary: { label: 'Nuestro Proceso', href: '#proceso' },
  },
  {
    lines: ['TECNOLOGIA', 'CON VISION', 'HUMANA', 'Y ESTRATEGICA'],
    accent: [true, false, true, false],
    description: 'Creamos ecosistemas digitales sólidos para crecer, escalar y conectar con tu audiencia.',
    primary: { label: 'Contactanos', href: '#contacto' },
    secondary: { label: 'Explorar Servicios', href: '#servicios' },
  },
];

const methodologyHome = {
  id: 'metodologia',
  label: 'Nuestra metodología',
  title: 'Del diagnóstico al lanzamiento, con enfoque en resultados',
  description:
    'Aplicamos una metodología clara para que cada proyecto avance con orden, velocidad y calidad técnica.',
  ctaPrimary: { label: 'Ver metodología completa', href: '/metodologia' },
  ctaSecondary: { label: 'Hablemos de tu proyecto', href: '#contacto' },
  steps: [
    { key: 'weigh', name: 'Weigh', text: 'Analizamos contexto, retos y objetivos de negocio.' },
    { key: 'define', name: 'Define', text: 'Diseñamos alcance, arquitectura y plan de ejecución.' },
    { key: 'assemble', name: 'Assemble', text: 'Construimos de forma modular, segura y escalable.' },
    { key: 'refine', name: 'Refine', text: 'Validamos, optimizamos y aseguramos calidad.' },
    { key: 'kickoff', name: 'Kickoff', text: 'Lanzamos de forma controlada y medimos impacto.' },
  ],
};

const methodologyDetail = {
  id: 'metodologia-detalle',
  label: 'Metodología WDARK',
  title: 'Un proceso claro para ejecutar con calidad y resultados',
  intro:
    'Nuestra metodología garantiza claridad, trazabilidad y resultados desde el día 1 hasta el lanzamiento.',
  phases: [
    {
      key: 'weigh',
      name: 'Weigh',
      objective: 'Entender el punto de partida.',
      actions: ['Diagnóstico', 'Entrevistas', 'Análisis competitivo', 'Definición de KPIs'],
      deliverables: ['Brief estratégico', 'Mapa de oportunidad', 'Objetivos priorizados'],
    },
    {
      key: 'define',
      name: 'Define',
      objective: 'Diseñar la ruta de ejecución.',
      actions: ['Alcance', 'Roadmap', 'Arquitectura funcional y técnica'],
      deliverables: ['Plan de trabajo', 'Backlog priorizado', 'Blueprint'],
    },
    {
      key: 'assemble',
      name: 'Assemble',
      objective: 'Construir con calidad.',
      actions: ['Desarrollo modular', 'Integración', 'Documentación técnica'],
      deliverables: ['Producto funcional', 'Componentes reutilizables', 'Avances iterativos'],
    },
    {
      key: 'refine',
      name: 'Refine',
      objective: 'Asegurar excelencia.',
      actions: ['QA funcional y técnico', 'Optimización de performance', 'Ajustes UX/UI'],
      deliverables: ['Versión optimizada', 'Checklist de calidad', 'Aprobación final'],
    },
    {
      key: 'kickoff',
      name: 'Kickoff',
      objective: 'Lanzar y estabilizar.',
      actions: ['Despliegue controlado', 'Monitoreo', 'Soporte inicial'],
      deliverables: ['Release productivo', 'Reporte de lanzamiento', 'Plan de mejora continua'],
    },
  ],
  closing:
    'Tu proyecto no solo se entrega: se lanza con control, medición y visión de crecimiento.',
  cta: { label: 'Iniciar un proyecto con WDARK', href: '#contacto' },
};

function Logo({ href = '#inicio' }) {
  return (
    <a href={href} className="group flex items-center gap-3" aria-label="Ir al inicio">
      <img
        src={visualAssets.logo}
        alt="WDARK Web Development"
        className="h-14 w-auto max-w-[230px] object-contain drop-shadow-[0_0_18px_rgba(34,211,238,.28)]"
      />
    </a>
  );
}

function SectionLabel({ children }) {
  return <div className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-cyan-300/80">{children}</div>;
}

function AllyLogoCard({ logo, className = '', imageClassName = '' }) {
  const sources = logo?.sources || [];
  const sourceSignature = sources.join('|');
  const [sourceIndex, setSourceIndex] = useState(0);
  const [showFallbackText, setShowFallbackText] = useState(sources.length === 0);

  useEffect(() => {
    setSourceIndex(0);
    setShowFallbackText(sources.length === 0);
  }, [logo?.name, sourceSignature, sources.length]);

  const currentSource = sources[sourceIndex];
  const surfaceClass = 'bg-slate-50/95';
  const fallbackTextClass = 'text-slate-700';
  const heightClass = logo?.heightClass || 'h-24';
  const perLogoContainerClass = logo?.containerClass || '';
  const mergedImageClassName = `${logo?.imageClassName || ''} ${imageClassName}`.trim();

  return (
    <div className={`flex ${heightClass} items-center justify-center border border-cyan-300/20 px-4 transition hover:border-cyan-300/40 ${surfaceClass} ${perLogoContainerClass} ${className}`}>
      {!showFallbackText && currentSource ? (
        <img
          src={currentSource}
          alt={logo?.name || 'Aliado'}
          loading="lazy"
          className={`h-full w-full object-contain py-3 ${mergedImageClassName}`}
          onError={() => {
            const nextIndex = sourceIndex + 1;

            if (nextIndex < sources.length) {
              setSourceIndex(nextIndex);
              return;
            }

            setShowFallbackText(true);
          }}
        />
      ) : (
        <span className={`text-center text-sm font-semibold ${fallbackTextClass}`}>{logo?.name}</span>
      )}
    </div>
  );
}

function PrimaryButton({
  children,
  href = '#contacto',
  className = '',
  onClick,
  asButton = false,
  type = 'button',
}) {
  const classes = `group inline-flex items-center justify-center gap-3 border border-cyan-300 bg-cyan-300 px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-slate-950 transition hover:bg-cyan-200 hover:shadow-[0_0_35px_rgba(34,211,238,.35)] ${className}`;

  if (asButton) {
    return (
      <button type={type} onClick={onClick} className={classes}>
        {children}
        <ArrowRight size={18} className="transition group-hover:translate-x-1" />
      </button>
    );
  }

  return (
    <a href={href} onClick={onClick} className={classes}>
      {children}
      <ArrowRight size={18} className="transition group-hover:translate-x-1" />
    </a>
  );
}

function OutlineButton({
  children,
  href = '#servicios',
  className = '',
  onClick,
  asButton = false,
  type = 'button',
}) {
  const classes = `group inline-flex items-center justify-center gap-3 border border-cyan-300/60 bg-slate-950/30 px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-cyan-200 transition hover:border-cyan-200 hover:bg-cyan-300/10 ${className}`;

  if (asButton) {
    return (
      <button type={type} onClick={onClick} className={classes}>
        {children}
        <ArrowRight size={18} className="transition group-hover:translate-x-1" />
      </button>
    );
  }

  return (
    <a href={href} onClick={onClick} className={classes}>
      {children}
      <ArrowRight size={18} className="transition group-hover:translate-x-1" />
    </a>
  );
}

function Header({ normalizeHashLinks = false, activeHref = '#inicio' }) {
  const [open, setOpen] = useState(false);
  const logoHref = normalizeHashLinks ? '/#inicio' : '#inicio';
  const contactHref = '/contacto';
  const resolveNavItem = (item) => {
    const resolvedHref = normalizeHashLinks && item.href.startsWith('#') ? `/${item.href}` : item.href;
    const resolvedChildren = item.children?.map(resolveNavItem);
    return { ...item, href: resolvedHref, children: resolvedChildren };
  };
  const resolvedNavItems = navItems.map(resolveNavItem);
  const isItemActive = (item) => item.href === activeHref || Boolean(item.children?.some((child) => child.href === activeHref));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cyan-300/10 bg-[#020713]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Logo href={logoHref} />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
          {resolvedNavItems.map((item) => {
            const itemActive = isItemActive(item);
            const hasChildren = Boolean(item.children?.length);

            if (!hasChildren) {
              return (
                <a key={item.href} href={item.href} className={`relative text-xs font-bold uppercase tracking-[0.18em] transition hover:text-cyan-200 ${itemActive ? 'text-cyan-300' : 'text-slate-300'}`}>
                  {item.label}
                  {itemActive && <span className="absolute -bottom-3 left-0 h-[2px] w-7 bg-cyan-300" />}
                </a>
              );
            }

            return (
              <div key={item.href} className="group relative py-2">
                <a href={item.href} className={`relative inline-flex items-center text-xs font-bold uppercase tracking-[0.18em] transition hover:text-cyan-200 ${itemActive ? 'text-cyan-300' : 'text-slate-300'}`}>
                  {item.label}
                  {itemActive && <span className="absolute -bottom-3 left-0 h-[2px] w-7 bg-cyan-300" />}
                </a>
                <div className="pointer-events-none absolute left-0 top-full z-40 min-w-[220px] pt-2 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="translate-y-1 border border-cyan-300/25 bg-[#020713]/95 p-2 transition duration-200 group-hover:translate-y-0 group-focus-within:translate-y-0">
                    {item.children.map((child) => {
                      const childActive = child.href === activeHref;

                      return (
                        <a key={child.href} href={child.href} className={`block border border-transparent px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition hover:border-cyan-300/30 hover:bg-cyan-300/8 hover:text-cyan-200 ${childActive ? 'text-cyan-300' : 'text-slate-300'}`}>
                          {child.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
        <div className="hidden lg:block">
          <OutlineButton href={contactHref} className="px-6 py-3">Contactanos</OutlineButton>
        </div>
        <button type="button" className="rounded-xl border border-cyan-300/30 p-3 text-cyan-200 lg:hidden" onClick={() => setOpen((current) => !current)} aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="border-t border-cyan-300/10 bg-[#020713] px-5 py-5 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-4" aria-label="Navegación móvil">
            {resolvedNavItems.map((item) => (
              <div key={item.href} className="border-b border-white/5 pb-3">
                <a href={item.href} onClick={() => setOpen(false)} className="block pt-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-200">{item.label}</a>
                {item.children?.length ? (
                  <div className="mt-3 grid gap-2 border-l border-cyan-300/20 pl-4">
                    {item.children.map((child) => (
                      <a key={child.href} href={child.href} onClick={() => setOpen(false)} className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 hover:text-cyan-200">
                        {child.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <PrimaryButton href={contactHref}>Contactanos</PrimaryButton>
          </nav>
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentSlide = heroSlides[activeSlide];

  useEffect(() => {
    if (isPaused) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <section id="inicio" className="hero-section">
      <div className="hero-layer hero-layer-image" style={{ backgroundImage: `url(${visualAssets.background})` }} />
      <div className="hero-layer hero-layer-overlay" />
      <div className="hero-layer hero-layer-grid" />

      <div
        className="shell hero-grid"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsPaused(false);
          }
        }}
      >
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="eyebrow">CREATIVIDAD • TECNOLOGIA • ESTRATEGIA</p>

          <h1 className="hero-title">
            {currentSlide.lines.map((line, index) => {
              const spacingClass = index === 2 ? 'mt-[0.2em]' : '';
              const accentClass = currentSlide.accent[index] ? ' accent' : '';

              return (
                <span key={`${line}-${index}`} className={`block${accentClass} ${spacingClass}`}>
                  {line}
                </span>
              );
            })}
          </h1>

          <p className="hero-description">
            {currentSlide.description}
          </p>

          <div className="hero-actions">
            <a className="primary-btn" href={currentSlide.primary.href}>
              <span>{currentSlide.primary.label}</span>
              <ArrowRight size={18} />
            </a>
            <a className="outline-btn" href={currentSlide.secondary.href}>
              <span>◉</span>
              <span>{currentSlide.secondary.label}</span>
            </a>
          </div>

          <div className="hero-indicators" aria-label="hero pagination">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.lines[0]}
                type="button"
                className={index === activeSlide ? 'is-active' : ''}
                aria-label={`Mostrar slide ${index + 1}`}
                aria-pressed={index === activeSlide}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div className="hero-graphic" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} aria-hidden="true">
          <div className="hero-orb">
            <img src={visualAssets.hero} alt="" className="hero-orb-image" />
          </div>
          <HeroMeshCanvas />
        </motion.div>
      </div>
      <div className="hero-divider" />
    </section>
  );
}

function MethodologyHomeSection({ onOpenMethodologyPage }) {
  return (
    <section id={methodologyHome.id} className="relative scroll-mt-24 border-b border-cyan-300/10 bg-[#020713] py-20">
      <div className="absolute inset-0 bg-cover bg-center opacity-12" style={{ backgroundImage: `url(${visualAssets.background})` }} />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>{methodologyHome.label}</SectionLabel>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_.75fr]">
          <div>
            <h2 className="wdark-hero-title text-3xl font-black uppercase tracking-[0.12em] text-white md:text-5xl">
              {methodologyHome.title}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
              {methodologyHome.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryButton href={methodologyHome.ctaPrimary.href} asButton={Boolean(onOpenMethodologyPage)} onClick={onOpenMethodologyPage}>{methodologyHome.ctaPrimary.label}</PrimaryButton>
              <OutlineButton href={methodologyHome.ctaSecondary.href}>{methodologyHome.ctaSecondary.label}</OutlineButton>
            </div>
          </div>
          <div className="wdark-panel-cut border border-cyan-300/30 bg-cyan-300/[0.045] p-6">
            <div className="text-xs font-black uppercase tracking-[0.22em] text-cyan-300/90">Resumen de fases</div>
            <div className="mt-4 grid gap-4">
              {methodologyHome.steps.map((step, index) => (
                <div key={step.key} className="border-l border-cyan-300/35 pl-4">
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-white">
                    {index + 1}. {step.name}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MethodologyDetailSection() {
  return (
    <section id={methodologyDetail.id} className="relative scroll-mt-24 border-b border-cyan-300/10 bg-[#030914] pb-20 pt-32">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(34,211,238,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.16)_1px,transparent_1px)] [background-size:58px_58px]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>{methodologyDetail.label}</SectionLabel>
        <h2 className="wdark-hero-title max-w-4xl text-3xl font-black uppercase tracking-[0.12em] text-white md:text-5xl">
          {methodologyDetail.title}
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">{methodologyDetail.intro}</p>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {methodologyDetail.phases.map((phase, index) => (
            <article key={phase.key} className="wdark-panel-cut border border-cyan-300/25 bg-white/[0.03] p-7">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Fase {index + 1}</div>
              <h3 className="mt-2 text-2xl font-black uppercase tracking-[0.12em] text-white">{phase.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{phase.objective}</p>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-cyan-200">Qué hacemos</p>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-300">
                {phase.actions.map((item) => (
                  <li key={`${phase.key}-action-${item}`}>• {item}</li>
                ))}
              </ul>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-cyan-200">Entregables</p>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-300">
                {phase.deliverables.map((item) => (
                  <li key={`${phase.key}-deliverable-${item}`}>• {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-12 wdark-panel-cut border border-cyan-300/35 bg-cyan-300/[0.05] p-7 md:p-9">
          <p className="text-lg leading-8 text-slate-100">{methodologyDetail.closing}</p>
          <PrimaryButton href={methodologyDetail.cta.href} className="mt-6">{methodologyDetail.cta.label}</PrimaryButton>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="relative scroll-mt-24 border-b border-cyan-300/10 bg-[#020713] py-20">
      <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url(${visualAssets.background})` }} />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(34,211,238,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.15)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>Lo que hacemos</SectionLabel>
        <div className="max-w-2xl"><h2 className="wdark-hero-title text-3xl font-black uppercase tracking-[0.12em] text-white md:text-5xl">Soluciones digitales <span className="text-cyan-300">a la medida de tu marca</span></h2></div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="wdark-panel-cut group relative min-h-[230px] overflow-hidden border border-cyan-300/20 bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-cyan-300/[0.06]">
                <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-cyan-300/10 blur-xl transition group-hover:bg-cyan-300/20" />
                <Icon className="mb-8 text-cyan-300" size={40} />
                <h3 className="text-base font-black uppercase tracking-[0.16em] text-white">{service.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-400">{service.text}</p>
                <ArrowRight className="absolute bottom-5 right-5 text-cyan-300 transition group-hover:translate-x-1" size={18} />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DrupalHomeTeaser({ onOpenDrupalPage }) {
  const quickIndicators = [
    'CMS — Gobierno editorial',
    'API — Integraciones',
    'QA — Calidad técnica',
    'SLA — Soporte evolutivo',
  ];

  return (
    <section id="capacidades" className="relative scroll-mt-24 border-b border-cyan-300/10 bg-[#030914] py-20">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(34,211,238,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.12)_1px,transparent_1px)] [background-size:58px_58px]" />
      <div className="relative mx-auto grid max-w-7xl items-start gap-10 px-5 lg:grid-cols-[.95fr_1.05fr] lg:px-8">
        <div>
          <SectionLabel>Especialistas Drupal</SectionLabel>
          <h2 className="wdark-hero-title max-w-2xl text-3xl font-black uppercase tracking-[0.12em] text-white md:text-5xl">
            Drupal, arquitectura y tecnología para proyectos grandes
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
            Creamos plataformas administrables, escalables y preparadas para integrarse con ecosistemas empresariales. En el home mostramos solo lo esencial; el detalle técnico vive en una página dedicada.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryButton href="/capacidades" asButton={Boolean(onOpenDrupalPage)} onClick={onOpenDrupalPage}>Ver expertise Drupal</PrimaryButton>
            <OutlineButton href="#contacto">Solicitar diagnóstico</OutlineButton>
          </div>
        </div>
        <div className="wdark-panel-cut border border-cyan-300/20 bg-cyan-300/[0.035] p-6 md:p-7">
          <div className="grid gap-4">
            {enterpriseCapabilities.slice(0, 3).map((capability) => {
              const Icon = capability.icon;

              return (
                <article key={capability.title} className="border border-cyan-300/20 bg-[#020713]/70 p-5 transition hover:border-cyan-300/40">
                  <div className="flex items-center gap-3">
                    <Icon size={18} className="text-cyan-300" />
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">{capability.title}</p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{capability.text}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-5 grid gap-3 border-t border-cyan-300/20 pt-5 sm:grid-cols-2">
            {quickIndicators.map((item) => (
              <div key={item} className="border border-cyan-300/20 bg-[#020713]/70 px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About({ onOpenCompanyPage }) {
  const features = useMemo(() => [
    { icon: Users, title: 'Equipo experto', text: 'Talento apasionado por la innovación.' },
    { icon: Rocket, title: 'Enfoque estratégico', text: 'Soluciones alineadas al negocio.' },
    { icon: ShieldCheck, title: 'Calidad sin límites', text: 'Excelencia en cada detalle.' },
  ], []);
  const valueCards = useMemo(() => [
    {
      label: 'Estrategia',
      title: 'Entendemos tu negocio antes de diseñar',
      text: 'Analizamos marca, audiencia, objetivos, competencia y canales para definir una ruta digital con sentido comercial.',
    },
    {
      label: 'Experiencia',
      title: 'Diseñamos interfaces que guían y convierten',
      text: 'Creamos estructuras visuales claras, navegaciones simples y mensajes que ayudan al usuario a tomar acción.',
    },
    {
      label: 'Tecnología',
      title: 'Construimos soluciones robustas y escalables',
      text: 'Desarrollamos sitios, plataformas y componentes preparados para crecer, integrarse y evolucionar.',
    },
    {
      label: 'Crecimiento',
      title: 'Acompañamos la evolución de tu presencia digital',
      text: 'Medimos, ajustamos y optimizamos para mejorar visibilidad, confianza, conversión y posicionamiento.',
    },
  ], []);
  const valueIndicators = useMemo(() => [
    { number: '01', label: 'Claridad estratégica' },
    { number: '02', label: 'Diseño funcional' },
    { number: '03', label: 'Ejecución técnica' },
  ], []);

  return (
    <section id="nosotros" className="relative scroll-mt-24 overflow-hidden border-b border-cyan-300/10 bg-[#030914] py-20">
      <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_60%_45%,rgba(34,211,238,.16),transparent_40%)]" />
      <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-5 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
        <div>
          <SectionLabel>Somos WDARK</SectionLabel>
          <h2 className="wdark-hero-title max-w-xl text-3xl font-black uppercase leading-tight tracking-[0.13em] text-white md:text-5xl">Tecnología, diseño y pasión humana</h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-slate-300">En Web & Digital Ark unimos creatividad, tecnología y estrategia para construir experiencias digitales que trascienden.</p>
          <p className="mt-4 max-w-xl text-base leading-8 text-slate-400">Nuestro equipo multidisciplinario trabaja con visión, detalle y compromiso para llevar tu marca al siguiente nivel.</p>
          <div className="mt-9 grid gap-5 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="border-l border-cyan-300/40 pl-4"><Icon className="text-cyan-300" size={28} /><h3 className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-white">{title}</h3><p className="mt-2 text-xs leading-5 text-slate-400">{text}</p></div>
            ))}
          </div>
          <div className="mt-9">
            <PrimaryButton asButton onClick={onOpenCompanyPage}>Ver perfil corporativo</PrimaryButton>
          </div>
        </div>
        <div className="wdark-panel-cut border border-cyan-300/20 bg-cyan-300/[0.035] p-6 shadow-[0_0_70px_rgba(34,211,238,.08)] md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-300">Nuestra forma de crear valor</p>
          <h3 className="mt-3 text-2xl font-black uppercase tracking-[0.12em] text-white md:text-3xl">
            No hacemos solo páginas. Construimos sistemas digitales con propósito.
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
            Cada proyecto combina marca, experiencia, tecnología y medición para que tu presencia digital sea más clara, confiable y accionable.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {valueCards.map((card) => (
              <article key={card.title} className="border border-cyan-300/20 bg-[#020713]/70 p-5 transition hover:border-cyan-300/40">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-300">{card.label}</p>
                <h4 className="mt-2 text-sm font-black uppercase leading-6 tracking-[0.1em] text-white">{card.title}</h4>
                <p className="mt-3 text-sm leading-6 text-slate-400">{card.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-7 grid gap-4 border-t border-cyan-300/20 pt-5 sm:grid-cols-3">
            {valueIndicators.map((item) => (
              <div key={item.number} className="border border-cyan-300/20 bg-[#020713]/70 px-4 py-3">
                <p className="text-xs font-black tracking-[0.2em] text-cyan-300">{item.number}</p>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-slate-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="proceso" className="relative scroll-mt-24 border-b border-cyan-300/10 bg-[#020713] py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center"><SectionLabel>Nuestro proceso</SectionLabel><h2 className="wdark-hero-title text-3xl font-black uppercase tracking-[0.16em] text-white md:text-5xl">Ágil, transparente y colaborativo</h2></div>
        <div className="relative mt-16 grid gap-6 lg:grid-cols-5">
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent lg:block" />
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="relative z-10 text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-cyan-300/50 bg-[#020713] shadow-[0_0_35px_rgba(34,211,238,.13)]"><Icon className="text-cyan-300" size={34} /></div>
                <div className="mt-5 text-sm font-black text-cyan-300">{step.number}</div>
                <h3 className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-white">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-[190px] text-xs leading-5 text-slate-400">{step.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Allies({ onOpenCompanyAllies }) {
  return (
    <section id="aliados" className="scroll-mt-24 border-b border-cyan-300/10 bg-[#030914] py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <SectionLabel>Nuestros aliados</SectionLabel>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {allies.map((logo) => (
            <AllyLogoCard
              key={logo.name}
              logo={logo}
              className="border-white/10"
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <OutlineButton href="/empresa#aliados-clientes" asButton={Boolean(onOpenCompanyAllies)} onClick={onOpenCompanyAllies}>
            Ver todos los aliados
          </OutlineButton>
        </div>
      </div>
    </section>
  );
}

function Portfolio({ onOpenPortfolioPage, onOpenPortfolioProject }) {
  const featuredProjects = portfolioProjects.slice(0, 3);

  return (
    <section id="portafolio" className="scroll-mt-24 border-b border-cyan-300/10 bg-[#020713] py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>Portafolio</SectionLabel>
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <h2 className="wdark-hero-title text-3xl font-black uppercase tracking-[0.14em] text-white md:text-5xl">
            Experiencias digitales con visión estratégica
          </h2>
          <p className="max-w-2xl text-base leading-8 text-slate-400">
            Casos seleccionados de arquitectura digital, implementación y evolución de plataformas para resultados medibles.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featuredProjects.map((item) => (
            <article key={item.slug} className="wdark-panel-cut border border-cyan-300/20 bg-white/[0.025] p-7">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-300">{item.category}</p>
              <h3 className="mt-3 text-lg font-black uppercase tracking-[0.12em] text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-400">{item.summary}</p>
              <OutlineButton
                href={`/portafolio/${item.slug}`}
                asButton={Boolean(onOpenPortfolioProject)}
                onClick={onOpenPortfolioProject ? () => onOpenPortfolioProject(item.slug) : undefined}
                className="mt-6 px-4 py-3 text-xs"
              >
                Ver caso
              </OutlineButton>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <OutlineButton href="/portafolio" asButton={Boolean(onOpenPortfolioPage)} onClick={onOpenPortfolioPage}>
            Ver todo el portafolio
          </OutlineButton>
        </div>
      </div>
    </section>
  );
}

function Metrics() {
  return <section className="border-b border-cyan-300/10 bg-[#020713] py-10"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionLabel>Resultados que generan impacto</SectionLabel><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{metrics.map((metric) => <div key={metric.label} className="border border-cyan-300/20 bg-cyan-300/[0.035] p-6"><div className="text-3xl font-black text-cyan-300">{metric.value}</div><div className="mt-2 text-sm leading-5 text-slate-300">{metric.label}</div></div>)}</div></div></section>;
}

function Blog({ onOpenBlogPage, onOpenBlogPost }) {
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="scroll-mt-24 border-b border-cyan-300/10 bg-[#030914] py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>Blog</SectionLabel>
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <h2 className="wdark-hero-title text-3xl font-black uppercase tracking-[0.14em] text-white md:text-5xl">
            Ideas para conectar estrategia, diseño y tecnología
          </h2>
          <p className="max-w-2xl text-base leading-8 text-slate-400">
            Un espacio editorial para posicionar la experiencia de WDARK y atraer clientes que buscan soluciones digitales con criterio.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featuredPosts.map((post) => (
            <article key={post.slug} className="group border border-white/10 bg-white/[0.025] p-7 transition hover:border-cyan-300/40">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-300">{post.category}</p>
              <h3 className="mt-3 text-lg font-black uppercase leading-7 tracking-[0.12em] text-white">{post.title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-400">{post.excerpt}</p>
              <OutlineButton
                href={`/blog/${post.slug}`}
                asButton={Boolean(onOpenBlogPost)}
                onClick={onOpenBlogPost ? () => onOpenBlogPost(post.slug) : undefined}
                className="mt-6 px-4 py-3 text-xs"
              >
                Leer artículo
              </OutlineButton>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <OutlineButton href="/blog" asButton={Boolean(onOpenBlogPage)} onClick={onOpenBlogPage}>
            Ver todo el blog
          </OutlineButton>
        </div>
      </div>
    </section>
  );
}

function PortfolioPage({ onBackHome, onOpenProject }) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const categories = useMemo(() => ['Todos', ...new Set(portfolioProjects.map((project) => project.category))], []);
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Todos') {
      return portfolioProjects;
    }

    return portfolioProjects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="min-h-screen scroll-smooth bg-[#020713] bg-cover bg-fixed bg-center font-sans text-white selection:bg-cyan-300 selection:text-slate-950" style={{ backgroundImage: `linear-gradient(rgba(2,7,19,.9), rgba(2,7,19,.96)), url(${visualAssets.background})` }}>
      <Header normalizeHashLinks activeHref="/portafolio" />

      <section className="border-b border-cyan-300/10 pb-14 pt-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionLabel>Portafolio WDARK</SectionLabel>
          <h1 className="wdark-hero-title max-w-5xl text-4xl font-black uppercase tracking-[0.12em] text-white md:text-6xl">
            Proyectos y casos de implementación digital
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-300">
            Filtra por tipo de capacidad y revisa casos dummie para estructurar futuras publicaciones con información real de cliente.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`border px-4 py-2 text-xs font-black uppercase tracking-[0.16em] transition ${activeCategory === category ? 'border-cyan-300 bg-cyan-300/20 text-cyan-200' : 'border-cyan-300/25 bg-[#020713]/70 text-slate-300 hover:border-cyan-300/45'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-cyan-300/10 bg-[#030914] py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <article key={project.slug} className="wdark-panel-cut border border-cyan-300/20 bg-cyan-300/[0.03] p-6 transition hover:border-cyan-300/40">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-300">{project.category}</p>
                <h3 className="mt-3 text-lg font-black uppercase tracking-[0.1em] text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{project.summary}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.12em] text-slate-400">{project.client}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((item) => (
                    <span key={`${project.slug}-${item}`} className="border border-cyan-300/20 bg-[#020713]/70 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
                <OutlineButton
                  href={`/portafolio/${project.slug}`}
                  asButton={Boolean(onOpenProject)}
                  onClick={onOpenProject ? () => onOpenProject(project.slug) : undefined}
                  className="mt-6 px-4 py-3 text-xs"
                >
                  Ver proyecto
                </OutlineButton>
              </article>
            ))}
          </div>
          <PrimaryButton asButton onClick={onBackHome} className="mt-10">Volver al home</PrimaryButton>
        </div>
      </section>

      <Footer normalizeToHomeAnchors />
    </main>
  );
}

function PortfolioProjectPage({ project, onBackToPortfolio }) {
  if (!project) {
    return (
      <main className="min-h-screen scroll-smooth bg-[#020713] bg-cover bg-fixed bg-center font-sans text-white selection:bg-cyan-300 selection:text-slate-950" style={{ backgroundImage: `linear-gradient(rgba(2,7,19,.9), rgba(2,7,19,.96)), url(${visualAssets.background})` }}>
        <Header normalizeHashLinks activeHref="/portafolio" />
        <section className="pb-16 pt-32">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <SectionLabel>Portafolio</SectionLabel>
            <h1 className="wdark-hero-title text-3xl font-black uppercase tracking-[0.12em] text-white md:text-5xl">Proyecto no encontrado</h1>
            <p className="mt-5 text-base leading-8 text-slate-300">Este detalle es dummie por ahora. Puedes volver al listado de proyectos.</p>
            <PrimaryButton asButton onClick={onBackToPortfolio} className="mt-8">Volver al portafolio</PrimaryButton>
          </div>
        </section>
        <Footer normalizeToHomeAnchors />
      </main>
    );
  }

  return (
    <main className="min-h-screen scroll-smooth bg-[#020713] bg-cover bg-fixed bg-center font-sans text-white selection:bg-cyan-300 selection:text-slate-950" style={{ backgroundImage: `linear-gradient(rgba(2,7,19,.9), rgba(2,7,19,.96)), url(${visualAssets.background})` }}>
      <Header normalizeHashLinks activeHref="/portafolio" />

      <section className="border-b border-cyan-300/10 pb-16 pt-32">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionLabel>Detalle de proyecto</SectionLabel>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">{project.category}</p>
          <h1 className="mt-3 wdark-hero-title text-3xl font-black uppercase tracking-[0.1em] text-white md:text-5xl">{project.title}</h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300">{project.summary}</p>
          <p className="mt-3 text-sm uppercase tracking-[0.12em] text-slate-400">{project.client}</p>
        </div>
      </section>

      <section className="border-b border-cyan-300/10 bg-[#030914] py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 lg:grid-cols-2 lg:px-8">
          <article className="wdark-panel-cut border border-cyan-300/20 bg-cyan-300/[0.035] p-6">
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-cyan-300">Reto</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{project.challenge}</p>
          </article>
          <article className="wdark-panel-cut border border-cyan-300/20 bg-cyan-300/[0.035] p-6">
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-cyan-300">Solución</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{project.solution}</p>
          </article>
        </div>
      </section>

      <section className="border-b border-cyan-300/10 bg-[#020713] py-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <h2 className="text-sm font-black uppercase tracking-[0.18em] text-cyan-300">Resultados esperados</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {project.results.map((item) => (
              <div key={`${project.slug}-result-${item}`} className="border border-cyan-300/20 bg-[#020713]/70 px-4 py-3 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
          <h2 className="mt-8 text-sm font-black uppercase tracking-[0.18em] text-cyan-300">Stack aplicado</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span key={`${project.slug}-tech-${item}`} className="border border-cyan-300/25 bg-cyan-300/[0.05] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-cyan-200">
                {item}
              </span>
            ))}
          </div>
          <PrimaryButton asButton onClick={onBackToPortfolio} className="mt-10">Volver al portafolio</PrimaryButton>
        </div>
      </section>

      <Footer normalizeToHomeAnchors />
    </main>
  );
}

function BlogPage({ onBackHome, onOpenPost }) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const categories = useMemo(() => ['Todos', ...new Set(blogPosts.map((post) => post.category))], []);
  const filteredPosts = useMemo(() => {
    if (activeCategory === 'Todos') {
      return blogPosts;
    }

    return blogPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="min-h-screen scroll-smooth bg-[#020713] bg-cover bg-fixed bg-center font-sans text-white selection:bg-cyan-300 selection:text-slate-950" style={{ backgroundImage: `linear-gradient(rgba(2,7,19,.9), rgba(2,7,19,.96)), url(${visualAssets.background})` }}>
      <Header normalizeHashLinks activeHref="/blog" />

      <section className="border-b border-cyan-300/10 pb-14 pt-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionLabel>Blog WDARK</SectionLabel>
          <h1 className="wdark-hero-title max-w-5xl text-4xl font-black uppercase tracking-[0.12em] text-white md:text-6xl">
            Contenido técnico y estratégico para decisiones digitales
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-300">
            Artículos dummie listos para edición futura. Puedes filtrar por tema y abrir cada entrada en su página interna.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`border px-4 py-2 text-xs font-black uppercase tracking-[0.16em] transition ${activeCategory === category ? 'border-cyan-300 bg-cyan-300/20 text-cyan-200' : 'border-cyan-300/25 bg-[#020713]/70 text-slate-300 hover:border-cyan-300/45'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-cyan-300/10 bg-[#030914] py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="wdark-panel-cut border border-cyan-300/20 bg-cyan-300/[0.03] p-6 transition hover:border-cyan-300/40">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-300">{post.category}</p>
                  <p className="text-xs text-slate-400">{post.readTime}</p>
                </div>
                <h3 className="mt-3 text-lg font-black uppercase leading-7 tracking-[0.1em] text-white">{post.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{post.excerpt}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.12em] text-slate-400">{post.date}</p>
                <OutlineButton
                  href={`/blog/${post.slug}`}
                  asButton={Boolean(onOpenPost)}
                  onClick={onOpenPost ? () => onOpenPost(post.slug) : undefined}
                  className="mt-6 px-4 py-3 text-xs"
                >
                  Ver artículo
                </OutlineButton>
              </article>
            ))}
          </div>
          <PrimaryButton asButton onClick={onBackHome} className="mt-10">Volver al home</PrimaryButton>
        </div>
      </section>

      <Footer normalizeToHomeAnchors />
    </main>
  );
}

function BlogPostPage({ post, onBackToBlog }) {
  if (!post) {
    return (
      <main className="min-h-screen scroll-smooth bg-[#020713] bg-cover bg-fixed bg-center font-sans text-white selection:bg-cyan-300 selection:text-slate-950" style={{ backgroundImage: `linear-gradient(rgba(2,7,19,.9), rgba(2,7,19,.96)), url(${visualAssets.background})` }}>
        <Header normalizeHashLinks activeHref="/blog" />
        <section className="pb-16 pt-32">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <SectionLabel>Blog</SectionLabel>
            <h1 className="wdark-hero-title text-3xl font-black uppercase tracking-[0.12em] text-white md:text-5xl">Artículo no encontrado</h1>
            <p className="mt-5 text-base leading-8 text-slate-300">Este detalle es dummie por ahora. Puedes volver al listado del blog.</p>
            <PrimaryButton asButton onClick={onBackToBlog} className="mt-8">Volver al blog</PrimaryButton>
          </div>
        </section>
        <Footer normalizeToHomeAnchors />
      </main>
    );
  }

  return (
    <main className="min-h-screen scroll-smooth bg-[#020713] bg-cover bg-fixed bg-center font-sans text-white selection:bg-cyan-300 selection:text-slate-950" style={{ backgroundImage: `linear-gradient(rgba(2,7,19,.9), rgba(2,7,19,.96)), url(${visualAssets.background})` }}>
      <Header normalizeHashLinks activeHref="/blog" />

      <section className="border-b border-cyan-300/10 pb-16 pt-32">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <SectionLabel>Artículo</SectionLabel>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">{post.category}</p>
          <h1 className="mt-3 wdark-hero-title text-3xl font-black uppercase tracking-[0.1em] text-white md:text-5xl">{post.title}</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-xs uppercase tracking-[0.12em] text-slate-400">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
          <p className="mt-6 text-base leading-8 text-slate-300">{post.excerpt}</p>
        </div>
      </section>

      <section className="border-b border-cyan-300/10 bg-[#030914] py-16">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <article className="wdark-panel-cut border border-cyan-300/20 bg-cyan-300/[0.03] p-7 md:p-9">
            {post.content.map((paragraph) => (
              <p key={`${post.slug}-${paragraph.slice(0, 18)}`} className="mb-5 text-base leading-8 text-slate-300 last:mb-0">
                {paragraph}
              </p>
            ))}
          </article>
          <PrimaryButton asButton onClick={onBackToBlog} className="mt-10">Volver al blog</PrimaryButton>
        </div>
      </section>

      <Footer normalizeToHomeAnchors />
    </main>
  );
}

function ContactPageSection({ standalone = false, onBackHome }) {
  const [diagnosticSubmitted, setDiagnosticSubmitted] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const sectionHeading = standalone
    ? 'Hablemos: diagnóstico para proyectos digitales de alto impacto'
    : 'Hablemos: califiquemos tu próximo proyecto digital';
  const sectionPadding = standalone ? 'border-b border-cyan-300/10 pb-16 pt-32' : 'scroll-mt-24 border-b border-cyan-300/10 py-20';

  const handleDiagnosticSubmit = (event) => {
    event.preventDefault();
    setDiagnosticSubmitted(true);
  };

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    setNewsletterSubmitted(true);
  };

  return (
    <section id={standalone ? undefined : 'contacto'} className={sectionPadding}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>Hablemos</SectionLabel>
        <h2 className="wdark-hero-title max-w-5xl text-3xl font-black uppercase tracking-[0.12em] text-white md:text-5xl">
          {sectionHeading}
        </h2>
        <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300">
          Esta conversación está diseñada para proyectos grandes de Drupal, arquitectura digital, rediseños, integraciones y soporte evolutivo.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <article className="wdark-panel-cut border border-cyan-300/20 bg-cyan-300/[0.035] p-6 md:p-8">
            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-cyan-300">Solicita un diagnóstico digital</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Completa este formulario para entender alcance, complejidad, tiempos y viabilidad técnica.
            </p>
            <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleDiagnosticSubmit}>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-300">
                Nombre completo
                <input required type="text" name="full_name" className="border border-cyan-300/25 bg-[#020713]/70 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60" placeholder="Tu nombre" />
              </label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-300">
                Empresa
                <input required type="text" name="company" className="border border-cyan-300/25 bg-[#020713]/70 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60" placeholder="Nombre de tu empresa" />
              </label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-300">
                Email corporativo
                <input required type="email" name="email" className="border border-cyan-300/25 bg-[#020713]/70 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60" placeholder="nombre@empresa.com" />
              </label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-300">
                Teléfono / WhatsApp
                <input required type="tel" name="phone" className="border border-cyan-300/25 bg-[#020713]/70 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60" placeholder="+57 300 000 0000" />
              </label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-300">
                Tipo de proyecto
                <select name="project_type" className="border border-cyan-300/25 bg-[#020713]/70 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60">
                  {projectTypes.map((type) => (
                    <option key={type} value={type} className="bg-[#020713] text-white">{type}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-300">
                Presupuesto estimado
                <select name="budget_range" className="border border-cyan-300/25 bg-[#020713]/70 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60">
                  {budgetRanges.map((range) => (
                    <option key={range} value={range} className="bg-[#020713] text-white">{range}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-300">
                Fecha de inicio
                <select name="start_date" className="border border-cyan-300/25 bg-[#020713]/70 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60">
                  {startDates.map((date) => (
                    <option key={date} value={date} className="bg-[#020713] text-white">{date}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-300 sm:col-span-2">
                Sitio actual (opcional)
                <input type="url" name="website" className="border border-cyan-300/25 bg-[#020713]/70 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60" placeholder="https://tu-sitio.com" />
              </label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-300 sm:col-span-2">
                Objetivo y contexto del proyecto
                <textarea required name="project_goal" rows={4} className="border border-cyan-300/25 bg-[#020713]/70 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60" placeholder="Cuéntanos el reto, objetivos y expectativas..." />
              </label>
              <div className="sm:col-span-2">
                <PrimaryButton asButton type="submit" className="w-full sm:w-auto">Enviar solicitud de diagnóstico</PrimaryButton>
                {diagnosticSubmitted ? <p className="mt-3 text-sm text-cyan-200">Gracias. Te contactaremos para una sesión de diagnóstico.</p> : null}
              </div>
            </form>
          </article>

          <aside className="wdark-panel-cut border border-cyan-300/20 bg-cyan-300/[0.03] p-6 md:p-8">
            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-cyan-300">Contactanos directamente</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Si ya tienes urgencia comercial o técnica, usa estos canales directos.
            </p>
            <div className="mt-6 grid gap-3">
              <a href="https://wa.me/573118310391" target="_blank" rel="noreferrer" className="border border-cyan-300/20 bg-[#020713]/70 px-4 py-3 transition hover:border-cyan-300/40">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">WhatsApp</p>
                <p className="mt-1 text-sm text-slate-300">+57 311 831 0391</p>
              </a>
              <a href="mailto:jrozo@webdigitalark.com" className="border border-cyan-300/20 bg-[#020713]/70 px-4 py-3 transition hover:border-cyan-300/40">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">Correo</p>
                <p className="mt-1 text-sm text-slate-300">jrozo@webdigitalark.com</p>
              </a>
              <a href="tel:+573118310391" className="border border-cyan-300/20 bg-[#020713]/70 px-4 py-3 transition hover:border-cyan-300/40">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">Teléfono</p>
                <p className="mt-1 text-sm text-slate-300">+57 311 831 0391</p>
              </a>
              <div className="border border-cyan-300/20 bg-[#020713]/70 px-4 py-3">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">Ubicación</p>
                <p className="mt-1 text-sm text-slate-300">Calle 135 #17A-48, Bogotá, Colombia</p>
              </div>
            </div>
          </aside>
        </div>

        <article className="mt-10 wdark-panel-cut border border-cyan-300/25 bg-[#020713]/70 p-6 md:p-8">
          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-cyan-300">Únete a nuestro Newsletter </h3>
          <h4 className="mt-2 text-xl font-black uppercase tracking-[0.1em] text-white md:text-2xl">
            Recibe ideas sobre Drupal, UX y arquitectura digital
          </h4>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
            No es una newsletter masiva. Compartimos criterios técnicos y estratégicos útiles para equipos que toman decisiones digitales.
          </p>
          <form className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto]" onSubmit={handleNewsletterSubmit}>
            <input type="text" name="newsletter_name" required className="border border-cyan-300/25 bg-[#020713]/70 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60" placeholder="Nombre" />
            <input type="email" name="newsletter_email" required className="border border-cyan-300/25 bg-[#020713]/70 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60" placeholder="Correo corporativo" />
            <select name="newsletter_topic" className="border border-cyan-300/25 bg-[#020713]/70 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60">
              {newsletterTopics.map((topic) => (
                <option key={topic} value={topic} className="bg-[#020713] text-white">{topic}</option>
              ))}
            </select>
            <PrimaryButton asButton type="submit" className="w-full md:w-auto">Suscribirme</PrimaryButton>
          </form>
          {newsletterSubmitted ? <p className="mt-3 text-sm text-cyan-200">Listo. Te enviaremos contenido curado y de valor.</p> : null}
        </article>

        {standalone && onBackHome ? (
          <PrimaryButton asButton onClick={onBackHome} className="mt-10">Volver al home</PrimaryButton>
        ) : null}
      </div>
    </section>
  );
}

function ContactPage({ onBackHome }) {
  return (
    <main className="min-h-screen scroll-smooth bg-[#020713] bg-cover bg-fixed bg-center font-sans text-white selection:bg-cyan-300 selection:text-slate-950" style={{ backgroundImage: `linear-gradient(rgba(2,7,19,.92), rgba(2,7,19,.96)), url(${visualAssets.background})` }}>
      <Header normalizeHashLinks activeHref="/contacto" />
      <ContactPageSection standalone onBackHome={onBackHome} />
      <Footer normalizeToHomeAnchors />
    </main>
  );
}

function CTA() {
  return (
    <ContactPageSection />
  );
}

function Footer({ normalizeToHomeAnchors = false }) {
  const isMethodologyPage = typeof window !== 'undefined'
    && /^\/metodologia\/?$/.test(window.location.pathname);
  const shouldNormalizeHashLinks = isMethodologyPage || normalizeToHomeAnchors;
  const footerNav = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Capacidades', href: '/capacidades' },
    { label: 'Metodología', href: '/metodologia' },
    { label: 'Casos', href: '/portafolio' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contacto', href: '/contacto' },
  ];
  const footerServices = ['Drupal Enterprise', 'Diseño UX/UI', 'Integraciones & APIs', 'Fotografía', 'Marketing Digital'];
  const normalizedFooterNav = footerNav.map((item) => {
    if (shouldNormalizeHashLinks && item.href.startsWith('#')) {
      return { ...item, href: `/${item.href}` };
    }

    return item;
  });
  const servicesHref = shouldNormalizeHashLinks ? '/#servicios' : '#servicios';
  const logoHref = shouldNormalizeHashLinks ? '/#inicio' : '#inicio';

  return (
    <footer className="border-t border-cyan-300/10 bg-[#020713] py-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.8fr_.9fr_.6fr] lg:px-8">
        <div><Logo href={logoHref} /><p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">Creamos mundos digitales que conectan personas, marcas y oportunidades.</p></div>
        <div><h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Navegación</h3><div className="mt-4 grid gap-2 text-sm text-slate-400">{normalizedFooterNav.map((item) => <a key={`${item.label}-${item.href}`} href={item.href} className="hover:text-cyan-300">{item.label}</a>)}</div></div>
        <div><h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Servicios</h3><div className="mt-4 grid gap-2 text-sm text-slate-400">{footerServices.map((item) => <a key={item} href={servicesHref} className="hover:text-cyan-300">{item}</a>)}</div></div>
        <div><h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Contacto</h3><div className="mt-4 grid gap-3 text-sm text-slate-400"><a href="tel:+573118310391" className="flex gap-3 hover:text-cyan-300"><Phone size={16} /> +57 311 831 0391</a><a href="mailto:jrozo@webdigitalark.com" className="flex gap-3 hover:text-cyan-300"><Mail size={16} /> jrozo@webdigitalark.com</a><div className="flex gap-3"><MapPin size={16} /> Calle 135 #17A-48, Bogotá, Colombia</div></div></div>
        <div><h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Síguenos</h3><div className="mt-5 flex gap-3">{socialItems.map(({ label, text }) => <a key={label} href="#contacto" aria-label={label} className="flex h-11 w-11 items-center justify-center border border-cyan-300/50 text-sm font-black uppercase text-cyan-300 transition hover:bg-cyan-300 hover:text-slate-950">{text}</a>)}</div></div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 px-5 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between lg:px-8"><p>© Web & Digital Ark SAS 2026. Todos los derechos reservados.</p><p><span className="text-cyan-300">Creando mundos</span> / Conectando realidades</p></div>
    </footer>
  );
}

function DrupalExpertisePage() {
  const drupalKeywords = [
    'Drupal 10 / 11',
    'CMS Enterprise',
    'Headless',
    'Migraciones',
    'Integraciones',
    'Soporte evolutivo',
  ];

  return (
    <main className="min-h-screen scroll-smooth bg-[#020713] bg-cover bg-fixed bg-center font-sans text-white selection:bg-cyan-300 selection:text-slate-950" style={{ backgroundImage: `linear-gradient(rgba(2,7,19,.9), rgba(2,7,19,.96)), url(${visualAssets.background})` }}>
      <Header normalizeHashLinks activeHref="/capacidades" />

      <section className="border-b border-cyan-300/10 pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionLabel>Expertise Drupal</SectionLabel>
          <h1 className="wdark-hero-title max-w-4xl text-4xl font-black uppercase tracking-[0.12em] text-white md:text-6xl">
            Plataformas Drupal enterprise para crecer con control
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-300">
            Diseñamos, desarrollamos y evolucionamos soluciones Drupal para organizaciones que necesitan gobierno de contenido, escalabilidad, seguridad, integraciones y operación editorial eficiente.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryButton href="mailto:jrozo@webdigitalark.com">Solicitar diagnóstico Drupal</PrimaryButton>
            <OutlineButton href="#arquitectura">Ver capacidades</OutlineButton>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {drupalKeywords.map((keyword) => (
              <div key={keyword} className="border border-cyan-300/20 bg-[#020713]/70 px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-cyan-300 transition hover:border-cyan-300/40">
                {keyword}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="arquitectura" className="scroll-mt-24 border-b border-cyan-300/10 bg-[#030914] py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionLabel>Capacidades técnicas</SectionLabel>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {enterpriseCapabilities.map((capability) => {
              const Icon = capability.icon;

              return (
                <article key={capability.title} className="wdark-panel-cut border border-cyan-300/20 bg-cyan-300/[0.035] p-6 transition hover:border-cyan-300/40">
                  <Icon size={28} className="text-cyan-300" />
                  <h3 className="mt-5 text-sm font-black uppercase tracking-[0.16em] text-white">{capability.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{capability.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-cyan-300/10 bg-[#020713] py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionLabel>Capacidades Data & IA</SectionLabel>
          <h2 className="wdark-hero-title max-w-4xl text-3xl font-black uppercase tracking-[0.12em] text-white md:text-5xl">
            Capacidades analíticas que complementan nuestras soluciones Drupal
          </h2>
          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300">
            Sumamos analítica avanzada, criterios de experimentación y enfoque de negocio para tomar mejores decisiones digitales.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {dataAnalyticsCapabilities.map((capability) => (
              <article key={capability.title} className="wdark-panel-cut border border-cyan-300/20 bg-cyan-300/[0.035] p-6 transition hover:border-cyan-300/40">
                <h3 className="text-sm font-black uppercase tracking-[0.16em] text-white">{capability.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{capability.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-cyan-300/10 bg-[#020713] py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="wdark-hero-title max-w-4xl text-3xl font-black uppercase tracking-[0.12em] text-white md:text-5xl">
            Tecnologías que respaldan nuestra capacidad Drupal
          </h2>
          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300">
            Mostramos el stack para que clientes grandes identifiquen rápidamente compatibilidad, experiencia técnica y criterio de arquitectura.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {techLogos.map((tech) => (
              <div key={tech} className="flex min-h-[78px] items-center justify-center border border-cyan-300/20 bg-[#020713]/70 px-4 text-center text-sm font-black uppercase tracking-[0.14em] text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-200">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#030914] py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="wdark-panel-cut border border-cyan-300/35 bg-cyan-300/[0.045] p-8 md:p-10">
            <h2 className="wdark-hero-title text-2xl font-black uppercase tracking-[0.14em] text-white md:text-4xl">
              ¿Necesitas una plataforma Drupal seria?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
              Revisamos tu necesidad, alcance, riesgos y ruta técnica para construir una propuesta sólida.
            </p>
            <PrimaryButton href="mailto:jrozo@webdigitalark.com" className="mt-7">Hablemos de Drupal</PrimaryButton>
          </div>
        </div>
      </section>

      <Footer normalizeToHomeAnchors />
    </main>
  );
}

function CompanyProfilePage({ onBack }) {
  return (
    <main className="min-h-screen scroll-smooth bg-[#020713] bg-cover bg-fixed bg-center font-sans text-white selection:bg-cyan-300 selection:text-slate-950" style={{ backgroundImage: `linear-gradient(rgba(2,7,19,.92), rgba(2,7,19,.96)), url(${visualAssets.background})` }}>
      <Header normalizeHashLinks activeHref="/empresa" />

      <section className="relative border-b border-cyan-300/10 pb-14 pt-32">
        <div className="absolute inset-0 opacity-18 [background-image:linear-gradient(rgba(34,211,238,.11)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.11)_1px,transparent_1px)] [background-size:58px_58px]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <SectionLabel>Quiénes somos</SectionLabel>
          <h1 className="wdark-hero-title mt-3 max-w-5xl text-4xl font-black uppercase tracking-[0.08em] text-white md:text-6xl">
            WDARK: estrategia, arquitectura y ejecución digital para organizaciones en crecimiento
          </h1>
          <p className="mt-7 max-w-4xl text-lg leading-9 text-slate-300">
            Web Digital Ark es un equipo especializado en soluciones digitales de alto impacto. Diseñamos y ejecutamos plataformas robustas, administrables y escalables para marcas que necesitan una operación digital estructurada, medible y sostenible.
          </p>
          <PrimaryButton asButton onClick={onBack} className="mt-8">Volver al home</PrimaryButton>
        </div>
      </section>

      <section className="border-b border-cyan-300/10 bg-[#030914] py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-2 lg:px-8">
          <article className="wdark-panel-cut border border-cyan-300/20 bg-cyan-300/[0.035] p-8">
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-cyan-300">Sobre nosotros</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Combinamos consultoría estratégica, diseño de experiencia, arquitectura de información, ingeniería web y optimización continua para que cada activo digital se convierta en una plataforma de crecimiento de negocio.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Nuestro enfoque integra gobernanza, performance, seguridad, SEO técnico y analítica para asegurar que cada proyecto no solo se lance bien, sino que evolucione con control.
            </p>
          </article>

          <article className="wdark-panel-cut border border-cyan-300/20 bg-cyan-300/[0.035] p-8">
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-cyan-300">Principios</h2>
            <div className="mt-4 grid gap-3">
              {companyPrinciples.map((principle, index) => (
                <div key={principle} className="border border-cyan-300/20 bg-[#020713]/70 px-4 py-3">
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">0{index + 1}</p>
                  <p className="mt-1 text-base text-slate-200">{principle}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="border-b border-cyan-300/10 bg-[#020713] py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="wdark-hero-title text-3xl font-black uppercase tracking-[0.1em] text-white md:text-4xl">Nuestros servicios</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {strategicServices.map((service) => (
              <article key={service.title} className="wdark-panel-cut border border-cyan-300/20 bg-white/[0.03] p-6 transition hover:border-cyan-300/40">
                <h3 className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">{service.title}</h3>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
                  {service.items.map((item) => (
                    <li key={`${service.title}-${item}`}>• {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-cyan-300/10 bg-[#030914] py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="wdark-hero-title text-3xl font-black uppercase tracking-[0.1em] text-white md:text-4xl">Servicios técnicos</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {technicalStackGroups.map((group) => (
              <article key={group.title} className="wdark-panel-cut border border-cyan-300/20 bg-white/[0.03] p-6 transition hover:border-cyan-300/40">
                <h3 className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">{group.title}</h3>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
                  {group.items.map((item) => (
                    <li key={`${group.title}-${item}`}>• {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="aliados-clientes" className="scroll-mt-28 border-b border-cyan-300/10 bg-[#020713] py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="wdark-hero-title text-3xl font-black uppercase tracking-[0.1em] text-white md:text-4xl">Nuestros aliados y clientes</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {clientLogos.map((logo) => (
              <AllyLogoCard
                key={logo.name}
                logo={logo}
                className="min-h-[72px]"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-cyan-300/10 bg-[#030914] py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="wdark-hero-title text-3xl font-black uppercase tracking-[0.1em] text-white md:text-4xl">Nuestra experiencia - impulsando resultados conjuntos</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {highlightedExperience.map((experience) => (
              <article key={experience} className="wdark-panel-cut border border-cyan-300/20 bg-white/[0.03] p-6 transition hover:border-cyan-300/40">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Caso destacado</p>
                <h3 className="mt-3 text-lg font-black uppercase tracking-[0.08em] text-white">{experience}</h3>
              </article>
            ))}
          </div>
          <PrimaryButton asButton onClick={onBack} className="mt-10">Volver al home</PrimaryButton>
        </div>
      </section>

      <Footer normalizeToHomeAnchors />
    </main>
  );
}

function CompanyPage({ onBack }) {
  return <CompanyProfilePage onBack={onBack} />;
}

function HomePage({ onOpenCompanyPage, onOpenDrupalPage, onOpenMethodologyPage, onOpenCompanyAllies, onOpenPortfolioPage, onOpenBlogPage, onOpenPortfolioProject, onOpenBlogPost }) {
  return (
    <main className="min-h-screen scroll-smooth bg-[#020713] bg-cover bg-fixed bg-center font-sans text-white selection:bg-cyan-300 selection:text-slate-950" style={{ backgroundImage: `linear-gradient(rgba(2,7,19,.92), rgba(2,7,19,.96)), url(${visualAssets.background})` }}>
      <Header />
      <Hero />
      <Services />
      <DrupalHomeTeaser onOpenDrupalPage={onOpenDrupalPage} />
      <MethodologyHomeSection onOpenMethodologyPage={onOpenMethodologyPage} />
      <About onOpenCompanyPage={onOpenCompanyPage} />
      <Process />
      <Allies onOpenCompanyAllies={onOpenCompanyAllies} />
      <Portfolio onOpenPortfolioPage={onOpenPortfolioPage} onOpenPortfolioProject={onOpenPortfolioProject} />
      <Metrics />
      <Blog onOpenBlogPage={onOpenBlogPage} onOpenBlogPost={onOpenBlogPost} />
      <CTA />
      <Footer />
    </main>
  );
}

function MethodologyPage() {
  return (
    <main className="min-h-screen scroll-smooth bg-[#020713] bg-cover bg-fixed bg-center font-sans text-white selection:bg-cyan-300 selection:text-slate-950" style={{ backgroundImage: `linear-gradient(rgba(2,7,19,.92), rgba(2,7,19,.96)), url(${visualAssets.background})` }}>
      <Header normalizeHashLinks activeHref="/metodologia" />
      <MethodologyDetailSection />
      <CTA />
      <Footer />
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [selectedProjectSlug, setSelectedProjectSlug] = useState(null);
  const [selectedPostSlug, setSelectedPostSlug] = useState(null);

  const selectedProject = useMemo(
    () => portfolioProjects.find((project) => project.slug === selectedProjectSlug) || null,
    [selectedProjectSlug],
  );
  const selectedPost = useMemo(
    () => blogPosts.find((post) => post.slug === selectedPostSlug) || null,
    [selectedPostSlug],
  );

  useWdarkSeo({ page, selectedProject, selectedPost });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const syncPageWithPath = () => {
      const path = window.location.pathname;
      const portfolioMatch = path.match(/^\/portafolio\/([^/]+)\/?$/);
      const blogMatch = path.match(/^\/blog\/([^/]+)\/?$/);

      if (portfolioMatch) {
        setSelectedProjectSlug(decodeURIComponent(portfolioMatch[1] || ''));
        setPage('portfolioDetail');
        return;
      }

      if (blogMatch) {
        setSelectedPostSlug(decodeURIComponent(blogMatch[1] || ''));
        setPage('blogDetail');
        return;
      }

      if (/^\/portafolio\/?$/.test(path) || /^\/portfolio\/?$/.test(path)) {
        setSelectedProjectSlug(null);
        setPage('portfolio');
        return;
      }

      if (/^\/blog\/?$/.test(path)) {
        setSelectedPostSlug(null);
        setPage('blog');
        return;
      }

      if (/^\/contacto\/?$/.test(path)) {
        setPage('contact');
        return;
      }

      if (/^\/metodologia\/?$/.test(path)) {
        setPage('methodology');
        return;
      }

      if (/^\/capacidades\/?$/.test(path)) {
        setPage('drupal');
        return;
      }

      if (/^\/empresa\/?$/.test(path) || /^\/company\/?$/.test(path)) {
        setPage('company');
        return;
      }

      setPage('home');
    };

    syncPageWithPath();
    window.addEventListener('popstate', syncPageWithPath);

    return () => window.removeEventListener('popstate', syncPageWithPath);
  }, []);

  const navigateToPage = (nextPage, options = {}) => {
    const { hash = '', slug = '' } = options;

    if (nextPage === 'portfolioDetail') {
      setSelectedProjectSlug(slug);
    }

    if (nextPage === 'blogDetail') {
      setSelectedPostSlug(slug);
    }

    if (nextPage === 'portfolio') {
      setSelectedProjectSlug(null);
    }

    if (nextPage === 'blog') {
      setSelectedPostSlug(null);
    }

    setPage(nextPage);

    if (typeof window === 'undefined') {
      return;
    }

    let nextPath = '/';

    if (nextPage === 'drupal') {
      nextPath = '/capacidades';
    } else if (nextPage === 'methodology') {
      nextPath = '/metodologia';
    } else if (nextPage === 'company') {
      nextPath = '/empresa';
    } else if (nextPage === 'portfolio') {
      nextPath = '/portafolio';
    } else if (nextPage === 'portfolioDetail') {
      nextPath = `/portafolio/${encodeURIComponent(slug)}`;
    } else if (nextPage === 'blog') {
      nextPath = '/blog';
    } else if (nextPage === 'blogDetail') {
      nextPath = `/blog/${encodeURIComponent(slug)}`;
    } else if (nextPage === 'contact') {
      nextPath = '/contacto';
    }

    const targetUrl = `${nextPath}${hash}`;

    if (`${window.location.pathname}${window.location.hash}` !== targetUrl) {
      window.history.pushState({ page: nextPage }, '', targetUrl);
    }

    if (hash) {
      window.setTimeout(() => {
        const section = document.querySelector(hash);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      }, 140);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  if (page === 'drupal') {
    return <DrupalExpertisePage />;
  }

  if (page === 'methodology') {
    return <MethodologyPage />;
  }

  if (page === 'company') {
    return <CompanyPage onBack={() => navigateToPage('home')} />;
  }

  if (page === 'portfolio') {
    return <PortfolioPage onBackHome={() => navigateToPage('home')} onOpenProject={(slug) => navigateToPage('portfolioDetail', { slug })} />;
  }

  if (page === 'portfolioDetail') {
    return <PortfolioProjectPage project={selectedProject} onBackToPortfolio={() => navigateToPage('portfolio')} />;
  }

  if (page === 'blog') {
    return <BlogPage onBackHome={() => navigateToPage('home')} onOpenPost={(slug) => navigateToPage('blogDetail', { slug })} />;
  }

  if (page === 'blogDetail') {
    return <BlogPostPage post={selectedPost} onBackToBlog={() => navigateToPage('blog')} />;
  }

  if (page === 'contact') {
    return <ContactPage onBackHome={() => navigateToPage('home')} />;
  }

  return (
    <HomePage
      onOpenCompanyPage={() => navigateToPage('company')}
      onOpenDrupalPage={() => navigateToPage('drupal')}
      onOpenMethodologyPage={() => navigateToPage('methodology')}
      onOpenCompanyAllies={() => navigateToPage('company', { hash: '#aliados-clientes' })}
      onOpenPortfolioPage={() => navigateToPage('portfolio')}
      onOpenPortfolioProject={(slug) => navigateToPage('portfolioDetail', { slug })}
      onOpenBlogPage={() => navigateToPage('blog')}
      onOpenBlogPost={(slug) => navigateToPage('blogDetail', { slug })}
    />
  );
}
