
-- Seed entities with diverse famous-style profiles
INSERT INTO public.entities (name, type, department, designation, location, risk_score, risk_level, complaints_count, contracts_count, news_hits, political_connections, dark_web_signals, financial_anomalies, prediction_score, bio) VALUES
('Rajesh Kumar', 'officer', 'Public Works', 'Chief Engineer', 'Delhi', 72, 'high', 14, 47, 8, 5, 2, 6, 72, 'Senior government engineer overseeing major infrastructure projects in northern India.'),
('Suresh Patel', 'politician', 'Municipal Corporation', 'Councillor', 'Mumbai', 85, 'high', 22, 31, 15, 12, 4, 9, 85, 'Influential municipal councillor controlling key urban development contracts.'),
('SK Infrastructure Ltd', 'company', 'Construction', 'Contractor Firm', 'Gujarat', 68, 'high', 9, 63, 5, 7, 3, 8, 68, 'Major infrastructure company with contracts across multiple states.'),
('Anita Sharma', 'officer', 'Education', 'Director', 'Rajasthan', 25, 'low', 2, 12, 1, 1, 0, 1, 25, 'Education department director known for transparent governance.'),
('Vikram Singh', 'contractor', 'Road Construction', 'Contractor', 'Uttar Pradesh', 54, 'medium', 7, 28, 3, 4, 1, 4, 54, 'Road construction contractor with operations in UP and Bihar.'),
('Meera Reddy', 'politician', 'State Assembly', 'MLA', 'Telangana', 41, 'medium', 5, 19, 4, 8, 0, 3, 41, 'State legislator with interests in infrastructure and real estate.'),
('Golden Builders Pvt Ltd', 'company', 'Real Estate', 'Developer', 'Karnataka', 78, 'high', 18, 55, 11, 9, 5, 7, 78, 'Large real estate conglomerate under multiple investigations.'),
('Arun Mishra', 'officer', 'Revenue', 'District Collector', 'Madhya Pradesh', 33, 'medium', 4, 15, 2, 3, 0, 2, 33, 'Revenue department collector with moderate administrative record.'),
('Priya Nair', 'officer', 'Health', 'Chief Medical Officer', 'Kerala', 15, 'low', 1, 8, 0, 1, 0, 0, 15, 'Healthcare administrator with clean track record.'),
('National Roads Corp', 'company', 'Infrastructure', 'PSU', 'Delhi', 45, 'medium', 6, 72, 7, 6, 1, 5, 45, 'Government-affiliated infrastructure corporation.'),
('Lalit Modi', 'business_magnate', 'Sports & Entertainment', 'Former IPL Chairman', 'London', 88, 'high', 28, 15, 45, 14, 7, 12, 88, 'Former cricket league chairman, fugitive from Indian law enforcement. Multiple fraud and money laundering allegations.'),
('Nirav Modi', 'business_magnate', 'Banking & Jewelry', 'Jeweler', 'London', 95, 'high', 35, 8, 52, 11, 9, 15, 95, 'Diamond jeweler at center of ₹13,000 crore PNB banking fraud case.'),
('Vijay Mallya', 'business_magnate', 'Aviation & Liquor', 'Chairman', 'London', 92, 'high', 30, 22, 48, 13, 6, 14, 92, 'Former liquor baron and airline owner. Defaulted on ₹9,000 crore in bank loans.'),
('A. Raja', 'politician', 'Telecom Ministry', 'Former Telecom Minister', 'Tamil Nadu', 82, 'high', 20, 12, 38, 15, 3, 10, 82, 'Former minister involved in the 2G spectrum allocation scandal worth ₹1.76 lakh crore.'),
('Lalu Prasad Yadav', 'politician', 'Railway Ministry', 'Former Railway Minister', 'Bihar', 79, 'high', 25, 18, 42, 16, 2, 11, 79, 'Former chief minister convicted in the fodder scam worth ₹950 crore.'),
('Satyam Ramalinga Raju', 'business_magnate', 'IT Services', 'Former Chairman', 'Hyderabad', 90, 'high', 15, 35, 40, 8, 4, 13, 90, 'Former Satyam Computers chairman who orchestrated India''s largest corporate fraud.'),
('Subrata Roy', 'business_magnate', 'Finance & Real Estate', 'Chairman', 'Lucknow', 76, 'high', 12, 42, 30, 10, 3, 9, 76, 'Sahara Group chairman involved in illegal bond issuance worth ₹24,000 crore.'),
('Madhu Koda', 'politician', 'Mining', 'Former Chief Minister', 'Jharkhand', 84, 'high', 18, 25, 35, 12, 5, 11, 84, 'Former CM convicted for illegal mining and money laundering worth ₹4,000 crore.'),
('Hassan Ali Khan', 'business_magnate', 'Horse Breeding & Trading', 'Businessman', 'Pune', 87, 'high', 10, 8, 28, 7, 8, 14, 87, 'Alleged ₹36,000 crore in Swiss bank accounts and hawala connections.'),
('Jagan Mohan Reddy', 'politician', 'State Government', 'Chief Minister', 'Andhra Pradesh', 65, 'high', 16, 30, 25, 14, 2, 7, 65, 'Politician facing disproportionate assets cases worth ₹43,000 crore.'),
('Kalmadi Suresh', 'politician', 'Sports & Olympics', 'Former IOA President', 'Maharashtra', 80, 'high', 22, 20, 36, 11, 3, 10, 80, 'Former Indian Olympic Association head convicted in CWG scam.'),
('Mehul Choksi', 'business_magnate', 'Jewelry', 'Jeweler', 'Antigua', 93, 'high', 32, 6, 44, 9, 10, 15, 93, 'Diamond jeweler, co-accused with Nirav Modi in PNB fraud. Fled to Antigua.'),
('Atul Gupta', 'business_magnate', 'Mining & Media', 'Businessman', 'South Africa', 70, 'high', 8, 38, 22, 13, 4, 8, 70, 'Indian-origin businessman linked to state capture corruption in South Africa.'),
('Sharad Pawar', 'politician', 'Agriculture Ministry', 'Party President', 'Maharashtra', 48, 'medium', 8, 14, 18, 16, 1, 4, 48, 'Veteran politician with allegations in irrigation scam and IPL controversy.'),
('B. Sriramulu', 'politician', 'Mining & Health', 'Minister', 'Karnataka', 62, 'high', 11, 16, 20, 10, 2, 6, 62, 'Karnataka politician linked to illegal mining baron Bellary Reddy brothers.');

