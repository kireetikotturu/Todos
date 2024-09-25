let todoItemsContainer = document.getElementById("todosLists");
let addButton = document.getElementById("buttonId");
let inputText = document.getElementById("todouserinput");
let saveBtn = document.getElementById("saveButton");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);

    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();
let unqNumber = todoList.length;

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    let index = todoList.findIndex(function(e) {
        if (todoId === "todo" + e.uniqueNum) {
            return true;
        } else {
            return false;
        }
    });

    let todoObj = todoList[index];
    if (todoObj.isChecked === true) {
        todoObj.isChecked = false;
    } else {
        todoObj.isChecked = true;
    }
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteElementIndex = todoList.findIndex(function(each) {
        if (todoId === "todo" + each.uniqueNum) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteElementIndex, 1);
}

function createAppendTodo(todo) {
    let text = todo.text;
    let unqNum = todo.uniqueNum;
    let checkboxId = "checkbox" + unqNum;
    let labelId = "label" + unqNum;
    let todoId = "todo" + unqNum;

    let todolistItem = document.createElement("li");
    todolistItem.classList.add("d-flex", "flex-row");
    todolistItem.id = todoId;
    todoItemsContainer.appendChild(todolistItem);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox");
    inputElement.checked = todo.isChecked;
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };
    todolistItem.appendChild(inputElement);

    let divContainer = document.createElement("div");
    divContainer.classList.add("div-class", "d-flex", "flex-row");
    todolistItem.appendChild(divContainer);

    let labelElement = document.createElement("label");
    labelElement.textContent = text;
    labelElement.classList.add("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    divContainer.appendChild(labelElement);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("div-i");
    let deleteIcon = document.createElement('i');
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };
    deleteIcon.classList.add("fa-regular", "fa-trash-can");
    deleteContainer.appendChild(deleteIcon);
    divContainer.appendChild(deleteContainer);
}

for (let ele of todoList) {
    createAppendTodo(ele);
}

function onAddTodo() {
    unqNumber += 1;
    let userInputText = inputText.value;
    if (userInputText === "") {
        alert("Enter Valid Input !");
        return;
    }
    let newTodo = {
        text: userInputText,
        uniqueNum: unqNumber,
        isChecked: false
    };
    todoList.push(newTodo);
    createAppendTodo(newTodo);
    inputText.value = "";
}

addButton.onclick = function() {
    onAddTodo();
};

saveBtn.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

/*











*/