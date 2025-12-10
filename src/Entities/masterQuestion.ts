import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "MasterQuestions" })
export class MasterQuestions extends BaseEntity {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "categoryId", type: "int", nullable: true })
    categoryId: number;


    @Column({ name: "description", type: "text", nullable: false })
    description: string;

    @Column({ name: "status", type: "int", default: 1 })
    status: number;
    @Column({ name: "createdAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ name: "updatedAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}
 