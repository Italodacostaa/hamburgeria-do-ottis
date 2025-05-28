document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.hamburger-menu')
    const nav = document.querySelector('nav')

    menuIcon.addEventListener('click', () => {
        nav.classList.toggle('active')
    })
})

document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Código do Carrossel de Depoimentos ---
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
    if (feedbackItems.length > 0) {
        mostrarSlide(indexAtual);
    }

    // Avançar automaticamente
    let autoplayInterval = setInterval(proximoSlide, intervalo);

    // Event listeners para os botões do carrossel
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

    // --- 2. Funções Genéricas para Modais (Reutilizadas por todos os modais) ---
    const confirmModal = document.getElementById('confirmModal');
    const messageModal = document.getElementById('messageModal');
    const productDescriptionModal = document.getElementById('productDescriptionModal'); // Novo modal de produto

    const closeButtons = document.querySelectorAll('.close-button'); // Botões de fechar 'x'
    let resolveConfirmation; // Variável para controlar a Promise do modal de confirmação

    // Função para mostrar um modal
    function showModal(modalElement) {
        modalElement.classList.add('show');
    }

    // Função para esconder um modal
    function hideModal(modalElement) {
        modalElement.classList.remove('show');
    }

    // Event listener para todos os botões de fechar 'x'
    closeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const parentModal = event.target.closest('.modal');
            if (parentModal) {
                hideModal(parentModal);
                // Se for o modal de confirmação e ele for fechado, trate como "cancelar"
                if (parentModal.id === 'confirmModal' && resolveConfirmation) {
                    resolveConfirmation(false);
                }
            }
        });
    });

    // Fechar modal clicando fora
    window.addEventListener('click', function(event) {
        if (event.target == confirmModal) {
            hideModal(confirmModal);
            if (resolveConfirmation) resolveConfirmation(false);
        }
        if (event.target == messageModal) {
            hideModal(messageModal);
        }
        if (event.target == productDescriptionModal) { // Adicionado o novo modal aqui
            hideModal(productDescriptionModal);
        }
    });


    // --- 3. Código para o Formulário de Reservas (Modais de Confirmação) ---
    const formReservas = document.getElementById('formReservas');
    const confirmYesBtn = document.getElementById('confirmYes');
    const confirmNoBtn = document.getElementById('confirmNo');
    const messageOkBtn = document.getElementById('messageOk');

    // Elementos para exibir mensagens no messageModal
    const messageTitle = document.getElementById('messageTitle');
    const messageText = document.getElementById('messageText');

    // Função para mostrar o modal de confirmação (retorna uma Promise)
    function showConfirmModal() {
        return new Promise((resolve) => {
            resolveConfirmation = resolve; // Salva a função resolve para ser chamada depois
            showModal(confirmModal);
        });
    }

    // Função para mostrar o modal de mensagem (sucesso ou erro)
    function showMessage(title, text, isSuccess = true) {
        messageTitle.textContent = title;
        messageText.textContent = text;
        // Opcional: Adicionar classe para estilização de sucesso/erro (se você tiver)
        // messageModal.classList.toggle('success', isSuccess);
        // messageModal.classList.toggle('error', !isSuccess);
        showModal(messageModal);
    }

    // Event listeners para os botões do modal de confirmação
    if (confirmYesBtn) {
        confirmYesBtn.addEventListener('click', () => {
            hideModal(confirmModal);
            if (resolveConfirmation) resolveConfirmation(true); // Resolve a Promise com true
        });
    }

    if (confirmNoBtn) {
        confirmNoBtn.addEventListener('click', () => {
            hideModal(confirmModal);
            if (resolveConfirmation) resolveConfirmation(false); // Resolve a Promise com false
        });
    }

    // Event listener para o botão OK do modal de mensagem
    if (messageOkBtn) {
        messageOkBtn.addEventListener('click', () => {
            hideModal(messageModal);
        });
    }

    // Lógica do formulário de Reservas (AGORA USANDO OS MODAIS)
    if (formReservas) { // Verifica se o formulário existe na página
        formReservas.addEventListener('submit', async function(event) { // Adicionado 'async' aqui!
            event.preventDefault(); // Impede o envio padrão do formulário

            // Opcional: Validação dos campos
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const data = document.getElementById('data').value;
            const hora = document.getElementById('hora').value;
            const pessoas = document.getElementById('pessoas').value;

            if (!nome || !email || !data || !hora || !pessoas) {
                showMessage('Ops!', 'Por favor, preencha todos os campos obrigatórios do formulário.', false); // Mensagem de erro
                return; // Impede a continuação se a validação falhar
            }

            // Exibe o modal de confirmação e espera a resposta
            const confirmacao = await showConfirmModal(); // Espera a Promise ser resolvida

            if (confirmacao) {
                // Se o usuário confirmar a reserva
                showMessage('Reserva Confirmada!', 'Sua mesa foi reservada com sucesso! Entraremos em contato em breve para detalhes.', true);
                formReservas.reset(); // Reseta o formulário
                // Aqui você enviaria os dados para um backend (usando fetch, por exemplo)
                // Ex: console.log('Dados a enviar:', { nome, email, data, hora, pessoas });
            } else {
                // Se o usuário cancelar a reserva
                showMessage('Reserva Cancelada', 'Sua reserva não foi efetuada. Tente novamente se mudar de ideia!', false);
            }
        });
    }


    // --- 4. Código para o Modal de Descrição do Produto ---
    const productItems = document.querySelectorAll('.product-item');
    const modalProductImage = document.getElementById('modalProductImage');
    const modalProductName = document.getElementById('modalProductName');
    const modalProductCategory = document.getElementById('modalProductCategory');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalProductDescription = document.getElementById('modalProductDescription');
    const addToCartBtn = productDescriptionModal.querySelector('.add-to-cart-btn'); // Opcional

    // Adiciona o event listener para cada item de produto
    if (productItems.length > 0) {
        productItems.forEach(item => {
            item.addEventListener('click', function() {
                // Pega os dados dos atributos data- do item clicado
                const name = item.dataset.name;
                const category = item.dataset.category;
                const price = item.dataset.price;
                const description = item.dataset.description;
                const imageSrc = item.querySelector('.photo img').src; // Pega o src da imagem

                // Preenche o modal com as informações
                modalProductImage.src = imageSrc;
                modalProductName.textContent = name;
                modalProductCategory.textContent = category;
                modalProductPrice.textContent = `R$ ${price}`; // Formata o preço
                modalProductDescription.textContent = description;

                // Opcional: Se você tiver um botão "Adicionar ao Carrinho"
                if (addToCartBtn) {
                    addToCartBtn.onclick = () => {
                        alert("${name}" ` adicionado ao carrinho! (Funcionalidade ainda não implementada)`);
                        hideModal(productDescriptionModal);
                    };
                }

                // Exibe o modal de descrição do produto
                showModal(productDescriptionModal);
            });
        });
    }
});