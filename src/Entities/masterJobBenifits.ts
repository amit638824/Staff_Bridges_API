import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "MasterJobBenifits" })
export class MasterJobBenifits extends BaseEntity {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "name", type: "varchar", length: 100, nullable: true })
    name: string;

    @Column({ name: "description", type: "text", nullable: true })
    description: string;

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

// INSERT INTO "MasterJobBenifits"
// ("name", "description", "status", "createdBy", "updatedBy")
// VALUES
// ('Health Insurance', 'Medical and health insurance coverage', 1, 1, 1),
// ('Provident Fund', 'Employer contribution to provident fund', 1, 1, 1),
// ('Paid Leaves', 'Annual, sick, and casual paid leaves', 1, 1, 1),
// ('Work From Home', 'Remote or hybrid work facility', 1, 1, 1),
// ('Flexible Working Hours', 'Flexible office working schedule', 1, 1, 1),
// ('Performance Bonus', 'Bonus based on employee performance', 1, 1, 1),
// ('Gratuity', 'Gratuity benefits as per company policy', 1, 1, 1),
// ('Training & Certification', 'Skill development and certification support', 1, 1, 1),
// ('Career Growth', 'Opportunities for promotion and career advancement', 1, 1, 1),
// ('Relocation Allowance', 'Relocation support for job location change', 1, 1, 1);
