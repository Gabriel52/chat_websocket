import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSettings1618939341171 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.createTable(
             new Table({
                 name: "settings",
                 columns: [
                     {
                         name: "id",
                         type: "uuid",
                        //  generationStrategy: "uuid", Se quiser que o a responsabilidade do auto increment fique direto com o banco
                         isPrimary: true
                     },
                     {
                         name: "username",
                         type: "varchar"
                     },
                     {
                        name: "chat",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                 ]
             })
         )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("settings")
    }

}
