class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
       
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        const cardapio = {
            cafe: { descricao: "Café", valor: 3.00 },
            chantily: { descricao: "Chantily (extra do Café)", valor: 1.50 , principal: "cafe"},
            suco: { descricao: "Suco Natural", valor: 6.20 },
            sanduiche: { descricao: "Sanduíche", valor: 6.50 },
            queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00 , principal: "sanduiche"},
            salgado: { descricao: "Salgado", valor: 7.25 },
            combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
            combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 },
        };

        const formasDePagamento = {
            dinheiro: { desconto: 0.05 },
            debito: {},
            credito: { acrescimo: 0.03 },
        };
        
        let total = 0;
        let principaisNoCarrinho = new Set();
        let principaisRequiridos = new Set();
        
        for (const item of itens) {
            const [codigo, quantidade] = item.split(",");
            const produto = cardapio[codigo];
        
            if (!produto) {
                return "Item inválido!";
            }
            
            if(produto.principal) {
                principaisRequiridos.add(produto.principal)
            } else {
                principaisNoCarrinho.add(codigo)
            }

            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }

            total += produto.valor * quantidade;
        }
        
        if (principaisRequiridos.size > 0) {
            for(const principal of principaisRequiridos) {
                if(!principaisNoCarrinho.has(principal)) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }
        }

        if (!formasDePagamento[metodoDePagamento]) {
            return "Forma de pagamento inválida!";
        }

        const metodoPagamento = formasDePagamento[metodoDePagamento];

        if (metodoPagamento.desconto) {
            total *= 1 - metodoPagamento.desconto;
        } else if (metodoPagamento.acrescimo) {
            total *= 1 + metodoPagamento.acrescimo;
        }

        return `R$ ${total.toFixed(2).replace(".", ",")}`;
    }
}

export { CaixaDaLanchonete };