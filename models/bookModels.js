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
    await checkIfMemberIsBorrowed(code_member);
    await checkIfBooksIsAvailable(code, code_member);
    const query = `UPDATE books SET borrowed_at = NOW(), code_members = ? WHERE code = ?`;

    return connection.execute(query, [code_member, code]);
} 

const returnBook = async (code) => {
    const logBorrow = await logBorrowedBook(code);
    const query = `UPDATE books SET borrowed_at = NULL, code_members = NULL WHERE code = ?`;

    return connection.execute(query, [code]);
}

// This function is to check if book is available (anyone borrowed the book) or not 
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

// This function is to count how many book is borrowed by member
const countMemberIsBorrowed = async (code_member) => {
    const query = 'SELECT COUNT(*) as member_borrowed FROM books WHERE code_members = ?';

    return connection.execute(query, [code_member]);
}

// This function is to check if member is borrowed book or not
const checkIfMemberIsBorrowed = async (code_member) => {
    const [dataMemberIsBorrowed] = await countMemberIsBorrowed(code_member);
    const [dataMemberByCode] = await getMemberByCode(code_member);

    if(dataMemberIsBorrowed[0].member_borrowed > 0) {
        throw new Error(`${dataMemberByCode[0].name} is borrowed book, need to return the book first`);
    }

    return true
}

// Insert into Log Borrowed Book for make history log who borrowed the book
const logBorrowedBook = async (code) => {
    const [book] = await getBookByCode(code);
    const query = 'INSERT INTO log_borrows (code_books, code_members, borrowed_at, return_at) VALUES (?, ?, ?, NOW())';

    return connection.execute(query, [book[0].code, book[0].code_members, book[0].borrowed_at]);
}

module.exports = {
    getAllBooks,
    createNewBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook
};