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
select * from `emg-restaurant`.dish_items;
select * from `emg-restaurant`.dish_items order by createdAt desc;
select * from `emg-restaurant`.dish_categories order by createdAt desc;
select * from `emg-restaurant`.orders;
select * from `emg-restaurant`.order_items;
select * from `emg-restaurant`.dish_items where id = 31;

select * from `emg-restaurant`.orders where createdAt like '%2022-07-13%';
select sum(`totalPrice`) from `emg-restaurant`.orders where createdAt like '%2022-07-13%';

SELECT DATE(`createdAt`) AS `date`, SUM(`totalPrice`) AS `totalSales`
FROM `orders`
WHERE `createdAt` BETWEEN '2022-01-01' AND '2024-01-01'
GROUP BY DATE(`createdAt`)
ORDER BY DATE(`createdAt`) ASC;


SELECT DATE_FORMAT(MIN(createdAt), '%Y-%m-%d') AS weekStart, DATE_FORMAT(MAX(createdAt), '%Y-%m-%d') AS weekEnd, SUM(totalPrice) AS totalSales
FROM orders
WHERE createdAt BETWEEN "2023-07-03T00:00:00.000Z" AND "2023-07-23T00:00:00.000Z"
GROUP BY YEARWEEK(createdAt, 1);

SELECT SUM(totalPrice) AS totalSales
FROM orders
WHERE createdAt BETWEEN "2023-07-03T00:00:00.000Z" AND "2023-07-23T00:00:00.000Z";
