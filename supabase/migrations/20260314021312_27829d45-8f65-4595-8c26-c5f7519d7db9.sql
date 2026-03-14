
-- New Indian politicians, state ministers, bureaucrats
INSERT INTO entities (name, type, department, designation, location, risk_score, risk_level, complaints_count, contracts_count, news_hits, political_connections, dark_web_signals, financial_anomalies, prediction_score, declared_income, known_spending, known_assets, income_spending_ratio, disproportionate_wealth, wealth_source, bio) VALUES
('Pinarayi Vijayan', 'politician', 'Kerala CM Office', 'Chief Minister', 'Kerala', 48, 'medium', 6, 12, 18, 5, 1, 3, 45, 1800000, 2200000, 3500000, 1.22, false, 'Politics', 'CM Kerala, LDF leader. Gold smuggling case links investigated.'),
('Bhupendra Patel', 'politician', 'Gujarat CM Office', 'Chief Minister', 'Gujarat', 65, 'medium', 8, 25, 14, 9, 2, 5, 62, 3200000, 7500000, 15000000, 2.34, true, 'Real Estate/Politics', 'Gujarat CM, close Modi ally. Real estate connections and Adani-linked infrastructure contracts.'),
('Pramod Sawant', 'politician', 'Goa CM Office', 'Chief Minister', 'Goa', 52, 'medium', 5, 15, 10, 6, 1, 3, 50, 2100000, 3000000, 5000000, 1.43, false, 'Politics', 'Goa CM. Mining and casino licensing controversies.'),
('Eknath Shinde', 'politician', 'Maharashtra CM Office', 'Chief Minister', 'Maharashtra', 68, 'medium', 12, 30, 22, 8, 3, 6, 65, 4500000, 12000000, 28000000, 2.67, true, 'Contractors/Politics', 'Maharashtra CM after Shiv Sena split. Infrastructure contract irregularities.'),
('Pushkar Singh Dhami', 'politician', 'Uttarakhand CM Office', 'Chief Minister', 'Uttarakhand', 55, 'medium', 4, 10, 8, 5, 1, 3, 52, 1500000, 2500000, 4000000, 1.67, false, 'Politics', 'Uttarakhand CM. Char Dham highway project cost overruns.'),
('N. Biren Singh', 'politician', 'Manipur CM Office', 'Chief Minister', 'Manipur', 60, 'medium', 7, 8, 15, 6, 2, 4, 58, 1200000, 3000000, 6000000, 2.50, true, 'Politics', 'Manipur CM. Ethnic violence handling, arms smuggling allegations.'),
('Conrad Sangma', 'politician', 'Meghalaya CM Office', 'Chief Minister', 'Meghalaya', 42, 'medium', 3, 8, 6, 4, 1, 2, 40, 5000000, 4000000, 12000000, 0.80, false, 'Family Business', 'Meghalaya CM. Coal mining and ILP controversies.'),
('Manik Saha', 'politician', 'Tripura CM Office', 'Chief Minister', 'Tripura', 38, 'low', 2, 5, 4, 3, 0, 1, 35, 800000, 900000, 2000000, 1.13, false, 'Dental Practice/Politics', 'Tripura CM. Relatively clean record.'),
('Sukhvinder Singh Sukhu', 'politician', 'HP CM Office', 'Chief Minister', 'Himachal Pradesh', 35, 'low', 3, 7, 5, 4, 0, 1, 33, 1200000, 1000000, 2500000, 0.83, false, 'Politics', 'Himachal CM. Limited controversies.'),
('Bhagwant Mann', 'politician', 'Punjab CM Office', 'Chief Minister', 'Punjab', 22, 'low', 2, 8, 10, 3, 0, 1, 20, 900000, 700000, 1500000, 0.78, false, 'Comedy/Politics', 'Punjab CM, AAP. Clean governance focus, anti-corruption platform.'),
('Mohan Yadav', 'politician', 'MP CM Office', 'Chief Minister', 'Madhya Pradesh', 58, 'medium', 5, 18, 8, 7, 1, 3, 55, 2800000, 5000000, 10000000, 1.79, false, 'Politics', 'MP CM. Mining mafia and vyapam scam legacy connections.'),
('Vishnu Deo Sai', 'politician', 'CG CM Office', 'Chief Minister', 'Chhattisgarh', 50, 'medium', 4, 12, 6, 5, 1, 2, 48, 1800000, 2200000, 4000000, 1.22, false, 'Politics', 'Chhattisgarh CM. Tribal land issues.'),
('Nitish Kumar', 'politician', 'Bihar CM Office', 'Chief Minister', 'Bihar', 45, 'medium', 6, 20, 25, 7, 1, 3, 43, 2000000, 3000000, 5000000, 1.50, false, 'Politics', 'Bihar CM. Multiple party switches, bridge collapse scandals.'),
('Pema Khandu', 'politician', 'AP CM Office', 'Chief Minister', 'Arunachal Pradesh', 55, 'medium', 5, 10, 7, 4, 2, 3, 52, 6000000, 15000000, 30000000, 2.50, true, 'Family/Politics', 'Arunachal CM. Hydro project irregularities, disproportionate assets.'),
('Rajiv Kumar', 'officer', 'Election Commission', 'Chief Election Commissioner', 'Delhi', 55, 'medium', 8, 0, 20, 6, 1, 3, 52, 3000000, 2500000, 8000000, 0.83, false, 'IAS/Politics', 'CEC accused of partisan conduct favoring ruling party in elections.'),
('Ravi Shankar Prasad', 'politician', 'BJP', 'Senior Leader', 'Bihar', 50, 'medium', 4, 8, 12, 6, 1, 2, 48, 5000000, 4000000, 12000000, 0.80, false, 'Law/Politics', 'Former IT Minister. Electoral bonds data suppression allegations.'),
('Piyush Goyal', 'politician', 'BJP', 'Union Minister', 'Maharashtra', 55, 'medium', 5, 20, 15, 8, 1, 3, 52, 8000000, 6000000, 25000000, 0.75, false, 'Business/Politics', 'Commerce Minister. PPE kit procurement irregularities during COVID.'),
('Nitin Gadkari', 'politician', 'BJP', 'Union Minister', 'Maharashtra', 62, 'medium', 7, 45, 18, 8, 2, 4, 60, 12000000, 10000000, 35000000, 0.83, false, 'Business/Politics', 'Road Transport Minister. Purti Group connections, massive highway contracts.'),
('Rodrigo Duterte', 'politician', 'Philippine Government', 'Former President', 'Philippines', 80, 'high', 20, 25, 40, 10, 6, 7, 78, 1500000, 30000000, 80000000, 20.00, true, 'Politics', 'Former Philippines President. Drug war extrajudicial killings, unexplained wealth.'),
('Viktor Orban', 'politician', 'Hungarian Government', 'Prime Minister', 'Hungary', 75, 'high', 12, 35, 35, 9, 3, 6, 73, 3000000, 20000000, 60000000, 6.67, true, 'Politics/EU Funds', 'Hungary PM. EU funds misappropriation, crony oligarch network, family enrichment.'),
('Joko Widodo', 'politician', 'Indonesian Government', 'Former President', 'Indonesia', 40, 'medium', 5, 20, 15, 6, 1, 2, 38, 5000000, 4000000, 10000000, 0.80, false, 'Furniture/Politics', 'Former Indonesia President. Relatively clean, dynasty building concerns.'),
('Volodymyr Zelenskyy', 'politician', 'Ukrainian Government', 'President', 'Ukraine', 30, 'low', 3, 8, 50, 5, 1, 2, 28, 2000000, 1500000, 5000000, 0.75, false, 'Entertainment/Politics', 'Ukraine President. Pandora Papers offshore accounts, wartime governance praised.'),
('Boris Johnson', 'politician', 'UK Government', 'Former PM', 'United Kingdom', 65, 'medium', 10, 15, 50, 8, 2, 4, 62, 5000000, 8000000, 15000000, 1.60, false, 'Journalism/Politics', 'Former UK PM. Partygate scandal, wallpaper gate, PPE procurement cronyism.'),
('Silvio Berlusconi', 'politician', 'Italian Government', 'Former PM (Deceased)', 'Italy', 88, 'high', 25, 50, 60, 12, 4, 9, 86, 50000000, 200000000, 7000000000, 4.00, true, 'Media Empire', 'Former Italy PM. Tax fraud convictions, bunga bunga scandal, mafia connections alleged.'),
('Petro Poroshenko', 'politician', 'Ukrainian Government', 'Former President', 'Ukraine', 72, 'high', 8, 20, 25, 7, 3, 5, 70, 10000000, 50000000, 1600000000, 5.00, true, 'Confectionery Empire', 'Former Ukraine President. Failed to divest business empire, offshore holdings.'),
('Park Geun-hye', 'politician', 'South Korean Government', 'Former President', 'South Korea', 85, 'high', 18, 15, 55, 8, 2, 7, 83, 3000000, 10000000, 30000000, 3.33, true, 'Politics', 'Former South Korea President. Impeached and jailed for corruption, influence peddling.'),
('Najib Razak', 'politician', 'Malaysian Government', 'Former PM', 'Malaysia', 95, 'high', 30, 40, 65, 10, 5, 10, 93, 5000000, 700000000, 1000000000, 140.00, true, 'Politics', 'Former Malaysia PM. 1MDB scandal - $4.5 billion stolen. Convicted and jailed.')
ON CONFLICT DO NOTHING;

