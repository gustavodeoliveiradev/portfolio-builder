// Gerenciador de Projetos Dinâmicos
class ProjectsManager {
  constructor() {
    this.container = document.getElementById('projects-container');
    this.addButton = document.getElementById('add-project');
    this.projectCount = 1;
    
    this.init();
  }
  
  init() {
    this.addButton.addEventListener('click', () => this.addProject());
    this.container.addEventListener('click', (e) => this.handleRemove(e));
  }
  
  addProject() {
    this.projectCount++;
    const projectHTML = `
      <div class="project-card">
        <div class="project-header">
          <span class="project-number">Projeto ${this.projectCount}</span>
          <button type="button" class="btn-remove-project" title="Remover projeto">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <input 
          type="text" 
          name="project-title[]" 
          placeholder="Título do projeto"
          class="project-input"
        />
        <input 
          type="url" 
          name="project-link[]" 
          placeholder="https://seuprojeto.com"
          class="project-input"
        />
        <textarea 
          name="project-desc[]" 
          placeholder="Breve descrição do projeto..."
          rows="2"
          class="project-input"
        ></textarea>
      </div>
    `;
    
    this.container.insertAdjacentHTML('beforeend', projectHTML);
    
    // Animação de entrada
    const newProject = this.container.lastElementChild;
    newProject.style.animation = 'fadeInUp 0.3s ease';
  }
  
  handleRemove(e) {
    if (e.target.closest('.btn-remove-project')) {
      const projectCard = e.target.closest('.project-card');
      projectCard.style.animation = 'fadeInDown 0.3s ease reverse';
      
      setTimeout(() => {
        projectCard.remove();
        this.updateProjectNumbers();
      }, 300);
    }
  }
  
  updateProjectNumbers() {
    const projects = this.container.querySelectorAll('.project-card');
    projects.forEach((project, index) => {
      const numberSpan = project.querySelector('.project-number');
      if (numberSpan) {
        numberSpan.textContent = `Projeto ${index + 1}`;
      }
    });
    this.projectCount = projects.length;
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new ProjectsManager();
});