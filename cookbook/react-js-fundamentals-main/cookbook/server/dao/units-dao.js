"use strict";
const fs = require("fs");
const path = require("path");

const crypto = require("crypto");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "units.json");

class UnitsDao {
    constructor(storagePath) {
        this.unitsStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
    }

    async getUnit(id) {
        let unitList = await this._loadAllUnits();
        const result = unitList.find((b) => b.id === id);
        return result;
    }

    async listUnits() {
        let unitsList = await this._loadAllUnits();
        return unitsList;
    }

    async _loadAllUnits() {
        let unitsList;
        try {
            unitsList = JSON.parse(await rf(this._getStorageLocation()));
        } catch (e) {
            if (e.code === "ENOENT") {
                console.info("No storage found, initializing new one...");
                unitsList = [];
            } else {
                throw new Error(
                    "Unable to read from storage. Wrong data format. " +
                    this._getStorageLocation()
                );
            }
        }
        console.log(unitsList);
        return unitsList;
    }

    _getStorageLocation() {
        return this.unitsStoragePath;
    }
}

module.exports = UnitsDao;
