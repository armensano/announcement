import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1660810885605 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create TABLE "user" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "email" character varying(255) NOT NULL,
                "password" character varying(255) NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )`,
    );
    await queryRunner.query(
      `create TABLE "announcement" (
                "id" SERIAL NOT NULL,
                "description" character varying(255) NOT NULL,
                "images" character varying(255) NOT NULL,
                "tags" character varying(255) NOT NULL,
                "price" integer NOT NULL,
                "region" character varying(255) NOT NULL,
                "city" character varying(255) NOT NULL,
                "userId" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373761" PRIMARY KEY ("id")
            )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "announcement"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