-- Seed news reports
INSERT INTO public.news_reports (headline, source, published_date, linked_entities, keywords, risk_level, content) VALUES
('Highway Contract Scam Investigation Widens Across States', 'Times of India', '2026-03-08', ARRAY['Rajesh Kumar', 'SK Infrastructure Ltd'], ARRAY['scam', 'highway', 'contract', 'investigation'], 'high', 'CBI investigation reveals nationwide highway contract manipulation network.'),
('Municipal Fund Misuse Allegations Surface in Mumbai', 'NDTV', '2026-03-05', ARRAY['Suresh Patel'], ARRAY['fund misuse', 'municipal', 'corruption'], 'high', 'Multiple complaints filed against councillor for diverting municipal funds.'),
('Real Estate Developer Under ED Scanner for Land Deals', 'Economic Times', '2026-03-01', ARRAY['Golden Builders Pvt Ltd'], ARRAY['real estate', 'land fraud', 'ED investigation'], 'high', 'Enforcement Directorate raids offices of Golden Builders in multi-state operation.'),
('Road Construction Quality Audit Reveals Massive Irregularities', 'The Hindu', '2026-02-25', ARRAY['Vikram Singh'], ARRAY['road', 'quality', 'irregularity', 'audit'], 'medium', 'CAG report highlights substandard materials used in UP road projects.'),
('PNB Fraud: New Evidence Links More Banks to Nirav Modi Network', 'Indian Express', '2026-02-20', ARRAY['Nirav Modi', 'Mehul Choksi'], ARRAY['PNB fraud', 'banking', 'money laundering'], 'high', 'Investigation reveals additional banks were exploited through similar SWIFT messaging fraud.'),
('Vijay Mallya Extradition Hearing Faces Fresh Delays', 'Hindustan Times', '2026-02-18', ARRAY['Vijay Mallya'], ARRAY['extradition', 'bank default', 'fugitive'], 'high', 'UK courts adjourn hearing as defense presents new medical evidence.'),
('2G Scam Aftermath: Telecom Reforms Under Review', 'Business Standard', '2026-02-15', ARRAY['A. Raja'], ARRAY['2G spectrum', 'telecom', 'reform'], 'medium', 'Parliamentary committee reviews post-scam telecom regulations.'),
('Fodder Scam Convict Lalu Yadav Seeks Pardon', 'NDTV', '2026-02-12', ARRAY['Lalu Prasad Yadav'], ARRAY['fodder scam', 'conviction', 'pardon'], 'high', 'Former Bihar CM files petition for presidential pardon in fodder scam cases.'),
('Satyam Fraud Anniversary: Corporate Governance Lessons', 'Mint', '2026-02-10', ARRAY['Satyam Ramalinga Raju'], ARRAY['corporate fraud', 'Satyam', 'governance'], 'medium', 'Experts reflect on India''s largest corporate fraud and regulatory reforms.'),
('Mining Baron Network Exposed in Jharkhand', 'India Today', '2026-02-05', ARRAY['Madhu Koda'], ARRAY['mining', 'illegal', 'money laundering', 'Jharkhand'], 'high', 'New documents reveal extent of illegal mining operations under former CM.'),
('Swiss Bank Data Reveals More Indian Account Holders', 'Reuters India', '2026-01-28', ARRAY['Hassan Ali Khan'], ARRAY['Swiss bank', 'black money', 'tax evasion'], 'high', 'Latest exchange of financial data exposes hidden fortunes of Indian nationals.'),
('CWG Scam: Final Audit Report Quantifies Losses', 'The Wire', '2026-01-20', ARRAY['Kalmadi Suresh'], ARRAY['Commonwealth Games', 'scam', 'audit'], 'high', 'Comprehensive audit reveals total misappropriation exceeded initial estimates.');

