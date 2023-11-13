const path = require("path");
const Ajv = require("ajv").default;
const UnitsDao = require("../../dao/units-dao");
let dao = new UnitsDao(
    path.join(__dirname, "..", "..", "storage", "units.json")
);

let schema = {
    type: "object",
    properties: {
        id: { type: "string" },
    },
    required: ["id"],
};

async function GetAbl(req, res) {
    try {
        const ajv = new Ajv();
        const body = req.query.id ? req.query : req.body;
        const valid = ajv.validate(schema, body);
        if (valid) {
            const unitId = body.id;
            const unit = await dao.getUnit(unitId);
            if (!unit) {
                res
                    .status(400)
                    .send({ error: `Unit with id '${unitId}' doesn't exist.` });
            }
            res.json(unit);
        } else {
            res.status(400).send({
                errorMessage: "validation of input failed",
                params: body,
                reason: ajv.errors,
            });
        }
    } catch (e) {
        res.status(500).send(e);
    }
}

module.exports = GetAbl;
