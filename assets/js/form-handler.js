// assets/js/form-handler.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('portfolio-form');
    const previewContainer = document.getElementById('preview');
    const generateBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede a página de recarregar

        // 1. Capturar dados
        const name = document.getElementById('name').value;
        const bio = document.getElementById('bio').value;
        const email = document.getElementById('email').value;
        const location = document.getElementById('location').value;
        const skillsRaw = document.getElementById('skills').value;
        
        // Captura de Projetos (Array simples)
        const projectTitles = document.querySelectorAll('input[name="project-title[]"]');
        const projectLinks = document.querySelectorAll('input[name="project-link[]"]');
        const projectDescs = document.querySelectorAll('textarea[name="project-desc[]"]');

        // Validação básica
        if(!name) {
            alert('Por favor, digite seu nome!');
            return;
        }

        // 2. Montar HTML das Skills (transforma "HTML, CSS" em tags)
        let skillsHTML = '';
        if(skillsRaw) {
            const skillsArray = skillsRaw.split(',');
            skillsHTML = `<div class="preview-skills">
                ${skillsArray.map(skill => `<span class="tag">${skill.trim()}</span>`).join('')}
            </div>`;
        }

        // 3. Montar HTML dos Projetos
        let projectsHTML = '';
        if(projectTitles.length > 0 && projectTitles[0].value) {
            projectsHTML = `<div class="preview-projects">`;
            projectTitles.forEach((titleInput, index) => {
                const title = titleInput.value;
                const link = projectLinks[index].value;
                const desc = projectDescs[index].value;

                if(title) {
                    projectsHTML += `
                        <div class="project-item">
                            <h4>${title} ${link ? `<a href="${link}" target="_blank" class="external-link">↗</a>` : ''}</h4>
                            <p>${desc}</p>
                        </div>
                    `;
                }
            });
            projectsHTML += `</div>`;
        }

        // 4. Montar o Preview Final
        const previewHTML = `
            <div class="preview-content">
                <div class="preview-header">
                    <h2 class="preview-name">${name}</h2>
                    ${location ? `<p class="preview-location"><i class="fas fa-map-marker-alt"></i> ${location}</p>` : ''}
                </div>

                <hr class="divider">

                ${bio ? `<section class="preview-bio"><p>${bio}</p></section>` : ''}

                ${skillsHTML ? `
                    <section class="preview-skills-section">
                        <h3>Habilidades</h3>
                        ${skillsHTML}
                    </section>
                ` : ''}

                ${projectsHTML ? `
                    <section class="preview-projects-section">
                        <h3>Projetos Recentes</h3>
                        ${projectsHTML}
                    </section>
                ` : ''}
            </div>
        `;

        // 5. Inserir no DOM com animação
        previewContainer.style.opacity = '0';
        previewContainer.innerHTML = previewHTML;
        
        // Pequeno delay para a animação funcionar
        setTimeout(() => {
            previewContainer.style.transition = 'opacity 0.5s ease';
            previewContainer.style.opacity = '1';
        }, 100);
    });
});