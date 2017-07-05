use baglab;

insert into baglab.role (name, description) values ('Administrator', 'Administrator has permissions. Have to manage baglab system.');
insert into baglab.role (name, description) values ('Moderator', 'Have to help customer make a valid order');
insert into baglab.role (name, description) values ('Customer', 'Configure and order product.');
insert into baglab.role (name, description) values ('Factory', 'Produce products according to orders.');
insert into baglab.role (name, description) values ('Guest', 'Configure bags, view info.');

insert into baglab.user_status (code, description) values ('Active', 'Default status');
insert into baglab.user_status (code, description) values ('Inactive', 'User lost of permission');
insert into baglab.user_status (code, description) values ('Bane', 'User is banned');

insert into baglab.palette (rgb) value ('0.5,0.5,0.5');
insert into baglab.palette (rgb) value ('160,82,45');
insert into baglab.palette (rgb) value ('205,92,92');
insert into baglab.palette (rgb) value ('255,69,0');
insert into baglab.palette (rgb) value ('255,140,0');



insert into baglab.order_status (code, description) values ('BUCKET', 'items in bucket, order is not created yet');
insert into baglab.order_status (code, description) values ('NEW', 'new created order');
insert into baglab.order_status (code, description) values ('ACCEPTED', 'order is accepted and send to factory');
insert into baglab.order_status (code, description) values ('PROCESSING', 'order is processing by moderator');
insert into baglab.order_status (code, description) values ('DENIED', 'order is denied by moderator');
insert into baglab.order_status (code, description) values ('SEND', 'order is shipped from factory');

insert into baglab.material_type (name) values ('cotton');
insert into baglab.material_type (name) values ('jeans');
insert into baglab.material_type (name) values ('leather');


insert into baglab.material (name, image, imageMin, materialTypeId) values ('cotton-blue', 'cotton_2048_blue.jpg', 'cotton_2048_blue_preview',1);
insert into baglab.material (name, image, imageMin, materialTypeId) values ('cotton-green', 'cotton_2048_green.jpg', 'cotton_2048_green_preview',1);
insert into baglab.material (name, image, imageMin, materialTypeId) values ('cotton-yellow', 'cotton_2048_yellow.jpg', 'cotton_2048_yellow_preview',1);
insert into baglab.material (name, image, imageMin, materialTypeId) values ('jeans-blue', 'jeans_2048_blue.jpg', 'jeans_2048_blue_preview',2);
insert into baglab.material (name, image, imageMin, materialTypeId) values ('jeans-green', 'jeans_2048_green.jpg', 'jeans_2048_green_preview',2);
insert into baglab.material (name, image, imageMin, materialTypeId) values ('jeans-yellow', 'jeans_2048_yellow.jpg', 'jeans_2048_yellow_preview',2);
insert into baglab.material (name, image, imageMin, materialTypeId) values ('leather', 'leather_2048.jpg', 'leather_2048_preview',3);
insert into baglab.material (name, image, imageMin, materialTypeId) values ('leather-black', 'leather_black_2048.jpg', 'leather_black_2048_preview',3);

INSERT INTO `baglab`.`bag_type` (script, name) VALUES ('{"imgsrc" : "./images/2dbase/2dBase1.png"}', 'Simle bag');
INSERT INTO `baglab`.`bag_type` (script, name)VALUES ('{"imgsrc" : "./images/2dbase/2dBase2.png"}', 'Bag pojo');
INSERT INTO `baglab`.`bag_type` (script, name) VALUES ('{"imgsrc" : "./images/2dbase/2dBase3.png"}', 'Extra bag');

insert into baglab.panel (name, bagTypeId, texture) value ('bag_front', 1, 'bag_front_text_img');
insert into baglab.panel (name, bagTypeId, texture) value ('bag_body', 1, 'bag_body_text_img');
insert into baglab.panel (name, bagTypeId, texture) value ('bag_body_top', 1, 'bag_body_top_text_img');

