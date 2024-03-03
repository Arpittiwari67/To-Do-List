//SELECTORS SELECTORS SELECTORS SELECTORS SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".todo-filter");

// EVENT LISTENERS EVENT LISTENERS EVENT LISTENERS
//checks if the content has loaded 
//if yes, function is executed
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', todoFilter);

//FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS
//adding the todo function
function addTodo(event) {
    //prevents form from submitting
    //saves me a headache or two
    event.preventDefault();

    //checks if userinput is empty
    function checkingIt() {
        if (todoInput.value != "") {
            document.getElementById('txt').style.border = "";
            return true;
        } else {
            alert("Please write something to submit an item.");
            //adds a red border to further highlight the error
            document.getElementById('txt').style.border = "1.8px solid red";
            //doesn't post the item if it's empty
            todo.style.display = "none";
            return false;
        }
    }
    //runs the function above
    checkingIt();

    //div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //creates the li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //adds to localstorage
    saveLocalTodos(todoInput.value);

    //complete/finish item button 
    const compleatedButton = document.createElement("button");
    //adding a fontawesome icon to the complete button
    compleatedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    //class
    compleatedButton.classList.add("complete-btn");
    todoDiv.appendChild(compleatedButton);

    //delete button
    const trashButton = document.createElement("button");
    //adding a fontawesome icon to the delete button
    trashButton.innerHTML = '<i class="fa-solid fa-skull"></i>';
    //class
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //appending!
    todoList.appendChild(todoDiv);

    //gets rid of the text in the form's typing-bar 
    //after the user has clicked the "+"-button
    todoInput.value = "";
}

//deletes list item
//(it's the garbage/trash/skull icon one)
function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] === "trash-btn") {
        //removes the parent element 
        const todo = item.parentElement;
        //deletes item from localstorage 
        //when user clicks the skull
        removeLocalTodos(todo);
        todo.remove();
    }
    //item as complete via css
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}

//filter/toggle function
function todoFilter(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        //select option value
        //note: using display flex specifically bc it matches the css
        switch (e.target.value) {
            //only shows all items
            case "all":
                todo.style.display = "flex";
                break;
            //only shows completed items
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "active":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}


//LOCALSTORAGE LOCALSTORAGE LOCALSTORAGE LOCALSTORAGE
// + a few functions. sue me.
document.getElementById("txt").value = getSavedValue("txt");    // set the value to this input

//SAVES THE USERINPUT IN THE TEXT FIELD to localstorage
//by id, value
function saveValue(e) {
    var id = e.id;  // gets the sender's id to save it
    var val = e.value; // gets the value
    localStorage.setItem(id, val); //localstorage's value will override userinput 
}

//get the saved value (= "v") from localstorage
function getSavedValue(v) {
    if (!localStorage.getItem(v)) {
        //default value (if userinput on text field is null)
        return "";
    }
    return localStorage.getItem(v);
}

//checks if there are existing items in localstorage
//(so they wouldn't get written over)
function saveLocalTodos(todo) {
    let todos;
    //if localstorage doesn't have existing items...
    if (localStorage.getItem("todos") === null) {
        //creates an empty array
        todos = [];
    } else {
        //...BUT if you do have existing shit in there
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//gets items
function getTodos() {
    let todos;
    //checks localstorage for existing items
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        //div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //creates the li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        //class
        newTodo.classList.add("todo-item");
        //appendchild
        todoDiv.appendChild(newTodo);

        //complete/finish item button 
        const compleatedButton = document.createElement("button");
        //adding a fontawesome icon to the complete button
        compleatedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        //class
        compleatedButton.classList.add("complete-btn");
        todoDiv.appendChild(compleatedButton);

        //delete button
        const trashButton = document.createElement("button");
        //adding a fontawesome icon to the delete button
        trashButton.innerHTML = '<i class="fa-solid fa-skull"></i>';
        //class
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //appending
        todoList.appendChild(todoDiv);
    });
}

//when user deletes an item, the item 
//is also deleted from localstorage
//and therefore does not reappear on refresh
//(unlike their un-deleted counterparts ofc)
function removeLocalTodos(todo) {
    //again, checks localstorage first 4 existing items
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    //deletes specific (userdeleted) element from localstorage
    //when user clicks the garbage button w the skull icon
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}