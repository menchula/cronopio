const STORAGE = "cronopioTasks";

let tasks = JSON.parse(localStorage.getItem(STORAGE));

if(!tasks){

    tasks=[

        {
            text:"📖 Leer 20 páginas",
            done:false,
            category:"Cultura"
        },

        {
            text:"💪 Entrenar",
            done:false,
            category:"Salud"
        },

        {
            text:"🎨 Dibujar 20 minutos",
            done:false,
            category:"Creatividad"
        },

        {
            text:"☎️ Llamar a mamá",
            done:false,
            category:"Relaciones"
        }

    ];

}

const list=document.getElementById("customTasks");

function save(){

    localStorage.setItem(STORAGE,JSON.stringify(tasks));

}

function render(){

    list.innerHTML="";

    tasks.forEach((task,index)=>{

        list.innerHTML+=`

<div class="task">

<input
type="checkbox"
${task.done?"checked":""}
onchange="toggle(${index})">

<label style="flex:1">

${task.text}

</label>

<button
onclick="editTask(${index})"
style="border:none;background:none;font-size:18px;">

✏️

</button>

<button
onclick="removeTask(${index})"
style="border:none;background:none;font-size:18px;">

🗑️

</button>

</div>

`;

    });

    save();

    progress();

}

function addTask(){

    const input=document.getElementById("newTask");

    if(input.value.trim()=="") return;

    tasks.push({

        text:input.value,
        done:false,
        category:"General"

    });

    input.value="";

    render();

}

function toggle(i){

    tasks[i].done=!tasks[i].done;

    render();

}

function removeTask(i){

    tasks.splice(i,1);

    render();

}

function editTask(i){

    const nuevo=prompt("Editar misión",tasks[i].text);

    if(nuevo){

        tasks[i].text=nuevo;

        render();

    }

}

function progress(){

    const total=tasks.length;

    const done=tasks.filter(t=>t.done).length;

    const percent=Math.round(done/total*100);

    document.getElementById("progressFill").style.width=percent+"%";

    document.getElementById("progressLabel").innerHTML=`<b>${percent}%</b> completado`;

}

render();
