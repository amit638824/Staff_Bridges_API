import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "JobPost" })
export class JobPost extends BaseEntity {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "recruiterId", type: "int" })
    recruiterId: number;

    @Column({ name: "categoryId", type: "int" })
    categoryId: number;

    @Column({ name: "jobTitle", type: "varchar", length: 100 })
    jobTitle: string;

    @Column({ name: "hiringForOthers", type: "boolean", default: false })
    hiringForOthers: boolean;

    @Column({ name: "agencyId", type: "int", nullable: true })
    agencyId: number;

    @Column({ name: "jobType", type: "enum", enum: ['Full-time', 'Part-time', 'Contract'] })
    jobType: any;

    @Column({ name: "workLocationType", type: "enum", enum: ['Office', 'Field', 'WFH'] })
    workLocationType: 'Office' | 'Field' | 'WFH';

    @Column({ name: "city", type: "varchar", length: 50 })
    city: string;

    @Column({ name: "locality", type: "varchar", length: 100 })
    locality: string;

    @Column({ name: "address", type: "text", nullable: true })
    address: string;

    @Column({ name: "salaryMin", type: "decimal", precision: 10, scale: 2 })
    salaryMin: number;

    @Column({ name: "salaryMax", type: "decimal", precision: 10, scale: 2 })
    salaryMax: number;

    @Column({ name: "salaryModel", type: "enum", enum: ['Fixed', 'Fixed + Incentives'] })
    salaryModel: 'Fixed' | 'Fixed + Incentives';

    @Column({ name: "genderPreference", type: "enum", enum: ['Any', 'Male', 'Female'] })
    genderPreference: 'Any' | 'Male' | 'Female';

    @Column({ name: "experienceMin", type: "int" })
    experienceMin: number;

    @Column({ name: "experienceMax", type: "int" })
    experienceMax: number;

    @Column({ name: "fresherAllowed", type: "boolean", default: false })
    fresherAllowed: boolean;

    @Column({ name: "jobTiming", type: "varchar", length: 100, nullable: true })
    jobTiming: string;

    @Column({ name: "workingDays", type: "varchar", length: 50, nullable: true })
    workingDays: string;

    @Column({ name: "jobBenefits", type: "text", nullable: true })
    jobBenefits: string;

    @Column({ name: "jobSkills", type: "text", nullable: true })
    jobSkills: string;

    @Column({ name: "documentsRequired", type: "text", nullable: true })
    documentsRequired: string;

    @Column({ name: "communicationWindow", type: "varchar", length: 100, nullable: true })
    communicationWindow: string;

    @Column({ name: "candidateCanCall", type: "boolean", default: false })
    candidateCanCall: boolean;

    @Column({ name: "openings", type: "int", default: 1 })
    openings: number;

    @Column({ name: "jobPostingFor", type: "enum", enum: ['INDIVIDUAL', 'COMPANY'] })
    jobPostingFor: 'INDIVIDUAL' | 'COMPANY';

    @Column({ name: "companyName", type: "varchar", length: 100, nullable: true })
    companyName: string;

    @Column({ name: "companyAddress", type: "text", nullable: true })
    companyAddress: string;

    @Column({ name: "companyVerificationStatus", type: "enum", enum: ['PENDING', 'VERIFIED', 'SKIPPED'], default: 'PENDING' })
    companyVerificationStatus: 'PENDING' | 'VERIFIED' | 'SKIPPED';

    @Column({ name: "verificationRequired", type: "boolean", default: false })
    verificationRequired: boolean;

    @Column({ name: "directCall", type: "varchar", length: 15, nullable: true })
    directCall: string;

    @Column({ name: "description", type: "text", nullable: true })
    description: string;

    @Column({ name: "status", type: "enum", enum: ['DRAFT', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'LIVE'], default: 'DRAFT' })
    status: 'DRAFT' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'LIVE';

    @Column({ name: "adminComments", type: "text", nullable: true })
    adminComments: string;

    @Column({ name: "createdAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ name: "updatedAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP", })
    updatedAt: Date;

    @Column({ name: "createdBy", type: "int", nullable: true })
    createdBy: any;

    @Column({ name: "updatedBy", type: "int", nullable: true })
    updatedBy: any;
}
