CREATE DATABASE policy_management;

USE policy_management;

CREATE TABLE policies (
    id INT AUTO_INCREMENT PRIMARY KEY ,
    policy_number VARCHAR(50) NOT NULL,
    insured_party VARCHAR(100) NOT NULL,
    coverage_type VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    premium_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL
);

INSERT INTO policies (id, policy_number, insured_party, coverage_type, start_date, end_date, premium_amount, status) VALUES
(1, 'PN123456', 'John Doe', 'Auto', '2023-01-01', '2023-12-31', 1200.00, 'Active'),
(2, 'PN123457', 'Jane Smith', 'Home', '2023-02-01', '2024-01-31', 1500.00, 'Active'),
(3, 'PN123458', 'Alice Johnson', 'Life', '2023-03-01', '2023-12-31', 800.00, 'Lapsed'),
(4, 'PN123459', 'Bob Brown', 'Health', '2023-04-01', '2023-12-31', 900.00, 'Active'),
(5, 'PN123460', 'Charlie Davis', 'Auto', '2023-05-01', '2023-12-31', 1100.00, 'Cancelled');


SELECT  * FROM policies;