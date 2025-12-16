import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm"; 

@Entity({ name: "AssetsRequired" })
export class AssetsRequired extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: "documentId", type: "int", nullable: false })
  documentId: number; 

  @Column({name: "userId", type: "int", nullable: false })
  userId: number;

  @Column({ name: "isVerified",type: "int", default: 0 })
  isVerified: number;


  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @Column({ type: "int", nullable: true })
  createdBy: number;

  @Column({ type: "int", nullable: true })
  updatedBy: number;
}