-- Seed relationships
INSERT INTO public.relationships (source_entity_id, target_entity_id, relationship_type, description, strength)
SELECT e1.id, e2.id, 'contract', 'Highway construction contracts', 8
FROM public.entities e1, public.entities e2
WHERE e1.name = 'Rajesh Kumar' AND e2.name = 'SK Infrastructure Ltd';

INSERT INTO public.relationships (source_entity_id, target_entity_id, relationship_type, description, strength)
SELECT e1.id, e2.id, 'financial', 'Fund diversion through real estate', 9
FROM public.entities e1, public.entities e2
WHERE e1.name = 'Suresh Patel' AND e2.name = 'Golden Builders Pvt Ltd';

INSERT INTO public.relationships (source_entity_id, target_entity_id, relationship_type, description, strength)
SELECT e1.id, e2.id, 'financial', 'PNB fraud co-conspirators', 10
FROM public.entities e1, public.entities e2
WHERE e1.name = 'Nirav Modi' AND e2.name = 'Mehul Choksi';

INSERT INTO public.relationships (source_entity_id, target_entity_id, relationship_type, description, strength)
SELECT e1.id, e2.id, 'political', 'Political alliance and business connections', 6
FROM public.entities e1, public.entities e2
WHERE e1.name = 'Lalu Prasad Yadav' AND e2.name = 'Madhu Koda';

INSERT INTO public.relationships (source_entity_id, target_entity_id, relationship_type, description, strength)
SELECT e1.id, e2.id, 'subcontract', 'Sub-contracting for highway projects', 5
FROM public.entities e1, public.entities e2
WHERE e1.name = 'Vikram Singh' AND e2.name = 'SK Infrastructure Ltd';

-- Seed complaints
INSERT INTO public.complaints (tracking_id, entity_name, department, location, description, amount, status, anonymous) VALUES
('WB-2026-001', 'Rajesh Kumar', 'Public Works', 'Delhi', 'Alleged favoritism in highway contract award to SK Infrastructure', 45000000, 'investigating', true),
('WB-2026-002', 'Suresh Patel', 'Municipal Corp', 'Mumbai', 'Inflated project costs for city drainage renovation', 120000000, 'pending', true),
('WB-2026-003', 'Golden Builders Pvt Ltd', 'Real Estate', 'Karnataka', 'Suspected land acquisition fraud with political backing', 250000000, 'investigating', false),
('WB-2026-004', 'Vikram Singh', 'Road Construction', 'UP', 'Sub-standard material used in road construction project', 8000000, 'resolved', true),
('WB-2026-005', 'Nirav Modi', 'Banking', 'Mumbai', 'Fraudulent LoUs issued through PNB Brady House branch', 130000000000, 'investigating', false),
('WB-2026-006', 'Vijay Mallya', 'Aviation', 'Delhi', 'Kingfisher Airlines loan default and asset diversion', 90000000000, 'investigating', false),
('WB-2026-007', 'Lalit Modi', 'Sports', 'Delhi', 'IPL franchise manipulation and foreign exchange violations', 5000000000, 'pending', true);
