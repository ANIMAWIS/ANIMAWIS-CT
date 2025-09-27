// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Carregar carrinho do localStorage
    const cartCountElement = document.getElementById('cart-count');
    const cartElement = document.getElementById('cart');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Alternar menu mobile
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Adicionar produto ao carrinho
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => { 
            const produtoItem = button.parentElement;
            const produtoNome = produtoItem.querySelector('h1').innerText;
            const produtoPreco = produtoItem.querySelector('h2').innerText;
            const produtoQuantidade = produtoItem.querySelector('.produto-quantidade').value;
            const produtoImg = produtoItem.querySelector('.produto-img').src;

            const produto = {
                nome: produtoNome,
                preco: produtoPreco,
                quantidade: produtoQuantidade,
                img: produtoImg
            };

            cart.push(produto); // Adicionar produto ao carrinho
            updateCartCount(); // Atualizar contador do carrinho
            localStorage.setItem('cart', JSON.stringify(cart)); // Salvar carrinho no localStorage
        });
    });

    // Atualizar contador do carrinho
    function updateCartCount() {
        cartCountElement.innerText = cart.length;
    }

    // Navegar para a página do carrinho
    cartElement.addEventListener('click', () => {
        window.location.href = 'cart/cart.html';
    });

    // Atualizar contador do carrinho na inicialização
    updateCartCount();
});
