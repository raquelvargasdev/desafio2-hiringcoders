const openModal = () => document.getElementById('modal')
    .classList.add('active');

const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active');
}

const getLocalStorage = () => JSON.parse(localStorage.getItem("clientDB")) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem("clientDB", JSON.stringify(dbClient));

// CRUD - Create read update delete


const readClient = () => getLocalStorage();

const createClient = (client) => {
    const dbClient = getLocalStorage();
    dbClient.push(client);
    setLocalStorage(dbClient);    
};

const isValidFields = () => {
    return document.getElementById('form').reportValidity();
}

const CancelProduct = () => {
    closeModal();
}

// Interação com o layout
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = "");
}

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index;
        if(index == 'new') {
            createClient(client);
            updateTable();
            closeModal();
        } else {
            updateClient(index, client);
            updateTable();
            closeModal();
        }
        
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.cidade}</td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow);
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

const updateTable = () => {
    const dbClient = readClient();
    clearTable();
    dbClient.forEach(createRow);
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome;
    document.getElementById('email').value = client.email;
    document.getElementById('cidade').value = client.cidade;
    document.getElementById('nome').dataset.index = client.index;
}

const editClient = (index) => {
    const client = readClient()[index];
    client.index = index;
    fillFields(client);
    openModal();
} 

const editDelete = (event) => {
    if(event.target.type == 'button') {
        const [action, index] = event.target.id.split('-');

        if(action == 'edit') {
            editClient(index);
        }else {
            const client = readClient()[index];
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`);
            if(response) {
                deleteClient(index);
                updateTable();
            }
        }
    }
}


updateTable();


// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal);

document.getElementById('modalClose')
    .addEventListener('click', closeModal);

document.getElementById('salvar')
    .addEventListener('click', saveClient);
