import { Poblacion, Generacion, Individuo } from './objects.js';

const canvas = document.getElementById('canvasOutput');
const ctx = canvas.getContext('2d');
canvas.width = 450;
canvas.height = 300;
const imgInput = document.getElementById('imageInput');
const image = new Image();
const maxGens = document.getElementById('input1');                  // maximo de generaciones
const individuos = document.getElementById('input2');               // individuos de la poblacion
const percIndivsSelected = document.getElementById('input3');       // % individuos seleccionados por generacion
const percIndivsMutb = document.getElementById('input4');           // % individuos mutables
const percIndivsComb = document.getElementById('input5');           // % individuos combinables
const numGen = 1;
const found = false;

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
    numGen += 1;
    algorithm(new Generacion(numGen, individuos, mat));
}

function createInitialGen(){

    var gen = new Generacion(numGen, individuos, mat);
    algorithm(gen);

}

function startAlgorithm(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var poblacion = new Poblacion(parseInt(maxGens.value));
    poblacion.start();
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
    const mat = cv.imread(scannedImg);
    const width = mat.matSize[1];
    const height = mat.matSize[0];
    const mutationX = (width*height*4)/3;   // un tercio del array
    const mutationY = 2*(mutationX);        // dos tercios del array
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
