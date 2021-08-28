{
  let tasks = [];

  let hideDoneTasks = false;

  const addTask = (trimmedTaskContent) => {
    tasks = [
      ...tasks,
      { content: trimmedTaskContent }
    ];
    render();
  };

  const clearInputValue = () => {
    document.querySelector(".js-addTask").value = "";
  };

  const inputAutoFocus = () => {
    document.querySelector(".js-addTask").focus();
  };

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const trimmedTaskContent = document.querySelector(".js-addTask").value.trim();
    if (trimmedTaskContent === "") {
      return;
    }
    addTask(trimmedTaskContent);
    clearInputValue();
    inputAutoFocus();
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
        toggleTaskDone(taskIndex);
      });
    });
  }

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
            <li class="list__item">
               <button ${task.done ? " class=\"button--done js-doneButton button button--complete\"" : ""}class="js-doneButton button button--complete"><i class="material-icons md-24">task_alt</i></button> 
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