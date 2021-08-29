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

  const toggleDoneTasks = (hideDoneTasks) => {
    tasks = tasks.filter();
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

  const toggleAllTasksDoneEvent = () => {
    const selectAllButton = document.querySelector(".js-selectAllButton");
    selectAllButton.addEventListener("click", toggleAllTasksDone);
  };

  const toggleHideDoneTasksButtonEvent = () => {
    const hideDoneButton = document.querySelector(".js-hideDoneButton");
    hideDoneButton.addEventListener("click", toggleDoneTasks)
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
    let htmlTaskString = "";

    for (const task of tasks) {
      htmlTaskString += `
            <li class="list__item">
               <button ${task.done ? " class=\"button--done js-doneButton button button--complete\"" : ""}class="js-doneButton button button--complete"><i class="material-icons md-24">task_alt</i></button> 
               <span ${task.done ? " class=\"list__text list__text--done\"" : ""}class="list__text">${task.content}</span> 
               <button class="js-deleteButton button button--delete"><i class="material-icons md-24">delete</i></button>
            </li>
            `
    };
    document.querySelector(".js-taskList").innerHTML = htmlTaskString;
    bindTasksEvents();
  };

  const renderButtons = () => {
    let htmlButtonsString = "";

    if (!tasks.length) {
      return
    }
    else {
      htmlButtonsString += `
            <li class="list__item list__item--button">
              <button ${tasks.every(({done}) => done) ? "disabled" : ""} class="button button--selectAll js-selectAllButton">Wykonaj wszystkie</button>
            </li>
            <li class="list__item list__item--button">
              <button class="button button--hideDone js-hideDoneButton"><span class="js-hideButtonInnerText">Ukryj</span> wykonane</button>
            </li>
      `
    };
    document.querySelector(".js-buttons").innerHTML = htmlButtonsString;
    toggleAllTasksDoneEvent();
    toggleHideDoneTasksButtonEvent();
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