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
        dept:{
            type: "string",
            minLength: 2,
            maxLength: 2,
        },
        id:{
            
        }
    },
    required: ["name","id","dept"],
    maxProperties: 3
};

const validator = ajv.compile(schema);
module.exports = validator