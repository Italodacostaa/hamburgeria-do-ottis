document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.hamburger-menu')
    const nav = document.querySelector('nav')

    menuIcon.addEventListener('click', () => {
        nav.classList.toggle('active')
    })
})

const feedbackItems = document.querySelectorAll('.feedback-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function showFeedback(index) {
        feedbackItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('ativo');
            } else {
                item.classList.remove('ativo');
            }
        });
    }

    function nextFeedback() {
        currentIndex++;
        if (currentIndex >= feedbackItems.length) {
            currentIndex = 0; // Volta para o primeiro se chegar ao final
        }
        showFeedback(currentIndex);
    }

    function prevFeedback() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = feedbackItems.length - 1; // Vai para o último se chegar ao início
        }
        showFeedback(currentIndex);
    }

    // Exibir o primeiro feedback ao carregar a página
    showFeedback(currentIndex);

    // Adicionar listeners para os botões de navegação
    if (prevBtn) {
        prevBtn.addEventListener('click', prevFeedback);
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', nextFeedback);
    }

    // Opcional: Carrossel automático
    // setInterval(nextFeedback, 5000); // Mudar a cada 5 segundos
