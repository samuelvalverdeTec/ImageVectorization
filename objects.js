class Poblacion {

    constructor(maxGeneraciones) {
        this.generaciones = [];         // array de generaciones
        this.max = maxGeneraciones;
    }

    // Other methods and properties
}

class Generacion {

    constructor(num, max, target) {
        this.individuos = [];           // array de individuos
        this.number = num;              // numero de generacion
        this.max = max;                 // maximo de individuos

        this.matingPool = [];           // array con los individuos seleccionados
        this.crossable = [];            // array con los individuos que se van a cruzar
        this.mutables = [];             // array con los individuos que van a mutar

        for (let i = 0; i < max; i += 1) {
            this.individuos.push(new Individuo(target, width, height));
        }
    }

    selection(percentage){

        this.individuos.sort((a, b) => b.score - a.score);  // se acomoda el array en base al score de
                                                            // los individuos de mayor a menor
        const numberOfElementsToAdd = Math.ceil((percentage / 100) * this.individuos.length);

        this.matingPool = this.individuos.slice(0, numberOfElementsToAdd);
    }

    selectCrossable(percentage){

        const numberOfElementsToSelect = Math.ceil((percentage / 100) * this.matingPool.length);

        // Fisher-Yates algorithm
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        this.crossable = this.matingPool.slice(0, numberOfElementsToSelect);
    }

    crossover(percentage){

    }

}

class Individuo {

	// width = mat.matSize[1]   50               height = mat.matSize[0]  30
    // fila*width*4  + columna * 4
    constructor(target, width, height) {
        this.target = target;
        this.score = 0;
        this.value = function() {
            const pixelArray = new Uint8Array(width * height * 4);
			for (var iPixel = 0; iPixel < width * height; iPixel++) {
				var random = Math.random();
				pixelArray[(iPixel*4)] = random < 0.5 ? 0:255;
				pixelArray[(iPixel*4)+1] = random < 0.5 ? 0:255;
				pixelArray[(iPixel*4)+2] = random < 0.5 ? 0:255;
				pixelArray[(iPixel*4)+3] = 255;
			}
        }
    }

    fitness() {
        for (let i = 0; i < min; i++) {
            if (this.value[i] != this.target[i]) {
                this.score += Math.abs(this.value[i] - this.target[i]);
                // diferencia += 1; opcion 2
            }
        }
        return this.score;
    }

    mutate(percentage){

    }

}

export { Poblacion, Generacion, Individuo };