import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ChevronDown, Code, Server, Database, Cloud, Terminal, ExternalLink, Moon, Sun, Monitor, Cpu, Briefcase, BookOpen, Settings } from 'lucide-react';

// --- Datos actualizados con la trayectoria completa ---
const personalInfo = {
  name: "Mario De La Cruz",
  title: "Full Stack Developer | Ingeniero de Software",
  summary: "Desarrollador Full Stack con más de 8 años de experiencia en el ciclo de vida del software. Experto en ecosistemas JavaScript (React, Node.js, Angular) y PHP (Laravel), con sólida base en administración de sistemas, despliegue en la nube (AWS) y arquitectura de bases de datos.",
  social: {
    linkedin: "https://www.linkedin.com/in/ingmario/",
    email: "mailto:tuemail@ejemplo.com",
    github: "https://github.com/"
  }
};

const experience = [
  {
    company: "Garantia",
    role: "Full Stack Developer",
    period: "Mar. 2022 - Actualidad",
    location: "Zapopan, Jalisco",
    description: "Desarrollo integral de aplicaciones web. Implementación de FrontEnd con Angular y React. Backend robusto con Node.js y Sequelize. Gestión de infraestructura y despliegue en AWS.",
    stack: ["Angular", "React", "Node.js", "Sequelize", "MySQL", "AWS", "Ubuntu", "Adonis"]
  },
  {
    company: "Turnapp",
    role: "Full Stack Developer",
    period: "Nov. 2020 - Jul. 2022",
    location: "Guadalajara, Jalisco",
    description: "Desarrollo Fullstack centrado en la agilidad. Frontend desarrollado en Vue.js y Backend en Laravel. Despliegue y gestión de servicios mediante AWS LightSail.",
    stack: ["Vue.js", "Laravel", "AWS LightSail", "PHP", "MySQL"]
  },
  {
    company: "metapack",
    role: "Ingeniero de Software",
    period: "Feb. 2020 - Abr. 2021",
    location: "Guadalajara, México",
    description: "Desarrollo de APIs REST con Laravel y MySQL. Creación de componentes modulares en Angular con Bootstrap. Administración de servidores Apache en entornos Linux.",
    stack: ["Angular", "Laravel", "MySQL", "Bootstrap", "Apache", "Linux"]
  },
  {
    company: "samahara Startup",
    role: "Desarrollo de Software",
    period: "Jul. 2019 - Feb. 2020",
    location: "Hermosa Provincia",
    description: "Backend con Node.js y AdonisJS 4.1 usando Lucid ORM y MongoDB. Soporte en aplicaciones móviles con React Native y desarrollo de APIs en Django REST Framework con PostgreSQL.",
    stack: ["Node.js", "AdonisJS", "MongoDB", "React Native", "Django", "PostgreSQL"]
  },
  {
    company: "Altatec de Occidente",
    role: "Desarrollador Back-end",
    period: "Sept. 2017 - Jul. 2019",
    location: "Zapopan, Jalisco",
    description: "Diseño y desarrollo de APIs RESTful utilizando Laravel (PHP) y Node.js. Implementación de interfaces con AngularJS.",
    stack: ["Laravel", "PHP", "Node.js", "JavaScript", "AngularJS"]
  },
  {
    company: "Recab de México",
    role: "Administrador de Sistemas",
    period: "Ago. 2015 - Ago. 2017",
    location: "México",
    description: "Administración de servidores, soporte técnico preventivo/correctivo y gestión de infraestructura. Supervisión de telefonía IP, seguridad (antivirus) y administración de redes e IPs.",
    stack: ["Servidores", "Telefonía IP", "Redes", "Soporte Técnico", "Seguridad"]
  },
  {
    company: "EMERGYS CORPORATION",
    role: "Developer Junior",
    period: "Ene. 2017 - May. 2017",
    location: "Guadalajara, Jalisco",
    description: "Participación en el programa de desarrollo Emergys. Desarrollo web, pruebas de software (testing), aplicaciones Android y trabajo con IBM Integration Bus y Spring Java.",
    stack: ["IBM Integration Bus", "Java", "Spring", "Android", "Testing"]
  },
  {
    company: "Instituciones Hermosa Provincia",
    role: "Docencia",
    period: "Ene. 2013 - Jul. 2016",
    location: "Guadalajara, Jalisco",
    description: "Actividades académicas y de enseñanza técnica en instituciones educativas.",
    stack: ["Educación", "Liderazgo", "Comunicación"]
  },
  {
    company: "Recab de México",
    role: "Programador Web",
    period: "Sept. 2015 - Mar. 2016",
    location: "Guadalajara, Jalisco",
    description: "Desarrollo inicial de sitios y aplicaciones web internas en jornada parcial.",
    stack: ["HTML", "CSS", "PHP", "Web Development"]
  }
];

