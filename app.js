// Define UI Vars
var form = document.querySelector('#task-form'); //Define Task Form 
var taskList = document.querySelector('.collection'); //Define Task List
var clearBtn = document.querySelector('.clear-tasks'); //Define "Clear" button
var filter = document.querySelector('#filter'); // Define Filter Elelment
var taskInput = document.querySelector('#task'); //Define Task Input Element
// Load all event listeners
loadEventListeners();
// Load all Event Listeners
function loadEventListeners() {
    //DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}
// Get Tasks from Local Storage
function getTasks() {
    var tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        // Create li element
        var li = document.createElement('li');
        // Add class to li element
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        var link = document.createElement('a');
        //Add class to link element
        link.className = 'delete-item secondary-content';
        // Add Icon HTML
        link.innerHTML = '<i class ="fa fa-remove"></i>';
        //Append Link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
    });
}
//Add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }
    // Create li element
    var li = document.createElement('li');
    // Add class to li element
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    var link = document.createElement('a');
    //Add class to link element
    link.className = 'delete-item secondary-content';
    // Add Icon HTML
    link.innerHTML = '<i class ="fa fa-remove"></i>';
    //Append Link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
    // Store in LS (Local Storage)
    storeTaskInLocalStorage(taskInput.value);
    // Clear input
    taskInput.value = '';
    e.preventDefault();
}
//Store Task
function storeTaskInLocalStorage(task) {
    var tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}
// Remove From LS
function removeTaskFromLocalStorage(taskItem) {
    var tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        if (taskItem.textContent == task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Clear Tasks
function clearTasks() {
    //taskList.innerHTML = '';
    // Faster way to clear tasks
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    //Link Explaining difference between the two
    // https://jsperf.com/innerhtml-vs-removechild/551
    // Ckear from LS
    clearTasksFromLocalStorage();
}
// Clear Tasks From LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}
// Filter Tasks
function filterTasks(e) {
    var text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function (task) {
        var item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }
        else {
            task.style.display = 'none';
        }
    });
}
