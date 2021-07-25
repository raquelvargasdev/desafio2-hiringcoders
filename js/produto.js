const openModal = () => document.getElementById('modal')
    .classList.add('active');

const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active');
}

const getLocalStorage = () => JSON.parse(localStorage.getItem("db_product")) ?? [];
const setLocalStorage = (dbProduct) => localStorage.setItem("db_product", JSON.stringify(dbProduct));


const readProduct = () => getLocalStorage();


const updateProduct = (index, product) => {
    const dbProduct = readProduct();
    dbProduct[index] = product;
    setLocalStorage(dbProduct);
}

const createProduct = (product) => {
    const dbProduct = getLocalStorage();
    dbProduct.push(product);
    setLocalStorage(dbProduct);    
};

const isValidFields = () => {
    return document.getElementById('form').reportValidity();
}


// Interação com o layout
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = "");
}

const saveProduct = () => {
    if (isValidFields()) {
        const product = {
            codigo: document.getElementById('codigo').value,
            produto: document.getElementById('produto').value,
            estoque: document.getElementById('estoque').value,
        }
        const index = document.getElementById('codigo').dataset.index;
        if(index == 'new') {
            createProduct(product);
            updateTable();
            closeModal();
        } else {
            updateProduct(index, product);
            updateTable();
            closeModal();
        }
        
    }
}

const createRow = (product, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${product.codigo}</td>
        <td>${product.produto}</td>
        <td>${product.estoque}</td>
    `
    document.querySelector('#tableProduct>tbody').appendChild(newRow);
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableProduct>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

const updateTable = () => {
    const dbProduct = readProduct();
    clearTable();
    dbProduct.forEach(createRow);
}

const fillFields = (product) => {
    document.getElementById('codigo').value = product.codigo;
    document.getElementById('produto').value = product.produto;
    document.getElementById('estoque').value = product.estoque;
    document.getElementById('codigo').dataset.index = product.index;
}

const editProduct = (index) => {
    const product = readProduct()[index];
    product.index = index;
    fillFields(product);
    openModal();
}


updateTable();


// Eventos
document.getElementById('cadastrarProduto')
    .addEventListener('click', openModal);

document.getElementById('modalClose')
    .addEventListener('click', closeModal);

document.getElementById('salvar')
    .addEventListener('click', saveProduct);