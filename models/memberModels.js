const connection = require('../config/connection');

const getAllMembers = () => {
    const query = 'SELECT * FROM members';

    return connection.execute(query);
};

const getMemberByCode = (code) => {
    const query = 'SELECT * FROM members WHERE code = ?';

    return connection.execute(query, [code]);
}

const createNewMember = async (body) => {
    let prefixCodeMember = await setPrefixCodeMember();
    const query = ` INSERT INTO members (code, name, status) 
                    VALUES (?,?,?)`;

    return connection.execute(query, [prefixCodeMember, body.name], 'Active');
}

const updateMember = async (body, code) => {
    const query = ` UPDATE members 
                    SET name = ?
                    WHERE code = ?`;

    return connection.execute(query, [body.name, code]);
}

const deleteMember = async (code, status) => {
    const query = ` UPDATE members
                    SET status = ?
                    WHERE code = ?`;

    return connection.execute(query, [status, code]);
}

const countAllMembers = () => {
    const query = 'SELECT COUNT(*) as totalMember FROM members';

    return connection.execute(query);
}

const setPrefixCodeMember = async () => {
    const [data] = await countAllMembers();
    const memberCount = data[0].totalMember;
    const code = 'M' + (memberCount + 1).toString().padStart(3, '0');
    
    return code;
}

module.exports = {
    getAllMembers,
    getMemberByCode,
    createNewMember,
    updateMember,
    deleteMember
}