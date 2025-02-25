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
// async function cargarDatos() {
//     try {
//         let response = await fetch("/api/getData.php");
//         let data = await response.json();
//         document.getElementById("resultado").textContent = JSON.stringify(data, null, 2);
//     } catch (error) {
//         console.error("Error al cargar los datos", error);
//     }
// }