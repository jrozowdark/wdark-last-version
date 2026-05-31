import { useEffect } from 'react';

export const SEO_BASE_URL = 'https://webdigitalark.com';

export const defaultSeoImage = '/assets/orb.png';

export const seoFaqItems = [
  {
    question: '¿Qué hace WDARK?',
    answer:
      'WDARK diseña, desarrolla y evoluciona plataformas digitales con foco en Drupal enterprise, arquitectura web, UX/UI, integraciones y crecimiento medible.',
  },
  {
    question: '¿WDARK trabaja proyectos enterprise?',
    answer:
      'Sí. WDARK trabaja proyectos de alta complejidad con gobierno editorial, escalabilidad, seguridad, performance e integración con ecosistemas corporativos.',
  },
  {
    question: '¿Qué tecnologías trabaja WDARK?',
    answer:
      'WDARK trabaja con Drupal, React, Next.js, React Native, APIs, analítica digital y prácticas de calidad técnica para soluciones escalables.',
  },
];

const geoSignals = [
  'Agencia Drupal Colombia',
  'Arquitectura digital Bogotá',
  'Desarrollo web empresarial',
  'Headless CMS',
  'UX UI B2B',
  'Integraciones CRM ERP',
  'SEO técnico',
  'Core Web Vitals',
  'React Native',
  'Data y analítica digital',
];

