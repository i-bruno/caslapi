async function cargarDatosHistoria() {
    try {
        let response = await fetch("/api/getDataHistoria.php");
        let data = await response.json();
        document.getElementById("resultado").textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error("Error al cargar los datos", error);
    }
}
async function cargarDatosDeportes() {
    try {
        let response = await fetch("/api/getDataDeportes.php");
        let data = await response.json();
        document.getElementById("resultado").textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error("Error al cargar los datos", error);
    }
}
async function cargarDatosInfra() {
    try {
        let response = await fetch("/api/getDataInfra.php");
        let data = await response.json();
        document.getElementById("resultado").textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error("Error al cargar los datos", error);
    }
}

async function cargarDatosEstatuto() {
    try {
        let response = await fetch("/api/getDataEstatuto.php");
        let data = await response.json();

        let resultado = document.getElementById("resultado");
        resultado.innerHTML = ""; // Limpiar el contenido previo

        let accordion = document.createElement("div");
        accordion.classList.add("accordion");
        accordion.id = "accordionEstatuto";

        let index = 0; // Para identificar cada accordion-item de forma única

        // Recorrer cada sección del estatuto (Ejemplo: "Título primero - Bases y Fines")
        for (const titulo in data) {
            let seccion = data[titulo][0]; // Extraer la sección del array

            // Crear un título para la sección
            let tituloSeccion = document.createElement("h3");
            tituloSeccion.textContent = titulo;
            tituloSeccion.classList.add("mt-3", "mb-2");
            resultado.appendChild(tituloSeccion);

            // Recorrer cada artículo dentro de la sección
            for (const claveArticulo in seccion) {
                let contenidoArticulo = seccion[claveArticulo];

                // Si el contenido del artículo es un array (ej: artículo 4), formatearlo correctamente
                if (Array.isArray(contenidoArticulo)) {
                    contenidoArticulo = contenidoArticulo.map(parrafo => {
                        let clave = Object.keys(parrafo)[0]; // Obtener la clave (ej: "A", "B", etc.)
                        return `<strong>${clave}:</strong> ${parrafo[clave]}`;
                    }).join("<br>"); // Unir párrafos con salto de línea
                }

                let accordionItem = document.createElement("div");
                accordionItem.classList.add("accordion-item");

                accordionItem.innerHTML = `
                    <h2 class="accordion-header" id="heading${index}">
                        <button class="accordion-button ${index === 0 ? "" : "collapsed"}" type="button" 
                            data-bs-toggle="collapse" data-bs-target="#collapse${index}" 
                            aria-expanded="${index === 0}" aria-controls="collapse${index}">
                            ${claveArticulo}
                        </button>
                    </h2>
                    <div id="collapse${index}" class="accordion-collapse collapse ${index === 0 ? "show" : ""}" 
                        aria-labelledby="heading${index}" data-bs-parent="#accordionEstatuto">
                        <div class="accordion-body">
                            ${contenidoArticulo}
                        </div>
                    </div>
                `;

                accordion.appendChild(accordionItem);
                index++; // Incrementar el índice para el próximo accordion-item
            }
        }

        resultado.appendChild(accordion);
    } catch (error) {
        console.error("Error al cargar los datos", error);
    }
}


// async function cargarDatosEstatuto() {
//     try {
//         let response = await fetch("/api/getDataEstatuto.php");
//         let data = await response.json();
//         document.getElementById("resultado").textContent = JSON.stringify(data, null, 2);
//     } catch (error) {
//         console.error("Error al cargar los datos", error);
//     }
// }
