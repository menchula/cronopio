// ===== CRONOPIO v0.0.2 =====

const taskContainer = document.getElementById("customTasks");

let tasks = JSON.parse(localStorage.getItem("cronopioTasks")) || [];

function saveTasks() {
    localStorage.setItem("cronopioTasks", JSON.stringify(tasks));
}

function renderTasks() {

    if (!taskContainer) return;

    taskContainer.innerHTML = "";

    tasks.forEach((task, index) => {

        const div = document.createElement("div");
        div.className = "task";

        div.innerHTML = `
            <input type="checkbox"
                   ${task.done ? "checked" : ""}
                   onchange="toggleTask(${index})">

            <label style="flex:1">${task.text}</label>

            <button onclick="deleteTask(${index})"
                    style="border:none;background:none;font-size:18px;cursor:pointer;">
                🗑️
            </button>
        `;

        taskContainer.appendChild(div);

    });

    updateProgress();

}

function addTask(){

    const input=document.getElementById("newTask");

    if(!input) return;

    if(input.value.trim()==="") return;

    tasks.push({

        text:input.value,
        done:false

    });

    input.value="";

    saveTasks();
    renderTasks();

}

function toggleTask(index){

    tasks[index].done=!tasks[index].done;

    saveTasks();

    renderTasks();

}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    renderTasks();

}

function updateProgress(){

    const total =
        document.querySelectorAll("input[type='checkbox']").length;

    const done =
        document.querySelectorAll("input[type='checkbox']:checked").length;

    const percent =
        total===0 ? 0 : Math.round(done/total*100);

    const progress=document.getElementById("progressFill");

    const label=document.getElementById("progressLabel");

    if(progress){

        progress.style.width=percent+"%";

    }

    if(label){

        label.innerText=`${percent}% completado`;

    }

}

renderTasks();

document.addEventListener("change",updateProgress);
