const connection = require('../config/connection');
const { getMemberByCode } = require('./memberModels');

const getAllBooks = () => {
    const query = 'SELECT * FROM books';

    return connection.execute(query);
}

const getBookByCode = (code) => {
    const query = 'SELECT * FROM books WHERE code = ?';

    return connection.execute(query, [code]);
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

const deleteBook = (code) => {
    const query = 'DELETE FROM books WHERE code = ?';

    return connection.execute(query, [code]);
}

const borrowBook = async (code, code_member) => {
    await checkIfBooksIsAvailable(code, code_member);
    const query = `UPDATE books SET borrowed_at = NOW(), code_members = ? WHERE code = ?`;

    return connection.execute(query, [code_member, code]);
} 

const checkIfBooksIsAvailable = async (code, code_member) => {
    const [dataBookByCode] = await getBookByCode(code);
    const [dataMemberByCode] = await getMemberByCode(code_member);
    
    if(dataBookByCode[0].borrowed_at !== null) {
        if(dataBookByCode[0].code_members === dataMemberByCode[0].code)
        {
            throw new Error(`Member ${dataMemberByCode[0].name} already borrowed this book`);
        }
        throw new Error('Book is not available');
    }

    return true;
}

module.exports = {
    getAllBooks,
    createNewBook,
    updateBook,
    deleteBook,
    borrowBook
};