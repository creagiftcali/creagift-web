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
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const galleryItems = [
    {
    url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1200",
    title: "Celebración Íntima",
    category: "Eventos Románticos",
    description: "Ambiente cálido con velas, flores y decoración minimalista para momentos especiales."
  },
  {
    url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=1200",
    title: "Mesa con Flores",
    category: "Decoración Premium",
    description: "Arreglos florales naturales y detalles delicados para mesas inolvidables."
  },
  {
    url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1200",
    title: "Globos y Luces",
    category: "Escenografía Orgánica",
    description: "Instalaciones de globos y luces suaves para crear atmósfera mágica."
  }
];

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % galleryItems.length);
  }, [galleryItems.length]);

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  }, [galleryItems.length]);

  // Auto-play suave para el carrusel (mueve cada 5 segundos)
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden font-sans" style={{ backgroundColor: COLORS.bg, color: COLORS.dark }}>
      {/* Inyección de estilos globales */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;600&display=swap');
        
        :root {
          --color-bg: ${COLORS.bg};
        }

        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        html { scroll-behavior: smooth; }
        
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
            <img 
              src="/logo-creagift.png" 
              alt="Crea Gift Logo" 
              className="w h-10  object-cover"
            />
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[10px] font-bold tracking-widest uppercase">
            {['inicio', 'servicios', 'galeria'].map((link) => (
              <a key={link} href={`#${link}`} className="nav-link hover:text-[#D19793] text-inherit no-underline">
                {link}
              </a>
            ))}

            <button
              onClick={() => window.open("https://wa.me/3155188507", "_blank")}
              className="bg-[#3A3F3B] text-white px-8 py-2.5 rounded-full hover:bg-[#D19793] transition-all transform hover:scale-105 border-none cursor-pointer font-bold uppercase text-[10px] tracking-widest"
            >
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
              <a href="https://wa.me/3155188507" className="bg-[#25D366] text-white px-10 py-4 rounded-full font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all no-underline text-center">
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

      {/* Galería Dinámica - Carrusel interactivo */}
      <section id="galeria" className="py-32 overflow-hidden bg-[#FCF9F6]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif mb-4 text-[#3A3F3B]">
              Galería <span className="italic text-[#D19793]">de momentos</span>
            </h2>
            <p className="text-gray-500 font-light max-w-2xl mx-auto">
              Capturamos la esencia de cada celebración con detalles únicos y elegantes.
            </p>
          </div>

          {/* Carrusel */}
          <div className="relative">
            <div className="overflow-hidden rounded-4xl">
              <motion.div
                className="flex"
                animate={{ x: `-${activeIdx * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {galleryItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="min-w-full px-4 cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedImage(item.url)}
                  >
                    <div className="relative overflow-hidden rounded-4xl border-8 border-white shadow-2xl">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-125 md:h-150 object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                        <div className="text-white">
                          <p className="text-sm uppercase tracking-widest text-[#D19793] mb-2">
                            {item.category}
                          </p>
                          <h3 className="text-2xl md:text-3xl font-serif">{item.title}</h3>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Flechas */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-white transition-all z-10"
            >
              <ChevronLeft size={28} className="text-[#3A3F3B]" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-white transition-all z-10"
            >
              <ChevronRight size={28} className="text-[#3A3F3B]" />
            </button>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center gap-3 mt-8">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIdx(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIdx ? 'bg-[#D19793] w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Modal para imagen ampliada */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-white text-3xl hover:text-[#D19793] transition-colors"
                >
                  <X size={40} />
                </button>
                <img
                  src={selectedImage}
                  alt="Ampliada"
                  className="w-full h-auto max-h-[90vh] object-contain rounded-3xl shadow-2xl border-8 border-white"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
