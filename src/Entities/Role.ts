import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Generated,
} from "typeorm";

@Entity({ name: "Role" })
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    id: any;

    @Column({ name: "uuid", type: "uuid", unique: true })
    @Generated("uuid")
    uuid: any;

    @Column({ name: "roleName", type: "enum", enum: ["SUPER_ADMIN", "OPERATIONS_ADMIN", "FINANCE_ADMIN", "SUPPORT_ADMIN", "JOB_SEEKER", "RECRUITER", "RECRUITMENT_AGENCY"], default: "JOB_SEEKER" })
    roleName: any;

    @Column({ name: "description", type: "text", nullable: true })
    description: any;

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



// INSERT INTO "Role" ("roleName", "description", "status")
// VALUES
//   ('SUPER_ADMIN', 'Full access to system and can manage other admins', 1),
//   ('OPERATIONS_ADMIN', 'Handles job approvals and disputes', 1),
//   ('FINANCE_ADMIN', 'Manages subscriptions, transactions, and refunds', 1),
//   ('SUPPORT_ADMIN', 'Handles user complaints and account resets', 1),
//   ('JOB_SEEKER', 'End user searching for jobs via mobile app', 1),
//   ('RECRUITER', 'Employer or company representative who posts and manages jobs', 1),
//   ('RECRUITMENT_AGENCY', 'Agency managing multiple recruiters and job listings', 1),;

