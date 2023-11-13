import { Poblacion, Generacion, Individuo } from './objects.js';

const canvas = document.getElementById('canvasOutput');
const ctx = canvas.getContext('2d');
canvas.width = 450;
canvas.height = 300;
const imgInput = document.getElementById('imageInput');
const image = new Image();
const button = document.getElementById('input-button');
const maxGens = document.getElementById('input1');      // maximo de generaciones
const individuos = document.getElementById('input2');   // individuos de la poblacion
const percIndivsSelected = document.getElementById('input3');   // % individuos seleccionados por generacion
const percIndivsMutb = document.getElementById('input4');   // % individuos mutables
const percIndivsComb = document.getElementById('input5');   // % individuos combinables
const numGen = 0;
const found = false;

// mat.matSize = (height, length)

function createInitialGen(){

    var gen = new Generacion(numGen+1, individuos, mat);

}

function start(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const mat = cv.imread(scannedImg);
    const width = mat.matSize[1];
    const height = mat.matSize[0];

    var poblacion = new Poblacion(parseInt(maxGens.value));
    console.log('\nStarting...\n');
    createInitialGen();
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
})

function verifyParameters(){
    if(maxGens.value != '' && individuos.value != '' && percIndivsSelected.value != ''
    && percIndivsMutb.value != '' && percIndivsComb.value != ''){
        let percsParameters = parseInt(percIndivsSelected.value) + parseInt(percIndivsMutb.value) + parseInt(percIndivsComb.value);
        console.log(percsParameters);
        if(percsParameters != 100){
            alert('ERROR: La suma de los porcentajes ingresados debe representar un 100%. Inténtelo de nuevo!');
        } else{
            start();
        }
    } else{
        alert('ERROR: El algoritmo no puede iniciar hasta que se llenen todos los requisitos solicitados. Inténtelo de nuevo!');
    }
}
