Modal = {
    open() {
        //Abrir modal
        // Adicionar a classe active ao modal
        document
        .querySelector('.modal-overlay')
        .classList
        .add('active')
    },
    close() {
        //Fechar o Modal
        // Remover a classe active do Modal.

        document
        .querySelector('.modal-overlay')
        .classList
        .remove('active')
    }
}

const transactions = [ // Objetos
    {

    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021'

    },
    {

    id: 2,
    description: 'Website',
    amount: 500000,
    date: '23/01/2021'

    },
    {

    id: 3,
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021'

    },

] 

const Transaction = {
    all: transactions,
    add(transaction){
        Transaction.all.push(transaction)
    },
    incomes() {
        let income = 0
        Transaction.all.forEach(transaction => {
            if(transaction.amount > 0){
                income +=transaction.amount
            }
        })
        return income; 
    },
    expenses() {
        let expense = 0

        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0){
                expense +=transaction.amount
            }
        })
        return expense;
    },
    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionContainer.appendChild(tr)

    },

    innerHTMLTransaction(transaction) {
        const CSSclasses = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclasses}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/assets/minus.svg" alt="Remover transa????o">
            </td>
        `
        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}




for(let i = 0; i < 3; i++) {
}

transactions.forEach(function(transaction){
    DOM.addTransaction(transaction)
})

DOM.updateBalance()