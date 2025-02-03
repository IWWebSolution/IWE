const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', './views'); // Tell Express where to find your EJS templates

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'categories_db', // Replace with your database name
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Categories App!');
});

// Fetch categories
app.get('/categories', (req, res) => {
  const sql = 'SELECT * FROM Categories';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Fetch subcategories for a category
app.get('/subcategories/:category_id', (req, res) => {
  const categoryId = req.params.category_id;
  const sql = 'SELECT * FROM Subcategories WHERE category_id = ?';
  db.query(sql, [categoryId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Fetch sub-subcategories for a subcategory
app.get('/subsubcategories/:subcategory_id', (req, res) => {
  const subcategoryId = req.params.subcategory_id;
  const sql = 'SELECT * FROM SubSubcategories WHERE subcategory_id = ?';
  db.query(sql, [subcategoryId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Render a category page
app.get('/category/:slug', (req, res) => {
  const slug = req.params.slug;
  const sql = 'SELECT * FROM Categories WHERE slug = ?';
  db.query(sql, [slug], (err, categoryResult) => {
    if (err) throw err;
    const category = categoryResult[0];

    const subcategorySql = 'SELECT * FROM Subcategories WHERE category_id = ?';
    db.query(subcategorySql, [category.id], (err, subcategoryResults) => {
      if (err) throw err;
      res.render('category', { category, subcategories: subcategoryResults });
    });
  });
});

// Render a subcategory page
app.get('/subcategory/:slug', (req, res) => {
  const slug = req.params.slug;
  const sql = 'SELECT * FROM Subcategories WHERE slug = ?';
  db.query(sql, [slug], (err, subcategoryResult) => {
    if (err) throw err;
    const subcategory = subcategoryResult[0];

    const subSubcategorySql = 'SELECT * FROM SubSubcategories WHERE subcategory_id = ?';
    db.query(subSubcategorySql, [subcategory.id], (err, subSubcategoryResults) => {
      if (err) throw err;
      res.render('subcategory', { subcategory, subSubcategories: subSubcategoryResults });
    });
  });
});

// Render a sub-subcategory (niche) page
app.get('/niche/:slug', (req, res) => {
  const slug = req.params.slug;
  const sql = 'SELECT * FROM SubSubcategories WHERE slug = ?';
  db.query(sql, [slug], (err, nicheResult) => {
    if (err) throw err;
    const niche = nicheResult[0];
    res.render('niche', { niche });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});