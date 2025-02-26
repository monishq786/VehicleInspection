const cds = require('@sap/cds')





async function getDataFromTable({ tableName, conditions = null, columns = null }) {
    try {
        const database = await cds.connect.to('db');
        const entity = database.entities[tableName];
        console.log("=======================>",tableName)
        if (!entity) {
            throw new Error(`Table "${tableName}" not found in the service.`);
        }

        let query = SELECT.from(entity);

        if (columns) {
            query = query.columns(columns);
        }

        if (conditions) {
            if (Array.isArray(conditions)) {
                conditions.forEach(condition => {
                    if (condition.length === 3) {
                        const [columnName, operator, value] = condition;
                        query = query.where({ [`${columnName}`]: { [`${operator}`]: value } });
                    } else {
                        throw new Error(`Invalid condition format: ${JSON.stringify(condition)}`);
                    }
                });
            } else {
                throw new Error('Conditions should be an array of conditions.');
            }
        }

        const allData = await cds.tx(async tx => {
            return await tx.run(query);
        });
        console.log("=======================>",allData)
        return allData;

    } catch (error) {
        throw new Error(`Error in getDataFromTable(): ${error.message}`);
    }
}
module.exports = {getDataFromTable}