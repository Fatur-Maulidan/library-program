require('dotenv').config();
const connection = require('../config/connection');
const BooksModel = require('../models/bookModels');

const index = async (req, res) => {
    try{
        const [data] = await BooksModel.getAllBooks();
        res.json({
            status: 200,
            message: 'Success Get All Books',
            data: data
        })
    } catch(error) {
        res.status(500).json({
            message: 'Internal Server Error',
            errorMessage: error.message
        });
    }
}

module.exports = {
    index,
}