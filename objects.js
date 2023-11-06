class Poblacion {

    constructor(metaIndiv) {
        this.generaciones = [];    // array de generaciones
        this.meta = metaIndiv;
    }

    // Other methods and properties
}

class Generacion {

    constructor(individuos) {
        this.individuos = [];
        this.id = 1;
    }

    // Other methods and properties
}

class Individuo {

    constructor() {
        this.score = 100;
    }

    // Other methods and properties
}

export { Poblacion, Generacion, Individuo };