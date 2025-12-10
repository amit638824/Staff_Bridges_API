import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "MasterQuestionOptions" })
export class MasterQuestionOptions extends BaseEntity {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "questionId" , type: "int", nullable: true })
    questionId: any;

    @Column({ name: "optionText", type: "text", nullable: false })
    optionText: string; 

    @Column({ name: "status", type: "int", default: 1 })
    status: number;

    @Column({ name: "createdAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ name: "updatedAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}
