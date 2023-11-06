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

function start(){

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
        if(percIndivsSelected.value + percIndivsMutb.value + percIndivsComb.value != 100){
            alert('ERROR: La suma de los porcentajes ingresados debe representar un 100%. Inténtelo de nuevo!');
        } else{
            start();
        }
    } else{
        alert('ERROR: El algoritmo no puede iniciar hasta que se llenen todos los requisitos solicitados. Inténtelo de nuevo!');
    }
}
