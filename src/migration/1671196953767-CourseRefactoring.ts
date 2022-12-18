import { MigrationInterface, QueryRunner } from "typeorm";

export class CourseRefactoring1671196953767 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "course" RENAME COLUMN "course" TO "name"`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "course" RENAME COLUMN "name" TO "course"`
		);
	}
}
