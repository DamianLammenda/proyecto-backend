const knexConfig = require("../config");
const knex = require("knex")(knexConfig);

knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.float("price").notNullable();
    table.string("thumbnail").notNullable();
    }).then(() => console.log("Tabla creada"))
    .catch((err) => { console.log(err); throw err })
    