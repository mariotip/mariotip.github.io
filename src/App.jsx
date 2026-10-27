import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { GitHub, LinkedIn, Email, ExpandMore, Storage, Dns, Cloud, Terminal, OpenInNew, DarkMode, LightMode, DesktopWindows, Settings, Facebook, Instagram, WhatsApp, People, Description, ShoppingBag } from '@mui/icons-material';
import XIcon from '@mui/icons-material/X';

const projects = [
  {
    title: "MKing E-Commerce",
    subtitle: "Tienda Online & Catálogo Interactivo",
    description: "Plataforma de comercio electrónico de alto impacto visual y rendimiento para la marca MKing. Integra visualización interactiva de productos, pasarela de pago con MercadoPago, diseño responsivo premium y optimización SEO.",
    image: "/mking-ecommerce.jpeg",
    logo: "/mking-logo.png",
    url: "https://mking.com.mx/",
    siteLabel: "mking.com.mx",
    tags: ["Next.js 14", "React 18", "TypeScript", "TailwindCSS", "MercadoPago SDK", "Zustand", "GSAP / Swiper"],
    highlights: [
      "Catálogo dinámico y experiencia de compra optimizada",
      "Integración de pasarela MercadoPago Checkout",
      "Modelos y visualizadores interactivos de producto",
      "Arquitectura moderna con Next.js (App Router) y Zustand"
    ]
  },
  {
    title: "MKing Administrador (ERP & POS)",
    subtitle: "Sistema de Gestión Empresarial Integral",
    description: "Panel de administración centralizado para la operación integral de MKing. Control de inventarios en tiempo real, punto de venta (POS), gestión de pedidos, facturación, sincronización de envíos y métricas analíticas avanzadas.",
    image: "/mking-admin.jpeg",
    logo: "/mking-logo.png",
    url: "https://mking.com.mx/",
    siteLabel: "mking.com.mx",
    tags: ["React 18", "TypeScript", "Redux Toolkit / Zustand", "MUI Material", "Node.js / Express", "MySQL", "FullCalendar / AG Grid"],
    highlights: [
      "Gestión integral de inventario, stock y variantes de producto",
      "Módulo POS y procesamiento de ventas presenciales y online",
      "Dashboard de métricas, reportes financieros y exportación Excel",
      "Control de usuarios con roles y permisos de acceso"
    ]
  },
  {
    title: "Envíomex POS / ERP / CRM",
    subtitle: "Punto de Venta y Gestión de Paquetería",
    description: "Sistema integral para operación de paqueterías: punto de venta, cotizaciones, recepción y seguimiento de paquetes, caja, inventario, CRM y métricas de finanzas, punto de equilibrio y marketing, con comprobantes en hoja y ticket térmico.",
    image: "/enviomex-pos.jpeg",
    url: "https://enviomex-front.pages.dev/iniciar-sesion",
    siteLabel: "enviomex-front.pages.dev",
    tags: ["React 18", "Vite", "TypeScript", "MUI Material", "AG Grid", "Zustand", "AdonisJS", "Node.js"],
    highlights: [
      "Punto de venta y cotizaciones con cálculos en vivo (margen, cambio, piezas por paquete)",
      "Seguimiento de paquetes, caja y cortes, e inventario por sucursal",
      "CRM y panel de finanzas, punto de equilibrio, marketing y metas",
      "Control de usuarios con roles y permisos por pantalla"
    ]
  },
  {
    title: "Sonovita",
    subtitle: "Marketplace de Equipos de Ultrasonido",
    description: "Marketplace especializado en equipos de ultrasonido nuevos y seminuevos para profesionales de la salud, con catálogo de producto, panel administrativo para publicaciones y gestión de contenido.",
    image: "/sonovita-marketplace.jpeg",
    url: "https://sonovita-front.vercel.app/",
    siteLabel: "sonovita-front.vercel.app",
    tags: ["Next.js 16", "React 19", "TailwindCSS 4", "Laravel 12", "Filament 4", "Laravel Sanctum"],
    highlights: [
      "Catálogo de equipos de ultrasonido nuevos y seminuevos",
      "Panel administrativo (Filament) para gestión de publicaciones",
      "API REST con autenticación vía Laravel Sanctum",
      "Frontend moderno con Next.js App Router y Tailwind v4"
    ]
  }
];
// --- Datos actualizados con la trayectoria completa ---
const personalInfo = {
  name: "Mario De La Cruz Sandoval",
  title: "Software Developer & Solutions Engineer",
  summary: "Especialista en el diseño y ejecución de soluciones tecnológicas empresariales con más de 8 años impulsando el crecimiento de negocios. Experto en transformar necesidades corporativas en arquitecturas escalables de alta disponibilidad, optimizando infraestructuras y garantizando la integridad de sistemas de misión crítica.",
  social: {
    linkedin: "https://www.linkedin.com/in/ingmario/",
    email: "mailto:ing_mariomcs@outlook.com",
    github: "https://github.com/mariotip",
    facebook: "https://www.facebook.com/tachimen/",
    instagram: "https://www.instagram.com/mario.tip/",
    twitter: "https://x.com/mario_Tip",
    whatsapp: "https://wa.me/3312182604"
  }
};