const skills = [
  { category: "Frontend", icon: <Monitor className="w-6 h-6" />, items: ["React", "Angular", "Vue.js", "AngularJS", "Tailwind CSS", "Bootstrap", "JavaScript"] },
  { category: "Backend", icon: <Server className="w-6 h-6" />, items: ["Node.js", "Laravel", "AdonisJS", "Django", "Spring Java", "PHP", "Python"] },
  { category: "Database & ORM", icon: <Database className="w-6 h-6" />, items: ["MySQL", "PostgreSQL", "MongoDB", "Sequelize", "Lucid ORM"] },
  { category: "Infra & Cloud", icon: <Cloud className="w-6 h-6" />, items: ["AWS (EC2, LightSail)", "Ubuntu/Linux", "Apache", "IBM Integration Bus", "Git"] },
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
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>
            <a href={personalInfo.social.linkedin} target="_blank" rel="noreferrer" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
              LinkedIn
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="text-center px-6 max-w-4xl">
          <FadeIn>
            <div className="inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold mb-6">
              INGENIERO DE SOFTWARE FULL STACK
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Construyendo <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Experiencias Digitales</span>
            </h1>
            <p className={`text-lg md:text-xl mb-10 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              {personalInfo.summary}
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={() => scrollTo('experiencia')} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2">
                Ver Trayectoria <ChevronDown className="w-4 h-4" />
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
                        <span className="text-xs font-bold text-blue-500 uppercase">{exp.period}</span>
                        <h4 className="text-sm text-slate-500">{exp.location}</h4>
                      </div>
                    ) : (
                      <div className="p-6 rounded-3xl border w-full bg-slate-900/50 dark:bg-slate-800/40 border-slate-700/50">
                        <span className="text-xs font-bold text-blue-500 uppercase">{exp.period}</span>
                        <h3 className="text-xl font-black mt-2">{exp.role}</h3>
                        <h4 className="text-teal-400 font-bold mb-3">{exp.company}</h4>
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
                        <span className="text-xs font-bold text-blue-500 uppercase">{exp.period}</span>
                        <h4 className="text-sm text-slate-500">{exp.location}</h4>
                      </div>
                    ) : (
                      <div className="p-6 rounded-3xl border w-full bg-slate-900/50 dark:bg-slate-800/40 border-slate-700/50">
                        <span className="text-xs font-bold text-blue-500 uppercase">{exp.period}</span>
                        <h3 className="text-xl font-black mt-2">{exp.role}</h3>
                        <h4 className="text-teal-400 font-bold mb-3">{exp.company}</h4>
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
              Mi experiencia abarca desde el desarrollo de software hasta la administración de servidores e infraestructura. Estoy listo para aportar valor a tu equipo.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href={personalInfo.social.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-8 py-4 bg-blue-600 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/40">
                <Linkedin className="w-5 h-5" /> Mi Perfil Profesional
              </a>
              <a href={personalInfo.social.email} className={`flex items-center gap-3 px-8 py-4 border rounded-2xl font-bold transition-all ${darkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-gray-200 hover:bg-white'}`}>
                <Mail className="w-5 h-5" /> Enviar Mensaje
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