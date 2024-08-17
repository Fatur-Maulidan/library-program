const connection = require('../config/connection');

const getAllMembers = (req, res) => {
    const query = 'SELECT * FROM members';

    return connection.execute(query);
};

module.exports = {
    getAllMembers
}