insert into baglab.user  (login,password,email, firstname, lastname, roleId) values ('admin@gmail','$2a$10$fUW27BBTeUySsBH3YS//gOtjGVKgKyXbh0RvdJ.hx4jF13l6azJGC','admin@gmail',  'Ivan', 'Onobrenko',1);
insert into baglab.user  (login,password,email, firstname, lastname, roleId) values ('anna@gm','$2a$10$YYDV6kBqUN8LUYO6wuuDhus9cNjx.RhfTxc.hLgB6/t/H4klAYOYO', 'anna@gm',  'John', 'Doe', 2);
insert into baglab.user  (login,password,email, firstname, lastname, roleId) values ('peter86@mail','$2a$10$4Iia4MY9KFZ9KnRjVdFu5.mciEpDTKBpAA8btAD445hViE.RdiZUG','peter86@mail','Petruchio','Petrov', 3);
insert into baglab.user  (login,password,email, firstname, lastname, roleId) values ('fin@gma','demopass','fin@gma', 'John','Doe2',4);
insert into baglab.user  (login,password,email, firstname, lastname, roleId) values ('tu@gmail.com','pass','tu@gmail.com', 'John','Doe3',2);
insert into baglab.user  (login,password,email, firstname, lastname, roleId) values ('manager@m','$2a$10$2TWwSqLR/o8yOqyOojc8RuJzpoGsSXLIoOIk1kmRtyRdgAYUt6e/C','manager@m', 'Lao','Dzi',4);
insert into baglab.user  (login,password,email, firstname, lastname, roleId) values ('lao@22','passm','lao@22', 'Lao2','Dzi2',4);

# insert into baglab.order (userId, orderStatusId) VALUES (1,3);
# insert into baglab.order (userId, orderStatusId) VALUES (1,2);
# insert into baglab.order (userId, orderStatusId) VALUES (1,2);
# insert into baglab.order (userId, orderStatusId) VALUES (1,2);
# insert into baglab.order (userId, orderStatusId) VALUES (2,2);
# insert into baglab.order (userId, orderStatusId) VALUES (2,2);
# insert into baglab.order (userId, orderStatusId) VALUES (3,3);
# insert into baglab.order (userId, orderStatusId) VALUES (3,2);
# insert into baglab.order (userId, orderStatusId) VALUES (3,2);
# insert into baglab.order (userId, orderStatusId) VALUES (3,2);
# insert into baglab.order (userId, orderStatusId) VALUES (3,3);


insert into baglab.model (userId, bagTypeId, materialId, mname, config, imageConfig, approved) VALUES (1, 1, 4,'Cotton Standard' ,'{"config2d":{"topPos":0,"leftPos":-50,"width":500,"height":500},"config3d":{"panels":[{"id":1,"name":"bag_front","texture":"bag_front_text_img","material":{"id":4,"price":-1,"image":"jeans_2048_blue.jpg","name":"jeans-blue"}},{"id":2,"name":"bag_body","texture":"bag_body_text_img","material":{"id":4,"price":-1,"image":"jeans_2048_blue.jpg","name":"jeans-blue"}},{"id":3,"name":"bag_body_top","texture":"bag_body_top_text_img","material":{"id":4,"price":-1,"image":"jeans_2048_blue.jpg","name":"jeans-blue"}}],"material":{}}}','{"panels":[{"id":1,"name":"bag_front","texture":"bag_front_text_img"},{"id":2,"name":"bag_body","texture":"bag_body_text_img"},{"id":3,"name":"bag_body_top","texture":"bag_body_top_text_img"}],"image":[null,null,null],"scale":[],"posX":[],"posY":[]}', 3);
insert into baglab.model (userId, bagTypeId, materialId, mname, config, imageConfig, approved) VALUES (1, 1, 6,'Leather Dream' ,'{"config2d":{"topPos":0,"leftPos":-50,"width":500,"height":500},"config3d":{"panels":[{"id":1,"name":"bag_front","texture":"bag_front_text_img","material":{"id":7,"price":-1,"image":"leather_2048.jpg","name":"leather"}},{"id":2,"name":"bag_body","texture":"bag_body_text_img","material":{"id":7,"price":-1,"image":"leather_2048.jpg","name":"leather"}},{"id":3,"name":"bag_body_top","texture":"bag_body_top_text_img","material":{"id":7,"price":-1,"image":"leather_2048.jpg","name":"leather"}}],"material":{}}}','{"panels":[{"id":1,"name":"bag_front","texture":"bag_front_text_img"},{"id":2,"name":"bag_body","texture":"bag_body_text_img"},{"id":3,"name":"bag_body_top","texture":"bag_body_top_text_img"}],"image":[null,null,null],"scale":[],"posX":[],"posY":[]}', 3);

