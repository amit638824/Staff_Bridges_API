import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "RecruiterDocuments" })
export class RecruiterDocuments extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  documentId: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  document: string;

  @Column({ type: "int", nullable: false })
  userId: number;

  @Column({ type: "int", nullable: true })
  jobId: number;

  @Column({ type: "int", default: 0 })
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
