import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";

@Index(
  "UQ_RECRUITER_JOB",
  ["recruiterId", "titleId", "cityId", "jobType"],
  { unique: true }
)
@Entity({ name: "JobPost" })
export class JobPost extends BaseEntity {

  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "int" })
  recruiterId: number;

  @Column({ type: "int" })
  titleId: number;

  @Column({ type: "int" })
  categoryId: number;

  @Column({ type: "int", default: 1 })
  hiringForOthers: number;

  @Column({ type: "int", default: 1 })
  openings: number;

  @Column({ type: "int", nullable: true })
  agencyId: number;

  @Column({
    type: "enum",
    enum: ["Full-time", "Part-time", "Contract"],
  })
  jobType: string;

  @Column({
    type: "enum",
    enum: ["Office", "Field", "WorkFromHome"],
  })
  workLocation: string;

  @Column({ type: "int", nullable: true })
  cityId: number;

  @Column({ type: "int", nullable: true })
  localityId: number;

  @Column({
    type: "enum",
    enum: ["Any", "Male", "Female"],
    default: "Any",
  })
  gender: string;

  @Column({
    type: "enum",
    enum: [
      "Any",
      "highschool",
      "intermediate",
      "diploma",
      "graduate",
      "postgraduate",
    ],
    default: "highschool",
  })
  qualification: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  minExerince: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  maxExperince: number;

  @Column({ type: "int", default: 0 })
  onlyFresher: number;

  @Column({
    type: "enum",
    enum: ["Fixed", "Fixed + Incentives"],
    default: "Fixed",
  })
  salaryBenifits: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  salaryMin: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  salaryMax: number;

  @Column({
    type: "enum",
    enum: ["5", "6", "other"],
    default: "5",
  })
  workingDays: string;

  @Column({ type: "text", array: true, nullable: true })
  communicationWindow: string[];

  @Column({ type: "int", default: 0 })
  candidateCanCall: number;

  @Column({
    type: "enum",
    enum: ["INDIVIDUAL", "COMPANY"],
    default: "INDIVIDUAL",
  })
  jobPostingFor: string;

  @Column({ type: "int", default: 0 })
  verificationRequired: number;

  @Column({
    type: "enum",
    enum: ["DRAFT", "UNDER_REVIEW", "APPROVED", "REJECTED", "LIVE"],
    default: "DRAFT",
  })
  status: string;

  @Column({ type: "text", nullable: true })
  adminComments: string;

  @Column({ type: "text", nullable: true })
  description: string;

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