-- Global corruption network relationships
INSERT INTO relationships (source_entity_id, target_entity_id, relationship_type, description, strength) VALUES
-- Trump-Putin
('0a26cc80-f0d2-4ef0-a1f8-42a36d648344', 'f2cd9620-669e-4898-b77d-89e63f1a8477', 'political', 'Trump-Russia collusion investigation (Mueller Report). Trump Tower Moscow negotiations, Helsinki summit deference, election interference.', 9),
('f2cd9620-669e-4898-b77d-89e63f1a8477', '0a26cc80-f0d2-4ef0-a1f8-42a36d648344', 'financial', 'Russian oligarch money flows through Trump properties. Deutsche Bank loans with Russian guarantees.', 8),
-- Netanyahu-Modi
('b0115013-cd4f-4c06-99d3-d5fdef41f1fa', '9720293a-049e-41b3-84ec-cdfe641ec931', 'political', 'Strategic alliance: $2B Pegasus spyware deal, defense contracts. Modi visited Israel, Netanyahu visited India.', 8),
('9720293a-049e-41b3-84ec-cdfe641ec931', 'b0115013-cd4f-4c06-99d3-d5fdef41f1fa', 'contract', 'SPIKE missile deal, Rafael defense systems. Pegasus used against Indian journalists and opposition.', 7),
-- Erdogan-Putin
('b8455fd9-9a37-4d6d-9dfd-248b038fac9c', 'f2cd9620-669e-4898-b77d-89e63f1a8477', 'financial', 'TurkStream gas pipeline deal, S-400 missile purchase despite NATO objections. Energy dependency.', 8),
('f2cd9620-669e-4898-b77d-89e63f1a8477', 'b8455fd9-9a37-4d6d-9dfd-248b038fac9c', 'political', 'Syria conflict coordination, grain deal negotiations. Mutual authoritarian support.', 7),
-- Trump-Netanyahu
('0a26cc80-f0d2-4ef0-a1f8-42a36d648344', 'b0115013-cd4f-4c06-99d3-d5fdef41f1fa', 'political', 'Jerusalem embassy move, Golan Heights recognition, Abraham Accords. Kushner-Netanyahu business ties.', 9),
-- Trump-Modi
('0a26cc80-f0d2-4ef0-a1f8-42a36d648344', '9720293a-049e-41b3-84ec-cdfe641ec931', 'political', 'Howdy Modi rally, Namaste Trump rally. Trade deal negotiations, H1B visa politics.', 7),
-- Modi-Putin
('9720293a-049e-41b3-84ec-cdfe641ec931', 'f2cd9620-669e-4898-b77d-89e63f1a8477', 'contract', 'S-400 missile deal ($5.4B) despite US CAATSA sanctions threat. Russian oil imports surge post-Ukraine war.', 8),
-- Trump-Elon Musk
('0a26cc80-f0d2-4ef0-a1f8-42a36d648344', '02196499-69ac-4925-a78e-5403c9ddcde4', 'financial', 'DOGE department, SpaceX government contracts, Twitter/X platform support. $250M+ in government deals.', 9),
-- Modi-Adani expanded
('9720293a-049e-41b3-84ec-cdfe641ec931', '892f4d02-fc6d-427e-9b24-a8d128bb3f15', 'political', 'Adani accompanied Modi on foreign trips. Airport privatization, port monopolies, renewable energy contracts all awarded to Adani Group.', 10),
-- Xi Jinping-Putin
('a26ccdb3-e9bc-4faf-a3ec-b1cd1543f046', 'f2cd9620-669e-4898-b77d-89e63f1a8477', 'political', 'No-limits partnership declared Feb 2022. Joint military exercises, energy deals, UN voting coordination.', 9),
-- Bolsonaro-Trump
('733774b2-1b94-4945-8fb1-47a054f001f1', '0a26cc80-f0d2-4ef0-a1f8-42a36d648344', 'political', 'Tropical Trump alliance. Jan 8 insurrection modeled on Jan 6. Family connections, election denial playbook.', 8),
-- Indian BJP internal network
('d6fcfe74-be79-4ca6-b673-f6830084299d', '9720293a-049e-41b3-84ec-cdfe641ec931', 'political', 'Yogi appointed CM by Modi. UP bulldozer politics, communal tensions as political strategy.', 8),
('d6fcfe74-be79-4ca6-b673-f6830084299d', 'f5a78341-b6d4-4963-bf2f-8eab76f037e3', 'political', 'Yogi-Shah axis for UP elections. Encounter killings policy coordination.', 7),
('1b8b5175-b8a8-4216-8296-af17a2e5c521', '9720293a-049e-41b3-84ec-cdfe641ec931', 'political', 'Himanta defected from Congress to BJP. Rewarded with Assam CM post. NRC-CAA implementation.', 7),
('70769f46-d254-409f-97bb-17cf2038dbff', '9720293a-049e-41b3-84ec-cdfe641ec931', 'political', 'Fadnavis engineered Maharashtra political crisis. Deputy CM under Shinde arrangement.', 7),
('70769f46-d254-409f-97bb-17cf2038dbff', '892f4d02-fc6d-427e-9b24-a8d128bb3f15', 'contract', 'Adani Dharavi redevelopment project approved under Fadnavis government. Mumbai infrastructure contracts.', 7),
-- Imran Khan-Xi Jinping (CPEC)
('5437dc61-c1e5-457f-8ec6-154d9582566f', 'a26ccdb3-e9bc-4faf-a3ec-b1cd1543f046', 'financial', 'CPEC ($62B corridor). Chinese debt trap, Gwadar port, power plant contracts with kickback allegations.', 8),
-- Nawaz Sharif-Erdogan
('92c38136-36de-451c-86a4-f64010b5d39b', 'b8455fd9-9a37-4d6d-9dfd-248b038fac9c', 'political', 'Muslim world leadership competition. Both faced corruption charges, both targeted judiciary.', 5);
