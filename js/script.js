{
  const tasks = [
    {
      content: "test",
    },
    {
      content: "test22",
    },
  ];

  const addTask = (newTask) => {
    tasks.push({
      content: newTask,
    });
    render();
  };

  const removeTask = (index) => {
    tasks.splice(index, 1);
    render();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTask = document.querySelector(".js-addTask").value.trim();
    if (newTask === "") {
      return;
    }
    addTask(newTask);
  };

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
            <li class="list__item">
               <button class="js-doneButton buttton button--done">Zrobione</button> ${task.content} <button class="js-deleteButton button button--delete">Usuń</button>
            </li>
            `
    };
    document.querySelector(".js-taskList").innerHTML = htmlString;
    const removeButtons = document.querySelectorAll(".js-deleteButton");

    removeButtons.forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form")
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}