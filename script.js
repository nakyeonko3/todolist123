const form = document.querySelector('form'),
  htmlInputElement = form.querySelector('.text-input'),
  submitInput = form.querySelector('.submit-input'),
  todolistDiv = document.querySelector('.todolist-div'),
  htmlOlElement = todolistDiv.querySelector('ol'),
  removeAllButton = document.querySelector('.removeAll-button');

let todolistArray = [];
let num = 0;

function handleSubmit(event) {
  event.preventDefault();
  const { value: userHtmlTextInput } = htmlInputElement;
  num += 1;
  const liHthmlElement = createLiHthmlElement(userHtmlTextInput, num);
  const deleteButton = createDeleteButton('✔️');
  liHthmlElement.appendChild(deleteButton);
  htmlOlElement.appendChild(liHthmlElement);
  storeStringTodolistArray(userHtmlTextInput);
  getTodolistArrayFromLocalStorage();
  htmlInputElement.value = '';
}
function createDeleteButton(shape) {
  const deleteButton = document.createElement('button');
  deleteButton.innerText = shape;
  return deleteButton;
}

function getTodolistArrayFromLocalStorage() {
  const localStorageTodoListArray = JSON.parse(
    localStorage.getItem('todolistArray')
  );
  console.log(localStorageTodoListArray);
}

function deleteAll() {
  todolistArray.forEach(() => todolistDiv.querySelector('li').remove());
  todolistArray.splice(0, todolistArray.length);
  localStorage.setItem('todolistArray', null);
  num = 0;
}

function storeTodolistArrayInLocalStorage(arr) {
  localStorage.setItem('todolistArray', JSON.stringify(arr));
}

function storeStringTodolistArray(str) {
  todolistArray.push({
    id: num,
    innerText: str,
  });
  storeTodolistArrayInLocalStorage(todolistArray);
}

function createLiHthmlElement(str, idNum) {
  const li = document.createElement('li');
  li.innerText = str;
  li.id = idNum;
  return li;
}

function init() {
  form.addEventListener('submit', handleSubmit);
  removeAllButton.addEventListener('click', deleteAll);
  const localArray = JSON.parse(localStorage.getItem('todolistArray'));
  console.log(localArray === null);
  if (localArray !== null) {
    const fragment = document.createDocumentFragment();
    todolistArray = localArray;
    todolistArray.forEach((item) => {
      const li = createLiHthmlElement(item.innerText, item.id);
      const deleteButton = createDeleteButton('✔️');
      li.appendChild(deleteButton);
      fragment.appendChild(li);
    });
    num = localArray.length;
    htmlOlElement.appendChild(fragment);
    console.log(localArray);
  }
}

init();
