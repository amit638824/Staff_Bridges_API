import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm"; 
@Entity({ name: "Notification" })
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "userId", type: "int" })
  userId: number; // receiver (recruiter / user)

  @Column({ type: "int", nullable: true })
  jobId: number;

  @Column({ name: "isVerified", type: "int", default: 0 })
  isVerified: number;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @Column({ type: "int", nullable: true })
  createdBy: number;

  @Column({ type: "int", nullable: true })
  updatedBy: number;
}