const resolveAbsoluteUrl = (value) => {
  if (!value) {
    return SEO_BASE_URL;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const normalizedPath = value.startsWith('/') ? value : `/${value}`;
  return `${SEO_BASE_URL}${normalizedPath}`;
};

const slugToReadableText = (slug = '') => slug.split('-').filter(Boolean).map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join(' ');

const buildSeoConfig = ({ page, selectedProject, selectedPost }) => {
  const pathname =
    page === 'drupal'
      ? '/capacidades'
      : page === 'methodology'
        ? '/metodologia'
        : page === 'company'
          ? '/empresa'
          : page === 'portfolio'
            ? '/portafolio'
            : page === 'portfolioDetail'
              ? `/portafolio/${selectedProject?.slug || ''}`
              : page === 'blog'
                ? '/blog'
                : page === 'blogDetail'
                  ? `/blog/${selectedPost?.slug || ''}`
                  : page === 'contact'
                    ? '/contacto'
                    : '/';

  const sharedKeywords = [
    'Web & Digital Ark',
    'WDARK',
    'Agencia digital',
    'Drupal enterprise',
    'Arquitectura digital',
    'Desarrollo web',
    'Diseño UX UI',
    'Integraciones API',
    'SEO técnico',
    'Bogotá Colombia',
    ...geoSignals,
  ];

  const baseConfig = {
    title: 'Web & Digital Ark | Creando mundos, conectando realidades',
    description:
      'WDARK diseña, desarrolla y optimiza plataformas digitales con estrategia, UX/UI, Drupal enterprise, arquitectura web e integraciones para resultados medibles.',
    keywords: sharedKeywords,
    image: defaultSeoImage,
    type: 'website',
    pathname,
    pageName: 'Inicio',
    pageSummary:
      'Landing principal de WDARK con servicios, capacidades, metodología, aliados, portafolio, blog y contacto estratégico.',
  };

  if (page === 'drupal') {
    return {
      ...baseConfig,
      title: 'Capacidades Drupal | Web & Digital Ark',
      description:
        'Capacidades Drupal enterprise de WDARK: arquitectura CMS, headless, integraciones, seguridad, performance y soporte evolutivo para organizaciones grandes.',
      pageName: 'Capacidades Drupal',
      pageSummary:
        'Página de capacidades técnicas y stack de WDARK para proyectos Drupal enterprise, integraciones y evolución digital.',
    };
  }

  if (page === 'methodology') {
    return {
      ...baseConfig,
      title: 'Metodología WDARK | Web & Digital Ark',
      description:
        'Conoce la metodología WDARK: Weigh, Define, Assemble, Refine, Kickoff. Proceso estructurado para lanzar proyectos digitales con calidad y control.',
      pageName: 'Metodología',
      pageSummary:
        'Detalle metodológico de WDARK para ejecutar proyectos digitales con enfoque en resultados, trazabilidad y calidad técnica.',
    };
  }

  if (page === 'company') {
    return {
      ...baseConfig,
      title: 'Perfil Corporativo | Web & Digital Ark',
      description:
        'Perfil corporativo de WDARK: principios, servicios estratégicos, stack técnico, aliados y experiencia en proyectos digitales para empresas.',
      pageName: 'Empresa',
      pageSummary:
        'Perfil corporativo de WDARK con visión estratégica, servicios y experiencia para organizaciones en crecimiento.',
    };
  }

  if (page === 'portfolio') {
    return {
      ...baseConfig,
      title: 'Portafolio Digital | Web & Digital Ark',
      description:
        'Explora el portafolio WDARK con casos de Drupal enterprise, headless, apps móviles, integraciones, SEO y analítica.',
      pageName: 'Portafolio',
      pageSummary:
        'Listado de casos y proyectos digitales dummie organizados por categoría de servicio.',
    };
  }

  if (page === 'portfolioDetail') {
    const projectTitle = selectedProject?.title || 'Proyecto digital';
    return {
      ...baseConfig,
      title: `${projectTitle} | Portafolio WDARK`,
      description:
        selectedProject?.summary ||
        'Caso de portafolio de WDARK con reto, solución, resultados esperados y stack tecnológico aplicado.',
      type: 'article',
      pageName: projectTitle,
      pageSummary:
        selectedProject?.challenge ||
        'Detalle de caso de portafolio WDARK con enfoque técnico y estratégico.',
      image: defaultSeoImage,
      keywords: [
        ...sharedKeywords,
        selectedProject?.category,
        ...(selectedProject?.tech || []),
      ].filter(Boolean),
    };
  }

  if (page === 'blog') {
    return {
      ...baseConfig,
      title: 'Blog de Estrategia y Tecnología | Web & Digital Ark',
      description:
        'Blog WDARK con contenidos sobre Drupal, arquitectura digital, UX/UI, performance, data y decisiones tecnológicas.',
      pageName: 'Blog',
      pageSummary:
        'Listado de artículos técnicos y estratégicos de WDARK para equipos B2B.',
    };
  }

  if (page === 'blogDetail') {
    const postTitle = selectedPost?.title || 'Artículo WDARK';
    return {
      ...baseConfig,
      title: `${postTitle} | Blog WDARK`,
      description:
        selectedPost?.excerpt ||
        'Artículo técnico y estratégico de WDARK sobre plataformas digitales, arquitectura y crecimiento.',
      type: 'article',
      pageName: postTitle,
      pageSummary:
        (selectedPost?.content && selectedPost.content[0]) || selectedPost?.excerpt || 'Artículo del blog WDARK.',
      image: defaultSeoImage,
      keywords: [
        ...sharedKeywords,
        selectedPost?.category,
        slugToReadableText(selectedPost?.slug),
      ].filter(Boolean),
    };
  }

  if (page === 'contact') {
    return {
      ...baseConfig,
      title: 'Hablemos | Diagnóstico Digital WDARK',
      description:
        'Solicita un diagnóstico digital con WDARK para proyectos de Drupal, arquitectura web, rediseños, integraciones y soporte evolutivo.',
      pageName: 'Contacto',
      pageSummary:
        'Página de contacto estratégico para calificar leads y estructurar proyectos digitales de alta complejidad.',
    };
  }

  return baseConfig;
};

const ensureMetaTag = ({ name, property, content }) => {
  if (typeof document === 'undefined') {
    return;
  }

  const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement('meta');
    if (name) {
      tag.setAttribute('name', name);
    }
    if (property) {
      tag.setAttribute('property', property);
    }
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
};

const ensureLinkTag = ({ rel, href }) => {
  if (typeof document === 'undefined') {
    return;
  }

  let tag = document.head.querySelector(`link[rel="${rel}"]`);

  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute('href', href);
};

const ensureJsonLdScript = (id, data) => {
  if (typeof document === 'undefined') {
    return;
  }

  let script = document.head.querySelector(`#${id}`);

  if (!script) {
    script = document.createElement('script');
    script.setAttribute('id', id);
    script.setAttribute('type', 'application/ld+json');
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
};

const buildBreadcrumbItems = (page, selectedProject, selectedPost) => {
  const items = [{ name: 'Inicio', path: '/' }];

  if (page === 'drupal') {
    items.push({ name: 'Capacidades', path: '/capacidades' });
  } else if (page === 'methodology') {
    items.push({ name: 'Metodología', path: '/metodologia' });
  } else if (page === 'company') {
    items.push({ name: 'Empresa', path: '/empresa' });
  } else if (page === 'portfolio') {
    items.push({ name: 'Portafolio', path: '/portafolio' });
  } else if (page === 'portfolioDetail') {
    items.push({ name: 'Portafolio', path: '/portafolio' });
    items.push({ name: selectedProject?.title || 'Detalle de proyecto', path: `/portafolio/${selectedProject?.slug || ''}` });
  } else if (page === 'blog') {
    items.push({ name: 'Blog', path: '/blog' });
  } else if (page === 'blogDetail') {
    items.push({ name: 'Blog', path: '/blog' });
    items.push({ name: selectedPost?.title || 'Artículo', path: `/blog/${selectedPost?.slug || ''}` });
  } else if (page === 'contact') {
    items.push({ name: 'Contacto', path: '/contacto' });
  }

  return items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: resolveAbsoluteUrl(item.path),
  }));
};

