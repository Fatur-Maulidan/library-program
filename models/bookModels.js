const connection = require('../config/connection');

const getAllBooks = () => {
    const query = 'SELECT * FROM books';

    return connection.execute(query);
}

const createNewBook = (body) => {
    const query = 'INSERT INTO books (code, title, author, stock) VALUES (?, ?, ?, ?)';

    return connection.execute(query, [body.code, body.title, body.author, 1]);
}

const updateBook = (body, code) => {
    const query =  `UPDATE books
                    SET title = ?, author = ?
                    WHERE code = ?`;
    
    return connection.execute(query, [body.title, body.author, code]);
}


module.exports = {
    getAllBooks,
    createNewBook
};