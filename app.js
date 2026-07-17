const STORAGE = "cronopio.tasks";

let tasks = JSON.parse(localStorage.getItem(STORAGE)) || [];

const ideas = [
{
title:"🎨 Creatividad",
message:"Hace tiempo que no haces algo creativo. Hoy quiero que vuelvas a crear.",
tasks:[
"Dibujar 20 minutos",
"Hacer una foto bonita",
"Escuchar una canción con atención"
]
},
{
title:"📚 Aprendizaje",
message:"Hoy vamos a alimentar la mente.",
tasks:[
"Leer 20 páginas",
"Ver un vídeo educativo",
"Escribir una reflexión"
]
},
{
title:"💪 Salud",
message:"Tu cuerpo también necesita atención.",
tasks:[
"Caminar 30 minutos",
"Beber 2 litros de agua",
"Estirar 10 minutos"
]
}
];

function save(){
localStorage.setItem(STORAGE,JSON.stringify(tasks));
}

function render(){

const list=document.getElementById("customTasks");

list.innerHTML="";

tasks.forEach((task,index)=>{

list.innerHTML+=`
<div class="task">

<input
type="checkbox"
${task.done?"checked":""}
onchange="toggleTask(${index})">

<label>${task.text}</label>

<button onclick="editTask(${index})">
✏️
</button>

<button onclick="deleteTask(${index})">
🗑️
</button>

</div>
`;

});

updateProgress();

save();

}

function updateProgress(){

const total=tasks.length;

const done=tasks.filter(t=>t.done).length;

const percent=total===0?0:Math.round(done/total*100);

document.getElementById("progressFill").style.width=percent+"%";

document.getElementById("progressLabel").innerText=percent+"%";

document.getElementById("alignmentScore").innerText=(70+Math.round(percent*0.3))+"%";

document.getElementById("ringValue").innerText=(70+Math.round(percent*0.3))+"%";

}

function toggleTask(index){

tasks[index].done=!tasks[index].done;

render();

}

function deleteTask(index){

tasks.splice(index,1);

render();

}

function editTask(index){

const nuevo=prompt("Editar misión",tasks[index].text);

if(nuevo){

tasks[index].text=nuevo;

render();

}

}

function addTask(){

const texto=prompt("Nueva misión");

if(!texto) return;

tasks.push({

text:texto,

done:false

});

render();

}

function generateDay(){

const idea=ideas[Math.floor(Math.random()*ideas.length)];

document.getElementById("focusTitle").innerText=idea.title;

document.getElementById("coachMessage").innerText=idea.message;

tasks=[];

idea.tasks.forEach(t=>{

tasks.push({

text:t,

done:false

});

});

render();

}

render();
