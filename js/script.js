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

  const toggleAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const toggleHideDoneTasks = () => {
    if (tasks.some(({done}) => done)){ 
    hideDoneTasks = !hideDoneTasks};
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

  const bindButtonEvents = () => {
    const selectAllButton = document.querySelector(".js-selectAllButton");
    if (selectAllButton) {
      selectAllButton.addEventListener("click", toggleAllTasksDone);
    }
    const hideDoneButton = document.querySelector(".js-hideDoneButton");
    if (hideDoneButton) {
      hideDoneButton.addEventListener("click", toggleHideDoneTasks);
    }
  };

  const bindTasksEvents = () => {
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
  };

  const renderTasks = () => {
    let htmlForTask = task => `
            <li class="list__item ${task.done && hideDoneTasks ? "list__item--hidden" : ""}">
               <button class="${task.done ? "button--done" : ""} js-doneButton button button--complete"><i class="material-icons md-24">task_alt</i></button> 
               <span class="${task.done ? "list__text--done" : ""} list__text">${task.content}</span> 
               <button class="js-deleteButton button button--delete"><i class="material-icons md-24">delete</i></button>
            </li>
            `
    const tasksList = document.querySelector(".js-taskList");
    tasksList.innerHTML = tasks.map(htmlForTask).join("");
    bindTasksEvents();
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (!tasks.length) {
      buttonsElement.innerHTML = "";
      return;
    }
    buttonsElement.innerHTML = `
            <li class="list__item list__item--button">
              <button ${tasks.every(({ done }) => done) ? "disabled" : ""} class="button button--selectAll js-selectAllButton">Wykonaj wszystkie</button>
            </li>
            <li class="list__item list__item--button">
              <button class="button button--hideDone js-hideDoneButton">${hideDoneTasks ? "Pokaż" : "Ukryj"} wykonane</button>
            </li>
      `
    bindButtonEvents();
  };

  const render = () => {
    renderTasks();
    renderButtons();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form")
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}