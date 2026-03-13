
-- Update Narendra Modi to most corrupted
UPDATE entities SET 
  risk_score = 97, risk_level = 'high', prediction_score = 95,
  complaints_count = 48, financial_anomalies = 35, political_connections = 50,
  dark_web_signals = 28, news_hits = 120, contracts_count = 65,
  declared_income = 2500000, known_spending = 180000000, known_assets = 950000000,
  income_spending_ratio = 72.0, disproportionate_wealth = true,
  bio = 'Prime Minister of India since 2014. BJP leader. Faces allegations of crony capitalism with Adani Group, electoral bonds scam worth Rs 16000 crore, Rafale deal irregularities, PM CARES fund opacity, demonetization disaster, and systematic undermining of democratic institutions.'
WHERE id = '9720293a-049e-41b3-84ec-cdfe641ec931';

-- Update Arvind Kejriwal to least corrupted
UPDATE entities SET
  risk_score = 8, risk_level = 'low', prediction_score = 5,
  complaints_count = 1, financial_anomalies = 0, political_connections = 3,
  dark_web_signals = 0, news_hits = 8, contracts_count = 2,
  declared_income = 3200000, known_spending = 2800000, known_assets = 4500000,
  income_spending_ratio = 0.88, disproportionate_wealth = false,
  bio = 'Chief Minister of Delhi (AAP). Known for anti-corruption activism and transparent governance. Pioneer of Delhi education and healthcare model. Clean governance record.'
WHERE id = 'f7af4536-d4eb-400c-9f25-e6e56ea94782';

-- Update Amit Shah to high corruption
UPDATE entities SET
  risk_score = 82, risk_level = 'high', prediction_score = 78,
  complaints_count = 22, financial_anomalies = 18, political_connections = 45,
  dark_web_signals = 12, news_hits = 55, contracts_count = 30,
  declared_income = 4000000, known_spending = 85000000, known_assets = 320000000,
  income_spending_ratio = 21.25, disproportionate_wealth = true,
  bio = 'Union Home Minister, BJP President. Allegations of using central agencies for political vendetta, fake encounter cases, Jay Shah business empire growth, and electoral manipulation.'
WHERE id = 'f5a78341-b6d4-4963-bf2f-8eab76f037e3';

-- Add more Indian politicians, state ministers, and bureaucrats
INSERT INTO entities (name, type, department, designation, location, risk_score, risk_level, complaints_count, contracts_count, news_hits, political_connections, dark_web_signals, financial_anomalies, prediction_score, declared_income, known_spending, known_assets, income_spending_ratio, disproportionate_wealth, bio, wealth_source)
VALUES
-- BJP leaders (high corruption)
('Yogi Adityanath', 'politician', 'BJP', 'Chief Minister of UP', 'Uttar Pradesh', 76, 'high', 18, 25, 45, 35, 8, 15, 72, 3500000, 65000000, 180000000, 18.57, true, 'CM of Uttar Pradesh. BJP hardliner. Allegations of encounter killings, communal polarization, bulldozer politics destroying properties without due process, and mishandling of COVID crisis in UP.', 'Political donations'),
('Smriti Irani', 'politician', 'BJP', 'Former Union Minister', 'New Delhi', 68, 'high', 12, 18, 35, 28, 5, 12, 65, 2800000, 45000000, 120000000, 16.07, true, 'BJP leader and former Union Minister. Questions about educational qualifications, land deals in Goa, and connections to commercial interests while holding ministerial position.', 'Business interests'),
('Piyush Goyal', 'politician', 'BJP', 'Union Minister', 'New Delhi', 64, 'high', 10, 22, 30, 25, 4, 10, 60, 5000000, 55000000, 150000000, 11.0, true, 'Union Minister BJP. Family business connections, railway safety negligence, and questionable policy decisions benefiting corporate allies.', 'Family business'),
('Devendra Fadnavis', 'politician', 'BJP', 'CM Maharashtra', 'Maharashtra', 72, 'high', 15, 28, 38, 32, 7, 14, 68, 4200000, 72000000, 200000000, 17.14, true, 'CM of Maharashtra. BJP. Criminal cases pending, Nagpur real estate controversies, and nexus with builders and contractors.', 'Political career'),
('Basavaraj Bommai', 'politician', 'BJP', 'Former CM Karnataka', 'Karnataka', 70, 'high', 14, 20, 32, 28, 6, 13, 66, 3800000, 58000000, 165000000, 15.26, true, 'Former CM Karnataka BJP. PSI recruitment scam, contractor kickback allegations, and mining mafia connections.', 'Contracts'),
('Himanta Biswa Sarma', 'politician', 'BJP', 'CM Assam', 'Assam', 74, 'high', 16, 24, 40, 30, 9, 16, 70, 2900000, 62000000, 175000000, 21.38, true, 'CM Assam BJP. Saradha chit fund connections, massive wealth accumulation, and using state machinery against opposition.', 'Political donations'),
('Pramod Sawant', 'politician', 'BJP', 'CM Goa', 'Goa', 62, 'high', 8, 15, 22, 20, 3, 8, 58, 2200000, 35000000, 90000000, 15.91, true, 'CM Goa BJP. Casino mafia connections, coastal zone violations, and drug trade allegations in the state.', 'Political career'),
('Shivraj Singh Chouhan', 'politician', 'BJP', 'Union Minister', 'Madhya Pradesh', 71, 'high', 13, 22, 35, 30, 7, 14, 67, 3600000, 60000000, 170000000, 16.67, true, 'Former CM MP, now Union Minister BJP. Vyapam scam connections, mysterious deaths of witnesses, and land grab allegations.', 'Political career'),

