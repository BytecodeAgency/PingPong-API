import knex from '../helpers/db';

const rollbackMigrateAndFill = async () =>
    knex.migrate
        .rollback()
        .then(() => knex.migrate.latest());

const prepareDatabase = (done: any): void => {
    rollbackMigrateAndFill().then(() => done());
};

export const useTestDatabase = async (): Promise<void> => {
    beforeEach(async done => await prepareDatabase(done));
    afterAll(async() => await knex.destroy());
};
