class RAM {
    static memory = new Map();

    static set(key, value) {
        this.memory.set(key, value);
    }

    static get(key) {
        return this.memory.get(key);
    }

    static delete(key) {
        return this.memory.delete(key);
    }

    static clear() {
        this.memory.clear();
    }
}

module.exports = RAM;