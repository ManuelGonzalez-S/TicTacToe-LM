/**
 * Todas las casillas tienen la clase .casilla
 * 
 * Almacenamos todas las casillas, es decir, todos los divs que tienen clase 'casilla'
 * En total tenemos 9 casillas que van desde la 0 hasta la 8
 */
let casillas = document.getElementsByClassName("casilla");

/**
 * Creamos un array con arrays que contienen todas las combinaciones ganadoras
 * 
 * [0] => [0, 1, 2]
 * [1] => [3, 4, 5]
 * ...
 */
let combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

// Creamos un array por cada jugador para guardar las posiciones donde hayan seleccionado
let casillasX = [];
let casillasO = [];

// Control del jugador 1 o 2
// true hace referencia al turno del jugador X, y false al jugador O
let turnoJugador = true;

// Control de la puntuacion de cada jugador
let puntuacionX = 0;
let puntuacionO = 0;

/**
 * Funcion que se ejecuta cada vez que se pulsa sobre una ficha del tablero
 * @param --> numero de ficha
 * @return --> No
 */
function agregarFicha(numero){

    let hayVictoria;

    if(turnoJugador){
        casillas[numero].innerHTML='X';
        casillas[numero].classList += ' X'
        casillasX.push(numero);
        casillasX.sort();
    }else{
        casillas[numero].innerHTML='O';
        casillas[numero].classList += ' O'
        casillasO.push(numero);
        casillasO.sort();
    }

    /**
     * Se elimina el evento para evitar que se sobreescriba la ficha
     */
    casillas[numero].removeAttribute('onclick');

    hayVictoria = comprobarVictoria();

    if(!hayVictoria){
        cambiarTurno()
    }

}

/**
 * Funcion que sirve para comprobar si hay una victoria dependiendo del turno del jugador
 * @param --> No
 * @returns  --> boolean
 */
function comprobarVictoria(){

    let hayVictoria = false

    if(casillasX.length >= 3 || casillasO.length >= 3){

        // Se comprueba la victoria de cualquiera de los dos jugadores
        let victoriaX = comprobarVictoriaX();
        let victoriaO = comprobarVictoriaO();

        if(victoriaX){
            mostrarMensajeVictoria('X')
            asignarPuntuacion('X')
            noPermitirClicks();
            mostrarMensajeVictoria('X')

            hayVictoria = true
        }else if(victoriaO){
            mostrarMensajeVictoria('O')
            noPermitirClicks()
            asignarPuntuacion('O')
            mostrarMensajeVictoria('O')

            hayVictoria = true
        }
    }

    return hayVictoria;
}

/**
 * Funcion que comprueba la victoria del jugador X
 * @param --> No
 * @return --> boolean
 */
function comprobarVictoriaX(){
    let victoria = false;

    let valor1;
    let valor2;
    let valor3;

    let ficha1;
    let ficha2;
    let ficha3;
    
    // Mira dentro de cada array de combinacionesGanadoras
    for(combinacion in combinacionesGanadoras){
        valor1 = combinacionesGanadoras[combinacion][0]
        valor2 = combinacionesGanadoras[combinacion][1]
        valor3 = combinacionesGanadoras[combinacion][2]

        // Si se incluyen los tres valores, se añade una clase a la ficha
        if(casillasX.includes(valor1) && casillasX.includes(valor2) && casillasX.includes(valor3)){

            ficha1 = document.getElementsByClassName('casilla')[valor1];
            ficha2 = document.getElementsByClassName('casilla')[valor2];
            ficha3 = document.getElementsByClassName('casilla')[valor3];

            victoria = true
            ficha1.classList += ' ganadora'
            ficha2.classList += ' ganadora'
            ficha3.classList += ' ganadora'
        }
    }

    return victoria;
}

/**
 * Funcion que comprueba la victoria del jugador O
 * @param --> No
 * @return --> boolean
 */
