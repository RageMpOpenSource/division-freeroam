const EventEmitter = require("events");

class InventoryScript extends EventEmitter {
    constructor() {
        super();
        this._items = {};
    }

    /**
     * Adds an item to the inventory system.
     * @param {string} key         Item identifier, such as "item_medkit".
     * @param {string} name        Item name, such as "Medkit".
     * @param {string} description Item description, such as "Gives you 10 health".
     * @param {function} [onUse]   Optional - Function that gets called when the item is used.
     * @param {function} [nameFunc] Optional - Function that gets called when getItemName() is used.
     * @param {function} [descFunc] Optional - Function that gets called when getItemDescription() is used.
     * @return {object} The added item, will be null if there are any mistakes.
     * @fires itemDefined
     */
    addItem(key, name, description, onUse, nameFunc, descFunc) {
        if (typeof key !== "string" || key.length < 1) {
            console.error("addItem: Key was not a string/was an empty string.");
            return null;
        } else if (typeof name !== "string" || name.length < 1) {
            console.error(`addItem: Name was not a string/was an empty string. (${key})`);
            return null;
        } else if (typeof description !== "string") {
            console.error(`addItem: Description was not a string. (${key})`);
            return null;
        } else if (this._items.hasOwnProperty(key)) {
            console.error(`addItem: Item (${key}) already exists.`);
            return null;
        }

        this._items[key] = {
            name: name,
            description: description,
            onUse: onUse,
            nameFunc: nameFunc,
            descFunc: descFunc
        };

        this.emit("itemDefined", key, name, description);
        return this._items[key];
    }

    /**
     * Returns whether the specified key is a registered or not.
     * @param  {string}  key Item identifier, such as "item_medkit".
     * @return {Boolean}     True if registered, false otherwise.
     */
    hasItem(key) {
        return this._items.hasOwnProperty(key);
    }

    /**
     * Returns the specified item.
     * @param  {string} key Item identifier, such as "item_medkit".
     * @return {object}     The item at the specified key, will be undefined if the key isn't registered.
     */
    getItem(key) {
        return this._items[key];
    }

    /**
     * Returns all registered item identifiers.
     * @return {string[]} An array of registered item identifiers.
     */
    getAllItems() {
        return Object.keys(this._items);
    }

    /**
     * Returns the human readable name of the specified item.
     * @param  {string} key Item identifier, such as "item_medkit".
     * @param  {string} [data] Optional - An object that has item attributes.
     * @return {string}     Human readable item name.
     */
    getItemName(key, data) {
        return this.hasItem(key) ? (typeof this._items[key].nameFunc === "function" ? this._items[key].nameFunc(data) : this._items[key].name) : "Invalid Item";
    }

    /**
     * Returns the description of the specified item.
     * @param  {string} key Item identifier, such as "item_medkit".
     * @param  {string} [data] Optional - An object that has item attributes.
     * @return {string}     Item's description.
     */
    getItemDescription(key, data) {
        return this.hasItem(key) ? (typeof this._items[key].descFunc === "function" ? this._items[key].descFunc(data) : this._items[key].description) : "";
    }
}

const inventoryScript = new InventoryScript();

module.exports = inventoryScript;