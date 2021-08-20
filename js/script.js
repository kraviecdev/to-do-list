{
  const tasks = [];

  const addTask = (newTask) => {
    tasks.push({
      content: newTask,
    });
    render();
  };

  const clearPath = () => {
    document.querySelector(".js-addTask").value = "";
  }

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const taskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTask = document.querySelector(".js-addTask").value.trim();
    if (newTask === "") {
      return;
    }
    addTask(newTask);
    clearPath();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-deleteButton");
    removeButtons.forEach((deleteButton, taskIndex) => {
      deleteButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-doneButton");
    toggleDoneButtons.forEach((doneButton, taskIndex) => {
      doneButton.addEventListener("click", () => {
        taskDone(taskIndex);
      });
    });
  }

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
            <li class="list__item">
               <button ${task.done ? " class=\"button--done js-doneButton button button--complete\"" : "" }class="js-doneButton button button--complete"><i class="material-icons md-24">task_alt</i></button> 
               <span class="list__text">${task.content}</span> 
               <button class="js-deleteButton button button--delete"><i class="material-icons md-24">delete</i></button>
            </li>
            `
    };
    document.querySelector(".js-taskList").innerHTML = htmlString;
    bindEvents();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form")
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}