class Light {
    constructor() {
        this.name = "light";
        this.description = "";
        this.power;
    }

    on() {
        this.power = true;
    }

    off() {
        this.power = false;
    }
}

//temporary Light object for testing.