import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "jobQuestionAnswer" })
export class jobQuestionAnswer extends BaseEntity {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "categoryId", type: "int", nullable: true })
    categoryId: number;
    @Column({ name: "questionId", type: "int", nullable: true })
    questionId: number;
    @Column({ name: "userId", type: "int", nullable: true })
    userId: number;

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
