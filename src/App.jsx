import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Github, Linkedin, Download, ExternalLink } from 'lucide-react';

const GradientHeading = ({ children, className = '' }) => (
  <h1 className={`bg-gradient-to-b from-[#646973] to-[#BBCCD7] bg-clip-text text-transparent ${className}`}>
    {children}
  </h1>
);

const ContactButton = ({ label = 'Get In Touch', onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 rounded-full font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base text-white"
    style={{
      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1, inset -3px -3px 0px rgba(255, 255, 255, 0.2)',
      outline: '2px solid white',
      outlineOffset: '-3px'
    }}
  >
    {label}
  </motion.button>
);

const SocialLinks = () => (
  <div className="flex gap-4 items-center">
    <motion.a
      href="mailto:sankil.sudrik@gmail.com"
      whileHover={{ scale: 1.1 }}
      className="p-3 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors"
      aria-label="Email"
    >
      <Mail size={20} />
    </motion.a>
    <motion.a
      href="https://github.com/Monster-3-2"
      whileHover={{ scale: 1.1 }}
      className="p-3 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors"
      aria-label="GitHub"
    >
      <Github size={20} />
    </motion.a>
    <motion.a
      href="https://www.linkedin.com/in/sankil-sudrik-a3628636a/"
      whileHover={{ scale: 1.1 }}
      className="p-3 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors"
      aria-label="LinkedIn"
    >
      <Linkedin size={20} />
    </motion.a>
  </div>
);

const FadeIn = ({ children, delay = 0, duration = 0.7, x = 0, y = 30 }) => (
  <motion.div
    initial={{ opacity: 0, x, y }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    viewport={{ once: true, margin: '50px', amount: 0 }}
  >
    {children}
  </motion.div>
);

const Magnet = ({ children, padding = 150, strength = 3 }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const distX = mouseX - centerX;
      const distY = mouseY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < padding) {
        setIsActive(true);
        setOffset({ x: distX / strength, y: distY / strength });
      } else {
        setIsActive(false);
      }
    };

    const handleMouseLeave = () => {
      setIsActive(false);
      setOffset({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [padding, strength]);

  return (
    <div
      ref={ref}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: isActive ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

const Avatar3D = () => {
  return (
    <Magnet padding={150} strength={3}>
      <div className="relative w-[280px] sm:w-[360px] md:w-[420px] lg:w-[480px] rounded-3xl overflow-hidden border-2 border-[#D7E2EA]/30"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(215, 226, 234, 0.1), transparent 50%)',
          boxShadow: '0 20px 60px rgba(182, 0, 168, 0.3), inset 0 0 60px rgba(215, 226, 234, 0.05)'
        }}>
        <img
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwwUBAwMBwkMBwMEBwcOBxcGBwcODgsMDg4PEA8OExMTEg0LExMTGRYSEg0SEgz/2wBDAQICAgMDAwYDAwYMCAcIDAwYDAwYGBAMDAwYEBwMDAwYFBwMDAwYHBwcODgwMDg4PEA8OExMTEg0LExMTGRYSEg0SEgz/wAARCADIAMgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWm5ydn5KjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlbaWmJ2eoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q=="
          alt="Sankil Sudrik"
          className="w-full h-full object-cover"
        />
        <motion.div 
          className="absolute inset-0 rounded-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(182, 0, 168, 0.4), transparent 70%)',
          }}
        />
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#B600A8]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#7621B0]/20 to-transparent rounded-full blur-3xl" />
      </div>
    </Magnet>
  );
};

const HeroSection = () => {
  return (
    <section className="h-screen bg-[#0C0C0C] flex flex-col overflow-x-clip font-['Kanit']">
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
          <div className="text-[#D7E2EA] font-medium uppercase tracking-wider" style={{ fontSize: 'clamp(0.875rem, 1.4vw, 1.1rem)' }}>
            Sankil Sudrik
          </div>
          <div className="flex gap-8">
            {['About', 'Work', 'Projects', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider transition-opacity duration-200 hover:opacity-70"
                style={{ fontSize: 'clamp(0.75rem, 1.2vw, 1rem)' }}
              >
                {link}
              </a>
            ))}
          </div>
        </nav>
      </FadeIn>

      <div className="flex-1 flex flex-col justify-between relative px-6 md:px-10">
        <div className="mt-6 sm:mt-4 md:-mt-5 overflow-hidden">
          <FadeIn delay={0.15} y={40}>
            <GradientHeading className="font-black uppercase tracking-tight leading-none whitespace-nowrap" style={{ fontSize: 'clamp(12vw, 14vw, 16vw)' }}>
              AI/ML Engineer
            </GradientHeading>
          </FadeIn>
          <FadeIn delay={0.2} y={40}>
            <p className="text-[#D7E2EA] font-light mt-4" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}>
              Machine Learning Engineer • Python Developer • Problem Solver
            </p>
          </FadeIn>
        </div>

        <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 gap-4">
          <FadeIn delay={0.35} y={20}>
            <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug" style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)', maxWidth: 'clamp(160px, 30vw, 260px)' }}>
              AI/ML specialist building smart applications. Love solving complex problems with data and code.
            </p>
          </FadeIn>
          <FadeIn delay={0.5} y={20}>
            <ContactButton label="Let's Connect" onClick={() => window.location.href = 'mailto:sankil.sudrik@gmail.com'} />
          </FadeIn>
        </div>
      </div>

      <FadeIn delay={0.6} y={30}>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 md:right-10 md:top-auto md:bottom-0 md:translate-y-0 z-20 pointer-events-auto">
          <Avatar3D />
        </div>
      </FadeIn>
    </section>
  );
};

