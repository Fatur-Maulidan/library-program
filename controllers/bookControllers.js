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
            status : 500,
            message: 'Internal Server Error',
            errorMessage: error.message
        });
    }
}

const store = async (req, res) => {
    try {
        await BooksModel.createNewBook(req.body);
        res.json({
            status: 200,
            message: 'Success Create New Book'
        });
    } catch (error) {
        res.status(500).json({
            status : 500,
            message: 'Internal Server Error',
            errorMessage: error.message
        });
    }
}

const update = async (req, res) => {
    try {
        await BooksModel.updateBook(req.body, req.params.code);
        res.json({
            status: 200,
            message: 'Success Update Book'
        });
    } catch (error) {
        res.status(500).json({
            status : 500,
            message : 'internal Server Error',
            errorMessage : error.message
        })
    }
}

const destroy = async (req, res) => {
    try {
        await BooksModel.deleteBook(req.params.code, req.params.status);
        res.json({
            status: 200,
            message: `Success Book is deleted`
        });
    } catch (error) {
        res.status(500).json({
            status : 500,
            message: 'Internal Server Error',
            errorMessage: error.message
        });
    }
}

const borrowBook = async (req, res) => {
    try {
        const borrowBook = await BooksModel.borrowBook(req.body.code, req.params.code_member);
        res.json({
            status: 200,
            message: 'Success Borrow Book'
        })
    } catch (error) {
        res.status(500).json({
            status : 500,
            message: 'Internal Server Error',
            errorMessage: error.message
        })
    }
}

const returnBook = async (req, res) => {
    try {
        const data = await BooksModel.returnBook(req.params.code);
        res.json({
            status: 200,
            message: 'Success Return Book',
        });
    } catch (error) {
        res.status(500).json({
            status : 500,
            message: 'Internal Server Error',
            errorMessage: error.message
        });
    }
}

module.exports = {
    index,
    store,
    update,
    destroy,
    borrowBook,
    returnBook
}