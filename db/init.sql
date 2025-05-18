-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS users_db;
USE users_db;

-- Create User table
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(64) NOT NULL UNIQUE,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME DEFAULT NULL
);

-- Create Product table
CREATE TABLE IF NOT EXISTS product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    price DECIMAL(10,2) NOT NULL
);

-- Create Cart table
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    checkout_date DATETIME,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Seed users (passwords are dummy hashes, replace with real hashes if needed)
INSERT INTO user (username, email, password) VALUES
  ('root', 'root@example.com', 'scrypt:32768:8:1$y1Sx3GU4DjLOwdg8$3143f66b1c17307c77f9b536e7abb2021636577edcfdb261375b560dcfa715f7141a6d355515743fb96925e0270baf57a5b9a7993c7776622d25ad0a05b98b94'),
  ('user1', 'user1@example.com', 'scrypt:32768:8:1$dMdF2dLYt7Y03wYO$dae3c8bc52778e3294f8d48b36943f0f391af14cd3abdcf4a4c2930320978296d80ba523a77dc5d4fa1ce19d9a12ff034238109efb6865f345714b432da8f8da')
ON DUPLICATE KEY UPDATE username=username;

-- Seed products
INSERT INTO product (name, description, category, price) VALUES
('Apple iPhone 14', 'Latest Apple smartphone', 'Electronics', 999.99),
('Samsung Galaxy S22', 'Flagship Android phone', 'Electronics', 899.99),
('Sony WH-1000XM5', 'Noise-cancelling headphones', 'Electronics', 349.99),
('Dell XPS 13', 'Ultrabook laptop', 'Computers', 1199.00),
('Nike Air Max', 'Running shoes', 'Footwear', 129.99),
('Adidas Ultraboost', 'Comfortable sports shoes', 'Footwear', 139.99),
('The Lean Startup', 'Entrepreneurship book', 'Books', 19.99),
('Logitech MX Master 3', 'Wireless ergonomic mouse', 'Accessories', 99.99),
('Canon EOS M50', 'Mirrorless camera', 'Photography', 649.00),
('Amazon Kindle Paperwhite', 'E-reader with backlight', 'Books', 129.99),
('Fitbit Charge 5', 'Fitness tracker', 'Wearables', 149.99),
('Instant Pot Duo', 'Electric pressure cooker', 'Home & Kitchen', 89.99),
('Bose SoundLink Flex', 'Portable Bluetooth speaker', 'Audio', 129.00),
('Google Nest Hub', 'Smart home display', 'Smart Home', 99.00),
('JBL Flip 6', 'Waterproof speaker', 'Audio', 119.99),
('Asus ROG Strix', 'Gaming laptop', 'Computers', 1499.00),
('Apple MacBook Pro', 'High-performance laptop', 'Computers', 1999.00),
('GoPro HERO10', 'Action camera', 'Photography', 499.00),
('Anker PowerCore 10000', 'Portable charger', 'Accessories', 25.99),
('Echo Dot (5th Gen)', 'Smart speaker with Alexa', 'Smart Home', 49.99)
ON DUPLICATE KEY UPDATE name=name;