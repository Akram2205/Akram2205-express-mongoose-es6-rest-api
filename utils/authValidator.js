const Ajv = require('ajv');
const ajv= new Ajv();

const schema={
    type: "object",
    properties: {
        password:{
            type: "string",
            minLength: 6,
        },
        email:{
            type: "string",
            pattern : "^[^\s@]+@[^\s@]+\.[^\s@]+$"
        },

    },
    required: ["password","email"],
    maxProperties: 2
};

const validator = ajv.compile(schema);
module.exports = validator