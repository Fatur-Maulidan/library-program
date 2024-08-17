const connection = require('../config/connection');

const getAllMembers = () => {
    const query = 'SELECT * FROM members';

    return connection.execute(query);
};

const createNewMember = async (body) => {
    let prefixCodeMember = await setPrefixCodeMember();
    const query = ` INSERT INTO members (code, name, status) 
                    VALUES ('${prefixCodeMember}', '${body.name}', 'Active')`;

    return connection.execute(query);
}

const updateMember = async (body, code) => {
    const query = ` UPDATE members 
                    SET name = '${body.name}'
                    WHERE code = '${code}'`;

    return connection.execute(query);
}

const deleteMember = async (code) => {
    const query = ` UPDATE members
                    SET status = 'Inactive' 
                    WHERE code = '${code}'`;

    return connection.execute(query);
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
    createNewMember,
    updateMember,
    deleteMember
}