# INSERT INTO `baglab`.`order_item` (`modelId`, `orderId`, `count`, `price`) VALUES ('1', '1', '21', '243');
# INSERT INTO `baglab`.`order_item` (`modelId`, `orderId`, `count`, `price`) VALUES ('1', '2', '123', '235');
# INSERT INTO `baglab`.`order_item` (`modelId`, `orderId`, `count`, `price`) VALUES ('2', '1', '32', '234');
# INSERT INTO `baglab`.`order_item` (`modelId`, `orderId`, `count`, `price`) VALUES ('2', '3', '43', '11');
# INSERT INTO `baglab`.`order_item` (`modelId`, `orderId`, `count`, `price`) VALUES ('3', '1', '34', '23');
# INSERT INTO `baglab`.`order_item` (`modelId`, `orderId`, `count`, `price`) VALUES ('3', '2', '54', '23');


#------------------------------------------------------
insert into baglab.country (name) values ('Andorra');
insert into baglab.country (name) values ('United Arab Emirates');
insert into baglab.country (name) values ('Afghanistan');
insert into baglab.country (name) values ('Antigua and Barbuda');
insert into baglab.country (name) values ('Anguilla');
insert into baglab.country (name) values ('Albania');
insert into baglab.country (name) values ('Armenia');
insert into baglab.country (name) values ('Netherlands Antilles');
insert into baglab.country (name) values ('Angola');
insert into baglab.country (name) values ('Antarctica');
insert into baglab.country (name) values ('Argentina');
insert into baglab.country (name) values ('American Samoa');
insert into baglab.country (name) values ('Austria');
insert into baglab.country (name) values ('Australia');
insert into baglab.country (name) values ('Aruba');
insert into baglab.country (name) values ('Åland Islands');
insert into baglab.country (name) values ('Azerbaijan');
insert into baglab.country (name) values ('Bosnia and Herzegovina');
insert into baglab.country (name) values ('Barbados');
insert into baglab.country (name) values ('Bangladesh');
insert into baglab.country (name) values ('Belgium');
insert into baglab.country (name) values ('Burkina Faso');
insert into baglab.country (name) values ('Bulgaria');
insert into baglab.country (name) values ('Bahrain');
insert into baglab.country (name) values ('Burundi');
insert into baglab.country (name) values ('Benin');
insert into baglab.country (name) values ('Saint Barthélemy');
insert into baglab.country (name) values ('Bermuda');
insert into baglab.country (name) values ('Brunei');
insert into baglab.country (name) values ('Bolivia');
insert into baglab.country (name) values ('Bonaire, Sint Eustatius and Saba');
insert into baglab.country (name) values ('Brazil');
insert into baglab.country (name) values ('Bahamas');
insert into baglab.country (name) values ('Bhutan');
insert into baglab.country (name) values ('Bouvet Island');
insert into baglab.country (name) values ('Botswana');
insert into baglab.country (name) values ('Belarus');
insert into baglab.country (name) values ('Belize');
insert into baglab.country (name) values ('Canada');
insert into baglab.country (name) values ('Cocos Islands');
insert into baglab.country (name) values ('The Democratic Republic Of Congo');
insert into baglab.country (name) values ('Central African Republic');
insert into baglab.country (name) values ('Congo');
insert into baglab.country (name) values ('Switzerland');
insert into baglab.country (name) values ('Ivory Coast');
insert into baglab.country (name) values ('Cook Islands');
insert into baglab.country (name) values ('Chile');
insert into baglab.country (name) values ('Cameroon');
insert into baglab.country (name) values ('China');
insert into baglab.country (name) values ('Colombia');
insert into baglab.country (name) values ('Costa Rica');
insert into baglab.country (name) values ('Cuba');
insert into baglab.country (name) values ('Cape Verde');
insert into baglab.country (name) values ('Curaçao');
insert into baglab.country (name) values ('Christmas Island');
insert into baglab.country (name) values ('Cyprus');
insert into baglab.country (name) values ('Czech Republic');
insert into baglab.country (name) values ('Germany');
insert into baglab.country (name) values ('Djibouti');
insert into baglab.country (name) values ('Denmark');
insert into baglab.country (name) values ('Dominica');
insert into baglab.country (name) values ('Dominican Republic');
insert into baglab.country (name) values ('Algeria');
insert into baglab.country (name) values ('Ecuador');
insert into baglab.country (name) values ('Estonia');
insert into baglab.country (name) values ('Egypt');
insert into baglab.country (name) values ('Western Sahara');
insert into baglab.country (name) values ('Eritrea');
insert into baglab.country (name) values ('Spain');
insert into baglab.country (name) values ('Ethiopia');
insert into baglab.country (name) values ('Finland');
insert into baglab.country (name) values ('Fiji');
insert into baglab.country (name) values ('Falkland Islands');
insert into baglab.country (name) values ('Micronesia');
insert into baglab.country (name) values ('Faroe Islands');
insert into baglab.country (name) values ('France');
insert into baglab.country (name) values ('Gabon');
insert into baglab.country (name) values ('United Kingdom');
insert into baglab.country (name) values ('Grenada');
insert into baglab.country (name) values ('Georgia');
insert into baglab.country (name) values ('French Guiana');
insert into baglab.country (name) values ('Guernsey');
insert into baglab.country (name) values ('Ghana');
insert into baglab.country (name) values ('Gibraltar');
insert into baglab.country (name) values ('Greenland');
insert into baglab.country (name) values ('Gambia');
insert into baglab.country (name) values ('Guinea');
insert into baglab.country (name) values ('Guadeloupe');
insert into baglab.country (name) values ('Equatorial Guinea');
insert into baglab.country (name) values ('Greece');
insert into baglab.country (name) values ('South Georgia And The South Sandwich Islands');
insert into baglab.country (name) values ('Guatemala');
insert into baglab.country (name) values ('Guam');
insert into baglab.country (name) values ('Guinea-Bissau');
insert into baglab.country (name) values ('Guyana');
insert into baglab.country (name) values ('Hong Kong');
insert into baglab.country (name) values ('Heard Island And McDonald Islands');
insert into baglab.country (name) values ('Honduras');
insert into baglab.country (name) values ('Croatia');
insert into baglab.country (name) values ('Haiti');
insert into baglab.country (name) values ('Hungary');
insert into baglab.country (name) values ('Indonesia');
insert into baglab.country (name) values ('Ireland');
insert into baglab.country (name) values ('Israel');
insert into baglab.country (name) values ('Isle Of Man');
insert into baglab.country (name) values ('India');
insert into baglab.country (name) values ('British Indian Ocean Territory');
insert into baglab.country (name) values ('Iraq');
insert into baglab.country (name) values ('Iran');
insert into baglab.country (name) values ('Iceland');
insert into baglab.country (name) values ('Italy');
insert into baglab.country (name) values ('Jersey');
insert into baglab.country (name) values ('Jamaica');
insert into baglab.country (name) values ('Jordan');
insert into baglab.country (name) values ('Japan');
insert into baglab.country (name) values ('Kenya');
insert into baglab.country (name) values ('Kyrgyzstan');
insert into baglab.country (name) values ('Cambodia');
insert into baglab.country (name) values ('Kiribati');
insert into baglab.country (name) values ('Comoros');
insert into baglab.country (name) values ('Saint Kitts And Nevis');
insert into baglab.country (name) values ('North Korea');
insert into baglab.country (name) values ('South Korea');
insert into baglab.country (name) values ('Kuwait');
insert into baglab.country (name) values ('Cayman Islands');
insert into baglab.country (name) values ('Kazakhstan');
insert into baglab.country (name) values ('Laos');
insert into baglab.country (name) values ('Lebanon');
insert into baglab.country (name) values ('Saint Lucia');
insert into baglab.country (name) values ('Liechtenstein');
insert into baglab.country (name) values ('Sri Lanka');
insert into baglab.country (name) values ('Liberia');
insert into baglab.country (name) values ('Lesotho');
insert into baglab.country (name) values ('Lithuania');
insert into baglab.country (name) values ('Luxembourg');
insert into baglab.country (name) values ('Latvia');
insert into baglab.country (name) values ('Libya');
insert into baglab.country (name) values ('Morocco');
insert into baglab.country (name) values ('Monaco');
insert into baglab.country (name) values ('Moldova');
insert into baglab.country (name) values ('Montenegro');
insert into baglab.country (name) values ('Saint Martin');
insert into baglab.country (name) values ('Madagascar');
insert into baglab.country (name) values ('Marshall Islands');
insert into baglab.country (name) values ('Macedonia');
insert into baglab.country (name) values ('Mali');
insert into baglab.country (name) values ('Myanmar');
insert into baglab.country (name) values ('Mongolia');
insert into baglab.country (name) values ('Macao');
insert into baglab.country (name) values ('Northern Mariana Islands');
insert into baglab.country (name) values ('Martinique');
insert into baglab.country (name) values ('Mauritania');
insert into baglab.country (name) values ('Montserrat');
insert into baglab.country (name) values ('Malta');
insert into baglab.country (name) values ('Mauritius');
insert into baglab.country (name) values ('Maldives');
insert into baglab.country (name) values ('Malawi');
insert into baglab.country (name) values ('Mexico');
insert into baglab.country (name) values ('Malaysia');
insert into baglab.country (name) values ('Mozambique');
insert into baglab.country (name) values ('Namibia');
insert into baglab.country (name) values ('New Caledonia');
insert into baglab.country (name) values ('Niger');
insert into baglab.country (name) values ('Norfolk Island');
insert into baglab.country (name) values ('Nigeria');
insert into baglab.country (name) values ('Nicaragua');
insert into baglab.country (name) values ('Netherlands');
insert into baglab.country (name) values ('Norway');
insert into baglab.country (name) values ('Nepal');
insert into baglab.country (name) values ('Nauru');
insert into baglab.country (name) values ('Niue');
insert into baglab.country (name) values ('New Zealand');
insert into baglab.country (name) values ('Oman');
insert into baglab.country (name) values ('Panama');
insert into baglab.country (name) values ('Peru');
insert into baglab.country (name) values ('French Polynesia');
insert into baglab.country (name) values ('Papua New Guinea');
insert into baglab.country (name) values ('Philippines');
insert into baglab.country (name) values ('Pakistan');
insert into baglab.country (name) values ('Poland');
insert into baglab.country (name) values ('Saint Pierre And Miquelon');
insert into baglab.country (name) values ('Pitcairn');
insert into baglab.country (name) values ('Puerto Rico');
insert into baglab.country (name) values ('Palestine');
insert into baglab.country (name) values ('Portugal');
insert into baglab.country (name) values ('Palau');
insert into baglab.country (name) values ('Paraguay');
insert into baglab.country (name) values ('Qatar');
insert into baglab.country (name) values ('Reunion');
insert into baglab.country (name) values ('Romania');
insert into baglab.country (name) values ('Serbia');
insert into baglab.country (name) values ('Russia');
insert into baglab.country (name) values ('Rwanda');
insert into baglab.country (name) values ('Saudi Arabia');
insert into baglab.country (name) values ('Solomon Islands');
insert into baglab.country (name) values ('Seychelles');
insert into baglab.country (name) values ('Sudan');
insert into baglab.country (name) values ('Sweden');
insert into baglab.country (name) values ('Singapore');
insert into baglab.country (name) values ('Saint Helena');
insert into baglab.country (name) values ('Slovenia');
insert into baglab.country (name) values ('Svalbard And Jan Mayen');
insert into baglab.country (name) values ('Slovakia');
insert into baglab.country (name) values ('Sierra Leone');
insert into baglab.country (name) values ('San Marino');
insert into baglab.country (name) values ('Senegal');
insert into baglab.country (name) values ('Somalia');
insert into baglab.country (name) values ('Suriname');
insert into baglab.country (name) values ('South Sudan');
insert into baglab.country (name) values ('Sao Tome And Principe');
insert into baglab.country (name) values ('El Salvador');
insert into baglab.country (name) values ('Sint Maarten (Dutch part)');
insert into baglab.country (name) values ('Syria');
insert into baglab.country (name) values ('Swaziland');
insert into baglab.country (name) values ('Turks And Caicos Islands');
insert into baglab.country (name) values ('Chad');
insert into baglab.country (name) values ('French Southern Territories');
insert into baglab.country (name) values ('Togo');
insert into baglab.country (name) values ('Thailand');
insert into baglab.country (name) values ('Tajikistan');
insert into baglab.country (name) values ('Tokelau');
insert into baglab.country (name) values ('Timor-Leste');
insert into baglab.country (name) values ('Turkmenistan');
insert into baglab.country (name) values ('Tunisia');
insert into baglab.country (name) values ('Tonga');
insert into baglab.country (name) values ('Turkey');
insert into baglab.country (name) values ('Trinidad and Tobago');
insert into baglab.country (name) values ('Tuvalu');
insert into baglab.country (name) values ('Taiwan');
insert into baglab.country (name) values ('Tanzania');
insert into baglab.country (name) values ('Ukraine');
insert into baglab.country (name) values ('Uganda');
insert into baglab.country (name) values ('United States Minor Outlying Islands');
insert into baglab.country (name) values ('United States');
insert into baglab.country (name) values ('Uruguay');
insert into baglab.country (name) values ('Uzbekistan');
insert into baglab.country (name) values ('Vatican');
insert into baglab.country (name) values ('Saint Vincent And The Grenadines');
insert into baglab.country (name) values ('Venezuela');
insert into baglab.country (name) values ('British Virgin Islands');
insert into baglab.country (name) values ('U.S. Virgin Islands');
insert into baglab.country (name) values ('Vietnam');
insert into baglab.country (name) values ('Vanuatu');
insert into baglab.country (name) values ('Wallis And Futuna');
insert into baglab.country (name) values ('Samoa');
insert into baglab.country (name) values ('Yemen');
insert into baglab.country (name) values ('Mayotte');
insert into baglab.country (name) values ('South Africa');
insert into baglab.country (name) values ('Zambia');
insert into baglab.country (name) values ('Zimbabwe');

