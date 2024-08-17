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
            errorMessage : error.message
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
            errorMessage : error.message
        });
    }
}

const update = async (req, res) => {
    try {
        await MemberModel.updateMember(req.body, req.params.code);
        res.json({
            status : 200,
            message : 'Success Update Member'
        });
    } catch (error) {
        res.status(500).json({
            message : 'Internal Server Error',
            errorMessage : error.message
        });
    }
}

const destroy = async (req, res) => {
    try {
        await MemberModel.deleteMember(req.params.code, req.params.status);
        res.json({
            status : 200,
            message : `Success, Member now is ${req.params.status}`
        });
    } catch (error) {
        res.status(500).json({
            message : 'Internal Server Error',
            errorMessage : error.message
        })
    }
}

module.exports = {
    index,
    store,
    update,
    destroy
};