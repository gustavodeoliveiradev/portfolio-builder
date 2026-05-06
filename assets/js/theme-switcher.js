// Troca de tema em tempo real
document.querySelectorAll('input[name="theme"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    document.body.setAttribute('data-theme', e.target.value);
    updatePreview(); // Atualiza o preview quando muda o tema
  });
});

// Inicializa com o tema padrão
document.body.setAttribute('data-theme', 'minimal');