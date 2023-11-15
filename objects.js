

class AlgoritmoGenetico {

    constructor(maxGeneraciones, cantidadIndividuos, porcentajeSeleccion, porcentajeMutar, porcentajeMutacionPixel, porcentajeCombinar, target, width, height, fnAnimate) {
        this.maxGeneraciones = maxGeneraciones;
		this.cantidadIndividuos = cantidadIndividuos;
		this.porcentajeSeleccion = porcentajeSeleccion;
		this.porcentajeMutar = porcentajeMutar;
		this.porcentajeMutacionPixel = porcentajeMutacionPixel;
		this.porcentajeCombinar = porcentajeCombinar;
		this.target = target;
		this.width = width;
		this.height = height;
		this.individuos = new Array();
		this.mejorGeneracion = new Array();
		this.AnimateFunction = fnAnimate;
		this.timerEvolucion = null;
		this.generacionActual = 0;
		this.tiempoPorGeneracion = new Array();
    }
	
	crearPoblacionInicial() {
        for (let i = 0; i < this.cantidadIndividuos; i++) {
            this.individuos.push(new Individuo(this.target, this.width, this.height, 1));
        }
	}


    calculateMassiveFitness(){      // calcula el fitness de todos los individuos de la generacion
        for(let i = 0; i < this.individuos.length; i++) {
            this.individuos[i].fitness();
        }
    }

    selection(){
        this.individuos.sort((a, b) => b.score - a.score);  // se acomoda el array en base al score de
                                                            // los individuos de mayor a menor
        const numberOfElementsToAdd = Math.ceil((this.porcentajeSeleccion / 100) * this.individuos.length);

        return this.individuos.slice(0, numberOfElementsToAdd);
    }
	
    rouletteWheelSelection() {
		const totalFitness = this.individuos.reduce((acc, individuo) => acc + 1 / individuo.score, 0);  
		const rand = Math.random() * totalFitness; 
		let runningSum = 0;
		let seleccion = null;

		for (let i = 0; i < this.individuos.length; i++) {
			const fitness = 1 / this.individuos[i].score;
			runningSum += fitness;
			if (runningSum >= rand) {
				seleccion = this.individuos[i];
				break;
			}
		}
		return seleccion;
	}	
	

	crossover(numeroNuevosHijos) {     
		const cantPixeles = this.width * this.height;
		let hijos = [];
		//const numeroNuevosHijos = Math.ceil((this.porcentajeCombinar / 100) * this.individuos.length);
		for (var i = 0; i < numeroNuevosHijos; i++) {
			
			let padre1 = this.rouletteWheelSelection();
			let padre2 = this.rouletteWheelSelection();

			
			let start = Math.floor(Math.random() * cantPixeles);
			let end = Math.floor(Math.random() * (cantPixeles - start)) + start;

			start = start * 4;
			end = end * 4;

			let valueChild = padre1.value.slice(0, start);
			
			let hijo = padre1.clonar();
			for (let i = 0; i < start; i++) {
			  hijo.value[i] = padre1.value[i];
			}
			
			for (let i = start; i < end; i++) {
			  hijo.value[i] = padre2.value[i];
			}
			for (let i = end; i < padre1.value.length; i++) {
			  hijo.value[i] = padre1.value[i];
			}
			hijos.push(hijo);
		}
		return hijos;
	}
	
	evolucion() {
		if (this.timerEvolucion != null) {
			clearTimeout(this.timerEvolucion);
			this.timerEvolucion = null;
		}
		if (this.generacionActual < this.maxGeneraciones) {
				
			var startDate = new Date();
			
			//inicio la evolucion
			let nuevaPoblacion;
			
			//1. Seleccionar
			nuevaPoblacion = this.selection(); //10
			
			//2. cruzar
			let hijos = this.crossover(this.cantidadIndividuos-nuevaPoblacion.length); //90
			for (var i = 0; i < hijos.length; i++) {
				nuevaPoblacion.push(hijos[i]);
			}

			//3. mutar
			const cantidadMutacion = Math.ceil((this.porcentajeMutar / 100) * this.cantidadIndividuos); //5
			for (var i = 0; i < cantidadMutacion; i++) {
				const selIndividuoMutar = Math.floor(Math.random() * this.cantidadIndividuos);
				nuevaPoblacion[selIndividuoMutar].mutar(this.porcentajeMutacionPixel);
			}
			//4. formar siguiente generacion
			this.individuos = nuevaPoblacion;
			for (var i = 0; i < this.cantidadIndividuos; i++) {
				this.individuos[i].gen = this.generacionActual;
				this.individuos[i].id = i;
				this.individuos[i].revisar();
			}
			this.calculateMassiveFitness();

			//5. escoger los mejores
			this.individuos.sort((a, b) => b.score - a.score); 
					
			this.mejorGeneracion.push(this.individuos[0]);
			//termina la evolucion
			
			var endDate   = new Date();
			var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
			this.tiempoPorGeneracion.push(seconds);
			
			this.AnimateFunction(this.individuos[0], this.generacionActual);
			this.generacionActual += 1;
			this.timerEvolucion = setTimeout(Evolucion, 1000);
		}
	}
	
