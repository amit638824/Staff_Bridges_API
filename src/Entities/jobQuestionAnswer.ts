import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "JobQuestionAnswer" })
export class JobQuestionAnswer extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "userId", type: "int", nullable: false })
    userId: number;

    @Column({ name: "categoryId", type: "int", nullable: true })
    categoryId: number;

    @Column({ name: "questionId", type: "int", nullable: false })
    questionId: number;

    @Column({ name: "optionId", type: "int", nullable: true })
    optionId: number;

    @Column({ name: "status", type: "int", default: 1 })
    status: number;

    @Column({ name: "createdAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ name: "updatedAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @Column({ name: "createdBy", type: "int", nullable: true })
    createdBy: number;

    @Column({ name: "updatedBy", type: "int", nullable: true })
    updatedBy: number;
}
