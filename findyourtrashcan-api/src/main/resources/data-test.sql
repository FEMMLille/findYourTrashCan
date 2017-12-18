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