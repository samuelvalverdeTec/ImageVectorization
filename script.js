//import { Poblacion, Generacion, Individuo } from './objects.js';

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

class Poblacion {

    constructor(maxGeneraciones) {
        this.generaciones = [];    // array de generaciones
        this.max = maxGeneraciones;
    }

    // Other methods and properties
}

class Generacion {

    constructor(size, target) {
        this.individuos = [];
        this.number = 1;            // numero de generacion
        this.size = size || 1;

        for (let i = 0; i < size; i += 1) {
            this.individuos.push(new Individuo(target, canvas.width, canvas.height));
        }
    }

    // Other methods and properties
}

class Individuo {

    constructor(target, width, height) {
        this.target = target;
        this.match = 0;
        this.value = function() {

            const pixelArray = new Array(height);
            for (let y = 0; y < height; y++) {
                pixelArray[y] = new Array(width);

                for (let x = 0; x < width; x++) {
                    const red = Math.random() < 0.5 ? 0 : 255;   // 0 or 255
                    const green = Math.random() < 0.5 ? 0 : 255;   // 0 or 255
                    const blue = Math.random() < 0.5 ? 0 : 255;   // 0 or 255
                    const alpha = 1;
                    pixelArray[y][x] = [red, green, blue, alpha];
                }
            }

        }
    }

    fitness(){

    }
}

function start(){

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    var poblacion = new Poblacion(parseInt(maxGens.value));
    console.log('Starting........')

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
    const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.putImageData(scannedImage, 0, 0);
})
function paramsToInt(){
    console.log('Parameters to int')
    maxGens.value = parseInt(maxGens.value);
    individuos.value = parseInt(individuos.value);
    percIndivsSelected.value = parseInt(percIndivsSelected.value);
    percIndivsMutb.value = parseInt(percIndivsMutb.value);
    percIndivsComb.value = parseInt(percIndivsComb.value);
}
function verifyParameters(){
    if(maxGens.value != '' && individuos.value != '' && percIndivsSelected.value != ''
    && percIndivsMutb.value != '' && percIndivsComb.value != ''){
        paramsToInt();
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
