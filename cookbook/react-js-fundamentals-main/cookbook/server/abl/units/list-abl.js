const path = require("path");
const Ajv = require("ajv").default;
const UnitsDao = require("../../dao/units-dao");
let dao = new UnitsDao(
    path.join(__dirname, "..", "..", "storage", "units.json")
);

let schema = {
    type: "object",
    properties: {},
    required: [],
};

async function ListAbl(req, res) {
    try {
        const units = await dao.listUnits();
        res.json(units);
    } catch (e) {
        res.status(500).send(e);
    }
}

module.exports = ListAbl;
