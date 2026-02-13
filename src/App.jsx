import React, { useState, useEffect, useCallback } from 'react';
import { 
  MessageCircle, 
  Package, 
  Scissors, 
  Gift, 
  Menu, 
  X, 
  Instagram, 
  Facebook, 
  Star, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Definición de colores premium para Crea Gift
const COLORS = {
  primary: '#F6CEC8',
  secondary: '#EED5B7',
  sage: '#CCC7AE',
  rose: '#D19793',
  dark: '#3A3F3B',
  bg: '#FCF9F6'
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const galleryItems = [
    {
      url: "https://images.unsplash.com/photo-1530103862676-fa8c91bbe178?auto=format&fit=crop&q=80&w=1200",
      title: "Celebraciones Orgánicas",
      category: "Escenografía",
      description: "Instalaciones de globos con texturas mate y metalizadas que desafían la gravedad."
    },
    {
      url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1200",
      title: "Papelería de Autor",
      category: "Creative Craft",
      description: "Detalles en papel fino, cortes láser y acabados en foil para una mesa inolvidable."
    },
    {
      url: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&q=80&w=1200",
      title: "Mesas de Dulces",
      category: "Candy Bar",
      description: "Curaduría de repostería fina integrada perfectamente con la paleta del evento."
    }
  ];

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % galleryItems.length);
  }, [galleryItems.length]);

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  }, [galleryItems.length]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden font-sans" style={{ backgroundColor: COLORS.bg, color: COLORS.dark }}>
      {/* Inyección de estilos globales para corregir comportamientos de Vite */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;600&display=swap');
        
        :root {
          --color-bg: ${COLORS.bg};
        }

        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        html { scroll-behavior: smooth; }
        
        /* Reset crítico para evitar el centrado de Vite */
        body { 
          margin: 0 !important; 
          padding: 0 !important; 
          display: block !important; 
          background-color: var(--color-bg) !important;
          min-height: 100vh;
        }

        #root {
          width: 100%;
          display: block !important;
        }

        /* Estilo para links de navegación */
        .nav-link {
          position: relative;
          transition: color 0.3s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -4px;
          left: 0;
          background-color: ${COLORS.rose};
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>

      {/* Navegación */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D19793] flex items-center justify-center text-white font-serif italic text-xl shadow-md font-bold">C</div>
            <span className="text-xl md:text-2xl font-serif font-bold tracking-tight uppercase">Crea Gift</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[10px] font-bold tracking-widest uppercase">
            {['inicio', 'servicios', 'galeria'].map((link) => (
              <a key={link} href={`#${link}`} className="nav-link hover:text-[#D19793] text-inherit no-underline">{link}</a>
            ))}
            <button className="bg-[#3A3F3B] text-white px-8 py-2.5 rounded-full hover:bg-[#D19793] transition-all transform hover:scale-105 border-none cursor-pointer font-bold uppercase text-[10px] tracking-widest">
              Cotizar
            </button>
          </div>

          <button className="md:hidden text-[#3A3F3B] bg-transparent border-none cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Menú Móvil */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['inicio', 'servicios', 'galeria'].map((link) => (
              <a key={link} href={`#${link}`} onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif capitalize no-underline text-[#3A3F3B]">{link}</a>
            ))}
            <button className="bg-[#D19793] text-white px-12 py-4 rounded-full font-bold border-none cursor-pointer">Cotizar Ahora</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center pt-20 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-[#D19793]"></div>
              <span className="text-[#D19793] text-[10px] font-bold tracking-[0.4em] uppercase">Establecido 2019</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-serif leading-[1.1] mb-8 text-[#3A3F3B] m-0">
              Momentos <br /> <span className="italic text-[#D19793] font-light">únicos</span> <br /> diseñados.
            </h1>
            <p className="text-lg text-gray-500 mb-10 max-w-md font-light leading-relaxed">
              Elevamos tus celebraciones con una curaduría experta en color, texturas y detalles personalizados.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <a href="https://wa.me/tu-numero" className="bg-[#25D366] text-white px-10 py-4 rounded-full font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all no-underline text-center">
                <MessageCircle size={22} /> Agenda tu fecha
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}    
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1 }} 
            className="relative"
          >
            <div className="aspect-3/4 rounded-t-[12rem] rounded-b-3xl overflow-hidden border-12 border-white shadow-2xl relative z-10">
              <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Decoración de Eventos" />
            </div>
            {/* Decoración abstracta */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F6CEC8] rounded-full blur-3xl opacity-50 z-0"></div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-full shadow-2xl w-32 h-32 flex flex-col items-center justify-center text-center border-t-4 border-[#D19793] z-20">
                <Star className="text-[#D19793] fill-[#D19793] mb-1" size={16} />
                <span className="text-[9px] font-bold uppercase tracking-tighter leading-tight text-[#3A3F3B]">Diseño<br/>Premium</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-4xl md:text-6xl font-serif mb-6 text-[#3A3F3B]">Servicios que <span className="text-[#D19793] italic">enamoran</span></h2>
              <p className="text-gray-400 font-light">Cuidamos cada aspecto de tu evento para que tú solo te preocupes por disfrutar.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
                {[
                    { icon: <Package size={32} />, title: "Decoración", desc: "Montajes orgánicos con globos y mobiliario de tendencia.", color: COLORS.primary },
                    { icon: <Scissors size={32} />, title: "Papelería", desc: "Diseño gráfico personalizado y Creative Craft para tu mesa.", color: COLORS.sage },
                    { icon: <Gift size={32} />, title: "Detalles", desc: "Regalos y recordatorios diseñados con alma y propósito.", color: COLORS.rose }
                ].map((s, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -10 }}
                      className="bg-[#FCF9F6] p-12 rounded-[3rem] border border-black/5 hover:shadow-2xl transition-all"
                    >
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm" style={{ backgroundColor: 'white', color: s.color }}>
                            {s.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-4 font-serif text-[#3A3F3B]">{s.title}</h3>
                        <p className="text-base text-gray-500 font-light leading-relaxed">{s.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Galería Dinámica */}
      <section id="galeria" className="py-32 overflow-hidden bg-[#FCF9F6]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles size={16} className="text-[#D19793]" />
                    <span className="text-[#D19793] font-bold text-[11px] uppercase tracking-[0.4em]">{galleryItems[activeIdx].category}</span>
                  </div>
                  <h3 className="text-5xl font-serif leading-tight text-[#3A3F3B] m-0">{galleryItems[activeIdx].title}</h3>
                  <p className="text-lg text-gray-500 font-light leading-relaxed">{galleryItems[activeIdx].description}</p>
                  <div className="flex gap-4 pt-6">
                    <button onClick={handlePrev} className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all bg-white shadow-sm cursor-pointer"><ChevronLeft size={24} /></button>
                    <button onClick={handleNext} className="w-14 h-14 rounded-full bg-[#3A3F3B] text-white flex items-center justify-center hover:bg-[#D19793] transition-all shadow-xl cursor-pointer border-none"><ChevronRight size={24} /></button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="lg:col-span-7 relative h-150 rounded-[4rem] overflow-hidden ... border-8 border-white">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIdx}
                  src={galleryItems[activeIdx].url}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-[10px] font-bold tracking-widest uppercase">
                {activeIdx + 1} / {galleryItems.length}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3A3F3B] text-white py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16 mb-20">
            <div className="text-center md:text-left">
              <div className="text-4xl font-serif font-bold uppercase mb-6 tracking-tighter">Crea Gift</div>
              <p className="opacity-60 text-base max-w-sm font-light leading-relaxed">
                Transformamos espacios ordinarios en escenarios extraordinarios para que tus recuerdos duren por siempre.
              </p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#D19793] hover:border-[#D19793] transition-all text-white no-underline">
                <Instagram size={24} />
              </a>
              <a href="#" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#D19793] hover:border-[#D19793] transition-all text-white no-underline">
                <Facebook size={24} />
              </a>
            </div>
          </div>
          <div className="h-px w-full bg-white/10 mb-8"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] opacity-40 font-bold tracking-[0.2em] uppercase">
            <span>© {new Date().getFullYear()} Crea Gift by Johanna Hincapié</span>
            <div className="flex gap-8">
              <span>Cali, Colombia</span>
              <span>Event Design & Craft</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;