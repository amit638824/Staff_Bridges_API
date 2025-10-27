import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, } from "typeorm";


@Entity({ name: "Permission" })
export class Permission extends BaseEntity {

    @PrimaryGeneratedColumn({ name: "permission_id" })
    permissionId: number;

    @Column({ name: "RoleId", type: "varchar", length: 50 })
    RoleId: any;

    @Column({ name: "key", type: "varchar", length: 50 })
    key: any;

    @Column({ name: "canCreate", type: "boolean", default: false })
    canCreate: boolean;

    @Column({ name: "canRead", type: "boolean", default: false })
    canRead: boolean;

    @Column({ name: "canUpdate", type: "boolean", default: false })
    canUpdate: boolean;

    @Column({ name: "canDelete", type: "boolean", default: false })
    canDelete: boolean;

    @Column({ name: "status", type: "int", default: 1, })
    status: number;

    @Column({ name: "createdAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP", })
    createdAt: Date;

    @Column({ name: "updatedAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP", })
    updatedAt: Date;

    @Column({ name: "createdBy", type: "varchar", length: 50, nullable: true, default: "system", })
    createdBy: any;

    @Column({ name: "updatedBy", type: "varchar", length: 50, nullable: true, default: "system", })
    updatedBy: any;
}
