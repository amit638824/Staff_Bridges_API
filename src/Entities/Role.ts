import { BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Role" })
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "roleId" })
    roleId: number;

    @Column({ name: "uuid", type: "varchar", unique: true }) @Generated("uuid")
    uuid: string;

    @Column({ name: "roleName", type: "enum", enum: ["JOB_SEEKER", "RECRUITER", "RECRUITMENT_AGENCY", "SUPER_ADMIN", "OPERATIONS_ADMIN", "FINANCE_ADMIN", "SUPPORT_ADMIN"], default: "JOB_SEEKER" })
    roleName: any;

    @Column({ name: "description", type: "varchar", length: 255, nullable: true })
    description: string | null;

    @Column({ name: "status", type: "int", default: 1 })
    status: number;

    @Column({ name: "createdAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ name: "updatedAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @Column({ name: "createdBy", type: "varchar", length: 50, nullable: true, default: "system" })
    createdBy: string | null;

    @Column({ name: "updatedBy", type: "varchar", length: 50, nullable: true, default: "system" })
    updatedBy: string | null;
}


// INSERT INTO "Role" ("roleName", "description", "status")
// VALUES
//   ('JOB_SEEKER', 'End user searching for jobs via mobile app', 1),
//   ('RECRUITER', 'Employer or company representative who posts and manages jobs', 1),
//   ('RECRUITMENT_AGENCY', 'Agency managing multiple recruiters and job listings', 1),
//   ('SUPER_ADMIN', 'Full access to system and can manage other admins', 1),
//   ('OPERATIONS_ADMIN', 'Handles job approvals and disputes', 1),
//   ('FINANCE_ADMIN', 'Manages subscriptions, transactions, and refunds', 1),
//   ('SUPPORT_ADMIN', 'Handles user complaints and account resets', 1);

