const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');

const grocery = document.getElementById('grocery');

const submitBtn = document.querySelector('.submit-btn');
const clearBtn = document.querySelector('.clear-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');

let editElement;
let editFlag = false;
let editId = '';

form.addEventListener('submit', addItem);

clearBtn.addEventListener('click', clearItems)

window.addEventListener('DOMContentLoaded', setupItems);

function addItem(e) {
    e.preventDefault()
    const value = grocery.value;

    const id = new Date().getTime().toString();

    if (value && !editFlag) {
        createListItem(id, value);

        addToLocalStorage(id, value);
        setBackToDefault();

        container.classList.add('show-container');
        displayAlert('Added Item', 'success');
    } else if (value && editFlag) {
        editElement.innerHTML = value;

        editLocalStorage(editId,value);
        setBackToDefault();

        displayAlert('Edited Item', 'success');

    } else {
        displayAlert('Please Enter Value', 'danger');
    }
}

function displayAlert(text,action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`)

    setTimeout(function(){
        alert.textContent = '';
    alert.classList.remove(`alert-${action}`)
    }, 2000);
}

// edit function
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;

    grocery.value = editElement.innerHTML;

    editFlag = true;
    editId = element.dataset.id;

    submitBtn.textContent = 'Edit';
}

// delete function
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;

    list.removeChild(element);
    if (list.children.length == 0) {
        container.classList.remove('show-container');
    }

    displayAlert('Item Removed', 'success');
    setBackToDefault();
    removeFromLocalStorage(id);
}

function clearItems() {
    const items = document.querySelectorAll('.grocery-item');
    if (items.length > 0) {
        items.forEach(function(item) {
            list.removeChild(item);
        });
    }
    container.classList.remove('show-container');
    displayAlert('Cleared List', 'success');
    setBackToDefault();
    localStorage.removeItem('list');
}

function setBackToDefault() {
    grocery.value = '';

    editFlag = false;
    editId = '';
    submitBtn.textContent = 'submit';
}

function addToLocalStorage(id, value) {
    const grocery = {id, value};
    let items = getLocalStorage();
    items.push(grocery);

    localStorage.setItem('list',JSON.stringify(items));
} 

function removeFromLocalStorage(id) {
    let items = getLocalStorage();
    items = items.filter(function (item) {
        if (item.id != id) {
            return item;
        }
    })

    localStorage.setItem('list',JSON.stringify(items));
}

function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items = items.map(function (item) {
        if (item.id === id) {
            item.value = value
        }
        return item;
    })

    localStorage.setItem('list',JSON.stringify(items));
}

function getLocalStorage() {
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
}

// localStorage.setItem('list',JSON.stringify(['item1','item2']));
// console.log(JSON.parse(localStorage.getItem('list')));

function setupItems() {
    let items = getLocalStorage();

    if (items.length > 0) {
        items.forEach(function(item) {
            createListItem(item.id, item.value);
        });
    }

    container.classList.add('show-container');
}

function createListItem(id, value) {
    const element = document.createElement('article');
    element.classList.add('grocery-item');

    const attr = document.createAttribute('data-id');
    attr.value = id;

    element.setAttributeNode(attr);
    element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-contaienr">
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`;

    const editBtn = element.querySelector('.edit-btn');
    editBtn.addEventListener('click', editItem);

    const deleteBtn = element.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', deleteItem);
    
    list.appendChild(element);
}