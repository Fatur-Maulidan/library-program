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
    await checkIfMemberStillInPenalty(code_member);
    const query = `UPDATE books SET borrowed_at = NOW(), code_members = ? WHERE code = ?`;

    return connection.execute(query, [code_member, code]);
} 

const returnBook = async (code) => {
    await checkIfMemberIsNotBorrowed(code);
    await logBorrowedBook(code);
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

// This function is to check if member is not borrowed any book
const checkIfMemberIsNotBorrowed = async (code_member) => {
    const [dataMemberIsBorrowed] = await countMemberIsBorrowed(code_member);

    if(dataMemberIsBorrowed[0].member_borrowed === 0) {
        throw new Error('Member is not borrowed any book');
    }

    return true;
}

// Insert into Log Borrowed Book for make history log who borrowed the book
const logBorrowedBook = async (code) => {
    const [book] = await getBookByCode(code);
    const penaltyUntil = await checkIfMemberGetPenalty(book[0].borrowed_at);

    const query = `INSERT INTO log_borrows (code_books, code_members, borrowed_at, return_at${penaltyUntil ? ', penalty_until' : ''}) 
                VALUES (?, ?, ?, NOW()${penaltyUntil ? ', ?' : ''})`;

    const params = [book[0].code, book[0].code_members, book[0].borrowed_at];
    if (penaltyUntil) params.push(penaltyUntil);

    return connection.execute(query, params);
}

// This function is used to check if a member has borrowed a book for more than 7 days.
const checkIfMemberGetPenalty = async (borrowed_at) => {
    const borrowedDate = new Date(borrowed_at);
    const now = new Date();
    const NOW = () => Math.ceil((now - borrowedDate) / (1000 * 60 * 60 * 24));

    if(NOW() > 7) {
        return penaltyDate = setDateForPenalty(now);
    }

    return false;
}

// This function is used to set the date today + 3 days for the penalty
const setDateForPenalty = (today) => {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 3);
    const mysqlTimestamp = futureDate.toISOString().slice(0, 19).replace('T', ' ');

    return mysqlTimestamp;
}

// This function is used to check if a member is still in penalty
const memberStillInPenalty = async (code_member) => {
    const query = 'SELECT COUNT(*) as penaltyMember FROM log_borrows WHERE code_members = ? AND penalty_until > NOW()';

    return connection.execute(query, [code_member]);
}

const checkIfMemberStillInPenalty = async (code_member) => {
    const [dataMemberStillInPenalty] = await memberStillInPenalty(code_member);

    if(dataMemberStillInPenalty[0].penaltyMember.length > 0) {
        throw new Error('Member still in penalty cannot borrowing book');
    }

    return true;
}

module.exports = {
    getAllBooks,
    createNewBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook
};