import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "MasterSkills" })
export class MasterSkills extends BaseEntity {

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

// INSERT INTO "MasterSkills"
// ("name", "description", "status", "createdBy", "updatedBy")
// VALUES
// ('JavaScript', 'Programming language for web development', 1, 1, 1),
// ('TypeScript', 'Strongly typed superset of JavaScript', 1, 1, 1),
// ('Node.js', 'Server-side JavaScript runtime', 1, 1, 1),
// ('Express.js', 'Web framework for Node.js', 1, 1, 1),
// ('React.js', 'Frontend library for building UI components', 1, 1, 1),
// ('Next.js', 'React framework for SSR and static sites', 1, 1, 1),
// ('PostgreSQL', 'Relational database management system', 1, 1, 1),
// ('MongoDB', 'NoSQL document-oriented database', 1, 1, 1),
// ('Docker', 'Containerization platform for applications', 1, 1, 1),
// ('AWS', 'Cloud computing services by Amazon', 1, 1, 1);
