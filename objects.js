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

//export { Poblacion, Generacion, Individuo };