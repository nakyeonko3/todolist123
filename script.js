const form = document.querySelector('form'),
  htmlInputElement = form.querySelector('.text-input'),
  submitInput = form.querySelector('.submit-input'),
  todolistDiv = document.querySelector('.todolist-div'),
  htmlOlElement = todolistDiv.querySelector('ol'),
  removeAllButton = document.querySelector('.removeAll-button');

let todolistArray = [];

function handleSubmit(event) {
  event.preventDefault();
  const { value: userHtmlTextInput } = htmlInputElement;
  const liHthmlElement = createLiHthmlElement(userHtmlTextInput);
  htmlOlElement.appendChild(liHthmlElement);
  storeStringTodolistArray(userHtmlTextInput);
  getTodolistArrayFromLocalStorage();
  htmlInputElement.value = '';
}
function getTodolistArrayFromLocalStorage() {
  const localStorageTodoListArray = JSON.parse(
    localStorage.getItem('todolistArray')
  );
  console.log(localStorageTodoListArray);
}

function deleteAll() {
  todolistArray.splice(0, todolistArray.length);
  localStorage.setItem('todolistArray', null);
  document.querySelector('li').remove();
}

function storeTodolistArrayInLocalStorage(arr) {
  localStorage.setItem('todolistArray', JSON.stringify(arr));
}

function storeStringTodolistArray(str) {
  todolistArray = [...todolistArray, str];
  storeTodolistArrayInLocalStorage(todolistArray);
}

function createLiHthmlElement(str) {
  const li = document.createElement('li');
  li.innerText = str;
  return li;
}

function init() {
  form.addEventListener('submit', handleSubmit);
  removeAllButton.addEventListener('click', deleteAll);
  console.log(todolistArray.length === 0);
  if (todolistArray.length !== 0) {
    const fragment = document.createDocumentFragment();
    todolistArray = JSON.parse(localStorage.getItem('todolistArray'));
    todolistArray.forEach((item) => {
      fragment.appendChild(createLiHthmlElement(item));
    });
    htmlOlElement.appendChild(fragment);
  }
}

init();
