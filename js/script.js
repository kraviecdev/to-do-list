{
    const tasks = [
      {
        content: "test",
      },
      {
        content: "test22",
      },
    ];

    const render = () => {
        let htmlString = "";

        for(const task of tasks) {
            htmlString += `
            <li class="list__item">
               <button class="js-doneButton buttton button--done">Zrobione</button> ${task.content} <button class="js-deleteButton button button--delete">Usuń</button>
            </li>
            `
        };
        document.querySelector(".js-taskList").innerHTML = htmlString;
    };

    const onFormSubmit = (event) => {
      event.preventDefault();



    }

    const init = () => {
        render();
    };
    
    init();
}