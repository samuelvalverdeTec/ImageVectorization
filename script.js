//import { AlgoritmoGenetico, Individuo } from './objects.js';

const canvas = document.getElementById('canvasOutput');
const ctx = canvas.getContext('2d');
canvas.width = 21;
canvas.height = 10;
const imgInput = document.getElementById('imageInput');
const image = new Image();
const maxGens = document.getElementById('input1');                  // maximo de generaciones
const individuos = document.getElementById('input2');               // individuos de la poblacion
const percIndivsSelected = document.getElementById('input3');       // % individuos seleccionados por generacion
const percIndivsMutb = document.getElementById('input4');           // % individuos mutables
const percIndivsComb = document.getElementById('input5');           // % individuos combinables
const timerTotal = document.getElementById('timerTotal');
const divNumGen = document.getElementById('numGeneracion');
const numGen = 1;
const found = false;

var targetImage = null;
var widthImage = null;
var heightImage = null;
var algoritmoGen = null;

var timerSegundos = null;
var contadorSegundos = 0;


var infoGraficoPromScore = new Array();
var infoGraficoBestScore = new Array();

// mat.matSize = (height, length)

function MostrarGeneracion(individuo, gen) {
	reloadImage(individuo);
	console.log("mostrar generacion: " + individuo.score + ", " + individuo.diferencia +  ", " + individuo.gen +  ", " + individuo.id);
	
	let values = algoritmoGen.tiempoPorGeneracion;
	let sum = values.reduce((previous, current) => current += previous);
	let avg = sum / values.length;
	avg = (Math.round(avg * 10000) / 10000).toFixed(4);
	
	sum = 0;
	for (var i = 0; i < algoritmoGen.cantidadIndividuos; i++) {
		sum += algoritmoGen.individuos[i].score;
	}
	let avg2 = sum / algoritmoGen.cantidadIndividuos;
	avg2 = (Math.round(avg2 * 10000) / 10000).toFixed(4);
	
	infoGraficoPromScore.push([individuo.gen, avg2] );
	
	infoGraficoBestScore.push([individuo.gen, individuo.score] );	
	
	divNumGen.innerHTML = "Generación: " + individuo.gen + "<br>" + avg + " segs." + "<br>" + avg2;
	
	
}

function Evolucion() {
	algoritmoGen.evolucion();
}


function refrescarTimer() {
	contadorSegundos += 1;
	timerTotal.innerHTML = "Tiempo Total: \<br>" + contadorSegundos + " seg. ";
}


function startAlgorithm(){
	if (timerSegundos != null) {
		clearInterval(timerSegundos);
	}
	contadorSegundos = 0;
	timerSegundos = setInterval(refrescarTimer, 1000);
	
	
    ctx.clearRect(0, 0, canvas.width, canvas.height);

	var porcentajeMutacionPixel = 0.01;
    algoritmoGen = new AlgoritmoGenetico(parseInt(maxGens.value), parseInt(individuos.value), parseInt(percIndivsSelected.value), parseInt(percIndivsMutb.value), 
	                                      porcentajeMutacionPixel, parseInt(percIndivsComb.value), targetImage.data, widthImage, heightImage, MostrarGeneracion);
	
    algoritmoGen.start();
}

imgInput.addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var imageSource = e.target.result;
            image.src = imageSource;
        };
        reader.readAsDataURL(file);
    }
});

image.addEventListener('load', function(){
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const scannedImg = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.putImageData(scannedImg, 0, 0);
    // se inicializan variables globales dependientes de la imagen que se carga
    targetImage = cv.imread("canvasOutput");
    widthImage = targetImage.matSize[1];
    heightImage = targetImage.matSize[0];
})


function reloadImage(individuo) 
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);	
	let imgData = new ImageData(new Uint8ClampedArray(individuo.value), targetImage.cols, targetImage.rows);
	ctx.putImageData(imgData, 0, 0);	
}

function verifyParameters(){
    if(maxGens.value != '' && individuos.value != '' && percIndivsSelected.value != ''
    && percIndivsMutb.value != '' && percIndivsComb.value != ''){
        let percsParameters = parseInt(percIndivsSelected.value) + parseInt(percIndivsMutb.value) + parseInt(percIndivsComb.value);
        console.log(percsParameters);
        if(percsParameters != 100){
            alert('ERROR: La suma de los porcentajes ingresados debe representar un 100%. Inténtelo de nuevo!');
        } else{
            startAlgorithm();
        }
    } else{
        alert('ERROR: El algoritmo no puede iniciar hasta que se llenen todos los requisitos solicitados. Inténtelo de nuevo!');
    }
}