    start(){
        console.log('\nStarting...\n');
		this.crearPoblacionInicial();
		this.calculateMassiveFitness();
		
		//evolución
		this.generacionActual = 0;
		this.evolucion();
/*		
		this.generacionActual = 0;
		while (this.generacionActual < this.maxGeneraciones) {
			this.evolucion();
		}
*/		
    }
}

class Individuo {

	// width = mat.matSize[1]   50               height = mat.matSize[0]  30
    // fila*width*4  + columna * 4
    constructor(target, width, height, gen) {
        this.target = target;
        this.score = 0;
		this.diferencia = 0;
        this.gen = gen;
		this.id = 0;
		this.width = width;
		this.height = height;
		this.timer = 0;
		const pixelArray = new Uint8Array(width * height * 4);
		for (let iPixel = 0; iPixel < width * height; iPixel++) {
			var random = Math.random();
			pixelArray[(iPixel*4)] = random < 0.5 ? 0:255;
			pixelArray[(iPixel*4)+1] = random < 0.5 ? 0:255;
			pixelArray[(iPixel*4)+2] = random < 0.5 ? 0:255;
			pixelArray[(iPixel*4)+3] = 255;
		}
        this.value = pixelArray;
    }

    fitness() {
		this.score = 0;
        for (let i = 0; i < this.value.length; i++) {
            if (this.value[i] != this.target[i]) {
                this.score += 1;//Math.abs(this.value[i] - this.target[i]);
            }
        }
		this.diferencia = this.score;
		if(this.score != 0) {
			this.score = 1 / this.score;  
		}
        return this.score;
    }

	clonar() {
		let nuevo = new Individuo(this.target, this.width, this.height, this.gen);
		for (var i = 0; i < this.value.length; i++) {
			nuevo.value[i] = this.value[i];
		}
		return nuevo;
	}

    mutar(porcentajeMutacionPixel){
		const cantPixeles = this.width * this.height;
		const cantMutar = 1 + Math.floor((Math.random() * Math.floor(cantPixeles*porcentajeMutacionPixel/100)));
		
		for (let iMutacion = 0; iMutacion < cantMutar; iMutacion++) {
			const iPixel = Math.floor(Math.random() * cantPixeles);
			if (this.value[iPixel*4] == 255) {
				this.value[(iPixel*4)] = 0;
				this.value[(iPixel*4)+1] = 0;
				this.value[(iPixel*4)+2] = 0;
			}
			else {
				this.value[(iPixel*4)] = 255;
				this.value[(iPixel*4)+1] = 255;
				this.value[(iPixel*4)+2] = 255;
			}
		}
    }
	
	revisar() {
		var error = -1;
		const cantPixeles = this.width * this.height;
		for (var iPixel = 0; iPixel < cantPixeles; iPixel++) {
			if (this.value[iPixel*4] == 255 && 
			    (this.value[(iPixel*4)+1] == 0 || this.value[(iPixel*4)+2] == 0)) {
				error = iPixel;
				break;
			}
			else if (this.value[iPixel*4] == 0 && 
			    (this.value[(iPixel*4)+1] == 255 || this.value[(iPixel*4)+2] == 255)) {
				error = iPixel;
				break;
			}
			else if (this.value[iPixel*4 +3] != 255) {
				error = iPixel;
				break;
			}
		}
		if (error != -1) {
			console.log("Error revisando individuo: " + this.gen + ", " + this.id + ", " + error);
		}
		return iPixel;
	}
}

//export { AlgoritmoGenetico, Individuo };