const Ajv = require('ajv');
const ajv= new Ajv();

const schema={
    type: "object",
    properties: {
        name:{
            type: "string",
            minLength: 3,
            maxLength: 30,
        },
        email:{
            type: "string",
            pattern : "^[^\s@]+@[^\s@]+\.[^\s@]+$"
        },
        password:{
            type: "string",
            minLength: 6
        }
    },
    required: ["name","password","email"],
};

const validator = ajv.compile(schema);
module.exports = validator