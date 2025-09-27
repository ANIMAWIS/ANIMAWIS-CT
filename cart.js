// cart.js
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const finalizarCompraButton = document.getElementById('finalizar-compra');

    // Função para atualizar a exibição do carrinho
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ''; // Limpar exibição do carrinho

        cart.forEach((produto, index) => {
            const produtoItem = document.createElement('div');
            produtoItem.classList.add('produto-item');

            produtoItem.innerHTML = `
                <img src="${produto.img}" alt="${produto.nome}" class="produto-img">
                <h1>${produto.nome}</h1>
                <h2>${produto.preco}</h2>
                <input type="number" value="${produto.quantidade}" min="1" class="produto-quantidade">
                <button class="remove-from-cart" data-index="${index}">Remover</button>
            `;

            cartItemsContainer.appendChild(produtoItem);

            // Atualizar quantidade do produto no carrinho
            const quantidadeInput = produtoItem.querySelector('.produto-quantidade');
            quantidadeInput.addEventListener('change', (event) => {
                const novaQuantidade = event.target.value;
                produto.quantidade = novaQuantidade;
                localStorage.setItem('cart', JSON.stringify(cart));
            });

            // Remover produto do carrinho
            const removeButton = produtoItem.querySelector('.remove-from-cart');
            removeButton.addEventListener('click', () => {
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay(); // Atualizar exibição do carrinho
            });
        });
    }

//colocar subtotal


    // Função para finalizar a compra
    function finalizarCompra() {
        let mensagem = 'Olá, gostaria de finalizar o meu prdido referente a:\n\n';
        cart.forEach(produto => {
            mensagem += `${produto.nome} - ${produto.quantidade}x\n`;
        });

        const numeroWhatsApp = '+5575992777643';
        const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
        window.open(linkWhatsApp, '_blank');
    }

    finalizarCompraButton.addEventListener('click', finalizarCompra);

    // Atualizar exibição do carrinho na inicialização'
    updateCartDisplay();
});

