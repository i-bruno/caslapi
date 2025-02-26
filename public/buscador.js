let datosDeportes = [];
let datosHistoria = [];
let datosInfra = [];
let datosEstatuto = [];

// Función para cargar JSON
async function cargarJSON(url) {
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error(`Error al cargar ${url}: ${respuesta.status}`);
        
        const texto = await respuesta.text(); // Leer el contenido como texto
        return JSON.parse(texto); // Intentar convertirlo a JSON

    } catch (error) {
        console.error("Error cargando JSON:", error);
        return []; // Retornar un array vacío para evitar que falle la app
    }
}


// Cargar todos los JSON al iniciar
async function cargarDatos() {
    datosDeportes = await cargarJSON("deportes.json");
    datosHistoria = await cargarJSON("historia.json");
    datosInfra = await cargarJSON("infraestructura.json");
    datosEstatuto = await cargarJSON("estatuto.json");
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
        ...datosDeportes, 
        ...datosHistoria, 
        ...datosInfra, 
        ...datosEstatuto
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
