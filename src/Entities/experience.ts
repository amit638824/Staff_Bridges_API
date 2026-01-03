import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity({ name: "Experience" })
export class Experience extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "categoryId", type: "int", nullable: true })
    categoryId: number;

    @Column({ name: "userId", type: "int", nullable: true })
    userId: number;

    @Column({ name: "status", type: "int", default: 1 })
    status: number;

    // FIX: Changed from number to string since your controller uses string operations
    @Column({ name: "experience", type: "varchar", nullable: true })
    experience: string;

    @Column({ name: "company", type: "varchar", nullable: true })
    company: string; // FIX: Changed from number to string

    @Column({ name: "year", type: "int", default: 0 })
    year: number;

    @Column({ name: "months", type: "int", default: 0 })
    months: number;

    @CreateDateColumn({ name: "createdAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updatedAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @Column({ name: "createdBy", type: "int", nullable: true })
    createdBy: number;

    @Column({ name: "updatedBy", type: "int", nullable: true })
    updatedBy: number;
}