insert into baglab.shipping_adress (contactName, countryId, street, apartment, state, city, zipcode, mobile, userId) values ('Ivan Onobrenko',132,'Tkachenko','23','Kiev','Kiev','08187','+380683842905', 1);
insert into baglab.shipping_adress (contactName, countryId, street, apartment, state, city, zipcode, mobile, userId) values ('John Doe',135,'Main Avenu','3','Alabama', 'Calera','AL 35040','+1 205-668-0402', 2);

#-------------------------
insert into baglab.material_price(materialId, date, price) values (1,NOW(), 178);
insert into baglab.material_price(materialId, date, price) values (3,NOW(), 278);
insert into baglab.material_price(materialId, date, price) values (1,NOW(), 378);
insert into baglab.material_price(materialId, date, price) values (2,NOW(), 478);
insert into baglab.material_price(materialId, date, price) values (4,NOW(), 100);
insert into baglab.material_price(materialId, date, price) values (5,NOW(), 111);
insert into baglab.material_price(materialId, date, price) values (6,NOW(), 212);
insert into baglab.material_price(materialId, date, price) values (7,NOW(), 123);
insert into baglab.material_price(materialId, date, price) values (8,NOW(), 321);

#-------------------------
insert into baglab.bag_type_price(bag_type_id, date, price) values (1,NOW(), 25);
insert into baglab.bag_type_price(bag_type_id, date, price) values (2,NOW(), 56);
insert into baglab.bag_type_price(bag_type_id, date, price) values (3,NOW(), 34);