const experience = [
  {
    company: "Garantía",
    role: "Software Developer & Solutions Engineer",
    period: "Mar. 2022 - Actualidad",
    location: "Zapopan, Jalisco",
    description: "Liderazgo técnico en el diseño de ecosistemas digitales complejos. Orquestación de arquitecturas desacopladas con React y Angular bajo infraestructuras resilientes en AWS utilizando Node.js y Sequelize para la gestión de datos escalables.",
    stack: ["Angular", "React", "Node.js", "Sequelize", "MySQL", "AWS", "Ubuntu", "Adonis"],
    link: "https://www.garantia.mx/"
  },
  {
    company: "Turnapp",
    role: "Solutions Engineer",
    period: "Nov. 2020 - Jul. 2022",
    location: "Zapopan, Jalisco",
    description: "Ingeniería de soluciones Full Stack optimizadas para el rendimiento y la agilidad de procesos internos. Desarrollo de arquitecturas modulares con Vue.js y Laravel, simplificando despliegues críticos mediante servicios cloud de AWS.",
    stack: ["Vue.js", "Laravel", "AWS LightSail", "PHP", "MySQL"],
    link: "https://turn.com.mx/"
  },
  {
    company: "Metapack",
    role: "Software Engineer",
    period: "Feb. 2020 - Abr. 2021",
    location: "Guadalajara, México",
    description: "Ingeniería de software enfocada en la creación de APIs industriales robustas y altamente escalables. Estandarización de componentes modulares en Angular y optimización de entornos de servidor Linux para garantizar la disponibilidad continua.",
    stack: ["Angular", "Laravel", "MySQL", "Bootstrap", "Apache", "Linux"],
    link: "https://www.metapack.com/"
  },
  {
    company: "Samahara Startup",
    role: "Full Stack Engineer",
    period: "Jul. 2019 - Feb. 2020",
    location: "Hermosa Provincia",
    description: "Diseño estratégico de arquitecturas backend modernas utilizando AdonisJS y MongoDB. Integración de soluciones híbridas con React Native y desarrollo de servicios REST distribuidos bajo arquitecturas PostgreSQL/Django.",
    stack: ["Node.js", "AdonisJS", "MongoDB", "React Native", "Django", "PostgreSQL"],
    link: "https://mubai.com.mx/"
  },
  {
    company: "Altatec de Occidente",
    role: "Backend Developer",
    period: "Sept. 2017 - Jul. 2019",
    location: "Zapopan, Jalisco",
    description: "Arquitectura y desarrollo de APIs RESTful de alto desempeño mediante el ecosistema Laravel y Node.js. Enfoque en la eficiencia transaccional e implementación de interfaces reactivas para la gestión de datos empresariales.",
    stack: ["Laravel", "PHP", "Node.js", "JavaScript", "AngularJS"],
    link: "https://altatec.com.mx/mx/category/software/"
  },
  {
    company: "Emergys Corporation México",
    role: "Software Solution Consultant (Jr)",
    period: "Ene. 2017 - May. 2017",
    location: "Zapopan, Jalisco",
    description: "Integración de sistemas empresariales mediante middleware (IBM Integration Bus) y desarrollo de aplicaciones robustas en el ecosistema Java Spring. Enfoque en el aseguramiento de la calidad y flujo de datos transaccionales.",
    stack: ["IBM Integration Bus", "Java", "Spring", "Android", "Testing"],
    link: "https://emergys.com.mx/"
  },
  {
    company: "IEHP",
    role: "Systems Developer",
    period: "Sept. 2016 - Mar. 2017",
    location: "Guadalajara, Jalisco",
    description: "Ingeniería y mantenimiento de sistemas internos críticos, garantizando la estabilidad operativa y la funcionalidad de plataformas industriales de gestión web.",
    stack: ["HTML", "CSS", "PHP", "Web Development"],
    link: "https://iehp.edu.mx/"
  },
  {
    company: "IEHP",
    role: "Infrastructure Manager",
    period: "Ago. 2015 - Ago. 2016",
    location: "México",
    description: "Gestión integral de infraestructura crítica, administración de redes corporativas y servidores. Supervisión del ecosistema de seguridad y aseguramiento de la continuidad operativa institucional.",
    stack: ["Servidores", "Telefonía IP", "Redes", "Soporte Técnico", "Seguridad"],
    link: "https://iehp.edu.mx/"
  },
  {
    company: "IEHP",
    role: "Technological Education Consultant",
    period: "Ene. 2013 - Jul. 2016",
    location: "Guadalajara, Jalisco",
    description: "Consultoría académica y liderazgo en programas de formación tecnológica, gestionando la transferencia de conocimiento técnico especializado en entornos educativos profesionales.",
    stack: ["Educación", "Liderazgo", "Comunicación"],
    link: "https://iehp.edu.mx/"
  }
];

