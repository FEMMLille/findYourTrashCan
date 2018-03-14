--ROLE
MERGE INTO role (id,enabled, role_name) VALUES (1,true, 'USER')
MERGE INTO role (id,enabled, role_name) VALUES (2,true, 'ADMIN')
MERGE INTO role (id,enabled, role_name) VALUES (3,true, 'AGENT')

--TRASHCANTYPE
MERGE INTO trashcan_type (id,label) VALUES (1,'Poubelle')
MERGE INTO trashcan_type (id,label) VALUES (2,'Dechetterie')

--GARBAGETYPE
MERGE INTO garbage_type (id,label) VALUES (1,'Ordures')
MERGE INTO garbage_type (id,label) VALUES (2,'Papier')
MERGE INTO garbage_type (id,label) VALUES (3,'Plastique')
MERGE INTO garbage_type (id,label) VALUES (4,'Verre')
MERGE INTO garbage_type (id,label) VALUES (5,'Aluminium')

--LOCATION
MERGE INTO location (code,label,lat,lon) VALUES (59000,'lille',50.62925,3.057256)
MERGE INTO location (code,label,lat,lon) VALUES (59600,'villeneuve d ascq',50.6232523,3.1442651)

--USER
--MERGE INTO fytcuser (id, role_id, username, password, email) VALUES (1, 1, 'erwan', '', 'erwan@gmail.com')
MERGE INTO fytcuser (id, role_id, username, password, email) VALUES (10000, 1, 'mathieu', '', 'mathieu@gmail.com')
--MERGE INTO fytcuser (id, role_id, username, password, email) VALUES (3, 3, 'francis', '', 'francis@gmail.com')

--ACCOUNT DETAILS
--MERGE INTO account_details (id, user_id, avatar, birthday, first_name, last_name) VALUES (1, 1, '', '1991-01-01', 'Erwan', 'D--P')
MERGE INTO account_details (id, user_id, avatar, birthday, first_name, last_name) VALUES (10000, 10000, '$2a$10$ThxDOSWxfEsCTI060AZZAuduBEM.PyUGaIsS3SAhpPIMUC6DzhQf6', '1991-01-01', 'Mathieu', 'Saab')
--MERGE INTO account_details (id, user_id, avatar, birthday, first_name, last_name) VALUES (3, 3, '', '1991-01-01', 'Francis', 'CornR')