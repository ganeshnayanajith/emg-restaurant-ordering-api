SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE `emg-restaurant`.dish_ratings;
DROP TABLE `emg-restaurant`.order_items;
DROP TABLE `emg-restaurant`.orders;
DROP TABLE `emg-restaurant`.dish_items;
DROP TABLE `emg-restaurant`.dish_categories;
DROP TABLE `emg-restaurant`.users;
SET FOREIGN_KEY_CHECKS = 1;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `emg-restaurant`.dish_ratings;
TRUNCATE TABLE `emg-restaurant`.order_items;
TRUNCATE TABLE `emg-restaurant`.orders;
TRUNCATE TABLE `emg-restaurant`.dish_items;
TRUNCATE TABLE `emg-restaurant`.dish_categories;
TRUNCATE TABLE `emg-restaurant`.users;
SET FOREIGN_KEY_CHECKS = 1;

select * from `emg-restaurant`.users;
select * from `emg-restaurant`.dish_categories;