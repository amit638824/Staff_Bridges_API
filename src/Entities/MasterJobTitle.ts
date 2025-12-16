import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "MasterJobTitle" })
export class MasterJobTitle extends BaseEntity {

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

// INSERT INTO "MasterJobTitle" 
// ("name", "description", "status", "createdAt", "updatedAt", "createdBy", "updatedBy")
// VALUES
// ('Software Engineer', 'Responsible for developing software applications', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Project Manager', 'Oversees project planning and execution', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Data Analyst', 'Analyzes data to provide business insights', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('QA Engineer', 'Ensures software quality through testing', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('UI/UX Designer', 'Designs user interfaces and user experiences', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('DevOps Engineer', 'Manages deployment and infrastructure', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Product Owner', 'Defines product vision and requirements', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Business Analyst', 'Bridges business needs with technical solutions', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Technical Lead', 'Leads the technical team and architecture', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('HR Manager', 'Manages human resources and recruitment', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1);
