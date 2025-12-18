import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm"; 

@Entity({ name: "AppliedJob" })
export class AppliedJob extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  
  @Column({ type: "int", nullable: true })
  jobId: number;

  @Column({name: "userId", type: "int", nullable: false })
  userId: number;

  @Column({name: "reqruiterId", type: "int", nullable: false })
  reqruiterId: number;

  @Column({ name: "status",type: "int", default: 0 })
  status: number;


  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @Column({ type: "int", nullable: true })
  createdBy: number;

  @Column({ type: "int", nullable: true })
  updatedBy: number;
}

