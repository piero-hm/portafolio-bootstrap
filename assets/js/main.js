document.addEventListener('DOMContentLoaded', function () {
  // Efecto Typewriter general
  function typeWriter(element, text, i, callback) {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(() => typeWriter(element, text, i, callback), 50);
    } else if (callback) {
      callback();
    }
  }

  // Aplicar typewriter al h1 de la página de inicio
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const text = typewriterElement.innerHTML;
    typewriterElement.innerHTML = '';
    typeWriter(typewriterElement, text, 0, null);
  }

  // Animación de la terminal en sobre-mi.html
  const terminalElement = document.getElementById('terminal');
  if (terminalElement) {
    const lines = [
      { text: '<span class="prompt-user">┌─[~/home/student]</span>\n<span class="prompt-line">└─ $</span> ', isCommand: true },
      { text: 'whoami', isCommand: true, isTyping: true },
      { text: '\nPiero\n\n', isCommand: false },
      { text: '<span class="prompt-user">┌─[~/home/student]</span>\n<span class="prompt-line">└─ $</span> ', isCommand: true },
      { text: 'cat /etc/motd', isCommand: true, isTyping: true },
      { text: '\nEstudiante de Ingeniería de Sistemas e Informática\nCurioso · Autodidacta · Linux\n\n', isCommand: false },
      { text: '<span class="prompt-user">┌─[~/home/student]</span>\n<span class="prompt-line">└─ $</span> ', isCommand: true },
      { text: 'neofetch', isCommand: true, isTyping: true },
      { text: `\n<span class="neofetch-title">piero@hm</span>\n<span class="neofetch-item">OS:</span> Fedora Linux\n<span class="neofetch-item">Shell:</span> bash\n<span class="neofetch-item">Location:</span> Perú\n<span class="neofetch-item">Languages:</span> C++ · Python · Bash · SQL · Git · HTML · CSS\n<span class="neofetch-item">Focus:</span> Ciberseguridad · Criptografía\n<span class="neofetch-item">Editors:</span> VSCode · Neovim(LazyVim)\n`, isCommand: false }
    ];

    let lineIndex = 0;
    terminalElement.innerHTML = '';

    function runTerminal() {
      if (lineIndex < lines.length) {
        const line = lines[lineIndex];
        if (line.isTyping) {
          typeWriter(terminalElement, line.text, 0, () => {
            lineIndex++;
            runTerminal();
          });
        } else {
          terminalElement.innerHTML += line.text;
          lineIndex++;
          setTimeout(runTerminal, 300);
        }
      }
    }
    runTerminal();
  }

  // Animación de barras de progreso al hacer scroll
  const skillCards = document.querySelectorAll('.skill-card');
  if (skillCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll('.progress-bar');
          progressBars.forEach(bar => {
            bar.classList.add('animate');
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    skillCards.forEach(card => {
      observer.observe(card);
    });
  }

  // Botón para volver arriba
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.onscroll = function () {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    };

    scrollTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
