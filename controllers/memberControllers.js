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

const store = async (req, res) => {
    try {
        await MemberModel.createNewMember(req.body);
        res.json({
            status : 200,
            message : 'Success Create New Member'
        });
    } catch (error) {
        res.status(500).json({
            message : 'Internal Server Error',
            serverMessage : error.message
        });
    }
}



module.exports = {
    index,
    store
};