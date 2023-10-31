const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 450;
canvas.height = 300;

const imgInput = document.getElementById('imageInput');
const image = new Image();
const button = document.getElementById('input-button');

imgInput.addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var imageSource = e.target.result;
            image.src = imageSource;
            // La variable "imageSource" contiene la URL de la imagen seleccionada.
            console.log(imageSource);
        };
        reader.readAsDataURL(file);
    }
});

image.addEventListener('load', function(){
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(scannedImage);
    const scannedData = scannedImage.data;
    for (let i = 0; i < scannedData.length(); i += 4){
        const total = scannedData[i] + scannedData[i+1] + scannedData[i+2]; // r,g,b
        const averageColorValue = total/3;
        scannedData[i] = averageColorValue;
        scannedData[i+1] = averageColorValue;
        scannedData[i+2] = averageColorValue;
    }
    scannedImage.data = scannedData;
    ctx.putImageData(scannedImage, 0, 0);
})

const maxGens = document.getElementById('input1');      // maximo de generaciones
const individuos = document.getElementById('input2');   // individuos de la poblacion
const percIndivsSelected = document.getElementById('input3');   // % individuos seleccionados por generacion
const percIndivsMutb = document.getElementById('input4');   // % individuos mutables
const percIndivsComb = document.getElementById('input5');   // % individuos combinables


function verifyParameters(){

    if(maxGens.value != '' && individuos.value != '' && percIndivsSelected.value != ''
    && percIndivsMutb.value != '' && percIndivsComb.value != ''){

        start()
    } else{
        alert('ERROR: El algoritmo no puede iniciar hasta que se llenen todos los requisitos solicitados. Inténtelo de nuevo!')
    }

}