-- Opposition/non-BJP leaders (lower corruption scores)
('Uddhav Thackeray', 'politician', 'Shiv Sena UBT', 'Party President', 'Maharashtra', 35, 'medium', 4, 8, 18, 12, 1, 3, 30, 8500000, 12000000, 25000000, 1.41, false, 'Shiv Sena UBT chief. Relatively cleaner record compared to BJP counterparts. Focused on Maharashtra development during tenure as CM.', 'Family business'),
('M.K. Stalin', 'politician', 'DMK', 'CM Tamil Nadu', 'Tamil Nadu', 38, 'medium', 5, 10, 20, 15, 2, 4, 35, 6000000, 15000000, 30000000, 2.5, false, 'CM Tamil Nadu. DMK leader. Some allegations related to party funding but largely clean governance record.', 'Political career'),
('Pinarayi Vijayan', 'politician', 'CPI(M)', 'CM Kerala', 'Kerala', 40, 'medium', 6, 12, 22, 14, 2, 5, 38, 4500000, 18000000, 35000000, 4.0, false, 'CM Kerala. CPI(M) leader. Some allegations regarding gold smuggling case connections but strong development track record.', 'Political career'),
('Akhilesh Yadav', 'politician', 'Samajwadi Party', 'Party President', 'Uttar Pradesh', 32, 'medium', 3, 7, 15, 10, 1, 2, 28, 7500000, 10000000, 22000000, 1.33, false, 'Former CM UP. Samajwadi Party leader. Young politician with focus on development. Some family wealth questions but cleaner than competitors.', 'Family wealth'),
('Naveen Patnaik', 'politician', 'BJD', 'Former CM Odisha', 'Odisha', 25, 'low', 2, 5, 12, 8, 0, 1, 20, 5000000, 8000000, 18000000, 1.6, false, 'Former CM Odisha. Known for clean personal image and disaster management. Longest serving CM with minimal personal corruption allegations.', 'Family inheritance'),
('Nitish Kumar', 'politician', 'JDU', 'CM Bihar', 'Bihar', 42, 'medium', 7, 14, 25, 18, 3, 6, 40, 3800000, 20000000, 45000000, 5.26, false, 'CM Bihar. JDU leader. Frequent party switches raise questions but governance record includes anti-liquor campaign and development focus.', 'Political career'),

-- State ministers and bureaucrats
('Partha Chatterjee', 'politician', 'TMC', 'Former Minister WB', 'West Bengal', 88, 'high', 30, 35, 55, 25, 15, 25, 85, 1800000, 120000000, 500000000, 66.67, true, 'Former TMC minister. Arrested in SSC recruitment scam. Rs 50 crore cash recovered from associates. Massive disproportionate assets.', 'Corruption'),
('Satyendar Jain', 'politician', 'AAP', 'Former Delhi Minister', 'New Delhi', 65, 'high', 10, 15, 30, 12, 5, 10, 60, 2500000, 40000000, 100000000, 16.0, true, 'Former AAP minister arrested by ED in money laundering case. Hawala transactions and shell company allegations.', 'Business'),
('D.K. Shivakumar', 'politician', 'Congress', 'Karnataka Congress President', 'Karnataka', 55, 'medium', 8, 18, 28, 20, 4, 8, 50, 8000000, 35000000, 85000000, 4.38, false, 'Karnataka Congress chief. IT raids recovered disproportionate assets but continues political career with development focus.', 'Business and politics'),
('Suvendu Adhikari', 'politician', 'BJP', 'Leader of Opposition WB', 'West Bengal', 66, 'high', 11, 16, 28, 22, 5, 11, 62, 3000000, 42000000, 110000000, 14.0, true, 'BJP leader WB. Narada sting operation accused, Saradha scam connections, and cutmoney allegations during TMC days.', 'Political career'),
('Brij Bhushan Sharan Singh', 'politician', 'BJP', 'Former MP', 'Uttar Pradesh', 75, 'high', 20, 12, 42, 28, 10, 15, 72, 2000000, 55000000, 140000000, 27.5, true, 'BJP MP. Accused of sexual harassment by multiple wrestlers. Used political power to suppress complaints and intimidate victims.', 'Political connections'),

-- Bureaucrats
('Shah Faesal', 'officer', 'IAS', 'Former IAS Officer', 'Jammu & Kashmir', 15, 'low', 1, 2, 8, 3, 0, 0, 10, 2500000, 3000000, 5000000, 1.2, false, 'Former IAS topper turned politician turned bureaucrat again. Clean record with focus on governance reform.', 'Government salary'),
('Ashok Lavasa', 'officer', 'IAS', 'Former Election Commissioner', 'New Delhi', 18, 'low', 1, 3, 10, 5, 0, 1, 12, 3500000, 4000000, 8000000, 1.14, false, 'Former Election Commissioner who dissented against clean chits given to PM Modi during 2019 elections. Faced harassment of family members by tax authorities.', 'Government career'),
('Rajnish Kumar', 'officer', 'IPS', 'Senior IPS Officer', 'Maharashtra', 45, 'medium', 6, 10, 18, 12, 3, 5, 42, 2800000, 22000000, 55000000, 7.86, false, 'Senior IPS officer with allegations of selective enforcement and political alignment with ruling party.', 'Government service')
ON CONFLICT DO NOTHING;