#-------------------------
insert into baglab.pages_type (type) VALUES ('ACTIVE');
insert into baglab.pages_type (type) VALUES ('ARCHIVE');
insert into baglab.pages_type (type) VALUES ('DELETED');


insert into baglab.pages (body, header, pagesTypeId) VALUES ('A bag (also known regionally as a sack) is a common tool in the form of a non-rigid container. The use of bags predates recorded history, with the earliest bags being no more than lengths of animal skin, cotton, or woven plant fibers, folded up at the edges and secured in that shape with strings of the same material.', 'data:image/jpeg;base64,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', '1');
insert into baglab.pages (body, header, pagesTypeId) VALUES ('A diplomatic bag, also known as a diplomatic pouch, is a container with certain legal protections used for carrying official correspondence or other items between a diplomatic mission and its home government or other diplomatic, consular, or otherwise official entities.[1] The physical concept of a "diplomatic bag" is flexible and therefore can take many forms (e.g., a cardboard box, briefcase, duffel bag, large suitcase, crate or even a shipping container).[1] Additionally, a diplomatic bag usually has some form of lock and/or tamper-evident seal attached to it in order to deter interference by unauthorized third parties. The most important point is that as long as it is externally marked to show its status, the "bag" has diplomatic immunity from search or seizure,[2] as codified in article 27 of the 1961 Vienna Convention on Diplomatic Relations.[3] It may only contain articles intended for official use.[3] It is often escorted by a diplomatic courier, who is similarly immune from arrest and detention', 'data:image/jpeg;base64,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', '1');
insert into baglab.pages (body, header, pagesTypeId) VALUES ('BAG-LOVE FROM PUPPY
We recently had a customer who bought our Dip Dye Tote at our Bag-all location on Mott street, NYC. Her puppy Row loved the bag as much as she did. This is the perfect bag for summer, great for both city and the beach. Happy Master equals Happy Pupp!', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxbZiW_9ZAY6mWSCu9-3u_FVNeg_WZE2OCka5BEMxNbi129TwM', '2');
insert into baglab.pages (body, header, pagesTypeId) VALUES ('BEA HAYDEN AT THE MOTT STREET SHOP
A few weeks ago we welcomed famous Chinese actress, Bea Hayden and Modern Fashion Lifestyle Channel to the Bag-all store on Mott Street.

Bea was documenting one of her days in New York and ended up finding some favorite bags, which she aslo monogrammed with her name.

They filmed their visit and if you speak Chinese, you can watch the full video here.

Thank you for visiting Bea, you are welcome back any time!', 'data:image/jpeg;base64,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', '3');
