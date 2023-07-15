const express = require('express');
const mysql = require('mysql');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

// Konfigurasi koneksi ke database MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbbook'
});

// Membuka koneksi ke database MySQL
connection.on('error',(err) => {
    if (err) {
        console.error('Terjadi kesalahan koneksi ke database:', err);
        return;
    }
    console.log('Terhubung ke database MySQL');
});

// Rute untuk menampilkan semua data
app.get('/data1', (req, res) => {
    const query = 'SELECT * FROM book';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error mengambil data:', err);
            res.status(500).send('Terjadi kesalahan saat mengambil data');
            return;
        }

        res.json(results);
    });
});
app.get('/data2', (req, res) => {
    const query = 'SELECT * FROM members';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error mengambil data:', err);
            res.status(500).send('Terjadi kesalahan saat mengambil data');
            return;
        }

        res.json(results);
    });
});
// Rute untuk menampilkan satu data berdasarkan ID
app.get('/data1/:code', (req, res) => {
    const { code } = req.params;
    const query = 'SELECT * FROM book WHERE code = ?';

    connection.query(query, [code], (err, result) => {
        if (err) {
            console.error('Error mengambil data:', err);
            res.status(500).send('Terjadi kesalahan saat mengambil data');
            return;
        }

        if (result.length === 0) {
            res.status(404).send('Data tidak ditemukan');
            return;
        }

        res.json(result[0]);
    });
});
// Rute untuk menampilkan satu data berdasarkan ID
app.get('/data2/:code', (req, res) => {
    const { code } = req.params;
    const query = 'SELECT * FROM members WHERE code = ?';

    connection.query(query, [code], (err, result) => {
        if (err) {
            console.error('Error mengambil data:', err);
            res.status(500).send('Terjadi kesalahan saat mengambil data');
            return;
        }

        if (result.length === 0) {
            res.status(404).send('Data tidak ditemukan');
            return;
        }

        res.json(result[0]);
    });
});
// Rute untuk membuat data baru
app.post('/data1', (req, res) => {
    // Dapatkan data yang dikirim melalui body permintaan
    const { code, title, author, stock } = req.body;
    const query = 'INSERT INTO book (code, title, author, stock) VALUES (?, ?, ?, ?)';

    connection.query(query, [code, title, author, stock], (err, result) => {
        if (err) {
            console.error('Error membuat data baru:', err);
            res.status(500).send('Terjadi kesalahan saat membuat data baru');
            return;
        }

        res.status(201).json({ id: result.code, title, author, stock });
    });
});
app.post('/data2', (req, res) => {
    // Dapatkan data yang dikirim melalui body permintaan
    const { code, name } = req.body;
    const query = 'INSERT INTO members (code, name) VALUES (?, ?)';

    connection.query(query, [code, name], (err, result) => {
        if (err) {
            console.error('Error membuat data baru:', err);
            res.status(500).send('Terjadi kesalahan saat membuat data baru');
            return;
        }

        res.status(201).json({ id: result.code, name });
    });
});
// Rute untuk mengupdate data
app.put('/data1/:code', (req, res) => {
    const { code } = req.params;
    const {  title, author, stock } = req.body;
    const query = 'UPDATE book SET title = ?, author = ?, stock = ? WHERE code = ?';

    connection.query(query, [email, name, username, password, id], (err, result) => {
        if (err) {
            console.error('Error mengupdate data:', err);
            res.status(500).send('Terjadi kesalahan saat mengupdate data');
            return;
        }

        res.json({ id, email, name, username, password });
    });
});

// Rute untuk menghapus data
app.delete('/data1/:code', (req, res) => {
    const { code } = req.params;
    const query = 'DELETE FROM book WHERE code = ?';

    connection.query(query, [code], (err, result) => {
        if (err) {
            console.error('Error menghapus data:', err);
            res.status(500).send('Terjadi kesalahan saat menghapus data');
            return;
        }

        res.json({ code });
    });
});

// Konfigurasi Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/api-docs', swaggerUi.setup(swaggerDocument, { explorer: true }));

// Jalankan server
app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
