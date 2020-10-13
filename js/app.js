// MODELO DE DATOS
let mis_peliculas_iniciales = [
  {
    titulo: "Superlópez",
    director: "Javier Ruiz Caldera",
    miniatura: "files/superlopez.png",
  },
  {
    titulo: "Jurassic Park",
    director: "Steven Spielberg",
    miniatura: "files/jurassicpark.png",
  },
  {
    titulo: "Interstellar",
    director: "Christopher Nolan",
    miniatura: "files/interstellar.png",
  },
];

localStorage.mis_peliculas =
  localStorage.mis_peliculas || JSON.stringify(mis_peliculas_iniciales);

// VISTAS
const indexView = (peliculas) => {
  let i = 0;
  let view = "";
  while (i < peliculas.length) {
    view += `
        <div class="movie">
           <div class="movie-img">
                <img data-my-id="${i}" src="${
      peliculas[i].miniatura
    }" onerror="this.src='files/placeholder.png'"/>
           </div>
           <div class="title">
               ${peliculas[i].titulo || "<em>Sin título</em>"}
           </div>
           <div class="actionsp">
               <button class="show" data-my-id="${i}">ver</button>
               <button class="edit" data-my-id="${i}">editar</button>
               <button class="delete" data-my-id="${i}">borrar</button>
            </div>
        </div>`;
    i = i + 1;
  }
  view += `<div class="actions">
                <button class="reset">reiniciar</button>
                <button class="new">Añadir</button>
            </div>`;
  return view;
};

const editView = (i, pelicula) => {
  return `
        <fieldset>
        <legend> <h2>Editar Película </h2> </legend>
        <div class="field">
        Título <br>
        <input  type="text" id="titulo" placeholder="Título" 
                value="${pelicula.titulo}">
        </div>
        <div class="field">
        Director <br>
        <input  type="text" id="director" placeholder="Director" 
                value="${pelicula.director}">
        </div>
        <div class="field">
        Miniatura <br>
        <input  type="text" id="miniatura" placeholder="URL de la miniatura" 
                value="${pelicula.miniatura}">
        </div>
        <div class="actionsv">
            <button class="update" data-my-id="${i}">
            Actualizar</button>
            <button class="index">Volver</button>
        </div>
        </fieldset>`;
};

const showView = (pelicula) => {
  return ` <fieldset>
     <legend>Detalles </legend>
     <p id="details">La película <strong>${pelicula.titulo}</strong>
     fue dirigida por <strong>${pelicula.director}</strong>. 
     </p>
     <div class="actionsv">
        <button class="index">Volver</button>
     </div>
     </fieldset>`;
};

const newView = () => {
  return `<fieldset> 
    <legend><h2>Crear Película</h2></legend>
    <div class="field">
    Título <br>
    <input  type="text" id="titulo" placeholder="Título">
    </div>
    <div class="field">
    Director <br>
    <input  type="text" id="director" placeholder="Director">
    </div>
    <div class="field">
    Miniatura <br>
    <input  type="text" id="miniatura" placeholder="URL de la miniatura">
    </div>
        <div class="actionsv">
        <button class="create">
                Crear
            </button>
            <button class="index">Volver</button>
        </div>
        </fieldset>`;
};

// CONTROLADORES
const indexContr = () => {
  let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
  document.getElementById("main").innerHTML = indexView(mis_peliculas);
};

const showContr = (i) => {
  let mis_peliculas = JSON.parse(localStorage.mis_peliculas)[i];
  document.getElementById("main").innerHTML = showView(mis_peliculas);
};

const newContr = () => {
  document.getElementById("main").innerHTML = newView();
};

const createContr = () => {
  let titulo = document.getElementById("titulo").value;
  let director = document.getElementById("director").value;
  let miniatura = document.getElementById("miniatura").value;
  let pelicula = { titulo: titulo, director: director, miniatura: miniatura };
  let mp = JSON.parse(localStorage.mis_peliculas);
  mp.push(pelicula);
  localStorage.mis_peliculas = JSON.stringify(mp);
  indexContr();
};

const editContr = (i) => {
  let pelicula = JSON.parse(localStorage.mis_peliculas)[i];
  document.getElementById("main").innerHTML = editView(i, pelicula);
};

const updateContr = (i) => {
  let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
  mis_peliculas[i].titulo = document.getElementById("titulo").value;
  mis_peliculas[i].director = document.getElementById("director").value;
  mis_peliculas[i].miniatura = document.getElementById("miniatura").value;
  localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
  indexContr();
};

const deleteContr = (i) => {
  let pelicula = JSON.parse(localStorage.mis_peliculas);
  if (confirm("¿Está seguro de que desea eleminar esta película?")) {
    pelicula.splice(i, 1);
    alert("La pelicula ha sido borrada");
  }
  localStorage.mis_peliculas = JSON.stringify(pelicula);
  indexContr();
};

const resetContr = () => {
  localStorage.mis_peliculas = JSON.stringify(mis_peliculas_iniciales);
  indexContr();
};

// ROUTER de eventos
const matchEvent = (ev, sel) => ev.target.matches(sel);
const myId = (ev) => Number(ev.target.dataset.myId);

document.addEventListener("click", (ev) => {
  if (matchEvent(ev, ".index")) indexContr();
  else if (matchEvent(ev, ".edit")) editContr(myId(ev));
  else if (matchEvent(ev, ".update")) updateContr(myId(ev));
  else if (matchEvent(ev, ".show")) showContr(myId(ev));
  else if (matchEvent(ev, ".delete")) deleteContr(myId(ev));
  else if (matchEvent(ev, ".reset")) resetContr();
  else if (matchEvent(ev, ".new")) newContr();
  else if (matchEvent(ev, ".create")) createContr();
});

// Inicialización
document.addEventListener("DOMContentLoaded", indexContr);
