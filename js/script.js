// Menu Mobile Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navList.classList.remove('active');
        });
    });
    
    // Carrossel de depoimentos
    initCarousel();
    
    // Animação de scroll para seções
    initScrollAnimation();
    
    // Validação do formulário de contato
    initFormValidation();
});

// Função para inicializar o carrossel
function initCarousel() {
    const carousel = document.querySelector('.carrossel');
    if (!carousel) return;
    
    const container = carousel.querySelector('.carrossel-container');
    const items = carousel.querySelectorAll('.carrossel-item');
    const prevBtn = carousel.querySelector('.carrossel-btn.prev');
    const nextBtn = carousel.querySelector('.carrossel-btn.next');
    
    let currentIndex = 0;
    const totalItems = items.length;
    
    // Função para atualizar a posição do carrossel
    function updateCarousel() {
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    // Event listeners para os botões
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });
    
    // Auto-avanço do carrossel a cada 5 segundos
    setInterval(function() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }, 5000);
}

// Função para animação de scroll
function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.destaque-card, .valor-card, .plano-card, .servico-card, .artigo');
    
    function checkScroll() {
        const windowHeight = window.innerHeight;
        
        animatedElements.forEach(element => {
            const position = element.getBoundingClientRect().top;
            
            if (position < windowHeight - 100) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configura estado inicial para animação
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Verifica a posição no carregamento e no scroll
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    
    // Verifica imediatamente para elementos já visíveis
    checkScroll();
}

// Função para validação do formulário de contato
function initFormValidation() {
    const form = document.getElementById('form-contato');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea, select');
        
        // Validação básica - verifica se os campos obrigatórios estão preenchidos
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                highlightError(input, 'Este campo é obrigatório');
            } else {
                removeHighlight(input);
                
                // Validação específica para email
                if (input.type === 'email' && input.value.trim()) {
                    if (!isValidEmail(input.value)) {
                        isValid = false;
                        highlightError(input, 'Por favor, insira um email válido');
                    }
                }
            }
        });
        
        if (isValid) {
            // Simulação de envio bem-sucedido
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            form.reset();
            
            // Em um cenário real, aqui você faria a submissão do formulário
            // form.submit();
        }
    });
    
    // Função para validar formato de email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Função para destacar campo com erro
    function highlightError(input, message) {
        input.style.borderColor = '#dc3545';
        
        // Remove mensagens de erro existentes
        removeError(input);
        
        // Cria elemento de mensagem de erro
        const error = document.createElement('small');
        error.style.color = '#dc3545';
        error.style.display = 'block';
        error.style.marginTop = '5px';
        error.textContent = message;
        
        input.parentNode.appendChild(error);
    }
    
    // Função para remover destaque de erro
    function removeHighlight(input) {
        input.style.borderColor = '';
        removeError(input);
    }
    
    // Função para remover mensagem de erro
    function removeError(input) {
        const error = input.parentNode.querySelector('small');
        if (error) {
            error.remove();
        }
    }
}

// Adiciona máscara para telefone se o campo existir
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('telefone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            // Formatação do telefone: (11) 99999-9999
            if (value.length > 0) {
                value = value.replace(/^(\d{0,2})(\d{0,5})(\d{0,4}).*/, '($1) $2-$3');
            }
            
            e.target.value = value;
        });
    }
});
