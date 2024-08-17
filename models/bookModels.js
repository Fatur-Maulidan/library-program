const connection = require('../config/connection');

const getAllBooks = () => {
    const query = 'SELECT * FROM books';

    return connection.execute(query);
}

module.exports = {
    getAllBooks,
};