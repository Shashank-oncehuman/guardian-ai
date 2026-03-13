
-- Fix income_spending_ratio column to allow larger values
ALTER TABLE entities ALTER COLUMN income_spending_ratio TYPE numeric(12,2);

-- ==========================================
-- PART 1: BJP CRONY NETWORK RELATIONSHIPS
-- ==========================================

-- Modi-Adani Crony Capitalism Network
INSERT INTO relationships (source_entity_id, target_entity_id, relationship_type, description, strength) VALUES
('9720293a-049e-41b3-84ec-cdfe641ec931', '892f4d02-fc6d-427e-9b24-a8d128bb3f15', 'crony_capitalism', 'PROOF: Hindenburg Report 2023 exposed Adani Group fraud. Modi used Air India One for Adani business trips. Electoral bonds worth Rs 800+ crore from Adani to BJP. Adani won 90% govt contracts post-2014.', 10),
('892f4d02-fc6d-427e-9b24-a8d128bb3f15', '9720293a-049e-41b3-84ec-cdfe641ec931', 'political_funding', 'PROOF: Electoral bonds data revealed Adani Group donated Rs 800+ crore to BJP. Adani wealth grew 1200% under Modi regime.', 10),
('9720293a-049e-41b3-84ec-cdfe641ec931', 'd28d5247-1380-4146-8d9d-53d995c8d705', 'business_alliance', 'PROOF: Reliance Jio spectrum at below-market rates. Rafale offset to Anil Ambani with zero experience.', 8),
('9720293a-049e-41b3-84ec-cdfe641ec931', 'f5a78341-b6d4-4963-bf2f-8eab76f037e3', 'political_alliance', 'PROOF: Shah-Modi duo controls BJP. Jay Shah BCCI revenue grew 16000% after Modi became PM. ED/CBI weaponized.', 10),
('f5a78341-b6d4-4963-bf2f-8eab76f037e3', '9720293a-049e-41b3-84ec-cdfe641ec931', 'power_nexus', 'PROOF: Sohrabuddin fake encounter. Jay Shah business grew Rs 50,000 to Rs 80 crore post-2014.', 10),
('f5a78341-b6d4-4963-bf2f-8eab76f037e3', '892f4d02-fc6d-427e-9b24-a8d128bb3f15', 'business_nexus', 'PROOF: Adani-Shah Gujarat connections. Jay Shah-Adani business links exposed by The Wire.', 8),
('9720293a-049e-41b3-84ec-cdfe641ec931', 'd6fcfe74-be79-4ca6-b673-f6830084299d', 'party_hierarchy', 'Modi appointed Yogi as UP CM. Bulldozer politics, encounter killings, CAA-NRC implementation.', 9),
('9720293a-049e-41b3-84ec-cdfe641ec931', 'a5ba9c79-4e94-4690-915f-bae5fa4859c0', 'party_hierarchy', 'BJP loyal. Fake degree questions. Goa land deal exposed.', 7),
('9720293a-049e-41b3-84ec-cdfe641ec931', 'bbe8c7eb-2096-4b9d-b2ef-f026c869cf87', 'party_hierarchy', 'Family business benefited from policy decisions. Railway safety negligence.', 7),
('9720293a-049e-41b3-84ec-cdfe641ec931', '70769f46-d254-409f-97bb-17cf2038dbff', 'party_hierarchy', 'BJP Maharashtra. Builder-politician nexus in Mumbai real estate.', 8),
('9720293a-049e-41b3-84ec-cdfe641ec931', '1b8b5175-b8a8-4216-8296-af17a2e5c521', 'party_hierarchy', 'Switched from Congress. Saradha cases dropped after joining BJP. Wealth accumulation.', 8),
('9720293a-049e-41b3-84ec-cdfe641ec931', '2214b540-dc0f-4968-8731-33ea7391ec57', 'party_hierarchy', 'PSI recruitment scam. 40% commission government exposed by contractors.', 7),
('9720293a-049e-41b3-84ec-cdfe641ec931', 'fce22c75-cb8e-4827-913c-141308a455bf', 'party_hierarchy', 'Casino mafia, coastal violations under BJP Goa.', 6),
('9720293a-049e-41b3-84ec-cdfe641ec931', '907272a8-d3e2-48cf-9d29-da58467181d2', 'party_hierarchy', 'VYAPAM scam - largest recruitment scam. 40+ witnesses died mysteriously.', 9),
('9720293a-049e-41b3-84ec-cdfe641ec931', '005867d2-c709-4014-9ad9-a8a2f8e5036f', 'party_protection', 'BJP protected despite sexual harassment charges by Olympic wrestlers.', 8),
('9720293a-049e-41b3-84ec-cdfe641ec931', '85c70fc9-b737-4d5c-91a0-eccfc251df05', 'party_hierarchy', 'Narada sting accused — cases dropped after joining BJP from TMC.', 7),
('9720293a-049e-41b3-84ec-cdfe641ec931', '0205265a-1f13-4625-9152-585760d18b3e', 'allowed_escape', 'PROOF: Nirav Modi fled with Rs 13,000 crore PNB fraud. BJP govt allowed escape.', 8),
('9720293a-049e-41b3-84ec-cdfe641ec931', '0f2aa6ab-bb0a-4ea9-9105-ddc90f1da3c9', 'allowed_escape', 'PROOF: Mehul Choksi PNB fraud accomplice took Antiguan citizenship while under investigation.', 7),
('9720293a-049e-41b3-84ec-cdfe641ec931', '5e347d5e-1f29-4425-bd46-55d37e4c9c43', 'party_connection', 'Lalit Modi helped by BJP leaders Sushma Swaraj and Vasundhara Raje.', 7),
('892f4d02-fc6d-427e-9b24-a8d128bb3f15', 'd28d5247-1380-4146-8d9d-53d995c8d705', 'business_cartel', 'Both benefited from Modi govt. Telecom, ports, energy duopoly.', 7),
('d6fcfe74-be79-4ca6-b673-f6830084299d', 'f5a78341-b6d4-4963-bf2f-8eab76f037e3', 'political_alliance', 'BJP UP power axis. Encounter killings and bulldozer politics.', 8);

