require('dotenv').config();
const connection = require('../config/connection');

const getBooks = (req, res, next) => {
    // connection.query('SELECT * FROM books', (err, result) => {
    //     if (err) {
    //         console.log('Error fetching books : ',err);
    //         res.sendStatus(500);
    //         return;
    //     }
    //     res.json(result);
    // });
    res.json({
        status:200,
        message: 'Books route works'
    })
}