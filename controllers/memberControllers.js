const connection = require('../config/connection');
const MemberModel = require('../models/memberModels');

const index = async (req, res) => {
    try {
        const [data] = await MemberModel.getAllMembers();
    
        res.json({
            status : 200,
            message : 'Success Get All Members',
            data : data
        });
    } catch (error) {
        res.status(500).json({
            message : 'Internal Server Error',
            serverMessage : error.message
        });
    }
}



module.exports = {
    index
};