-- ==========================================
-- PART 2: INTERNATIONAL ENTITIES
-- ==========================================
INSERT INTO entities (name, type, department, designation, location, risk_score, risk_level, complaints_count, contracts_count, news_hits, political_connections, dark_web_signals, financial_anomalies, prediction_score, declared_income, known_spending, known_assets, income_spending_ratio, disproportionate_wealth, bio, wealth_source) VALUES
('Donald Trump', 'politician', 'Republican Party', 'Former US President', 'United States', 88, 'high', 35, 40, 200, 45, 20, 30, 85, 50000000, 800000000, 2500000000, 16.0, true, '91 felony charges. Found liable for fraud. Trump Org convicted of tax fraud. Jan 6 insurrection. Classified documents. Hush money conviction.', 'Real estate'),
('Vladimir Putin', 'politician', 'United Russia', 'President of Russia', 'Russia', 96, 'high', 50, 60, 300, 55, 40, 45, 95, 140000, 2000000000, 200000000000, 14285.71, true, 'Hidden wealth $200B via oligarch network. Panama Papers. Political assassinations. Ukraine war crimes. Systematic kleptocracy.', 'State capture'),
('Xi Jinping', 'politician', 'CCP', 'President of China', 'China', 85, 'high', 25, 50, 180, 60, 30, 25, 82, 200000, 500000000, 1000000000, 2500.0, true, 'Family wealth $376M exposed by Bloomberg. Panama Papers. Uyghur genocide. Hong Kong suppression.', 'State power'),
('Benjamin Netanyahu', 'politician', 'Likud', 'PM of Israel', 'Israel', 78, 'high', 20, 25, 150, 35, 15, 20, 75, 8000000, 120000000, 300000000, 15.0, true, 'Convicted — bribery, fraud, breach of trust. Cases 1000, 2000, 4000. Gaza genocide allegations at ICC.', 'Political career'),
('Jair Bolsonaro', 'politician', 'PL Party', 'Former President', 'Brazil', 76, 'high', 22, 20, 120, 30, 12, 18, 72, 5000000, 80000000, 200000000, 16.0, true, 'Banned until 2030. Jan 8 insurrection. COVID mismanagement. Amazon deforestation for corporates.', 'Political career'),
('Imran Khan', 'politician', 'PTI', 'Former PM', 'Pakistan', 45, 'medium', 8, 10, 90, 20, 5, 6, 40, 10000000, 25000000, 60000000, 2.5, false, 'Toshakhana case. Jailed by military establishment. Seen as less corrupt than alternatives.', 'Cricket, politics'),
('Recep Tayyip Erdogan', 'politician', 'AKP', 'President', 'Turkey', 82, 'high', 28, 35, 140, 40, 18, 22, 80, 3000000, 300000000, 800000000, 100.0, true, '2013 corruption audio leaks. ISIS oil trade allegations. $615M palace. Press freedom crackdown.', 'State power'),
('Jacob Zuma', 'politician', 'ANC', 'Former President', 'South Africa', 90, 'high', 40, 45, 160, 38, 22, 35, 88, 1500000, 250000000, 600000000, 166.67, true, '16 corruption charges. Arms deal scandal. Gupta state capture. Nkandla scandal. Jailed.', 'State capture'),
('Nawaz Sharif', 'politician', 'PML-N', 'Former PM', 'Pakistan', 75, 'high', 18, 28, 100, 28, 10, 18, 72, 5000000, 200000000, 500000000, 40.0, true, 'Panama Papers offshore wealth. Convicted. Avenfield properties. Disqualified by Supreme Court.', 'Business empire'),
('Elon Musk', 'business_magnate', 'Tech', 'CEO Tesla/SpaceX', 'United States', 55, 'medium', 10, 30, 250, 25, 8, 12, 50, 100000000, 500000000, 250000000000, 500.0, true, 'SEC fraud charges settled. Market manipulation tweets. DOGE conflicts of interest. Tax avoidance.', 'Tesla, SpaceX'),
('Jeff Bezos', 'business_magnate', 'Tech', 'Chairman Amazon', 'United States', 48, 'medium', 8, 25, 120, 15, 5, 8, 45, 80000000, 200000000, 180000000000, 2.5, true, 'Worker exploitation. Paid $0 federal tax some years. Monopolistic practices.', 'Amazon'),
('Roman Abramovich', 'business_magnate', 'Oligarch', 'Former Chelsea Owner', 'Russia', 85, 'high', 20, 35, 100, 40, 25, 28, 82, 10000000, 5000000000, 15000000000, 500.0, true, 'Russian oligarch sanctioned. Putin ally. Privatization-era wealth. Money laundering investigations.', 'Russian privatization'),
('Shah Rukh Khan', 'celebrity', 'Bollywood', 'Actor', 'India', 22, 'low', 2, 8, 40, 8, 1, 2, 18, 500000000, 800000000, 6000000000, 1.6, false, 'Minor tax disputes resolved. Generally clean record.', 'Film industry'),
('Salman Khan', 'celebrity', 'Bollywood', 'Actor', 'India', 55, 'medium', 10, 12, 60, 15, 5, 8, 50, 300000000, 600000000, 3000000000, 2.0, false, 'Hit-and-run case. Blackbuck poaching. Arms Act violation. Underworld connections alleged.', 'Film industry'),
('Vijay Mallya', 'business_magnate', 'Aviation', 'Fugitive', 'United Kingdom', 92, 'high', 35, 40, 120, 30, 20, 35, 90, 20000000, 15000000000, 8000000000, 750.0, true, 'Kingfisher fraud Rs 9,000 crore. Fled to UK. PMLA case. Extradition ordered.', 'Liquor, aviation'),