const FeaturedProjectsSection = () => {
  const projects = [
    {
      num: '01',
      name: 'EduTrack AI Study Platform',
      category: 'AI/ML Project',
      tech: 'React • Flask • Groq API • Supabase',
      desc: 'Intelligent exam preparation platform using AI to analyze syllabuses, generate study roadmaps, and adapt content to individual learning styles.',
      col1Img1: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=500&h=300&fit=crop',
      col1Img2: 'https://images.unsplash.com/photo-1516321318423-f06f70674e90?w=500&h=300&fit=crop',
      col2Img: 'https://images.unsplash.com/photo-1516321318423-f06f70674e90?w=500&h=600&fit=crop'
    },
    {
      num: '02',
      name: 'Production Monitoring System',
      category: 'Full-Stack',
      tech: 'FastAPI • Supabase • React • Vercel',
      desc: 'Factory floor intelligence tool for digitizing hourly production tracking with real-time efficiency calculations and multi-tier analytics dashboards.',
      col1Img1: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
      col1Img2: 'https://images.unsplash.com/photo-1460925895917-adf4e5e49b4a?w=500&h=300&fit=crop',
      col2Img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=600&fit=crop'
    },
    {
      num: '03',
      name: 'Club Website',
      category: 'Web Development',
      tech: 'React • HTML/CSS • JavaScript',
      desc: 'Modern club website presenting information and events with responsive design and smooth interactions.',
      col1Img1: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=300&fit=crop',
      col1Img2: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
      col2Img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=600&fit=crop'
    }
  ];

  return (
    <section className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 py-20 font-['Kanit'] relative">
      <FadeIn delay={0} y={40}>
        <h2 className="bg-gradient-to-b from-[#646973] to-[#BBCCD7] bg-clip-text text-transparent font-black uppercase text-center mb-24" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          Featured Projects
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto space-y-24">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} index={idx} total={projects.length} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index, total }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%']
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={containerRef}
      style={{ 
        scale, 
        opacity,
        position: 'relative',
        zIndex: index
      }}
      className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8 pb-8 border-b border-[#D7E2EA]/20">
        <div className="flex-1">
          <div className="text-[#D7E2EA] font-black mb-2" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
            {project.num}
          </div>
          <p className="text-[#D7E2EA]/60 font-light uppercase tracking-wide text-sm">
            {project.category}
          </p>
          <h3 className="text-[#D7E2EA] font-medium uppercase mt-2" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.2rem)' }}>
            {project.name}
          </h3>
          <p className="text-[#D7E2EA]/70 font-light text-xs sm:text-sm mt-3">
            {project.tech}
          </p>
          <p className="text-[#D7E2EA]/80 font-light leading-relaxed mt-3 max-w-xl">
            {project.desc}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="px-6 py-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest text-xs hover:bg-[#D7E2EA]/10 transition-colors flex items-center gap-2"
        >
          View <ExternalLink size={16} />
        </motion.button>
      </div>

      <div className="grid grid-cols-[40%_60%] gap-4 md:gap-6">
        <div className="space-y-4 md:space-y-6 flex flex-col">
          <img
            src={project.col1Img1}
            alt=""
            className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover w-full"
            style={{ height: 'clamp(130px, 16vw, 230px)' }}
            loading="lazy"
          />
          <img
            src={project.col1Img2}
            alt=""
            className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover w-full flex-1"
            style={{ height: 'clamp(160px, 22vw, 340px)' }}
            loading="lazy"
          />
        </div>

        <img
          src={project.col2Img}
          alt=""
          className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover w-full h-full"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'HTML/CSS', 'Framer Motion']
    },
    {
      title: 'Backend & Data',
      skills: ['Python', 'FastAPI', 'Flask', 'SQL', 'Supabase', 'PostgreSQL']
    },
    {
      title: 'AI & ML',
      skills: ['Machine Learning', 'NLP', 'Sci-Kit Learn', 'Pandas', 'Statistical Analysis']
    },
    {
      title: 'Soft Skills',
      skills: ['Problem Solving', 'Team Leadership', 'Communication', 'Analytical Thinking']
    }
  ];

  return (
    <section className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 font-['Kanit']">
      <FadeIn delay={0} y={40}>
        <h2 className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          Skills & Expertise
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {skillCategories.map((category, idx) => (
          <FadeIn key={idx} delay={idx * 0.1} y={20}>
            <div>
              <h3 className="text-[#0C0C0C] font-black uppercase mb-6" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, sidx) => (
                  <span key={sidx} className="px-4 py-2 rounded-full bg-[#0C0C0C] text-white font-medium text-sm hover:bg-[#1A1A1A] transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

const ExperienceSection = () => {
  const experiences = [
    {
      period: '07/2026 - Present',
      role: 'Jr. HR Executive',
      company: 'Inamigos Foundation',
      desc: 'Developing expertise in people management, employee engagement, and organizational development.'
    },
    {
      period: '06/2026 - 07/2026',
      role: 'Web Developer',
      company: 'Inamigos Foundation',
      desc: 'Contributed to meaningful web projects and enhanced full-stack development skills.'
    },
    {
      period: '06/2026 - 07/2026',
      role: 'AI Data Analyst',
      company: 'Inamigos Foundation',
      desc: 'Worked on data-driven projects with focus on analytical thinking and real-world problem solving.'
    },
    {
      period: '05/2026 - 06/2026',
      role: 'Technical Intern',
      company: 'Decodelabs',
      desc: 'Completed rigorous accelerated program focused on practical engineering and development skills.'
    }
  ];

  return (
    <section className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 font-['Kanit']">
      <FadeIn delay={0} y={40}>
        <h2 className="bg-gradient-to-b from-[#646973] to-[#BBCCD7] bg-clip-text text-transparent font-black uppercase text-center mb-16" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          Work Experience
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto space-y-0 divide-y divide-[#D7E2EA]/20">
        {experiences.map((exp, idx) => (
          <FadeIn key={idx} delay={idx * 0.1} y={20}>
            <div className="py-8 sm:py-10 md:py-12">
              <div className="flex flex-col md:flex-row md:gap-8">
                <div className="text-[#D7E2EA]/60 font-light text-sm md:w-32 flex-shrink-0">
                  {exp.period}
                </div>
                <div className="flex-1 mt-3 md:mt-0">
                  <h3 className="text-[#D7E2EA] font-medium uppercase text-lg">
                    {exp.role}
                  </h3>
                  <p className="text-[#D7E2EA]/70 font-light text-sm mt-1">
                    {exp.company}
                  </p>
                  <p className="text-[#D7E2EA]/80 font-light leading-relaxed mt-3">
                    {exp.desc}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 font-['Kanit']">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn delay={0} y={40}>
          <h2 className="text-[#0C0C0C] font-black uppercase mb-8" style={{ fontSize: 'clamp(2.5rem, 10vw, 120px)' }}>
            Let's Work Together
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} y={20}>
          <p className="text-[#0C0C0C] font-light leading-relaxed mb-12" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', maxWidth: '600px', margin: '0 auto 3rem' }}>
            I'm always interested in hearing about new projects and opportunities. Let's connect!
          </p>
        </FadeIn>

        <FadeIn delay={0.3} y={20}>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
            <ContactButton label="Email Me" onClick={() => window.location.href = 'mailto:sankil.sudrik@gmail.com'} />
            <a
              href="#"
              className="px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 rounded-full border-2 border-[#0C0C0C] text-[#0C0C0C] font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base hover:bg-[#0C0C0C]/10 transition-colors flex items-center gap-2"
            >
              <Download size={18} />
              Download Resume
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.45} y={20}>
          <div className="flex justify-center">
            <SocialLinks />
          </div>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="mt-16 pt-8 border-t border-[#0C0C0C]/10">
            <p className="text-[#0C0C0C]/60 font-light text-sm">
              © 2026 Sankil Sudrik. Building intelligent solutions with AI & ML.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default function App() {
  useEffect(() => {
    document.documentElement.style.backgroundColor = '#0C0C0C';
    document.body.style.backgroundColor = '#0C0C0C';
    document.body.style.fontFamily = "'Kanit', sans-serif";
  }, []);

  return (
    <main className="bg-[#0C0C0C] text-white overflow-x-clip font-['Kanit']" style={{ margin: 0, padding: 0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap');
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html, body, #root {
          background-color: #0C0C0C;
          margin: 0;
          padding: 0;
        }
      `}</style>
      <HeroSection />
      <FeaturedProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