const skills = [
  { category: "Frontend Engineering", icon: <DesktopWindows className="w-6 h-6" />, items: ["React", "Angular", "Vue", "Mui Material", "Bootstrap", "JavaScript"] },
  { category: "Cloud & Backend Architecture", icon: <Storage className="w-6 h-6" />, items: ["Node", "Laravel", "Adonis", "Django"] },
  { category: "Data Management & ORM", icon: <Dns className="w-6 h-6" />, items: ["MySQL", "MongoDB", "Sequelize", "Lucid ORM"] },
  { category: "Critical Infrastructure", icon: <Cloud className="w-6 h-6" />, items: ["AWS (EC2, LightSail, S3, RDS)", "Ubuntu/Linux", "Git"] },
  { category: "Soft Skills", icon: <People className="w-6 h-6" />, items: ["Scrum", "Kanban", "Comunicación", "Trabajo en equipo", "Resolución de problemas"] },
];

// --- Componentes UI ---

const useOnScreen = (options) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [ref, options]);
  return [ref, visible];
};

const SectionTitle = ({ children, subtitle }) => (
  <div className="mb-12 text-center">
    <h2 className="text-3xl md:text-5xl font-black text-shine inline-block mb-4 uppercase tracking-wider">
      {children}
    </h2>
    {subtitle && <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-teal-400 to-violet-500"></div>}
  </div>
);

const FadeIn = ({ children, delay = 0 }) => {
  const [ref, visible] = useOnScreen({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Tarjeta con borde y brillo que siguen al cursor
const Spotlight = ({ className = '', children }) => {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <div onMouseMove={onMove} className={`spotlight ${className}`}>
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
  );
};

// Contador animado que arranca al aparecer en pantalla
const CountUp = ({ end, suffix = '', duration = 1600 }) => {
  const [ref, visible] = useOnScreen({ threshold: 0.4 });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setValue(end); return; }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, end, duration]);
  return <span ref={ref}>{value}{suffix}</span>;
};

const techMarquee = ["React", "Angular", "Vue.js", "Node.js", "TypeScript", "Laravel", "AdonisJS", "Django", "MySQL", "MongoDB", "PostgreSQL", "AWS", "Linux", "TailwindCSS", "MUI", "Zustand", "Redux", "Git"];

