class Poblacion {

    constructor(maxGeneraciones) {
        this.generaciones = [];         // array de generaciones
        this.max = maxGeneraciones;
    }

    start(){
        console.log('\nStarting...\n');
        createInitialGen();
    }
}

class Generacion {

    constructor(num, maximo, target) {
        this.individuos = [];           // array de individuos
        this.number = num;              // numero de generacion
        this.max = maximo;              // maximo de individuos
        this.best = undefined;          // mejor individuo, este tendra el display en la interfaz

        this.matingPool = [];           // array con los individuos seleccionados
        this.crossable = [];            // array con los individuos que se van a cruzar
        this.crossed = [];
        this.mutables = [];             // array con los individuos que van a mutar
        this.mutated = [];

        for (let i = 0; i < max; i++) {
            this.individuos.push(new Individuo(target, width, height, this.number));
        }
    }

    calculateMassiveFitness(){      // calcula el fitness de todos los individuos de la generacion

        for(let i = 0; i < this.individuos.length; i++) {
            this.individuos[i].fitness();
        }
    }

    selection(percentage){

        this.individuos.sort((a, b) => b.score - a.score);  // se acomoda el array en base al score de
                                                            // los individuos de mayor a menor
        const numberOfElementsToAdd = Math.ceil((percentage / 100) * this.individuos.length);

        this.matingPool = this.individuos.slice(0, numberOfElementsToAdd);
        
        return this.matingPool;
    }

    selectCrossable(percentage){

        const numberOfElementsToSelect = Math.ceil((percentage / 100) * this.matingPool.length);

        // Fisher-Yates algorithm
        for (let i = this.matingPool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.matingPool[i], this.matingPool[j]] = [this.matingPool[j], this.matingPool[i]];
        }

        this.crossable = this.matingPool.slice(0, numberOfElementsToSelect);

        return this.crossable;
    }

    crossover(){
        return this.crossed;
    }

    selectMutable(percentage){  // incompleto, ahorita es un copy paste de selectCrossable por lo que si se deja asi estaria
                                // agregando parte de los individuos agregados a this.crossable en this.mutable

        const numberOfElementsToSelect = Math.ceil((percentage / 100) * this.matingPool.length);

        // Fisher-Yates algorithm
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        this.mutable = this.matingPool.slice(0, numberOfElementsToSelect);

        return this.mutable;
    }

    mutate(){
        // mutar en generacion o en individuo?
    }

}

class Individuo {

	// width = mat.matSize[1]   50               height = mat.matSize[0]  30
    // fila*width*4  + columna * 4
    constructor(target, width, height, gen) {
        this.target = target;
        this.score = 0;
        this.gen = gen
        this.value = function() {
            const pixelArray = new Uint8Array(width * height * 4);

            for (let iPixel = 0; iPixel < width * height; iPixel++) {
				var random = Math.random();
				pixelArray[(iPixel*4)] = random < 0.5 ? 0:255;
				pixelArray[(iPixel*4)+1] = random < 0.5 ? 0:255;
				pixelArray[(iPixel*4)+2] = random < 0.5 ? 0:255;
				pixelArray[(iPixel*4)+3] = 255;
			}

            return pixelArray;
        }
    }

    fitness() {
        for (let i = 0; i < this.value.length; i++) {
            if (this.value[i] != this.target[i]) {
                this.score += Math.abs(this.value[i] - this.target[i]);
                // diferencia += 1; opcion 2
            }
        }
        return this.score;
    }

    mutate(startIndex, endIndex){
        // se calcula el numero de pixeles a revolver
        const numPixelsToScramble = Math.floor((endIndex - startIndex + 1) / 4);

        // se generan indices random
        var randomIndices = [];
        for (let i = 0; i < numPixelsToScramble; i++) {
            const randomPixelIndex = Math.floor(Math.random() * numPixelsToScramble) * 4;
            randomIndices.push(randomPixelIndex);
        }

        // se revuelven los pixeles
        for (const randomIndex of randomIndices) {
            for (let i = 0; i < 4; i++) {
                if(i < 3){
                    const pixelIndex = startIndex + randomIndex + i;
                    // de 0 a 255 y viceversa
                    this.value[pixelIndex] = Math.abs(255 - this.value[pixelIndex]);
                } else{
                    continue
                }
            }
        }
    }
}

export { Poblacion, Generacion, Individuo };