-- More Indian politicians
('Siddaramaiah', 'politician', 'Congress', 'CM Karnataka', 'Karnataka', 42, 'medium', 6, 14, 22, 15, 2, 5, 38, 5500000, 18000000, 40000000, 3.27, false, 'MUDA site controversy. But implemented Anna Bhagya food security.', 'Political career'),
('Tejashwi Yadav', 'politician', 'RJD', 'Deputy CM Bihar', 'Bihar', 38, 'medium', 5, 8, 20, 12, 2, 4, 35, 4000000, 12000000, 28000000, 3.0, false, 'IRCTC case links. Young leader focused on jobs and development.', 'Political family'),
('Sachin Pilot', 'politician', 'Congress', 'Congress Leader', 'Rajasthan', 20, 'low', 2, 4, 15, 8, 0, 1, 15, 6000000, 8000000, 15000000, 1.33, false, 'Reform-oriented. Clean record. Fought internal party corruption.', 'Political career'),
('Nirmala Sitharaman', 'politician', 'BJP', 'Finance Minister', 'New Delhi', 70, 'high', 12, 20, 45, 30, 6, 14, 66, 3500000, 50000000, 130000000, 14.29, true, 'Electoral bonds architect — struck down as unconstitutional. GDP decline. Corporate tax cuts.', 'Political career'),
('Rajnath Singh', 'politician', 'BJP', 'Defence Minister', 'New Delhi', 65, 'high', 10, 22, 35, 32, 5, 10, 62, 4000000, 45000000, 120000000, 11.25, true, 'Rafale deal questions. Defence procurement irregularities. LAC incursion cover-up.', 'Political career'),
('J.P. Nadda', 'politician', 'BJP', 'BJP President', 'New Delhi', 60, 'high', 8, 15, 25, 35, 4, 8, 56, 3000000, 35000000, 90000000, 11.67, true, 'Wife got suspicious pharma contracts during COVID. Electoral bonds beneficiary.', 'Political career'),
('Nitin Gadkari', 'politician', 'BJP', 'Union Minister', 'Maharashtra', 58, 'medium', 7, 30, 28, 25, 3, 8, 55, 5000000, 40000000, 100000000, 8.0, true, 'Purti Group business empire. Road contracts to party-linked firms.', 'Business, politics'),
('Mohan Bhagwat', 'politician', 'RSS', 'RSS Chief', 'Maharashtra', 50, 'medium', 5, 5, 35, 45, 8, 5, 48, 100000, 5000000, 15000000, 50.0, true, 'Shadow power behind BJP. Controls massive RSS property and organizational funds.', 'RSS organization');
