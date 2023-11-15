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
const numGen = 1;
const found = false;

var targetImage = null;
var widthImage = null;
var heightImage = null;

// mat.matSize = (height, length)

function algorithm(gen){    // simulacion
    // setTimeout(#)
    gen.calculateMassiveFitness();
    var matingPool = gen.selection(percIndivsSelected);
    var cruzables = gen.selectCrossable(percIndivsComb);
    var mutables = gen.selectMutable(percIndivsMutb);
    for(let i = 0; i < mutables.length; i++){
        mutables[i].mutate();
    }
    /*
    .
    .
    .
    */
    var best = gen.best;
    cv.imshow('canvasOutput', best);
    numGen += 1;
    algorithm(new Generacion(numGen, individuos, mat));
}

function createInitialGen(){

    var gen = new Generacion(numGen, individuos, mat);
    algorithm(gen);

}

function startAlgorithm(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);

	var porcentajeMutacionPixel = 0.01;
    var algoritmo = new AlgoritmoGenetico(parseInt(maxGens.value), parseInt(individuos.value), parseInt(percIndivsSelected.value), parseInt(percIndivsMutb.value), 
	                                      porcentajeMutacionPixel, parseInt(percIndivsComb.value), targetImage.data, widthImage, heightImage);
	
    algoritmo.start();
	for (var i = 0; i < algoritmo.mejorGeneracion.length; i++) {
		var best = algoritmo.mejorGeneracion[i];
		cv.imshow('canvasOutput', best.value);
	}
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
