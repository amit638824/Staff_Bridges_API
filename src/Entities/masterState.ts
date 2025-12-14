import { BaseEntity, Column, Entity, PrimaryGeneratedColumn,   } from "typeorm";

@Entity({ name: "MasterState" })
export class MasterState extends BaseEntity {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "name", type: "varchar", length: 100 })
    name: string;

    @Column({ name: "countyId", type: "int", default: 1 })
    countyId: number;

     @Column({ name: "code", type: "varchar", length: 20 })
    code: string;

    @Column({ name: "status", type: "int", default: 1 })
    status: number;

    @Column({ name: "createdAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ name: "updatedAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;

}

// INSERT INTO "MasterState" ("name", "countyId", "code", "status")
// VALUES
// ('Andhra Pradesh', 1, 'AP', 1),
// ('Arunachal Pradesh', 1, 'AR', 1),
// ('Assam', 1, 'AS', 1),
// ('Bihar', 1, 'BR', 1),
// ('Chhattisgarh', 1, 'CG', 1),
// ('Goa', 1, 'GA', 1),
// ('Gujarat', 1, 'GJ', 1),
// ('Haryana', 1, 'HR', 1),
// ('Himachal Pradesh', 1, 'HP', 1),
// ('Jharkhand', 1, 'JH', 1),
// ('Karnataka', 1, 'KA', 1),
// ('Kerala', 1, 'KL', 1),
// ('Madhya Pradesh', 1, 'MP', 1),
// ('Maharashtra', 1, 'MH', 1),
// ('Manipur', 1, 'MN', 1),
// ('Meghalaya', 1, 'ML', 1),
// ('Mizoram', 1, 'MZ', 1),
// ('Nagaland', 1, 'NL', 1),
// ('Odisha', 1, 'OD', 1),
// ('Punjab', 1, 'PB', 1),
// ('Rajasthan', 1, 'RJ', 1),
// ('Sikkim', 1, 'SK', 1),
// ('Tamil Nadu', 1, 'TN', 1),
// ('Telangana', 1, 'TG', 1),
// ('Tripura', 1, 'TR', 1),
// ('Uttar Pradesh', 1, 'UP', 1),
// ('Uttarakhand', 1, 'UK', 1),
// ('West Bengal', 1, 'WB', 1),
// ('Alabama', 2, 'AL', 1),
// ('Alaska', 2, 'AK', 1),
// ('Arizona', 2, 'AZ', 1),
// ('Arkansas', 2, 'AR', 1),
// ('California', 2, 'CA', 1),
// ('Colorado', 2, 'CO', 1),
// ('Connecticut', 2, 'CT', 1),
// ('Delaware', 2, 'DE', 1),
// ('Florida', 2, 'FL', 1),
// ('Georgia', 2, 'GA', 1),
// ('Hawaii', 2, 'HI', 1),
// ('Idaho', 2, 'ID', 1),
// ('Illinois', 2, 'IL', 1),
// ('Indiana', 2, 'IN', 1),
// ('Iowa', 2, 'IA', 1),
// ('Kansas', 2, 'KS', 1),
// ('Kentucky', 2, 'KY', 1),
// ('Louisiana', 2, 'LA', 1),
// ('Maine', 2, 'ME', 1),
// ('Maryland', 2, 'MD', 1),
// ('Massachusetts', 2, 'MA', 1),
// ('Michigan', 2, 'MI', 1),
// ('Minnesota', 2, 'MN', 1),
// ('Mississippi', 2, 'MS', 1),
// ('Missouri', 2, 'MO', 1),
// ('Montana', 2, 'MT', 1),
// ('Nebraska', 2, 'NE', 1),
// ('Nevada', 2, 'NV', 1),
// ('New Hampshire', 2, 'NH', 1),
// ('New Jersey', 2, 'NJ', 1),
// ('New Mexico', 2, 'NM', 1),
// ('New York', 2, 'NY', 1),
// ('North Carolina', 2, 'NC', 1),
// ('North Dakota', 2, 'ND', 1),
// ('Ohio', 2, 'OH', 1),
// ('Oklahoma', 2, 'OK', 1),
// ('Oregon', 2, 'OR', 1),
// ('Pennsylvania', 2, 'PA', 1),
// ('Rhode Island', 2, 'RI', 1),
// ('South Carolina', 2, 'SC', 1),
// ('South Dakota', 2, 'SD', 1),
// ('Tennessee', 2, 'TN', 1),
// ('Texas', 2, 'TX', 1),
// ('Utah', 2, 'UT', 1),
// ('Vermont', 2, 'VT', 1),
// ('Virginia', 2, 'VA', 1),
// ('Washington', 2, 'WA', 1),
// ('West Virginia', 2, 'WV', 1),
// ('Wisconsin', 2, 'WI', 1),
// ('Wyoming', 2, 'WY', 1),
// ('England', 3, 'ENG', 1),
// ('Scotland', 3, 'SCT', 1),
// ('Wales', 3, 'WLS', 1),
// ('Northern Ireland', 3, 'NIR', 1),
// ('Alberta', 4, 'AB', 1),
// ('British Columbia', 4, 'BC', 1),
// ('Manitoba', 4, 'MB', 1),
// ('New Brunswick', 4, 'NB', 1),
// ('Newfoundland and Labrador', 4, 'NL', 1),
// ('Nova Scotia', 4, 'NS', 1),
// ('Ontario', 4, 'ON', 1),
// ('Prince Edward Island', 4, 'PE', 1),
// ('Quebec', 4, 'QC', 1),
// ('Saskatchewan', 4, 'SK', 1),
// ('New South Wales', 5, 'NSW', 1),
// ('Queensland', 5, 'QLD', 1),
// ('South Australia', 5, 'SA', 1),
// ('Tasmania', 5, 'TAS', 1),
// ('Victoria', 5, 'VIC', 1),
// ('Western Australia', 5, 'WA', 1),
// ('Australian Capital Territory', 5, 'ACT', 1),
// ('Northern Territory', 5, 'NT', 1);