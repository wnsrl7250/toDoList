import {
  getNode,
  getStorage,
  setStorage,
  insertLast,
  clearContents,
} from "../lib/index.js";

const submitButton = getNode(".button");
const todoInput = getNode("#todo");
const todoList = getNode(".toDoList");

/* 
  submit 버튼 클릭시 input 값 가져오기
  input값을 넣은 태그를 만들고 랜더링 ul.toDoList


  아이템 제거하기
  

  데이터 관리

  
*/

let todoListArray = [];

function createItem(id, value) {
  const tag = `
    <li data-id="${id}">${value}</li>
  `;
  return tag;
}

function renderItem({ target, id, value }) {
  insertLast(target, createItem(id, value));
}

function removeItem(id) {
  const li = getNode(`[data-id="${id}"]`);
  li.remove();
}

function addItemArray(id, value) {
  todoListArray.push({ id, value });
  console.log(todoListArray);
}

// filter : 새로운 배열 => 조건이 참인경우 => 찾는 대상 모두
// find : 내가 찾은 데이터 그 자체 => 무조건 1개

function removeItemArray(id) {
  todoListArray = todoListArray.filter((item) => item.id !== id);
  console.log(todoListArray);
}

function handleSubmit(e) {
  e.preventDefault();

  const value = todoInput.value;
  const id = String(Date.now());

  renderItem({ target: todoList, id, value });
  addItemArray(id, value);
  clearContents(todoInput);
  setStorage("todo", todoListArray);
}

function handleRemove(e) {
  const target = e.target;
  const id = target.dataset.id;

  removeItem(id);
  removeItemArray(id);

  setStorage("todo", todoListArray);
}

function init() {
  const initList = getStorage("todo");

  initList.then((res) => {
    todoListArray ||= res;
    res?.forEach(({ id, value }) => {
      renderItem({ target: todoList, id, value });
    });
  });
}

submitButton.addEventListener("click", handleSubmit);
todoList.addEventListener("click", handleRemove);

init();
