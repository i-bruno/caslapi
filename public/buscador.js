let datosDeportes = [];
let datosHistoria = [];
let datosInfra = [];
let datosEstatuto = [];

// Función para cargar JSON
// async function cargarJSON(url) {
//     try {
//         const respuesta = await fetch(url);
//         if (!respuesta.ok) throw new Error(`Error al cargar ${url}: ${respuesta.status}`);
        
//         const texto = await respuesta.text(); // Leer el contenido como texto
//         return JSON.parse(texto); // Intentar convertirlo a JSON

//     } catch (error) {
//         console.error("Error cargando JSON:", error);
//         return []; // Retornar un array vacío para evitar que falle la app
//     }
// }

async function cargarJSON(url) {
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error(`Error al cargar ${url}: ${respuesta.status}`);
        
        return await respuesta.json(); // Convertir directamente a JSON
    } catch (error) {
        console.error("Error cargando JSON:", error);
        return {}; // Devolver un objeto vacío en vez de un array
    }
}



// Cargar todos los JSON al iniciar
// async function cargarDatos() {
//     datosDeportes = await cargarJSON("/data/deportes.json");
//     datosHistoria = await cargarJSON("/data/historia.json");
//     datosInfra = await cargarJSON("/data/infraestructura.json");
//     datosEstatuto = await cargarJSON("/data/estatuto.json");

//     datosDeportes = datosDeportes.deportes || [];
//     datosHistoria = datosHistoria.historia || [];
//     datosInfra = datosInfra.infraestructura || [];
//     datosEstatuto = datosEstatuto.estatuto || [];

//     console.log("Deportes:", datosDeportes);
//     console.log("Historia:", datosHistoria);
//     console.log("Infraestructura:", datosInfra);
//     console.log("Estatuto:", datosEstatuto);
// }

async function cargarDatos() {
    console.log("Cargando datos...");

    datosDeportes = await cargarJSON("/data/deportes.json");
    datosHistoria = await cargarJSON("/data/historia.json");
    datosInfra = await cargarJSON("/data/infraestructura.json");
    datosEstatuto = await cargarJSON("/data/estatuto.json");

    console.log("JSON crudos:", { datosDeportes, datosHistoria, datosInfra, datosEstatuto });

    datosDeportes = Array.isArray(datosDeportes) ? datosDeportes : datosDeportes.deportes || [];
    datosHistoria = Array.isArray(datosHistoria) ? datosHistoria : datosHistoria.historia || [];
    datosInfra = Array.isArray(datosInfra) ? datosInfra : datosInfra.infraestructura || [];
    datosEstatuto = Array.isArray(datosEstatuto) ? datosEstatuto : datosEstatuto.estatuto || [];
    

    console.log("Datos procesados:", { datosDeportes, datosHistoria, datosInfra, datosEstatuto });
}


// Llamar a la función al cargar la página
cargarDatos();

// Función para buscar en los JSON
function buscarEnJson() {
    const termino = document.getElementById("buscador").value.toLowerCase();
    const listaResultados = document.getElementById("listaResultados");
    listaResultados.innerHTML = ""; // Limpiar resultados anteriores

    if (termino === "") return; // No buscar si el campo está vacío

    // Combinar todos los datos en un solo array
    const todosLosDatos = [
        ...(Array.isArray(datosDeportes) ? datosDeportes : []), 
        ...(Array.isArray(datosHistoria) ? datosHistoria : []), 
        ...(Array.isArray(datosInfra) ? datosInfra : []), 
        ...(Array.isArray(datosEstatuto) ? datosEstatuto : [])
    ];

    // Filtrar los datos que contengan el término
    const resultados = todosLosDatos.filter(dato => 
        JSON.stringify(dato).toLowerCase().includes(termino)
    );

    // Mostrar los resultados en la lista
    resultados.forEach(dato => {
        const item = document.createElement("li");
        item.textContent = JSON.stringify(dato); // Puedes formatearlo mejor
        listaResultados.appendChild(item);
    });
}
