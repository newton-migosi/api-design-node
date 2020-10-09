class DataStore {
    constructor() {
        this.dataset = {};
        this.index = 0;
    }

    get next_index() {
        return ++this.index;
    }

    insert(datapoint) {
        const key = this.next_index;
        Object.assign(this.dataset, {key : datapoint});
        return {key: datapoint};
    }

    update(key, updates) {
        Object.assign(this.dataset[key], updates);
        return {key : this.dataset[key]}
    }

    remove(key) {
        const datapoint = this.find(key);
        delete this.dataset[key];
        return datapoint;
    }

    find(key) {
        return {key: this.dataset[key]} || {};
    }

    contains(key) {
        return key in this.dataset;
    }
}

module.exports = DataStore;