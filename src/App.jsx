import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { GitHub, LinkedIn, Email, ExpandMore, Storage, Dns, Cloud, Terminal, OpenInNew, DarkMode, LightMode, DesktopWindows, Settings, Facebook, Instagram, WhatsApp } from '@mui/icons-material';
import XIcon from '@mui/icons-material/X';
// --- Datos actualizados con la trayectoria completa ---
const personalInfo = {
  name: "Mario De La Cruz Sandoval",
  title: "Senior Software Architect & Solutions Engineer",
  summary: "Especialista en el diseño y ejecución de soluciones tecnológicas empresariales con más de 8 años impulsando el crecimiento de negocios. Experto en transformar necesidades corporativas en arquitecturas escalables de alta disponibilidad, optimizando infraestructuras críticas y garantizando la integridad de sistemas de misión mcrítica.",
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
    company: "Garantia",
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
    description: "Ingeniería de soluciones Fullstack optimizadas para el rendimiento y la agilidad de procesos internos. Desarrollo de arquitecturas modulares con Vue.js y Laravel, simplificando despliegues críticos mediante servicios cloud de AWS.",
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
  { category: "Cloud & Backend Architecture", icon: <Storage className="w-6 h-6" />, items: ["Node", "Laravel", "Adonis", "Django", "PHP", "Python"] },
  { category: "Data Management & ORM", icon: <Dns className="w-6 h-6" />, items: ["MySQL", "PostgreSQL", "MongoDB", "Sequelize", "Lucid ORM"] },
  { category: "Critical Infrastructure", icon: <Cloud className="w-6 h-6" />, items: ["AWS (EC2, LightSail, S3, RDS)", "Ubuntu/Linux", "Git"] },
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
    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 inline-block mb-4 uppercase tracking-wider">
      {children}
    </h2>
    {subtitle && <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>}
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

  const toggleTheme = () => setDarkMode(!darkMode);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-white text-gray-800'}`}>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md transition-colors duration-300 ${darkMode ? 'bg-slate-900/80 border-b border-slate-800' : 'bg-white/80 border-b border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl cursor-pointer" onClick={() => scrollTo('home')}>
            <Terminal className="w-5 h-5 mr-1 align-center" />
            <span className="text-blue-500">M</span>ario<span className="text-teal-400">.dev</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {['Habilidades', 'Experiencia', 'Contacto'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className={`text-sm font-medium hover:text-blue-400 transition-colors ${activeSection === item.toLowerCase() ? 'text-blue-400' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-700/50 transition-colors">
              {darkMode ? <LightMode className="w-5 h-5 text-yellow-400" /> : <DarkMode className="w-5 h-5 text-slate-600" />}
            </button>
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide whitespace-nowrap max-w-[140px] xs:max-w-[180px] sm:max-w-none px-2 overflow-y-hidden">
              <a href={personalInfo.social.github} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-slate-700/30 transition-all hover:scale-110 shrink-0" title="GitHub">
                <GitHub className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-slate-900'}`} />
              </a>
              <a href={personalInfo.social.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-[#0A66C2]/10 transition-all hover:scale-110 shrink-0" title="LinkedIn">
                <LinkedIn className="w-5 h-5 text-[#0A66C2]" />
              </a>
              <a href={personalInfo.social.twitter} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-slate-700/30 transition-all hover:scale-110 shrink-0" title="X (Twitter)">
                <XIcon className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-black'}`} />
              </a>
              <a href={personalInfo.social.whatsapp} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-[#25D366]/10 transition-all hover:scale-110 shrink-0" title="WhatsApp">
                <WhatsApp className="w-5 h-5 text-[#25D366]" />
              </a>
              <a href={personalInfo.social.facebook} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-[#1877F2]/10 transition-all hover:scale-110 shrink-0" title="Facebook">
                <Facebook className="w-5 h-5 text-[#1877F2]" />
              </a>
              <a href={personalInfo.social.instagram} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-[#E4405F]/10 transition-all hover:scale-110 shrink-0" title="Instagram">
                <Instagram className="w-5 h-5 text-[#E4405F]" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="text-center px-6 max-w-4xl">
          <FadeIn>
            <div className="mb-6 relative inline-block">
              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 rounded-full"></div>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={personalInfo.name}
                  className="relative w-50 h-50 rounded-full border-4 border-slate-800 object-cover mx-auto shadow-2xl"
                />
              ) : (
                <div className="relative w-50 h-50 rounded-full border-4 border-slate-800 bg-slate-700 animate-pulse mx-auto shadow-2xl flex items-center justify-center">
                  <Settings className="w-12 h-12 text-slate-500 animate-spin" />
                </div>
              )}
            </div>
            <div className="block"></div>
            <div className="inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold mb-6 uppercase tracking-[0.2em]">
              Soluciones Tecnológicas Empresariales
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Escalando Negocios mediante <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Software de Clase Mundial</span>
            </h1>
            <p className={`text-lg md:text-xl mb-10 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              {personalInfo.summary}
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={() => scrollTo('experiencia')} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2">
                Ver Trayectoria <ExpandMore className="w-4 h-4" />
              </button>
              <button onClick={() => scrollTo('contacto')} className={`px-8 py-3 border font-bold rounded-xl transition-all ${darkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-gray-200 hover:bg-gray-50'}`}>
                Contacto
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Skills */}
      <section id="habilidades" className={`py-24 ${darkMode ? 'bg-slate-800/20' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn><SectionTitle subtitle>Stack de Especialidades</SectionTitle></FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((s, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className={`p-8 rounded-3xl border h-full transition-all hover:shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-700 hover:border-blue-500/30' : 'bg-white border-gray-100 hover:border-blue-200'}`}>
                  <div className="text-blue-500 mb-4">{s.icon}</div>
                  <h3 className="text-lg font-bold mb-4">{s.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((item, idx) => (
                      <span key={idx} className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-600'}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
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
            <div className={`absolute left-0 md:left-1/2 top-0 bottom-0 w-px ${darkMode ? 'bg-slate-800' : 'bg-gray-200'} hidden md:block`}></div>

            {experience.map((exp, i) => (
              <FadeIn key={i} delay={i * 50}>
                <div className={`relative flex flex-col md:flex-row gap-8 mb-16`}>
                  {/* Circle Dot Desktop */}
                  <div className="absolute left-1/2 top-0 w-3 h-3 bg-blue-500 rounded-full -translate-x-1/2 mt-2 hidden md:block"></div>

                  <div className="md:w-1/2 flex flex-col items-start md:items-end">
                    {i % 2 === 0 ? (
                      <div className="hidden md:block text-right">
                        {/* <span className="text-xs font-bold text-blue-500 uppercase">{exp.period}</span>*/}
                        <h4 className="text-sm text-slate-500">{exp.location}</h4>
                      </div>
                    ) : (
                      <div className="p-6 rounded-3xl border w-full bg-slate-900/50 dark:bg-slate-800/40 border-slate-700/50">
                        <span className="text-xs font-bold text-blue-500 uppercase">{exp.period}</span>
                        <h3 className="text-xl font-black mt-2">{exp.role}</h3>
                        <a href={exp.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-teal-400 font-bold mb-3 hover:text-teal-300 transition-colors group">
                          {exp.company}
                          <OpenInNew className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{exp.description}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {exp.stack.map((t, idx) => <span key={idx} className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">#{t}</span>)}
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
                      <div className="p-6 rounded-3xl border w-full bg-slate-900/50 dark:bg-slate-800/40 border-slate-700/50">
                        <span className="text-xs font-bold text-blue-500 uppercase">{exp.period}</span>
                        <h3 className="text-xl font-black mt-2">{exp.role}</h3>
                        <a href={exp.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-teal-400 font-bold mb-3 hover:text-teal-300 transition-colors group">
                          {exp.company}
                          <OpenInNew className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{exp.description}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {exp.stack.map((t, idx) => <span key={idx} className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">#{t}</span>)}
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

      {/* Contact */}
      <section id="contacto" className={`py-24 ${darkMode ? 'bg-blue-600/10' : 'bg-blue-50'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-4xl font-black mb-8">Hablemos de tu próximo proyecto</h2>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
              Especialista en convertir desafíos tecnológicos complejos en soluciones digitales escalables. Estoy disponible para liderar la evolución técnica de su organización.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href={personalInfo.social.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-8 py-4 bg-blue-600 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/40">
                <LinkedIn className="w-5 h-5" /> Mi Perfil Profesional
              </a>
              <a href={personalInfo.social.email} className={`flex items-center gap-3 px-8 py-4 border rounded-2xl font-bold transition-all ${darkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-gray-200 hover:bg-white'}`}>
                <Email className="w-5 h-5" /> Enviar Mensaje
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 text-center opacity-60 text-sm">
        <p>© {new Date().getFullYear()} {personalInfo.name} — Guadalajara, Jalisco</p>
      </footer>
    </div>
  );
}