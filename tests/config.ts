import knex from '../helpers/db';

const rollbackMigrateAndFill = async () =>
    knex.migrate
        .rollback()
        // .then(() => knex.migrate.latest().then(() => knex.seed.run()));
        .then(() => knex.migrate.latest());

const prepareDatabase = (done: any): void => {
    rollbackMigrateAndFill().then(() => done());
};

export const useTestDatabase = ():void => {
    beforeEach(done => prepareDatabase(done));
    afterAll(() => knex.destroy());
};
