// Sistema de Tabs Premium
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active de todos
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(tc => tc.classList.remove('active'));
    
    // Adiciona active ao clicado
    btn.classList.add('active');
    const targetTab = document.getElementById(btn.dataset.tab);
    if (targetTab) {
      targetTab.classList.add('active');
    }
  });
});

// Menu Mobile Premium
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuToggle.classList.toggle('open');
  });
}

// Smooth Scrolling Premium
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Fecha menu mobile se estiver aberto
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuToggle.classList.remove('open');
      }
    }
  });
});

// Animações de Scroll Premium
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observar elementos com animação
document.querySelectorAll('.fade-up, section, .result-card, .work-card, .ia-card, .portfolio-slide').forEach(el => {
  scrollObserver.observe(el);
});

// Header Sticky Premium
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (header) {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// Back to Top Premium
const createBackToTop = () => {
  const backToTop = document.createElement('button');
  backToTop.id = 'backToTop';
  backToTop.innerHTML = '↑';
  backToTop.setAttribute('aria-label', 'Voltar ao topo');
  backToTop.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--accent-light), var(--accent));
    color: white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 1200;
  `;
  
  document.body.appendChild(backToTop);
  
  // Mostrar/esconder baseado no scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.style.opacity = '1';
      backToTop.style.pointerEvents = 'auto';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.pointerEvents = 'none';
    }
  });
  
  // Hover effect
  backToTop.addEventListener('mouseenter', () => {
    backToTop.style.transform = 'scale(1.1)';
  });
  
  backToTop.addEventListener('mouseleave', () => {
    backToTop.style.transform = 'scale(1)';
  });
  
  // Click para voltar ao topo
  backToTop.addEventListener('click', () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  });
};

// Modal de Ranking das IAs Premium
const initModalRanking = () => {
  const btnRankingIa = document.getElementById('btn-ranking-ia');
  const modalRankingIa = document.getElementById('modal-ranking-ia');
  const closeRankingIa = document.querySelector('.modal-ia-close');
  
  if (btnRankingIa && modalRankingIa && closeRankingIa) {
    // Abrir modal
    btnRankingIa.addEventListener('click', () => {
      modalRankingIa.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Animação de entrada
      setTimeout(() => {
        modalRankingIa.querySelector('.modal-ia-content').style.transform = 'scale(1) translateY(0)';
        modalRankingIa.querySelector('.modal-ia-content').style.opacity = '1';
      }, 10);
    });
    
    // Fechar modal
    const closeModal = () => {
      modalRankingIa.style.display = 'none';
      document.body.style.overflow = '';
    };
    
    closeRankingIa.addEventListener('click', closeModal);
    
    // Fechar clicando fora
    modalRankingIa.addEventListener('click', (e) => {
      if (e.target === modalRankingIa) {
        closeModal();
      }
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalRankingIa.style.display === 'flex') {
        closeModal();
      }
    });
  }
};

// Parallax Effect Premium para Hero
const initParallax = () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    });
  }
};

// Animação de Typing Effect para o título
const initTypingEffect = () => {
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--white)';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        // Remove cursor após terminar
        setTimeout(() => {
          heroTitle.style.borderRight = 'none';
        }, 1000);
      }
    };
    
    // Inicia após um delay
    setTimeout(typeWriter, 1000);
  }
};

// Contador animado para estatísticas
const animateCounters = () => {
  const counters = document.querySelectorAll('[data-count]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    // Inicia quando o elemento entra na viewport
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          counterObserver.unobserve(entry.target);
        }
      });
    });
    
    counterObserver.observe(counter);
  });
};

// Efeito de hover premium nos cards
const initCardHoverEffects = () => {
  const cards = document.querySelectorAll('.result-card, .work-card, .ia-card, .portfolio-slide');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
      this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
};

// Lazy loading para imagens
const initLazyLoading = () => {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
};

// Smooth reveal para seções
const initSectionReveal = () => {
  const sections = document.querySelectorAll('section');
  
  sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
  });
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => revealObserver.observe(section));
};

// Performance optimization
const optimizePerformance = () => {
  // Debounce scroll events
  let ticking = false;
  
  const updateOnScroll = () => {
    // Todas as funções que dependem de scroll
    ticking = false;
  };
  
  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', requestTick);
};

// Inicialização quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar todas as funcionalidades
  createBackToTop();
  initModalRanking();
  initCardHoverEffects();
  initLazyLoading();
  initSectionReveal();
  animateCounters();
  optimizePerformance();
  
  // Adicionar classe para indicar que JS carregou
  document.body.classList.add('js-loaded');
  
  console.log('🚀 MJL TOOLS Premium - Sistema carregado com sucesso!');
});

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registrado: ', registration);
      })
      .catch(registrationError => {
        console.log('SW falhou: ', registrationError);
      });
  });
}

