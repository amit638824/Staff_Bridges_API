import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
 
@Entity({ name: "MasterCity" })
export class MasterCity extends BaseEntity {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "name", type: "varchar", length: 100 })
    name: string;

    @Column({ name: "stateId", type: "int", default: 1 })
    stateId: number;

    @Column({ name: "status", type: "int", default: 1 })
    status: number;

     @Column({ name: "code", type: "varchar", length: 20 })
    code: string;

    @Column({ name: "createdAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ name: "updatedAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}



// -- -----------------------------
// -- Andhra Pradesh (stateId = 1)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Anantapur', 1, 'ATP', 1),
// ('Chittoor', 1, 'CTR', 1),
// ('East Godavari (Kakinada)', 1, 'EGR', 1),
// ('Guntur', 1, 'GNT', 1),
// ('Krishna (Machilipatnam)', 1, 'KRI', 1),
// ('Kurnool', 1, 'KNL', 1),
// ('Nellore', 1, 'NLR', 1),
// ('Prakasam (Ongole)', 1, 'PRK', 1),
// ('Srikakulam', 1, 'SKLM', 1),
// ('Visakhapatnam', 1, 'VSKP', 1),
// ('Vizianagaram', 1, 'VZM', 1),
// ('West Godavari (Eluru)', 1, 'WGR', 1),
// ('Nandyal', 1, 'NDL', 1),
// ('Sri Sathya Sai (Puttaparthi)', 1, 'SSS', 1),
// ('Tirupati', 1, 'TPT', 1),
// ('Bapatla', 1, 'BPT', 1),
// ('Eluru', 1, 'ELR', 1),
// ('Kakinada', 1, 'KKD', 1),
// ('Konaseema (Amalapuram)', 1, 'KSM', 1),
// ('NTR (Vijayawada)', 1, 'NTR', 1),
// ('Palnadu (Narsaraopet)', 1, 'PLN', 1),
// ('Parvathipuram Manyam', 1, 'PVM', 1),
// ('Alluri Sitharama Raju', 1, 'ASR', 1),
// ('Anakapalli', 1, 'AKP', 1),
// ('Tirupati Rural', 1, 'TPR', 1),
// ('YSR (Kadapa)', 1, 'YSR', 1);

// -- -----------------------------
// -- Arunachal Pradesh (stateId = 2)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Tawang', 2, 'TWG', 1),
// ('West Kameng (Bomdila)', 2, 'WKG', 1),
// ('East Kameng (Seppa)', 2, 'EKG', 1),
// ('Papum Pare (Yupia)', 2, 'PPB', 1),
// ('Kurung Kumey (Koloriang)', 2, 'KKY', 1),
// ('Kra Daadi (Palin)', 2, 'KDD', 1),
// ('Lower Subansiri (Ziro)', 2, 'LSR', 1),
// ('Upper Subansiri (Daporijo)', 2, 'USR', 1),
// ('West Siang (Aalo)', 2, 'WSG', 1),
// ('East Siang (Pasighat)', 2, 'ESG', 1),
// ('Siang (Panging)', 2, 'SGN', 1),
// ('Upper Siang (Yingkiong)', 2, 'USG2', 1),
// ('Lower Dibang Valley (Roing)', 2, 'LDV', 1),
// ('Dibang Valley (Anini)', 2, 'DBV', 1),
// ('Lohit (Tezu)', 2, 'LHT', 1),
// ('Namsai', 2, 'NMS', 1),
// ('Changlang', 2, 'CHG', 1),
// ('Tirap (Khonsa)', 2, 'TRP', 1),
// ('Longding', 2, 'LGD', 1),
// ('Kamle (Raga)', 2, 'KML', 1),
// ('Lower Siang (Likabali)', 2, 'LSG2', 1),
// ('Pakke-Kessang', 2, 'PKS', 1),
// ('Leparada (Basar)', 2, 'LPR', 1),
// ('Shi-Yomi (Tato)', 2, 'SYM', 1);

// -- -----------------------------
// -- Assam (stateId = 3)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Baksa (Mushalpur)', 3, 'BKS', 1),
// ('Barpeta', 3, 'BPT', 1),
// ('Biswanath Chariali', 3, 'BSN', 1),
// ('Bongaigaon', 3, 'BNG', 1),
// ('Cachar (Silchar)', 3, 'CCR', 1),
// ('Charaideo (Sonari)', 3, 'CRD', 1),
// ('Chirang (Kajolgaon)', 3, 'CRG', 1),
// ('Darrang (Mangaldoi)', 3, 'DRG', 1),
// ('Dhemaji', 3, 'DMJ', 1),
// ('Dhubri', 3, 'DBR', 1),
// ('Dibrugarh', 3, 'DBG', 1),
// ('Dima Hasao (Haflong)', 3, 'DMH', 1),
// ('Golaghat', 3, 'GLG', 1),
// ('Hailakandi', 3, 'HLK', 1),
// ('Hojai', 3, 'HJI', 1),
// ('Jorhat', 3, 'JRH', 1),
// ('Kamrup (Amingaon)', 3, 'KMP', 1),
// ('Kamrup Metropolitan (Guwahati)', 3, 'KMM', 1),
// ('Karbi Anglong (Diphu)', 3, 'KBA', 1),
// ('Karimganj', 3, 'KRG', 1),
// ('Kokrajhar', 3, 'KKR', 1),
// ('Lakhimpur (North Lakhimpur)', 3, 'LKM', 1),
// ('Majuli (Garamur)', 3, 'MJL', 1),
// ('Morigaon', 3, 'MRG', 1),
// ('Nagaon', 3, 'NGN', 1),
// ('Nalbari', 3, 'NLB', 1),
// ('Sivasagar', 3, 'SVG', 1),
// ('Sonitpur (Tezpur)', 3, 'SNP', 1),
// ('South Salmara-Mankachar', 3, 'SSM', 1),
// ('Tinsukia', 3, 'TSK', 1),
// ('Udalguri', 3, 'UDG', 1),
// ('West Karbi Anglong (Hamren)', 3, 'WKA', 1);

// -- -----------------------------
// -- Bihar (stateId = 4)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Araria', 4, 'ARA', 1),
// ('Arwal', 4, 'ARW', 1),
// ('Aurangabad', 4, 'AUB', 1),
// ('Banka', 4, 'BNK', 1),
// ('Begusarai', 4, 'BGS', 1),
// ('Bhagalpur', 4, 'BGP', 1),
// ('Bhojpur (Arrah)', 4, 'BJR', 1),
// ('Buxar', 4, 'BXR', 1),
// ('Darbhanga', 4, 'DBH', 1),
// ('East Champaran (Motihari)', 4, 'ECH', 1),
// ('Gaya', 4, 'GYA', 1),
// ('Gopalganj', 4, 'GPG', 1),
// ('Jamui', 4, 'JMU', 1),
// ('Jehanabad', 4, 'JHB', 1),
// ('Kaimur', 4, 'KMR', 1),
// ('Katihar', 4, 'KTR', 1),
// ('Khagaria', 4, 'KHG', 1),
// ('Kishanganj', 4, 'KSG', 1),
// ('Lakhisarai', 4, 'LKS', 1),
// ('Madhepura', 4, 'MDH', 1),
// ('Madhubani', 4, 'MDB', 1),
// ('Munger', 4, 'MGR', 1),
// ('Muzaffarpur', 4, 'MZP', 1),
// ('Nalanda (Bihar Sharif)', 4, 'NLD', 1),
// ('Nawada', 4, 'NWD', 1),
// ('Patna', 4, 'PAT', 1),
// ('Purnia', 4, 'PRN', 1),
// ('Rohtas (Sasaram)', 4, 'RHT', 1),
// ('Saharsa', 4, 'SHS', 1),
// ('Samastipur', 4, 'SMS', 1),
// ('Saran (Chhapra)', 4, 'SRN', 1),
// ('Sheikhpura', 4, 'SKP', 1),
// ('Sheohar', 4, 'SHR', 1),
// ('Sitamarhi', 4, 'STM', 1),
// ('Siwan', 4, 'SWN', 1),
// ('Supaul', 4, 'SPL', 1),
// ('Vaishali (Hajipur)', 4, 'VSL', 1),
// ('West Champaran (Bettiah)', 4, 'WCH', 1);

// -- -----------------------------
// -- Jharkhand (stateId = 5)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Bokaro', 5, 'BKR', 1),
// ('Chatra', 5, 'CTR', 1),
// ('Deoghar', 5, 'DGR', 1),
// ('Dhanbad', 5, 'DNB', 1),
// ('Dumka', 5, 'DMK', 1),
// ('East Singhbhum (Jamshedpur)', 5, 'ESB', 1),
// ('Garhwa', 5, 'GRW', 1),
// ('Giridih', 5, 'GRD', 1),
// ('Godda', 5, 'GDA', 1),
// ('Gumla', 5, 'GML', 1),
// ('Hazaribagh', 5, 'HZB', 1),
// ('Jamtara', 5, 'JMT', 1),
// ('Khunti', 5, 'KHT', 1),
// ('Koderma', 5, 'KDR', 1),
// ('Latehar', 5, 'LTR', 1),
// ('Lohardaga', 5, 'LHD', 1),
// ('Pakur', 5, 'PKR', 1),
// ('Palamu (Medininagar)', 5, 'PLM', 1),
// ('Ramgarh', 5, 'RMG', 1),
// ('Ranchi', 5, 'RNC', 1),
// ('Sahibganj', 5, 'SHG', 1),
// ('Seraikela-Kharsawan', 5, 'SKH', 1),
// ('Simdega', 5, 'SDG', 1),
// ('West Singhbhum (Chaibasa)', 5, 'WSB', 1);

// -- -----------------------------
// -- Chhattisgarh (stateId = 6)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Balod', 6, 'BLD', 1),
// ('Baloda Bazar', 6, 'BBD', 1),
// ('Balrampur', 6, 'BRP', 1),
// ('Bastar', 6, 'BST', 1),
// ('Bemetara', 6, 'BMT', 1),
// ('Bijapur', 6, 'BJP', 1),
// ('Bilaspur', 6, 'BLS', 1),
// ('Dakshin Bastar Dantewada', 6, 'DBD', 1),
// ('Dhamtari', 6, 'DMT', 1),
// ('Durg', 6, 'DRG', 1),
// ('Gariaband', 6, 'GRB', 1),
// ('Janjgir-Champa', 6, 'JCP', 1),
// ('Jashpur', 6, 'JSP', 1),
// ('Kabirdham (Kawardha)', 6, 'KBD', 1),
// ('Kanker', 6, 'KNK', 1),
// ('Kondagaon', 6, 'KDG', 1),
// ('Korba', 6, 'KRB', 1),
// ('Korea', 6, 'KRA', 1),
// ('Mahasamund', 6, 'MSD', 1),
// ('Mungeli', 6, 'MNG', 1),
// ('Narayanpur', 6, 'NRP', 1),
// ('Raigarh', 6, 'RGR', 1),
// ('Raipur', 6, 'RPR', 1),
// ('Rajnandgaon', 6, 'RJG', 1),
// ('Sukma', 6, 'SKM', 1),
// ('Surajpur', 6, 'SRJ', 1),
// ('Surguja', 6, 'SGJ', 1);

// -- -----------------------------
// -- Goa (stateId = 7)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('North Goa', 7, 'NGO', 1),
// ('South Goa', 7, 'SGO', 1);

// -- -----------------------------
// -- Gujarat (stateId = 8)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Ahmedabad', 8, 'AMD', 1),
// ('Amreli', 8, 'AMR', 1),
// ('Anand', 8, 'AND', 1),
// ('Aravalli (Modasa)', 8, 'ARV', 1),
// ('Banaskantha (Palanpur)', 8, 'BNK', 1),
// ('Bharuch', 8, 'BHC', 1),
// ('Bhavnagar', 8, 'BVG', 1),
// ('Botad', 8, 'BTD', 1),
// ('Chhota Udaipur', 8, 'CHU', 1),
// ('Dahod', 8, 'DHD', 1),
// ('Dang (Ahwa)', 8, 'DNG', 1),
// ('Devbhoomi Dwarka', 8, 'DBD', 1),
// ('Gandhinagar', 8, 'GNR', 1),
// ('Gir Somnath', 8, 'GSM', 1),
// ('Jamnagar', 8, 'JMG', 1),
// ('Junagadh', 8, 'JND', 1),
// ('Kheda', 8, 'KHD', 1),
// ('Mahisagar', 8, 'MHS', 1),
// ('Mehsana', 8, 'MHSN', 1),
// ('Morbi', 8, 'MRB', 1),
// ('Narmada (Rajpipla)', 8, 'NRM', 1),
// ('Navsari', 8, 'NVS', 1),
// ('Panchmahal (Godhra)', 8, 'PCM', 1),
// ('Patan', 8, 'PTN', 1),
// ('Porbandar', 8, 'PBD', 1),
// ('Rajkot', 8, 'RJT', 1),
// ('Sabarkantha (Himmatnagar)', 8, 'SBK', 1),
// ('Surat', 8, 'SRT', 1),
// ('Surendranagar', 8, 'SNR', 1),
// ('Tapi (Vyara)', 8, 'TAP', 1),
// ('Vadodara', 8, 'VDR', 1),
// ('Valsad', 8, 'VLS', 1);
// -- -----------------------------
// -- Haryana (stateId = 9)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Ambala', 9, 'AMB', 1),
// ('Bhiwani', 9, 'BHW', 1),
// ('Charkhi Dadri', 9, 'CDR', 1),
// ('Faridabad', 9, 'FRD', 1),
// ('Fatehabad', 9, 'FTB', 1),
// ('Gurugram', 9, 'GRG', 1),
// ('Hisar', 9, 'HSR', 1),
// ('Jhajjar', 9, 'JJR', 1),
// ('Jind', 9, 'JND', 1),
// ('Kaithal', 9, 'KTL', 1),
// ('Karnal', 9, 'KRL', 1),
// ('Kurukshetra', 9, 'KRS', 1),
// ('Mahendragarh', 9, 'MHR', 1),
// ('Nuh', 9, 'NUH', 1),
// ('Palwal', 9, 'PWL', 1),
// ('Panchkula', 9, 'PNC', 1),
// ('Panipat', 9, 'PNP', 1),
// ('Rewari', 9, 'RWR', 1),
// ('Rohtak', 9, 'RHT', 1),
// ('Sirsa', 9, 'SRS', 1),
// ('Sonipat', 9, 'SNP', 1),
// ('Yamunanagar', 9, 'YMN', 1);

// -- -----------------------------
// -- Himachal Pradesh (stateId = 10)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Bilaspur', 10, 'BLS', 1),
// ('Chamba', 10, 'CHB', 1),
// ('Hamirpur', 10, 'HMP', 1),
// ('Kangra', 10, 'KNG', 1),
// ('Kinnaur (Sangla)', 10, 'KNR', 1),
// ('Kullu', 10, 'KLU', 1),
// ('Lahaul and Spiti (Keylong)', 10, 'LSP', 1),
// ('Mandi', 10, 'MND', 1),
// ('Shimla', 10, 'SHL', 1),
// ('Sirmaur (Nahan)', 10, 'SRM', 1),
// ('Solan', 10, 'SOL', 1),
// ('Una', 10, 'UNA', 1);

// -- -----------------------------
// -- Jharkhand already done in Chunk 2 (stateId = 5)
// -- -----------------------------

// -- -----------------------------
// -- Karnataka (stateId = 11)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Bagalkot', 11, 'BGL', 1),
// ('Bangalore Rural', 11, 'BNR', 1),
// ('Bangalore Urban', 11, 'BNU', 1),
// ('Belagavi', 11, 'BLG', 1),
// ('Bellary', 11, 'BLY', 1),
// ('Bidar', 11, 'BID', 1),
// ('Chamarajanagar', 11, 'CMR', 1),
// ('Chikkaballapur', 11, 'CKB', 1),
// ('Chikkamagaluru', 11, 'CKM', 1),
// ('Chitradurga', 11, 'CTD', 1),
// ('Dakshina Kannada (Mangalore)', 11, 'DKM', 1),
// ('Davanagere', 11, 'DVN', 1),
// ('Dharwad', 11, 'DHW', 1),
// ('Gadag', 11, 'GAD', 1),
// ('Hassan', 11, 'HSN', 1),
// ('Haveri', 11, 'HVR', 1),
// ('Kodagu (Madikeri)', 11, 'KDG', 1),
// ('Kolar', 11, 'KLR', 1),
// ('Koppal', 11, 'KPL', 1),
// ('Mandya', 11, 'MDY', 1),
// ('Mysuru', 11, 'MYS', 1),
// ('Raichur', 11, 'RCR', 1),
// ('Ramanagara', 11, 'RMN', 1),
// ('Shivamogga', 11, 'SVM', 1),
// ('Tumakuru', 11, 'TMK', 1),
// ('Udupi', 11, 'UDP', 1),
// ('Uttara Kannada (Karwar)', 11, 'UKA', 1),
// ('Vijayapura', 11, 'VJP', 1),
// ('Yadgir', 11, 'YDG', 1);
// -- -----------------------------
// -- Kerala (stateId = 12)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Alappuzha', 12, 'ALP', 1),
// ('Ernakulam', 12, 'ERK', 1),
// ('Idukki', 12, 'IDK', 1),
// ('Kannur', 12, 'KNR', 1),
// ('Kasaragod', 12, 'KSD', 1),
// ('Kollam', 12, 'KLM', 1),
// ('Kottayam', 12, 'KTM', 1),
// ('Kozhikode', 12, 'KZD', 1),
// ('Malappuram', 12, 'MLP', 1),
// ('Palakkad', 12, 'PLK', 1),
// ('Pathanamthitta', 12, 'PTT', 1),
// ('Thiruvananthapuram', 12, 'TRV', 1),
// ('Thrissur', 12, 'TRS', 1),
// ('Wayanad', 12, 'WYD', 1);

// -- -----------------------------
// -- Madhya Pradesh (stateId = 13)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Agar Malwa', 13, 'AGM', 1),
// ('Alirajpur', 13, 'ALR', 1),
// ('Anuppur', 13, 'ANP', 1),
// ('Ashoknagar', 13, 'ASN', 1),
// ('Balaghat', 13, 'BLG', 1),
// ('Barwani', 13, 'BRW', 1),
// ('Betul', 13, 'BTL', 1),
// ('Bhind', 13, 'BHD', 1),
// ('Bhopal', 13, 'BPL', 1),
// ('Burhanpur', 13, 'BRH', 1),
// ('Chhatarpur', 13, 'CHP', 1),
// ('Chhindwara', 13, 'CHW', 1),
// ('Damoh', 13, 'DMH', 1),
// ('Datia', 13, 'DTA', 1),
// ('Dewas', 13, 'DWS', 1),
// ('Dhar', 13, 'DHR', 1),
// ('Dindori', 13, 'DND', 1),
// ('Guna', 13, 'GNA', 1),
// ('Gwalior', 13, 'GWL', 1),
// ('Harda', 13, 'HRD', 1),
// ('Hoshangabad (Narmadapuram)', 13, 'HSB', 1),
// ('Indore', 13, 'IND', 1),
// ('Jabalpur', 13, 'JBL', 1),
// ('Jhabua', 13, 'JHB', 1),
// ('Katni', 13, 'KTN', 1),
// ('Khandwa', 13, 'KHD', 1),
// ('Khargone', 13, 'KRG', 1),
// ('Mandla', 13, 'MND', 1),
// ('Mandsaur', 13, 'MNS', 1),
// ('Morena', 13, 'MRN', 1),
// ('Narsinghpur', 13, 'NSP', 1),
// ('Neemuch', 13, 'NMH', 1),
// ('Panna', 13, 'PNN', 1),
// ('Raisen', 13, 'RSN', 1),
// ('Rajgarh', 13, 'RJG', 1),
// ('Ratlam', 13, 'RTL', 1),
// ('Rewa', 13, 'RWA', 1),
// ('Sagar', 13, 'SGR', 1),
// ('Satna', 13, 'STN', 1),
// ('Sehore', 13, 'SHR', 1),
// ('Seoni', 13, 'SNI', 1),
// ('Shahdol', 13, 'SHD', 1),
// ('Shajapur', 13, 'SJP', 1),
// ('Sheopur', 13, 'SHP', 1),
// ('Shivpuri', 13, 'SVP', 1),
// ('Sidhi', 13, 'SDH', 1),
// ('Singrauli', 13, 'SGL', 1),
// ('Tikamgarh', 13, 'TKM', 1),
// ('Ujjain', 13, 'UJN', 1),
// ('Umaria', 13, 'UMA', 1),
// ('Vidisha', 13, 'VDS', 1);
// -- -----------------------------
// -- Maharashtra (stateId = 14)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Ahmednagar', 14, 'AMD', 1),
// ('Akola', 14, 'AKL', 1),
// ('Amravati', 14, 'AMR', 1),
// ('Aurangabad', 14, 'AUR', 1),
// ('Beed', 14, 'BED', 1),
// ('Bhandara', 14, 'BND', 1),
// ('Buldhana', 14, 'BLD', 1),
// ('Chandrapur', 14, 'CHP', 1),
// ('Dhule', 14, 'DHL', 1),
// ('Gadchiroli', 14, 'GDC', 1),
// ('Gondia', 14, 'GND', 1),
// ('Hingoli', 14, 'HGL', 1),
// ('Jalgaon', 14, 'JLG', 1),
// ('Jalna', 14, 'JLN', 1),
// ('Kolhapur', 14, 'KLP', 1),
// ('Latur', 14, 'LTR', 1),
// ('Mumbai City', 14, 'MBC', 1),
// ('Mumbai Suburban', 14, 'MBS', 1),
// ('Nagpur', 14, 'NGP', 1),
// ('Nanded', 14, 'NND', 1),
// ('Nandurbar', 14, 'NDR', 1),
// ('Nashik', 14, 'NSK', 1),
// ('Osmanabad', 14, 'OSB', 1),
// ('Palghar', 14, 'PLG', 1),
// ('Parbhani', 14, 'PRB', 1),
// ('Pune', 14, 'PUN', 1),
// ('Raigad', 14, 'RGD', 1),
// ('Ratnagiri', 14, 'RTG', 1),
// ('Sangli', 14, 'SGL', 1),
// ('Satara', 14, 'STR', 1),
// ('Sindhudurg', 14, 'SDG', 1),
// ('Solapur', 14, 'SLR', 1),
// ('Thane', 14, 'THN', 1),
// ('Wardha', 14, 'WRD', 1),
// ('Washim', 14, 'WSM', 1),
// ('Yavatmal', 14, 'YVM', 1);

// -- -----------------------------
// -- Manipur (stateId = 15)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Bishnupur', 15, 'BSP', 1),
// ('Chandel', 15, 'CHD', 1),
// ('Churachandpur', 15, 'CCP', 1),
// ('Imphal East', 15, 'IME', 1),
// ('Imphal West', 15, 'IMW', 1),
// ('Jiribam', 15, 'JRB', 1),
// ('Kakching', 15, 'KCH', 1),
// ('Kamjong', 15, 'KMJ', 1),
// ('Kangpokpi', 15, 'KPK', 1),
// ('Noney', 15, 'NNY', 1),
// ('Pherzawl', 15, 'PHZ', 1),
// ('Senapati', 15, 'SNP', 1),
// ('Tamenglong', 15, 'TML', 1),
// ('Tengnoupal', 15, 'TGP', 1),
// ('Thoubal', 15, 'THB', 1),
// ('Ukhrul', 15, 'UKR', 1);

// -- -----------------------------
// -- Meghalaya (stateId = 16)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('East Garo Hills (Williamnagar)', 16, 'EGH', 1),
// ('East Jaintia Hills (Khliehriat)', 16, 'EJH', 1),
// ('East Khasi Hills (Shillong)', 16, 'EKH', 1),
// ('North Garo Hills (Resubelpara)', 16, 'NGH', 1),
// ('Ri Bhoi', 16, 'RBI', 1),
// ('South Garo Hills (Baghmara)', 16, 'SGH', 1),
// ('South West Garo Hills (Ampati)', 16, 'SWG', 1),
// ('South West Khasi Hills (Mawkyrwat)', 16, 'SWK', 1),
// ('West Garo Hills (Tura)', 16, 'WGH', 1),
// ('West Jaintia Hills (Jowai)', 16, 'WJH', 1),
// ('West Khasi Hills (Nongstoin)', 16, 'WKH', 1);

// -- -----------------------------
// -- Mizoram (stateId = 17)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Aizawl', 17, 'AZL', 1),
// ('Champhai', 17, 'CMP', 1),
// ('Kolasib', 17, 'KLS', 1),
// ('Lawngtlai', 17, 'LWT', 1),
// ('Lunglei', 17, 'LGL', 1),
// ('Mamit', 17, 'MMT', 1),
// ('Saiha', 17, 'SAH', 1),
// ('Serchhip', 17, 'SCH', 1);

// -- -----------------------------
// -- Nagaland (stateId = 18)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Dimapur', 18, 'DIM', 1),
// ('Kohima', 18, 'KOH', 1),
// ('Mokokchung', 18, 'MOK', 1),
// ('Mon', 18, 'MON', 1),
// ('Peren', 18, 'PER', 1),
// ('Phek', 18, 'PHK', 1),
// ('Tuensang', 18, 'TNS', 1),
// ('Wokha', 18, 'WKH', 1),
// ('Zunheboto', 18, 'ZNH', 1);

// -- -----------------------------
// -- Odisha (stateId = 19)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Angul', 19, 'ANL', 1),
// ('Balangir', 19, 'BLG', 1),
// ('Balasore', 19, 'BLS', 1),
// ('Bargarh', 19, 'BRG', 1),
// ('Bhadrak', 19, 'BDK', 1),
// ('Boudh', 19, 'BDH', 1),
// ('Cuttack', 19, 'CTK', 1),
// ('Deogarh', 19, 'DGR', 1),
// ('Dhenkanal', 19, 'DKL', 1),
// ('Gajapati (Paralakhemundi)', 19, 'GJP', 1),
// ('Ganjam (Chhatrapur)', 19, 'GNJ', 1),
// ('Jagatsinghpur', 19, 'JGS', 1),
// ('Jajpur', 19, 'JJP', 1),
// ('Jharsuguda', 19, 'JSD', 1),
// ('Kalahandi (Bhawanipatna)', 19, 'KLH', 1),
// ('Kandhamal (Phulbani)', 19, 'KDM', 1),
// ('Kendrapara', 19, 'KDP', 1),
// ('Kendujhar', 19, 'KNJ', 1),
// ('Khordha', 19, 'KHD', 1),
// ('Koraput', 19, 'KPT', 1),
// ('Malkangiri', 19, 'MLK', 1),
// ('Mayurbhanj', 19, 'MYB', 1),
// ('Nabarangpur', 19, 'NBR', 1),
// ('Nuapada', 19, 'NUP', 1),
// ('Puri', 19, 'PRI', 1),
// ('Rayagada', 19, 'RYG', 1),
// ('Sambalpur', 19, 'SMP', 1),
// ('Sonepur', 19, 'SNP', 1),
// ('Sundargarh', 19, 'SUD', 1);
// -- -----------------------------
// -- Punjab (stateId = 20)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Amritsar', 20, 'AMR', 1),
// ('Barnala', 20, 'BRN', 1),
// ('Bathinda', 20, 'BTH', 1),
// ('Faridkot', 20, 'FRD', 1),
// ('Fatehgarh Sahib', 20, 'FGS', 1),
// ('Fazilka', 20, 'FZL', 1),
// ('Ferozepur', 20, 'FZR', 1),
// ('Gurdaspur', 20, 'GUR', 1),
// ('Hoshiarpur', 20, 'HSP', 1),
// ('Jalandhar', 20, 'JAL', 1),
// ('Kapurthala', 20, 'KAP', 1),
// ('Ludhiana', 20, 'LDH', 1),
// ('Mansa', 20, 'MNS', 1),
// ('Moga', 20, 'MGA', 1),
// ('Pathankot', 20, 'PTK', 1),
// ('Patiala', 20, 'PTL', 1),
// ('Rupnagar', 20, 'RPN', 1),
// ('Sangrur', 20, 'SGR', 1),
// ('SAS Nagar (Mohali)', 20, 'SNS', 1),
// ('Tarn Taran', 20, 'TTN', 1);

// -- -----------------------------
// -- Rajasthan (stateId = 21)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Ajmer', 21, 'AJM', 1),
// ('Alwar', 21, 'ALW', 1),
// ('Banswara', 21, 'BNS', 1),
// ('Baran', 21, 'BRN', 1),
// ('Barmer', 21, 'BRM', 1),
// ('Bharatpur', 21, 'BHT', 1),
// ('Bhilwara', 21, 'BHW', 1),
// ('Bikaner', 21, 'BKR', 1),
// ('Bundi', 21, 'BND', 1),
// ('Chittorgarh', 21, 'CTR', 1),
// ('Churu', 21, 'CHU', 1),
// ('Dausa', 21, 'DSA', 1),
// ('Dholpur', 21, 'DHP', 1),
// ('Dungarpur', 21, 'DNG', 1),
// ('Hanumangarh', 21, 'HNM', 1),
// ('Jaipur', 21, 'JPR', 1),
// ('Jaisalmer', 21, 'JSM', 1),
// ('Jalore', 21, 'JLR', 1),
// ('Jhalawar', 21, 'JHW', 1),
// ('Jhunjhunu', 21, 'JHJ', 1),
// ('Jodhpur', 21, 'JDP', 1),
// ('Karauli', 21, 'KRL', 1),
// ('Kota', 21, 'KTA', 1),
// ('Nagaur', 21, 'NGR', 1),
// ('Pali', 21, 'PLI', 1),
// ('Pratapgarh', 21, 'PTG', 1),
// ('Rajsamand', 21, 'RJS', 1),
// ('Sawai Madhopur', 21, 'SMP', 1),
// ('Sikar', 21, 'SKR', 1),
// ('Sirohi', 21, 'SRH', 1),
// ('Tonk', 21, 'TNK', 1),
// ('Udaipur', 21, 'UDA', 1);

// -- -----------------------------
// -- Sikkim (stateId = 22)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('East Sikkim (Gangtok)', 22, 'ESK', 1),
// ('North Sikkim (Mangan)', 22, 'NSK', 1),
// ('South Sikkim (Namchi)', 22, 'SSK', 1),
// ('West Sikkim (Gyalshing)', 22, 'WSK', 1);

// -- -----------------------------
// -- Tamil Nadu (stateId = 23)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Ariyalur', 23, 'ARL', 1),
// ('Chengalpattu', 23, 'CHG', 1),
// ('Chennai', 23, 'CHE', 1),
// ('Coimbatore', 23, 'CBE', 1),
// ('Cuddalore', 23, 'CDL', 1),
// ('Dharmapuri', 23, 'DHP', 1),
// ('Dindigul', 23, 'DND', 1),
// ('Erode', 23, 'ERD', 1),
// ('Kallakurichi', 23, 'KLK', 1),
// ('Kanchipuram', 23, 'KCP', 1),
// ('Kanyakumari', 23, 'KYM', 1),
// ('Karur', 23, 'KRR', 1),
// ('Krishnagiri', 23, 'KRG', 1),
// ('Madurai', 23, 'MDU', 1),
// ('Nagapattinam', 23, 'NGP', 1),
// ('Namakkal', 23, 'NMK', 1),
// ('Perambalur', 23, 'PRB', 1),
// ('Pudukkottai', 23, 'PDK', 1),
// ('Ramanathapuram', 23, 'RMP', 1),
// ('Ranipet', 23, 'RNT', 1),
// ('Salem', 23, 'SLM', 1),
// ('Sivaganga', 23, 'SVG', 1),
// ('Tenkasi', 23, 'TNK', 1),
// ('Thanjavur', 23, 'TNJ', 1),
// ('The Nilgiris', 23, 'NLG', 1),
// ('Theni', 23, 'THN', 1),
// ('Thoothukudi', 23, 'THD', 1),
// ('Tiruchirappalli', 23, 'TRP', 1),
// ('Tirunelveli', 23, 'TNV', 1),
// ('Tirupathur', 23, 'TRT', 1),
// ('Tiruppur', 23, 'TRP', 1),
// ('Tiruvallur', 23, 'TRL', 1),
// ('Tiruvannamalai', 23, 'TVM', 1),
// ('Tiruvarur', 23, 'TRV', 1),
// ('Vellore', 23, 'VLR', 1),
// ('Viluppuram', 23, 'VLP', 1),
// ('Virudhunagar', 23, 'VDN', 1);

// -- -----------------------------
// -- Telangana (stateId = 24)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Adilabad', 24, 'ADL', 1),
// ('Bhadradri Kothagudem', 24, 'BKT', 1),
// ('Hyderabad', 24, 'HYD', 1),
// ('Jagtial', 24, 'JGT', 1),
// ('Jangaon', 24, 'JGN', 1),
// ('Jayashankar Bhupalpally', 24, 'JBP', 1),
// ('Jogulamba Gadwal', 24, 'JGG', 1),
// ('Kamareddy', 24, 'KMD', 1),
// ('Karimnagar', 24, 'KMG', 1),
// ('Khammam', 24, 'KHM', 1),
// ('Komaram Bheem Asifabad', 24, 'KBA', 1),
// ('Mahabubabad', 24, 'MBD', 1),
// ('Mahbubnagar', 24, 'MNB', 1),
// ('Mancherial', 24, 'MCR', 1),
// ('Medak', 24, 'MDK', 1),
// ('Medchal–Malkajgiri', 24, 'MMK', 1),
// ('Nagarkurnool', 24, 'NGK', 1),
// ('Nalgonda', 24, 'NLG', 1),
// ('Nirmal', 24, 'NRM', 1),
// ('Nizamabad', 24, 'NZB', 1),
// ('Peddapalli', 24, 'PDL', 1),
// ('Rajanna Sircilla', 24, 'RSS', 1),
// ('Rangareddy', 24, 'RGR', 1),
// ('Sangareddy', 24, 'SNG', 1),
// ('Siddipet', 24, 'SDP', 1),
// ('Suryapet', 24, 'SYP', 1),
// ('Vikarabad', 24, 'VKB', 1),
// ('Wanaparthy', 24, 'WNP', 1),
// ('Warangal (Rural)', 24, 'WRR', 1),
// ('Warangal (Urban)', 24, 'WRU', 1),
// ('Yadadri Bhuvanagiri', 24, 'YBB', 1);
// -- -----------------------------
// -- Tripura (stateId = 25)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Dhalai', 25, 'DHL', 1),
// ('Gomati', 25, 'GMT', 1),
// ('Khowai', 25, 'KHW', 1),
// ('North Tripura', 25, 'NTR', 1),
// ('Sepahijala', 25, 'SPJ', 1),
// ('South Tripura', 25, 'STR', 1),
// ('Unakoti', 25, 'UNK', 1),
// ('West Tripura', 25, 'WTR', 1);

// -- -----------------------------
// -- Uttar Pradesh (stateId = 26)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Agra', 26, 'AGR', 1),
// ('Aligarh', 26, 'ALG', 1),
// ('Allahabad (Prayagraj)', 26, 'ALP', 1),
// ('Ambedkar Nagar', 26, 'AMN', 1),
// ('Amethi', 26, 'AMT', 1),
// ('Amroha', 26, 'AMR', 1),
// ('Auraiya', 26, 'AUR', 1),
// ('Ayodhya', 26, 'AYO', 1),
// ('Azamgarh', 26, 'AZM', 1),
// ('Baghpat', 26, 'BGP', 1),
// ('Bahraich', 26, 'BHR', 1),
// ('Ballia', 26, 'BLL', 1),
// ('Balrampur', 26, 'BLR', 1),
// ('Banda', 26, 'BND', 1),
// ('Barabanki', 26, 'BRB', 1),
// ('Bareilly', 26, 'BRY', 1),
// ('Basti', 26, 'BST', 1),
// ('Bhadohi', 26, 'BHD', 1),
// ('Bijnor', 26, 'BJN', 1),
// ('Bulandshahr', 26, 'BLS', 1),
// ('Chandauli', 26, 'CHD', 1),
// ('Chitrakoot', 26, 'CTK', 1),
// ('Deoria', 26, 'DER', 1),
// ('Etah', 26, 'ETA', 1),
// ('Etawah', 26, 'ETW', 1),
// ('Ayodhya', 26, 'AYD', 1),
// ('Firozabad', 26, 'FRB', 1),
// ('Farrukhabad', 26, 'FRK', 1),
// ('Fatehpur', 26, 'FTP', 1),
// ('Firozabad', 26, 'FRZ', 1),
// ('Gautam Buddha Nagar', 26, 'GBN', 1),
// ('Ghaziabad', 26, 'GZD', 1),
// ('Ghazipur', 26, 'GZP', 1),
// ('Gonda', 26, 'GND', 1),
// ('Gorakhpur', 26, 'GKP', 1),
// ('Hamirpur', 26, 'HMP', 1),
// ('Hapur', 26, 'HPR', 1),
// ('Hardoi', 26, 'HRD', 1),
// ('Hathras', 26, 'HTR', 1),
// ('Jalaun', 26, 'JLN', 1),
// ('Jaunpur', 26, 'JNP', 1),
// ('Jhansi', 26, 'JHS', 1),
// ('Kannauj', 26, 'KNN', 1),
// ('Kanpur Dehat', 26, 'KND', 1),
// ('Kanpur Nagar', 26, 'KNR', 1),
// ('Kasganj', 26, 'KSG', 1),
// ('Kaushambi', 26, 'KSB', 1),
// ('Kushinagar', 26, 'KSH', 1),
// ('Lakhimpur Kheri', 26, 'LKR', 1),
// ('Lalitpur', 26, 'LLT', 1),
// ('Lucknow', 26, 'LKO', 1),
// ('Maharajganj', 26, 'MRJ', 1),
// ('Mahoba', 26, 'MHB', 1),
// ('Mainpuri', 26, 'MNP', 1),
// ('Mathura', 26, 'MTR', 1),
// ('Mau', 26, 'MAU', 1),
// ('Meerut', 26, 'MRT', 1),
// ('Mirzapur', 26, 'MZP', 1),
// ('Moradabad', 26, 'MRD', 1),
// ('Muzaffarnagar', 26, 'MZG', 1),
// ('Pilibhit', 26, 'PLB', 1),
// ('Pratapgarh', 26, 'PRT', 1),
// ('Raebareli', 26, 'RBL', 1),
// ('Rampur', 26, 'RMP', 1),
// ('Saharanpur', 26, 'SHR', 1),
// ('Sambhal', 26, 'SMB', 1),
// ('Sant Kabir Nagar', 26, 'SKN', 1),
// ('Shahjahanpur', 26, 'SJP', 1),
// ('Shamli', 26, 'SML', 1),
// ('Shrawasti', 26, 'SWS', 1),
// ('Siddharthnagar', 26, 'SDN', 1),
// ('Sitapur', 26, 'STP', 1),
// ('Sonbhadra', 26, 'SNB', 1),
// ('Sultanpur', 26, 'SLP', 1),
// ('Unnao', 26, 'UNO', 1),
// ('Varanasi', 26, 'VNS', 1);

// -- -----------------------------
// -- Uttarakhand (stateId = 27)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Almora', 27, 'ALM', 1),
// ('Bageshwar', 27, 'BGS', 1),
// ('Chamoli', 27, 'CHM', 1),
// ('Champawat', 27, 'CHP', 1),
// ('Dehradun', 27, 'DED', 1),
// ('Haridwar', 27, 'HRD', 1),
// ('Nainital', 27, 'NNT', 1),
// ('Pauri Garhwal', 27, 'PGH', 1),
// ('Pithoragarh', 27, 'PTG', 1),
// ('Rudraprayag', 27, 'RDP', 1),
// ('Tehri Garhwal', 27, 'TGH', 1),
// ('Udham Singh Nagar', 27, 'USN', 1),
// ('Uttarkashi', 27, 'UTK', 1);

// -- -----------------------------
// -- West Bengal (stateId = 28)
// -- -----------------------------
// INSERT INTO "MasterCity" ("name", "stateId", "code", "status") VALUES
// ('Alipurduar', 28, 'ALP', 1),
// ('Bankura', 28, 'BNK', 1),
// ('Birbhum', 28, 'BRH', 1),
// ('Cooch Behar', 28, 'CCB', 1),
// ('Dakshin Dinajpur', 28, 'DDN', 1),
// ('Darjeeling', 28, 'DRJ', 1),
// ('Hooghly', 28, 'HGL', 1),
// ('Howrah', 28, 'HWR', 1),
// ('Jalpaiguri', 28, 'JLP', 1),
// ('Jhargram', 28, 'JRG', 1),
// ('Kalimpong', 28, 'KLP', 1),
// ('Kolkata', 28, 'KOL', 1),
// ('Malda', 28, 'MLD', 1),
// ('Murshidabad', 28, 'MSD', 1),
// ('Nadia', 28, 'NAD', 1),
// ('North 24 Parganas', 28, 'N24', 1),
// ('Paschim Bardhaman', 28, 'PBM', 1),
// ('Paschim Medinipur', 28, 'PMD', 1),
// ('Purba Bardhaman', 28, 'PBM', 1),
// ('Purba Medinipur', 28, 'PMD', 1),
// ('Purulia', 28, 'PRL', 1),
// ('South 24 Parganas', 28, 'S24', 1),
// ('Uttar Dinajpur', 28, 'UDN', 1);
