import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "MasterCategory" })
export class MasterCategory extends BaseEntity {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "name", type: "varchar", length: 100, nullable: true })
    name: string;

    @Column({ name: "image", type: "text", nullable: true })
    image: string;

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

// INSERT INTO "MasterCategory"
//     ("name", "description", "status", "createdBy", "updatedBy")
// VALUES
//     ('IT & Software', 'All software and IT related categories', 1, 1, 1),
//     ('Healthcare', 'Medical and healthcare related categories', 1, 1, 1),
//     ('Education', 'Education and training related categories', 1, 1, 1),
//     ('Construction', 'Civil and construction related categories', 1, 1, 1),
//     ('Finance', 'Banking, finance and taxation related categories', 1, 1, 1),
//     ('Sales & Marketing', 'Sales, marketing and promotion related categories', 1, 1, 1),
//     ('Manufacturing', 'Industrial and manufacturing related categories', 1, 1, 1),
//     ('Operations', 'Operations and management related categories', 1, 1, 1),
//     ('Customer Support', 'Customer care and support related categories', 1, 1, 1),
//     ('Human Resources', 'HR and recruitment related categories', 1, 1, 1);