const stats = [
  { value: 8, suffix: '+', label: 'Años de experiencia' },
  { value: experience.length, suffix: '', label: 'Empresas' },
  { value: projects.length, suffix: '', label: 'Sistemas en producción' },
  { value: 20, suffix: '+', label: 'Tecnologías' },
];

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/mariotip');
        const url = response.data.avatar_url;
        setAvatarUrl(url);

        // Create a circular favicon using Canvas
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const size = 64; // Standard favicon size
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');

          // Draw circle mask
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();

          // Draw image
          ctx.drawImage(img, 0, 0, size, size);

          // Update favicon
          const link = document.querySelector("link[rel~='icon']");
          if (link) {
            link.href = canvas.toDataURL("image/png");
            link.type = "image/png";
          }
        };
        img.src = url;
      } catch (error) {
        console.error('Error fetching GitHub avatar:', error);
        const fallback = 'https://avatars.githubusercontent.com/u/16395065?v=4';
        setAvatarUrl(fallback);
      }
    };
    fetchAvatar();
  }, []);

  // Barra de progreso de lectura
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Resalta en el menú la sección visible
  useEffect(() => {
    const ids = ['home', 'habilidades', 'experiencia', 'portafolio', 'contacto'];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-300 font-sans ${darkMode ? 'bg-slate-950 text-slate-100' : 'light bg-white text-gray-800'}`}>

      {/* Fondo animado */}
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-blob b1"></div>
        <div className="aurora-blob b2"></div>
        <div className="aurora-blob b3"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* Barra de progreso */}
      <div className="fixed top-0 left-0 h-[3px] z-[60] bg-gradient-to-r from-blue-500 via-teal-400 to-violet-500 transition-[width] duration-100" style={{ width: `${progress}%` }} aria-hidden="true"></div>

      {/* Header & Navbar */}
      <header>
        <nav className={`fixed top-0 w-full z-50 backdrop-blur-md transition-colors duration-300 ${darkMode ? 'bg-slate-950/60 border-b border-white/5' : 'bg-white/80 border-b border-gray-200'}`} aria-label="Navegación principal">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('home');
              }}
              className="font-bold text-xl inline-flex items-center cursor-pointer"
              aria-label="Mario De La Cruz Sandoval - Inicio"
            >
              <Terminal className="w-5 h-5 mr-1 align-center" />
              <span className="text-blue-500">M</span>ario<span className="text-teal-400">.dev</span>
            </a>
            <div className="hidden md:flex space-x-8">
              {[
                { name: 'Habilidades', id: 'habilidades' },
                { name: 'Experiencia', id: 'experiencia' },
                { name: 'Portafolio', id: 'portafolio' },
                { name: 'Contacto', id: 'contacto' }
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                  className={`text-sm font-medium hover:text-blue-400 transition-colors ${activeSection === item.id ? 'text-blue-400' : ''}`}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-700/50 transition-colors"
                aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                {darkMode ? <LightMode className="w-5 h-5 text-yellow-400" /> : <DarkMode className="w-5 h-5 text-slate-600" />}
              </button>
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide whitespace-nowrap max-w-[140px] xs:max-w-[180px] sm:max-w-none px-2 overflow-y-hidden">
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg hover:bg-slate-700/30 transition-all hover:scale-110 shrink-0"
                  title="GitHub"
                  aria-label="Perfil de GitHub de Mario De La Cruz Sandoval"
                >
                  <GitHub className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-slate-900'}`} />
                </a>
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg hover:bg-[#0A66C2]/10 transition-all hover:scale-110 shrink-0"
                  title="LinkedIn"
                  aria-label="Perfil de LinkedIn de Mario De La Cruz Sandoval"
                >
                  <LinkedIn className="w-5 h-5 text-[#0A66C2]" />
                </a>
                {/* <a
                  href={personalInfo.social.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg hover:bg-slate-700/30 transition-all hover:scale-110 shrink-0"
                  title="X (Twitter)"
                  aria-label="Perfil de X (Twitter) de Mario De La Cruz Sandoval"
                >
                  <XIcon className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-black'}`} />
                </a> */}
                <a
                  href={personalInfo.social.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg hover:bg-[#25D366]/10 transition-all hover:scale-110 shrink-0"
                  title="WhatsApp"
                  aria-label="Contactar por WhatsApp a Mario De La Cruz Sandoval"
                >
                  <WhatsApp className="w-5 h-5 text-[#25D366]" />
                </a>
                {/* <a
                  href={personalInfo.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg hover:bg-[#1877F2]/10 transition-all hover:scale-110 shrink-0"
                  title="Facebook"
                  aria-label="Perfil de Facebook de Mario De La Cruz Sandoval"
                >
                  <Facebook className="w-5 h-5 text-[#1877F2]" />
                </a> */}
                {/* <a
                  href={personalInfo.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg hover:bg-[#E4405F]/10 transition-all hover:scale-110 shrink-0"
                  title="Instagram"
                  aria-label="Perfil de Instagram de Mario De La Cruz Sandoval"
                >
                  <Instagram className="w-5 h-5 text-[#E4405F]" />
                </a> */}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main id="main-content" className="relative z-10">
        {/* Hero */}
        <section id="home" className="min-h-screen flex items-center justify-center relative pt-28 pb-24">
          <div className="text-center px-6 max-w-4xl">
            <FadeIn>
              <div className="mb-8 relative inline-block avatar-ring">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={personalInfo.name}
                    width="200"
                    height="200"
                    loading="eager"
                    fetchPriority="high"
                    className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full border-4 border-slate-950 object-cover mx-auto shadow-2xl"
                  />
                ) : (
                  <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full border-4 border-slate-950 bg-slate-700 animate-pulse mx-auto shadow-2xl flex items-center justify-center">
                    <Settings className="w-12 h-12 text-slate-500 animate-spin" />
                  </div>
                )}
              </div>
              <div className="block"></div>
              <div className="inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold mb-4 uppercase tracking-[0.2em]">
                {personalInfo.title}
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
                <span className="block text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 font-bold mb-2">
                  {personalInfo.name}
                </span>
                Escalando Negocios mediante <br />
                <span className="text-shine">Software de Clase Mundial</span>
              </h1>
              <p className={`text-lg md:text-xl mb-10 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                {personalInfo.summary}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#portafolio"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('portafolio');
                  }}
                  className="btn-glow px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold rounded-xl hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/40"
                >
                  <ShoppingBag className="w-4 h-4" /> Ver Portafolio
                </a>
                <a
                  href="/CV_Mario_De_La_Cruz_Sandoval.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className={`px-6 py-3 border font-bold rounded-xl transition-all flex items-center gap-2 ${darkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <Description className="w-4 h-4" /> Ver CV (PDF)
                </a>
                <a
                  href="#experiencia"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('experiencia');
                  }}
                  className={`px-6 py-3 border font-bold rounded-xl transition-all flex items-center gap-2 ${darkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  Trayectoria <ExpandMore className="w-4 h-4" />
                </a>
                <a
                  href="#contacto"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('contacto');
                  }}
                  className={`px-6 py-3 border font-bold rounded-xl transition-all ${darkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  Contacto
                </a>
              </div>
            </FadeIn>

            {/* Estadísticas */}
            <FadeIn delay={300}>
              <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {stats.map((st, i) => (
                  <div key={i} className={`rounded-2xl border px-4 py-5 backdrop-blur-md ${darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-white/70 border-gray-200'}`}>
                    <div className="text-3xl sm:text-4xl font-black text-shine"><CountUp end={st.value} suffix={st.suffix} /></div>
                    <div className={`mt-1 text-xs uppercase tracking-wider font-semibold ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{st.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Indicador de scroll */}
          <button onClick={() => scrollTo('habilidades')} className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex w-6 h-10 rounded-full border-2 border-slate-500/60 justify-center pt-2" aria-label="Bajar a habilidades">
            <span className="scroll-dot w-1 h-2 rounded-full bg-teal-400"></span>
          </button>
        </section>

        {/* Carrusel de tecnologías */}
        <div className={`marquee overflow-hidden py-6 border-y ${darkMode ? 'border-white/5 bg-white/[0.02]' : 'border-gray-100 bg-gray-50/60'}`} aria-label="Tecnologías">
          <div className="marquee-track">
            {[...techMarquee, ...techMarquee].map((t, i) => (
              <span key={i} className={`mx-6 text-lg sm:text-2xl font-black uppercase tracking-wider whitespace-nowrap ${darkMode ? 'text-slate-600 hover:text-teal-400' : 'text-gray-300 hover:text-blue-500'} transition-colors`}>
                {t} <span className="text-blue-500/60 ml-6">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Skills */}
        <section id="habilidades" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn><SectionTitle subtitle>Stack de Especialidades</SectionTitle></FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {skills.map((s, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <Spotlight className={`p-7 rounded-3xl border h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 ${darkMode ? 'bg-slate-900/60 backdrop-blur-md border-white/10' : 'bg-white/80 backdrop-blur-md border-gray-100'}`}>
                    <div className="w-12 h-12 mb-5 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br from-blue-500 to-teal-400 shadow-lg shadow-blue-500/30">{s.icon}</div>
                    <h3 className="text-lg font-bold mb-4">{s.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {s.items.map((item, idx) => (
                        <span key={idx} className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-600'}`}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </Spotlight>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Full Experience Timeline */}
        <section id="experiencia" className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <FadeIn><SectionTitle subtitle>Trayectoria Completa</SectionTitle></FadeIn>
            <div className="relative mt-16">
              {/* Main Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-500 via-teal-400 to-violet-500/0 hidden md:block"></div>

              {experience.map((exp, i) => (
                <FadeIn key={i} delay={i * 50}>
                  <div className={`relative flex flex-col md:flex-row gap-8 mb-16`}>
                    {/* Circle Dot Desktop */}
                    <div className="absolute left-1/2 top-0 w-4 h-4 bg-teal-400 rounded-full -translate-x-1/2 mt-2 hidden md:block ring-4 ring-teal-400/20 shadow-[0_0_20px_rgba(45,212,191,0.8)]"></div>

                    <div className="md:w-1/2 flex flex-col items-start md:items-end">
                      {i % 2 === 0 ? (
                        <div className="hidden md:block text-right">
                          {/* <span className="text-xs font-bold text-blue-500 uppercase">{exp.period}</span>*/}
                          <h4 className="text-sm text-slate-500">{exp.location}</h4>
                        </div>
                      ) : (
                        <div className={`p-6 rounded-3xl border w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/10 ${darkMode ? 'bg-slate-900/60 backdrop-blur-md border-white/10 hover:border-teal-400/40' : 'bg-white/80 backdrop-blur-md border-gray-200/80 shadow-sm hover:border-teal-300'}`}>
                          <span className="text-xs font-bold text-blue-500 uppercase">{exp.period}</span>
                          <h3 className="text-xl font-black mt-2">{exp.role}</h3>
                          <a href={exp.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-teal-400 font-bold mb-3 hover:text-teal-300 transition-colors group">
                            {exp.company}
                            <OpenInNew className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                          <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{exp.description}</p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {exp.stack.map((t, idx) => <span key={idx} className={`text-[10px] uppercase font-bold tracking-tighter ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>#{t}</span>)}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="md:w-1/2 flex flex-col items-start">
                      {i % 2 !== 0 ? (
                        <div className="hidden md:block text-left">
                          {/* <span className="text-xs font-bold text-blue-500 uppercase">{exp.period}</span>*/}
                          <h4 className="text-sm text-slate-500">{exp.location}</h4>
                        </div>
                      ) : (
                        <div className={`p-6 rounded-3xl border w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/10 ${darkMode ? 'bg-slate-900/60 backdrop-blur-md border-white/10 hover:border-teal-400/40' : 'bg-white/80 backdrop-blur-md border-gray-200/80 shadow-sm hover:border-teal-300'}`}>
                          <span className="text-xs font-bold text-blue-500 uppercase">{exp.period}</span>
                          <h3 className="text-xl font-black mt-2">{exp.role}</h3>
                          <a href={exp.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-teal-400 font-bold mb-3 hover:text-teal-300 transition-colors group">
                            {exp.company}
                            <OpenInNew className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                          <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{exp.description}</p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {exp.stack.map((t, idx) => <span key={idx} className={`text-[10px] uppercase font-bold tracking-tighter ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>#{t}</span>)}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Mobile Date Overlay */}
                    <div className="md:hidden order-first">
                      <span className="text-xs font-bold text-blue-500 uppercase">{exp.period}</span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portafolio" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn>
              <SectionTitle subtitle>Portafolio de Proyectos</SectionTitle>
              <p className={`text-center max-w-3xl mx-auto -mt-6 mb-16 text-base md:text-lg ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                Sistemas en producción desarrollados con arquitecturas modernas, alto rendimiento y soluciones completas de extremo a extremo.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((proj, idx) => (
                <FadeIn key={idx} delay={idx * 150}>
                  <Spotlight className={`rounded-3xl border overflow-hidden h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/20 ${
                    darkMode
                      ? 'bg-slate-900/60 backdrop-blur-md border-white/10'
                      : 'bg-white/80 backdrop-blur-md border-gray-200 shadow-sm'
                  }`}>
                    {/* Visual Banner */}
                    {proj.image ? (
                      <div className="relative h-60 w-full overflow-hidden bg-slate-950 group">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                        <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60 flex items-center gap-2">
                          {proj.logo && <img src={proj.logo} alt={`${proj.title} Logo`} className="h-4 w-auto object-contain" />}
                          <span className="text-xs font-semibold text-teal-400">En Producción</span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-60 w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex flex-col justify-between p-6 border-b border-slate-800">
                        <div className="flex items-center justify-between">
                          <div className="bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60 flex items-center gap-2">
                            {proj.logo && <img src={proj.logo} alt={`${proj.title} Logo`} className="h-4 w-auto object-contain" />}
                            <span className="text-xs font-semibold text-teal-400">En Producción</span>
                          </div>
                          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 bg-slate-800/60 px-3 py-1 rounded-full border border-slate-700/40">
                            {proj.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 my-auto py-2">
                          <div className="p-3.5 bg-blue-500/10 border border-blue-500/30 rounded-2xl shadow-inner text-blue-400">
                            {proj.icon}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">{proj.brandLabel}</span>
                            <span className="text-2xl font-black text-white">{proj.brandTitle}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="mb-4">
                        <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-1">
                          {proj.subtitle}
                        </span>
                        <h3 className="text-2xl font-bold">{proj.title}</h3>
                      </div>

                      <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                        {proj.description}
                      </p>

                      {/* Highlights */}
                      <div className="mb-6 space-y-2">
                        {proj.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs">
                            <span className="text-teal-400 font-bold mt-0.5">✓</span>
                            <span className={darkMode ? 'text-slate-300' : 'text-gray-700'}>{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-slate-800/50">
                        {proj.tags.map((tag, i) => (
                          <span
                            key={i}
                            className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                              darkMode
                                ? 'bg-slate-800 text-slate-300 border border-slate-700/50'
                                : 'bg-gray-100 text-gray-700 border border-gray-200'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="mt-6 pt-4 flex items-center justify-between">
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold rounded-xl text-sm hover:opacity-95 hover:scale-105 transition-all shadow-md shadow-blue-500/20"
                        >
                          Visitar Sitio Oficial <OpenInNew className="w-4 h-4" />
                        </a>
                        <span className={`text-xs font-mono ${darkMode ? 'text-slate-500' : 'text-gray-400'}`}>
                          {proj.siteLabel}
                        </span>
                      </div>
                    </div>
                  </Spotlight>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contacto" className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <FadeIn>
              <div className="relative overflow-hidden rounded-[2rem] p-[1px] bg-gradient-to-br from-blue-500 via-teal-400 to-violet-500 shadow-2xl shadow-blue-500/20">
                <div className={`relative rounded-[calc(2rem-1px)] px-6 py-16 sm:px-12 text-center ${darkMode ? 'bg-slate-950/90' : 'bg-white/95'}`}>
                  <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-teal-400/20 blur-3xl rounded-full pointer-events-none"></div>
                  <span className="relative inline-flex items-center gap-2 px-4 py-1 mb-6 rounded-full text-xs font-bold uppercase tracking-[0.2em] border border-teal-400/30 bg-teal-400/10 text-teal-400">
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span> Disponible para proyectos
                  </span>
                  <h2 className="relative text-4xl sm:text-5xl font-black mb-6 leading-tight">Hablemos de tu <span className="text-shine">próximo proyecto</span></h2>
                  <p className={`relative text-lg mb-10 max-w-2xl mx-auto ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    Especialista en convertir desafíos tecnológicos complejos en soluciones digitales escalables. Estoy disponible para liderar la evolución técnica de tu organización.
                  </p>
                  <div className="relative flex flex-wrap justify-center gap-4">
                    <a href={personalInfo.social.email} className="btn-glow flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-lg shadow-blue-500/40">
                      <Email className="w-5 h-5" /> Enviar Mensaje
                    </a>
                    <a href={personalInfo.social.whatsapp} target="_blank" rel="noreferrer" className={`flex items-center gap-3 px-8 py-4 border rounded-2xl font-bold hover:scale-105 transition-all ${darkMode ? 'border-white/15 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <WhatsApp className="w-5 h-5 text-[#25D366]" /> WhatsApp
                    </a>
                    <a href={personalInfo.social.linkedin} target="_blank" rel="noreferrer" className={`flex items-center gap-3 px-8 py-4 border rounded-2xl font-bold hover:scale-105 transition-all ${darkMode ? 'border-white/15 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <LinkedIn className="w-5 h-5 text-[#0A66C2]" /> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-800 text-center opacity-60 text-sm">
        <p>© {new Date().getFullYear()} {personalInfo.name} — Guadalajara, Jalisco</p>
      </footer>
    </div>
  );
}