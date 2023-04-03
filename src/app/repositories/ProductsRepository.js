const { v4: uuidv4 } = require('uuid');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mydatabase',
  password: 'postgres',
  port: 5432,
});

class ProductsRepository {

  constructor(pool) {
    this.pool = pool;
  }

  async findAll() {
    const query = 'SELECT * FROM products';
    const result = await this.pool.query(query);
    return result.rows;
  }

  async findById(id) {
    const query = 'SELECT * FROM products WHERE id = $1';
    const values = [id];
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const query = 'DELETE FROM products WHERE id = $1';
    const values = [id];
    await this.pool.query(query, values);
  }

  async create({ name, price, category_id, subcategory }) {
    const id = uuidv4();
    const query = 'INSERT INTO products (id, name, price, category_id, subcategory) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [id, name, price, category_id, subcategory];
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async update(id, { name, price, category_id, subcategory }) {
    const query = 'UPDATE products SET name = $1, price = $2, category_id = $3, subcategory = $4 WHERE id = $5 RETURNING *';
    const values = [name, price, category_id, subcategory, id];
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = new ProductsRepository(pool);
