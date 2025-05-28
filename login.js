    document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do DOM
    const loginBtnHeader = document.querySelector('header .btn'); // Botão "Login" no cabeçalho
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeLoginModalBtn = document.getElementById('closeLoginModal');
    const closeRegisterModalBtn = document.getElementById('closeRegisterModal');
    const showRegisterModalLink = document.getElementById('showRegisterModal');
    const showLoginModalLink = document.getElementById('showLoginModal');

    const loginForm = document.getElementById('loginForm');
    const loginUsernameInput = document.getElementById('loginUsername');
    const loginPasswordInput = document.getElementById('loginPassword');

    const registerForm = document.getElementById('registerForm');
    const registerUsernameInput = document.getElementById('registerUsername');
    const registerEmailInput = document.getElementById('registerEmail');
    const registerPasswordInput = document.getElementById('registerPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    // Referências aos modais de mensagem (já existentes no script.js, mas precisamos de acesso aqui)
    const messageModal = document.getElementById('messageModal');
    const messageTitle = document.getElementById('messageTitle');
    const messageText = document.getElementById('messageText');
    const messageOkBtn = document.getElementById('messageOk');

    // Funções auxiliares para mostrar/esconder modais
    function showModal(modalElement) {
        modalElement.classList.add('show');
    }

    function hideModal(modalElement) {
        modalElement.classList.remove('show');
    }

    function showMessage(title, text) {
        messageTitle.textContent = title;
        messageText.textContent = text;
        showModal(messageModal);
    }

    // --- Event Listeners para Abrir/Fechar Modais ---

    // Abre o modal de login ao clicar no botão "Login" do cabeçalho
    loginBtnHeader.addEventListener('click', (e) => {
        e.preventDefault(); // Impede o comportamento padrão do link
        hideModal(registerModal); // Garante que o modal de cadastro esteja fechado
        showModal(loginModal);
    });

    // Fecha o modal de login
    closeLoginModalBtn.addEventListener('click', () => {
        hideModal(loginModal);
    });

    // Fecha o modal de cadastro
    closeRegisterModalBtn.addEventListener('click', () => {
        hideModal(registerModal);
    });

    // Alterna para o modal de cadastro a partir do login
    showRegisterModalLink.addEventListener('click', (e) => {
        e.preventDefault();
        hideModal(loginModal);
        showModal(registerModal);
    });

    // Alterna para o modal de login a partir do cadastro
    showLoginModalLink.addEventListener('click', (e) => {
        e.preventDefault();
        hideModal(registerModal);
        showModal(loginModal);
    });

    // Fechar modais clicando fora
    window.addEventListener('click', (event) => {
        if (event.target == loginModal) {
            hideModal(loginModal);
        }
        if (event.target == registerModal) {
            hideModal(registerModal);
        }
    });

    // Fechar modal de mensagem
    if (messageOkBtn) {
        messageOkBtn.addEventListener('click', () => {
            hideModal(messageModal);
        });
    }

    // --- Lógica de Login ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = loginUsernameInput.value.trim();
        const password = loginPasswordInput.value.trim();

        // Para fins de demonstração, armazenamos usuários no localStorage
        const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            showMessage('Login Bem-Sucedido!', `Bem-vindo(a), ${username}!`);
            hideModal(loginModal);
            loginForm.reset(); // Limpa o formulário
            // Aqui você faria o redirecionamento ou carregaria o conteúdo do usuário
            // Ex: window.location.href = '/dashboard';
        } else {
            showMessage('Erro no Login', 'Usuário ou senha inválidos. Tente novamente ou cadastre-se.', false);
        }
    });

    // --- Lógica de Cadastro ---
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = registerUsernameInput.value.trim();
        const email = registerEmailInput.value.trim();
        const password = registerPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (password !== confirmPassword) {
            showMessage('Erro no Cadastro', 'As senhas não coincidem. Por favor, verifique.');
            return;
        }

        // Para fins de demonstração, armazenamos usuários no localStorage
        let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

        // Verifica se o usuário já existe
        if (users.some(u => u.username === username)) {
            showMessage('Erro no Cadastro', 'Nome de usuário já existe. Escolha outro.');
            return;
        }
        if (users.some(u => u.email === email)) {
            showMessage('Erro no Cadastro', 'Este e-mail já está cadastrado. Tente fazer login.');
            return;
        }

        // Adiciona o novo usuário
        users.push({ username, email, password });
        localStorage.setItem('registeredUsers', JSON.stringify(users));

        showMessage('Cadastro Realizado!', 'Sua conta foi criada com sucesso! Agora você pode fazer login.');
        hideModal(registerModal);
        registerForm.reset(); // Limpa o formulário
        showModal(loginModal); // Abre o modal de login para o usuário entrar
    });
});