function comprobarVictoriaO(){
    let victoria = false;

    let valor1;
    let valor2;
    let valor3;

    let ficha1;
    let ficha2;
    let ficha3;

    // Mira dentro de cada array de combinacionesGanadoras
    for(combinacion in combinacionesGanadoras){
        valor1 = combinacionesGanadoras[combinacion][0]
        valor2 = combinacionesGanadoras[combinacion][1]
        valor3 = combinacionesGanadoras[combinacion][2]
    
        // Si se incluyen los tres valores, se añade una clase a la ficha
        if(casillasO.includes(valor1) && casillasO.includes(valor2) && casillasO.includes(valor3)){

            ficha1 = document.getElementsByClassName('casilla')[valor1];
            ficha2 = document.getElementsByClassName('casilla')[valor2];
            ficha3 = document.getElementsByClassName('casilla')[valor3];

            victoria = true;
            ficha1.classList += ' ganadora'
            ficha2.classList += ' ganadora'
            ficha3.classList += ' ganadora'
                
        }
    }

    return victoria;
}

/**
 * Funcion que elimina los eventos de cada casilla
 * @param --> No
 * @return --> No
 */
function noPermitirClicks(){
    for(let i = 0;i < casillas.length; i++){
        casillas[i].removeAttribute('onclick')
    }
}

/**
 * Funcion que asigna una puntuacion al jugador dependiendo del valor del parametro
 * @param --> ganador (Jugador X o O)
 * @return -->
 */
function asignarPuntuacion(ganador){

    // Se modifica el contador en el html
    if(ganador == 'X'){

        let contador = document.getElementById('contX')
        puntuacionX = parseInt(contador.innerHTML)
        puntuacionX++;
        contador.innerHTML = puntuacionX;

    }else{

        let contador = document.getElementById('contO')
        puntuacionO = parseInt(contador.innerHTML)
        puntuacionO++;
        contador.innerHTML = puntuacionO;

    }

}

/**
 * Funcion que sirve para cambiar el turno y mostrarlo en el html
 * @param --> No
 * @return -->  No
 */
function cambiarTurno(){

    let turno = document.getElementById('turno');

    turno.innerHTML = 'Es el turno de las: '

    if(turnoJugador){
        turnoJugador = false;

        turno.innerHTML += 'O'
    }else{
        turnoJugador = true;

        turno.innerHTML += 'X'
    }
}

/**
 * Funcion que muestra un mensaje de victoria en el html
 * @param --> victorioso (Jugador X o O)
 * @return --> No
 */
function mostrarMensajeVictoria(victorioso){

    let turno = document.getElementById('turno');

        if(victorioso == 'X' || victorioso == 'O'){
            turno.innerHTML = 'Han ganado las: ' + victorioso + '!'
        }
}

/**
 * Funcion que vacia todas las casillas y quita todos los estilos mediante asignando una única clase
 * @param --> No
 * @return --> No
 */
function resetearTablero(){

    // Se vacian todas las posiciones
    casillasO = []
    casillasX = []

    for(let i = 0; i < casillas.length; i++){
        casillas[i].classList = 'casilla'
        casillas[i].innerHTML = " ";
        casillas[i].setAttribute('onclick', 'agregarFicha(' + i +')')
    }

    turno.innerHTML = 'Es el turno de las: ';

    cambiarTurno();

}

/**
 * Funcion que modifica la puntuacion a cero de ambos jugadores
 * @param --> No
 * @return --> No
 */
function resetearPuntuacion(){

        let contadorX = document.getElementById('contX')
        puntuacionX = parseInt(contadorX.innerHTML)
        puntuacionX = 0;
        contadorX.innerHTML = puntuacionX;

        let contadorO = document.getElementById('contO')
        puntuacionO = parseInt(contadorO.innerHTML)
        puntuacionO = 0;
        contadorO.innerHTML = puntuacionO;

    resetearTablero();

}

// Variable para modificar el fondo
let contadorFondo = 1;

/**
 * Funcion que sirve para modificar el fondo de la pagina web
 * @param --> No
 * @return --> No
 */
function cambiarFondo(){

    let body = document.getElementsByTagName('body')[0];

    body.style.backgroundImage = 'url(img/Fondo' + contadorFondo + '.jpg)';

    // Si el contador alcanza el maximo de imagenes, se resetea
    if(contadorFondo == 3){
        contadorFondo = 1;
    }else{
        contadorFondo++;
    }
}