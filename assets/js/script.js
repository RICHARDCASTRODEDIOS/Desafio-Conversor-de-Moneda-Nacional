// variable de etiqueta select
const selectDivisas = document.querySelector('#selectMonedas');

async function getMonedas() {
    try {
        const res = await fetch("https://mindicador.cl/api");

        let monedas = []

        monedas = await res.json();

        console.log(monedas);
        
        

        selectMonedas.innerHTML += `<option selected>Seleccione moneda</option>
        <option value="${monedas.dolar.valor}"> ${monedas.dolar.codigo}</option>, 
        <option value="${monedas.ipc.valor}"> ${monedas.ipc.codigo}</option>, 
        <option value="${monedas.utm.valor}"> ${monedas.utm.codigo}</option>, 
        <option value="${monedas.ivp.valor}"> ${monedas.ivp.codigo}</option>, 
        <option value="${monedas.uf.valor}"> ${monedas.uf.codigo}</option>, 
        <option value="${monedas.euro.valor}"> ${monedas.euro.codigo}</option>
        `;

        
    
    } catch (e) {
        alert(e.message);
    }

}
getMonedas();


btnBuscar.addEventListener("click", () => {
    //valor ingresado en clp
    const clpValue = document.querySelector('#clpValue').value;
    console.log(clpValue);
    
    //donde se muestra la conversion final
    const resultado = document.querySelector('#resultado');
    
    // valor ingresado multiplicado por el valor de la divisa y se guarda en variable
    let convert = clpValue * parseFloat(selectMonedas.value);

    // toFixed (2) para que muestre como resultado solo 2 decimales
    resultado.innerHTML = 'CLP$ ' + convert.toFixed(2);
    

});



// Grafico miGrafico
async function getMonedasPorFecha() {
    const endpoint = "https://mindicador.cl/api/dolar"; 
    const res = await fetch(endpoint);
    const monedas = await res.json();
    return monedas;
}

function configuracionDeLaGrafica(monedas) {
    // Creamos las variables necesarias para el objeto de configuración const tipoDeGrafica = "line";
    const tipoDeGrafica = "line";
    const fechas = monedas.serie.map((moneda) => moneda.fecha); 
    const titulo = "Historial valor Dolar";
    const colorDeLinea = "blue";
    const valores = monedas.serie.map((moneda) => {
    const valor = moneda.valor;
    return Number(valor); 
    });


    // Creamos el objeto de configuración usando las variables anteriores
    const config = { 
        type: tipoDeGrafica, 
        data: {
            labels: fechas,
            datasets: [
                {
                    label: titulo,
                    backgroundColor: colorDeLinea,
                    data: valores
                    } 
                ]
            } 
        };
        return config; 
}

async function renderGrafica() {
    const monedas = await getMonedasPorFecha();
    const config = configuracionDeLaGrafica(monedas); 
    const chartDOM = document.getElementById("miGrafico");
    new Chart(chartDOM, config);
    }
// grafico

renderGrafica();

