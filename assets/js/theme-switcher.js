/**
 * Theme Switcher - Troca de temas em tempo real
 * Com transições suaves e persistência no localStorage
 */

class ThemeSwitcher {
  constructor() {
    this.themeRadios = document.querySelectorAll('input[name="theme"]');
    this.body = document.body;
    this.preview = document.getElementById('preview');
    
    this.init();
  }
  
  init() {
    // Carrega tema salvo ou usa default
    const savedTheme = localStorage.getItem('portfolio-theme') || 'minimal';
    this.applyTheme(savedTheme);
    
    // Adiciona listeners nos radios
    this.themeRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.applyTheme(e.target.value);
        localStorage.setItem('portfolio-theme', e.target.value);
        this.updatePreview();
      });
    });
    
    // Atualiza preview inicial
    this.updatePreview();
  }
  
  applyTheme(themeName) {
    // Remove temas anteriores
    this.body.removeAttribute('data-theme');
    
    // Aplica novo tema com pequena delay para transição suave
    requestAnimationFrame(() => {
      this.body.setAttribute('data-theme', themeName);
    });
    
    // Atualiza estado visual dos radios
    this.themeRadios.forEach(radio => {
      radio.checked = radio.value === themeName;
    });
  }
  
  getCurrentTheme() {
    return this.body.getAttribute('data-theme') || 'minimal';
  }
  
  updatePreview() {
    if (!this.preview) return;
    
    const theme = this.getCurrentTheme();
    const formData = this.getFormData();
    
    // Se tiver dados, gera preview com o tema atual
    if (formData.name || formData.bio) {
      this.generatePreview(formData, theme);
    }
  }
  
  getFormData() {
    // Função auxiliar para capturar dados do form
    const form = document.getElementById('portfolio-form');
    if (!form) return {};
    
    return {
      name: form.querySelector('#name')?.value || '',
      bio: form.querySelector('#bio')?.value || '',
      email: form.querySelector('#email')?.value || '',
      location: form.querySelector('#location')?.value || '',
      skills: form.querySelector('#skills')?.value || '',
      theme: this.getCurrentTheme()
    };
  }
  
  generatePreview(data, theme) {
    if (!this.preview) return;
    
    // Preview básico minimalista
    const previewHTML = `
      <div class="preview-portfolio" data-theme="${theme}">
        <header class="preview-header">
          <h2>${data.name || 'Seu Nome'}</h2>
          ${data.location ? `<p class="preview-location">📍 ${data.location}</p>` : ''}
        </header>
        
        ${data.bio ? `
          <section class="preview-section">
            <h3>Sobre</h3>
            <p>${data.bio}</p>
          </section>
        ` : ''}
        
        ${data.skills ? `
          <section class="preview-section">
            <h3>Habilidades</h3>
            <div class="preview-skills">
              ${data.skills.split(',').map(skill => 
                `<span class="skill-tag">${skill.trim()}</span>`
              ).join('')}
            </div>
          </section>
        ` : ''}
        
        ${data.email ? `
          <footer class="preview-footer">
            <a href="mailto:${data.email}">📧 ${data.email}</a>
          </footer>
        ` : ''}
      </div>
    `;
    
    this.preview.innerHTML = previewHTML;
    this.applyPreviewStyles(theme);
  }
  
  applyPreviewStyles(theme) {
    // Aplica estilos específicos ao preview
    const previewEl = this.preview.querySelector('.preview-portfolio');
    if (!previewEl) return;
    
    // Copia as variáveis do tema para o preview
    previewEl.style.setProperty('--color-bg-primary', 
      getComputedStyle(document.body).getPropertyValue('--color-bg-primary'));
    previewEl.style.setProperty('--color-text-primary',
      getComputedStyle(document.body).getPropertyValue('--color-text-primary'));
    previewEl.style.setProperty('--color-primary',
      getComputedStyle(document.body).getPropertyValue('--color-primary'));
  }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.themeSwitcher = new ThemeSwitcher();
});