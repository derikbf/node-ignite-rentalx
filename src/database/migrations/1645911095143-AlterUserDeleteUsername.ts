import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserDeleteUsername1645911095143 implements MigrationInterface {
    name?: string;
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "username");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "username",
                type: "varchar",
            })
        );
    }
}
