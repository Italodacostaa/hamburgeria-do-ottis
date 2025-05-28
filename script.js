document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.hamburger-menu')
    const nav = document.querySelector('nav')

    menuIcon.addEventListener('click', () => {
        nav.classList.toggle('active')
    })
})

document.addEventListener('DOMContentLoaded', function() {
    const carrosselContainer = document.querySelector('.feedback-carrossel');
    const feedbackItems = document.querySelectorAll('.feedback-item');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    const intervalo = 5000; // Intervalo de 5 segundos entre os slides
    let indexAtual = 0;

    function mostrarSlide(index) {
        feedbackItems.forEach(item => item.classList.remove('ativo'));
        feedbackItems[index].classList.add('ativo');
    }

    function proximoSlide() {
        indexAtual = (indexAtual + 1) % feedbackItems.length;
        mostrarSlide(indexAtual);
    }

    function slideAnterior() {
        indexAtual = (indexAtual - 1 + feedbackItems.length) % feedbackItems.length;
        mostrarSlide(indexAtual);
    }

    // Inicializar o primeiro slide
    mostrarSlide(indexAtual);

    // Avançar automaticamente
    let autoplayInterval = setInterval(proximoSlide, intervalo);

    // Event listeners para os botões
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            slideAnterior();
            clearInterval(autoplayInterval); // Parar o autoplay ao interagir
            autoplayInterval = setInterval(proximoSlide, intervalo); // Reiniciar o autoplay
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function() {
            proximoSlide();
            clearInterval(autoplayInterval); // Parar o autoplay ao interagir
            autoplayInterval = setInterval(proximoSlide, intervalo); // Reiniciar o autoplay
        });
    }

    // Parar o autoplay ao passar o mouse sobre o carrossel e reiniciar ao sair
    if (carrosselContainer) {
        carrosselContainer.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        carrosselContainer.addEventListener('mouseleave', () => autoplayInterval = setInterval(proximoSlide, intervalo));
    }
});