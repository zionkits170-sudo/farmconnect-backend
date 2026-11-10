-- M26B13/019 KITUNZI ZION MUKISA - Feature 3: Advanced Search
CREATE TABLE IF NOT EXISTS saved_searches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  search_query VARCHAR(255),
  category VARCHAR(100),
  min_price DECIMAL(10,2),
  max_price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
