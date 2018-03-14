--ROLE
INSERT INTO role (id,enabled, role_name) VALUES (1,true, 'USER') ON CONFLICT (id) DO NOTHING
INSERT INTO role (id,enabled, role_name) VALUES (2,true, 'ADMIN') ON CONFLICT (id) DO NOTHING
INSERT INTO role (id,enabled, role_name) VALUES (3,true, 'AGENT') ON CONFLICT (id) DO NOTHING

--TRASHCANTYPE
INSERT INTO trashcan_type (id,label) VALUES (1,'Poubelle') ON CONFLICT (id) DO NOTHING
INSERT INTO trashcan_type (id,label) VALUES (2,'Dechetterie') ON CONFLICT (id) DO NOTHING

--GARBAGETYPE
INSERT INTO garbage_type (id,label) VALUES (1,'Ordures') ON CONFLICT (id) DO NOTHING
INSERT INTO garbage_type (id,label) VALUES (2,'Papier') ON CONFLICT (id) DO NOTHING
INSERT INTO garbage_type (id,label) VALUES (3,'Plastique') ON CONFLICT (id) DO NOTHING
INSERT INTO garbage_type (id,label) VALUES (4,'Verre') ON CONFLICT (id) DO NOTHING
INSERT INTO garbage_type (id,label) VALUES (5,'Aluminium') ON CONFLICT (id) DO NOTHING

--LOCATION
INSERT INTO location (code,label,lat,lon) VALUES (59000,'lille',50.62925,3.057256) ON CONFLICT (code) DO NOTHING
INSERT INTO location (code,label,lat,lon) VALUES (59600,'villeneuve d ascq',50.6232523,3.1442651) ON CONFLICT (code) DO NOTHING

INSERT INTO rang_type (id,label,necessary_point) VALUES (0,'Novice',10000) ON CONFLICT (id) DO NOTHING
INSERT INTO rang_type (id,label,necessary_point) VALUES (1,'Intermediaire',30000) ON CONFLICT (id) DO NOTHING
INSERT INTO rang_type (id,label,necessary_point) VALUES (2,'Confirme',80000) ON CONFLICT (id) DO NOTHING
INSERT INTO rang_type (id,label,necessary_point) VALUES (3,'Ambassadeur',100000) ON CONFLICT (id) DO NOTHING
