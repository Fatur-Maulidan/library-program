require('dotenv').config();
const connection = require('../config/connection');
const BooksModel = require('../models/bookModels');

const index = async (req, res) => {
    const [data] = await BooksModel.getAllBooks();
    res.json({
        status: 200,
        message: 'Success Get All Books',
        data: data
    })
}

module.exports = {
    index,
}