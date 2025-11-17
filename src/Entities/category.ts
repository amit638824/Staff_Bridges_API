import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "JobCategory" })
export class JobCategory extends BaseEntity {
    
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "categoryName", type: "varchar", length: 100 })
    categoryName: string;

    @Column({ name: "description", type: "text", nullable: true })
    description: string;

    @Column({ name: "status", type: "int", default: 1 })
    status: any;

    @Column({ name: "createdAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ name: "updatedAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP", })
    updatedAt: Date;

    @Column({ name: "createdBy", type: "int", nullable: true })
    createdBy: any;

    @Column({ name: "updatedBy", type: "int", nullable: true })
    updatedBy: any;
}
