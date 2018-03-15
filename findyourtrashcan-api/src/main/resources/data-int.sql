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
INSERT INTO location (code,label,lat,lon, web_contact, web_informations) VALUES (59000,'lille',50.62925,3.057256, 'https://www.lille.fr/Contactez-nous', 'https://www.lille.fr/Vivre-a-Lille/La-proprete/Bien-gerer-mes-dechets/Les-jours-de-collecte') ON CONFLICT (code) DO NOTHING
INSERT INTO location (code,label,lat,lon, web_contact, web_informations) VALUES (59800,'lille',50.6407,3.07062, 'https://www.lille.fr/Contactez-nous', 'https://www.lille.fr/Vivre-a-Lille/La-proprete/Bien-gerer-mes-dechets/Les-jours-de-collecte') ON CONFLICT (code) DO NOTHING
INSERT INTO location (code,label,lat,lon, web_contact, web_informations) VALUES (59600,'villeneuve d''ascq',50.6232523,3.1442651, 'https://administration.villeneuvedascq.fr/guichet/workflow_url?ECITIZ_ACTIVITY_PATH=Demandeur&USAGER_PROCESS=CONTACT&OID=100', 'http://www.esterra.fr/Collecte') ON CONFLICT (code) DO NOTHING

INSERT INTO rang_type (id,label,necessary_point) VALUES (0,'Novice',10000) ON CONFLICT (id) DO NOTHING
INSERT INTO rang_type (id,label,necessary_point) VALUES (1,'Intermediaire',30000) ON CONFLICT (id) DO NOTHING
INSERT INTO rang_type (id,label,necessary_point) VALUES (2,'Confirme',80000) ON CONFLICT (id) DO NOTHING
INSERT INTO rang_type (id,label,necessary_point) VALUES (3,'Ambassadeur',100000) ON CONFLICT (id) DO NOTHING

INSERT INTO rewards (id, rang_type_id, label) VALUES (0, 0, 'Voir les horaires de ramassage des ordures de la mairie') ON CONFLICT (id) DO NOTHING
INSERT INTO rewards (id, rang_type_id, label) VALUES (1, 1, 'Passez au prochain circuit de récuperation d''encombrants') ON CONFLICT (id) DO NOTHING
INSERT INTO rewards (id, rang_type_id, label) VALUES (2, 1, 'Recevez une notification lorsque vous vous dirigez vers une poubelle et qu''une plus proche a été vidée') ON CONFLICT (id) DO NOTHING
INSERT INTO rewards (id, rang_type_id, label) VALUES (3, 1, 'Signalez qu''une poubelle n''est pas présente') ON CONFLICT (id) DO NOTHING
INSERT INTO rewards (id, rang_type_id, label) VALUES (4, 2, 'Envoyez une notification aux agents proches lorsque vous signalez une poubelle pleine') ON CONFLICT (id) DO NOTHING
INSERT INTO rewards (id, rang_type_id, label) VALUES (5, 3, 'Demandez à la mairie de récuperer un encombrant chez vous') ON CONFLICT (id) DO NOTHING
INSERT INTO rewards (id, rang_type_id, label) VALUES (6, 3, 'Demandez la disposition d''une poubelle à votre mairie (idée soumise a la mairie sans garantie de mise en oeuvre)') ON CONFLICT (id) DO NOTHING
INSERT INTO rewards (id, rang_type_id, label) VALUES (7, 3, 'Les poubelles que vous ajoutez sont automatiquement traitées comme dignes de confiance') ON CONFLICT (id) DO NOTHING