const buildJsonLd = ({ seoConfig, page, selectedProject, selectedPost }) => {
  const canonical = resolveAbsoluteUrl(seoConfig.pathname);
  const imageUrl = resolveAbsoluteUrl(seoConfig.image || defaultSeoImage);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Web & Digital Ark SAS',
    url: SEO_BASE_URL,
    logo: resolveAbsoluteUrl('/assets/logo-wdark.webp'),
    email: 'jrozo@webdigitalark.com',
    telephone: '+57 311 831 0391',
    description:
      'Agencia digital enfocada en estrategia, arquitectura, Drupal enterprise, UX/UI e integraciones para organizaciones en crecimiento.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle 135 #17A-48',
      addressLocality: 'Bogotá',
      addressCountry: 'CO',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Web & Digital Ark',
    url: SEO_BASE_URL,
    inLanguage: 'es-CO',
    description:
      'Sitio oficial de WDARK: estrategia, diseño, tecnología y crecimiento para marcas y organizaciones.',
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: seoConfig.pageName,
    description: seoConfig.pageSummary,
    url: canonical,
    inLanguage: 'es-CO',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Web & Digital Ark',
      url: SEO_BASE_URL,
    },
    about: ['Drupal Enterprise', 'Arquitectura digital', 'UX/UI', 'Integraciones', 'SEO técnico'],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: buildBreadcrumbItems(page, selectedProject, selectedPost),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'WDARK - Web & Digital Ark',
    url: canonical,
    areaServed: ['Colombia', 'Latinoamérica'],
    serviceType: [
      'Drupal Enterprise',
      'Arquitectura digital',
      'Desarrollo web',
      'Headless y Frontend',
      'Integraciones API',
      'SEO técnico y performance',
    ],
    image: imageUrl,
    provider: {
      '@type': 'Organization',
      name: 'Web & Digital Ark SAS',
      url: SEO_BASE_URL,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: seoFaqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const schemas = [organizationSchema, websiteSchema, webPageSchema, breadcrumbSchema, serviceSchema, faqSchema];

  if (page === 'blogDetail' && selectedPost) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: selectedPost.title,
      description: selectedPost.excerpt,
      image: [imageUrl],
      datePublished: '2026-05-30',
      dateModified: '2026-05-30',
      author: {
        '@type': 'Organization',
        name: 'Web & Digital Ark SAS',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Web & Digital Ark SAS',
        logo: {
          '@type': 'ImageObject',
          url: resolveAbsoluteUrl('/favicon.png'),
        },
      },
      mainEntityOfPage: canonical,
      articleSection: selectedPost.category,
      inLanguage: 'es-CO',
    });
  }

  if (page === 'portfolioDetail' && selectedProject) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: selectedProject.title,
      description: selectedProject.summary,
      url: canonical,
      about: selectedProject.category,
      keywords: (selectedProject.tech || []).join(', '),
      inLanguage: 'es-CO',
      creator: {
        '@type': 'Organization',
        name: 'Web & Digital Ark SAS',
      },
    });
  }

  return schemas;
};

export function useWdarkSeo({ page, selectedProject, selectedPost }) {
  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const seoConfig = buildSeoConfig({ page, selectedProject, selectedPost });
    const canonicalUrl = resolveAbsoluteUrl(seoConfig.pathname);
    const absoluteImage = resolveAbsoluteUrl(seoConfig.image || defaultSeoImage);

    document.title = seoConfig.title;

    ensureLinkTag({ rel: 'canonical', href: canonicalUrl });

    ensureMetaTag({ name: 'description', content: seoConfig.description });
    ensureMetaTag({ name: 'keywords', content: Array.from(new Set(seoConfig.keywords)).join(', ') });
    ensureMetaTag({ name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' });
    ensureMetaTag({ name: 'author', content: 'Web & Digital Ark SAS' });
    ensureMetaTag({ name: 'publisher', content: 'Web & Digital Ark SAS' });
    ensureMetaTag({ name: 'theme-color', content: '#020713' });

    ensureMetaTag({ name: 'geo.region', content: 'CO-DC' });
    ensureMetaTag({ name: 'geo.placename', content: 'Bogotá, Colombia' });
    ensureMetaTag({ name: 'geo.position', content: '4.7110;-74.0721' });
    ensureMetaTag({ name: 'ICBM', content: '4.7110, -74.0721' });

    ensureMetaTag({ property: 'og:locale', content: 'es_CO' });
    ensureMetaTag({ property: 'og:type', content: seoConfig.type });
    ensureMetaTag({ property: 'og:site_name', content: 'Web & Digital Ark' });
    ensureMetaTag({ property: 'og:title', content: seoConfig.title });
    ensureMetaTag({ property: 'og:description', content: seoConfig.description });
    ensureMetaTag({ property: 'og:url', content: canonicalUrl });
    ensureMetaTag({ property: 'og:image', content: absoluteImage });
    ensureMetaTag({ property: 'og:image:alt', content: 'Web & Digital Ark - Creando mundos, conectando realidades' });

    ensureMetaTag({ name: 'twitter:card', content: 'summary_large_image' });
    ensureMetaTag({ name: 'twitter:title', content: seoConfig.title });
    ensureMetaTag({ name: 'twitter:description', content: seoConfig.description });
    ensureMetaTag({ name: 'twitter:image', content: absoluteImage });

    const jsonLdData = buildJsonLd({ seoConfig, page, selectedProject, selectedPost });
    ensureJsonLdScript('wdark-jsonld', jsonLdData);
  }, [page, selectedPost, selectedProject]);
}
