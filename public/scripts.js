const URL_API = 'https://starwars-n5ec-developuptcs-projects.vercel.app';
let tablaDatos;

function obtenerTodosLosPersonajes() {
    console.log('Obteniendo todos los personajes...');
    fetch(URL_API)
        .then(respuesta => respuesta.json())
        .then(datoRespuesta => {
            console.log('Datos recibidos:', datoRespuesta);
            if (datoRespuesta.result) {
                inicializarTablaDatos(datoRespuesta.data);
            } else {
                console.error('Estructura de datos inesperada:', datoRespuesta);
            }
        })
        .catch(error => console.error('Error al obtener todos los personajes:', error));
}

function obtenerPersonajePorId(id) {
    console.log(`Obteniendo personaje con ID: ${id}`);
    fetch(`${URL_API}/${id}`)
        .then(respuesta => respuesta.json())
        .then(datoRespuesta => {
            console.log('Datos recibidos:', datoRespuesta);
            if (datoRespuesta.result && datoRespuesta.data) {
                actualizarTablaDatos([datoRespuesta.data]);
            } else {
                console.error('Estructura de datos inesperada:', datoRespuesta);
            }
        })
        .catch(error => console.error(`Error al obtener personaje con ID ${id}:`, error));
}

function obtenerPersonajesPorNombre(nombre) {
    console.log(`Obteniendo personajes con nombre: ${nombre}`);
    fetch(`${URL_API}/name/${nombre}`)
        .then(respuesta => respuesta.json())
        .then(datoRespuesta => {
            console.log('Datos recibidos:', datoRespuesta);
            if (datoRespuesta.result) {
                actualizarTablaDatos(datoRespuesta.data);
            } else {
                console.error('Estructura de datos inesperada:', datoRespuesta);
            }
        })
        .catch(error => console.error(`Error al obtener personajes con nombre ${nombre}:`, error));
}

function inicializarTablaDatos(personajes) {
    console.log('Inicializando Tabla de Datos con personajes:', personajes);
    if (!Array.isArray(personajes)) {
        console.error('Personajes no es un array:', personajes);
        return;
    }
    tablaDatos = $('#tablaPersonajes').DataTable({
        data: personajes,
        columns: [
            { data: 'name', title: 'Nombre' },
            { data: 'height', title: 'Altura' },
            { data: 'mass', title: 'Peso' },
            { data: 'hair_color', title: 'Color de Pelo' },
            { data: 'skin_color', title: 'Color de Piel' },
            { data: 'eye_color', title: 'Color de Ojos' },
            { data: 'birth_year', title: 'Año de Nacimiento' },
            { data: 'gender', title: 'Género' },
            { data: 'homeworld', title: 'Mundo natal'},
            { data: 'species', title: 'Especie'}
        ],
        responsive: true,
        searching: false
    });
}

function actualizarTablaDatos(personajes) {
    console.log('Actualizando Tabla de Datos con personajes:', personajes);
    if (!Array.isArray(personajes)) {
        console.error('Personajes no es un array:', personajes);
        return;
    }
    tablaDatos.clear().rows.add(personajes).draw();
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Contenido del DOM cargado, obteniendo todos los personajes...');
    obtenerTodosLosPersonajes();

    document.getElementById('botonBuscar').addEventListener('click', () => {
        const id = document.getElementById('buscarId').value;
        const nombre = document.getElementById('buscarNombre').value;

        console.log(`Botón de búsqueda clickeado. ID: ${id}, Nombre: ${nombre}`);

        if (id) {
            obtenerPersonajePorId(id);
        } else if (nombre) {
            obtenerPersonajesPorNombre(nombre);
        } else {
            obtenerTodosLosPersonajes();
        }
    });
});