// Raúl Acosta 27-09-2021 https://github.com/RaulAcosta95/Problema_1_Prueba_Tecnica_Neubox
//Formateado para su facil comprensión
let inputArchivo = document.getElementById('archivo.txt');
let divValidación = document.getElementById('validación');

inputArchivo.addEventListener('change', validadorDeArchivo, false);

function validadorDeArchivo(e){
    let rutaYNombreArchivo = inputArchivo.value;

    if(!/(.txt)$/i.test(rutaYNombreArchivo)){

        console.log('No Acepta el archivo');
        alert('Por favor, sube un archivo con la extensión .txt');
        console.log('Borra el archivo');
        inputArchivo.value = '';
        divValidación.innerHTML="";
        return false;

    }else{

        if(inputArchivo.files && inputArchivo.files[0]) {
            //Extraer contenido de txt
            let archivo = e.target.files[0];
            let lector = new FileReader();

            lector.onload = function(e) {
              let contenido = e.target.result;
              validadorContenidoArchivo(contenido);
            };

            lector.readAsText(archivo);

        }
    }
}

function validadorContenidoArchivo(contenido) {

    let líneasContenido = contenido.split('\n');
    let númeroRondas = líneasContenido[0];
    let arrayPuntajes;
    if(númeroRondas != (líneasContenido.length-1)){
        alert('Número de Rondas Diferente a Cantidad de Puntajes \n'+númeroRondas + " != " + (líneasContenido.length-1));
        console.log(númeroRondas + " != " + (líneasContenido.length-1));
        return false;
    }else if(númeroRondas <0 || númeroRondas > 10000){
        alert('Número de Rondas no Válido');
        console.log('Número de Rondas no Válido' + númeroRondas);
    }
    for (let i = 1; i < líneasContenido.length; i++) {
        
        let puntajes = líneasContenido[i].split(' ');
        let puntajePrimerJugador = puntajes[0];
        let puntajeSegundoJugador = puntajes[1];
        if(isNaN(puntajePrimerJugador) || isNaN(puntajeSegundoJugador)){
            alert(puntajePrimerJugador + " o " + puntajeSegundoJugador + " no es un número");
            console.log(puntajePrimerJugador + " o " + puntajeSegundoJugador + " no es un número");
            return false;
        } else{
        }
    }
    identificaGanador(líneasContenido);
}
//A partir de aquí identifica el ganador y su ventaja
function identificaGanador(líneasContenido){
    console.log('Puede identificar ganador');
    let arrayDiferencias=new Array()

    for (let i = 1; i < líneasContenido.length; i++) {

        let puntajes = líneasContenido[i].split(' ');
        let puntajePrimerJugador = Number(puntajes[0]);
        let puntajeSegundoJugador = Number(puntajes[1]);

        //-1 porque i empieza en 1
        if(puntajePrimerJugador > puntajeSegundoJugador){
            let diferencia = puntajePrimerJugador-puntajeSegundoJugador;

            arrayDiferencias[i-1]=new Array()
            arrayDiferencias[i-1][0]=1;
            arrayDiferencias[i-1][1]=diferencia;

        } else if(puntajeSegundoJugador > puntajePrimerJugador){
            let diferencia = puntajeSegundoJugador-puntajePrimerJugador;

            arrayDiferencias[i-1]=new Array()
            arrayDiferencias[i-1][0]=2;
            arrayDiferencias[i-1][1]=diferencia;

        } else {
            console.log('No hay un ganador');
        }
    }

    // Encuentra la mayor ventaja
    let max=0;
    for (let i = 0; i < arrayDiferencias.length; i++) {
        // Recorres el valor del array «numeros»:
        for ( let numero of arrayDiferencias[i] ) {
            // Evalúa si «max» es menor que «numero» para almacenar
            // en él el número más grande hasta el momento:
            if (max < numero){
                max = numero;
            }
        }
    }

    // Encuentra el jugador con la mayor ventaja
    for (let i = 0; i < arrayDiferencias.length; i++) {
        // Recorres el valor del array «numeros»:
        if(arrayDiferencias[i][1] == max){
            console.log(arrayDiferencias[i][0]);
            console.log(arrayDiferencias[i][1]);
            muestraEnPantallaValidación(arrayDiferencias[i][0],arrayDiferencias[i][1]);
        }
    }
}

function muestraEnPantallaValidación(jugadorVictorioso, ventaja){
    divValidación.innerHTML=`<p>${jugadorVictorioso}, ${ventaja}</p>`;
    generaBotonDescarga(`${jugadorVictorioso}, ${ventaja}`);
}

function generaBotonDescarga(text){
    let divDescarga = document.getElementById('divDescarga');
    divDescarga.innerHTML = `<input type="button" id="dwn-btn" value="Descargar archivo"/>`;
    // Start file download.
    document.getElementById("dwn-btn").addEventListener("click", function(){
        // Generate download of hello.txt file with some content
        let filename = "resultado.txt";
        download(filename, text);
    }, false);
}

function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

