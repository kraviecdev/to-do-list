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

  const deleteTask = (newTask) => {
    tasks.pop({
      content: newTask,
    });
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
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form")
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}