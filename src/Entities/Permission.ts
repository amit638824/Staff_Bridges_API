import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "Permission" })
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    id: any;

    @Column({ name: "RoleId", type: "int", default: 1 })
    RoleId: any;

    @Column({ name: "PermissionId", type: "int", default: 1 })
    PermissionId: any;

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
