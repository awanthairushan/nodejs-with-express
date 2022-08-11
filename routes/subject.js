const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');
const {check} = require("express-validator");
const checkAuth = require("../middleware/checkAuth")

//Add subjects to db
router.post('/', async (req, res) => {
    const subject = new Subject({
        title: req.body.title,
        code: req.body.code
    });
    try {
        const savedSubject = await subject.save();
        res.json(savedSubject);
    } catch (err) {
        res.json({message: err});
    }
});


//Get all subject
router.get('/', checkAuth, async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (err) {
        res.json({message: err});
    }
});


// //Get specific subject
// router.get('/:subjectId', async (req, res) => {
//     try{
//         const subjects = await Subject.findById(req.params.subjectId);
//         res.json(subjects);
//     } catch(err) {
//         res.json({message: err});
//     }
// });
//
//
// //Delete specific subject
// router.delete('/:subjectId', async (req, res) => {
//     try{
//         const removeSubjectt = await Subject.remove({_id:req.params.subjectId});
//         res.json(removeSubject);
//     } catch(err) {
//         res.json({message: err});
//     }
// });
//
//
// //Update specific subject
// router.patch('/:subjectId', async (req, res) => {
//     try{
//         const updateSubject = await Subject.updateOne({_id:req.params.subjectId}, {$set: {title: req.body.title}});
//         res.json(updateSubject);
//     } catch(err) {
//         res.json({message: err});
//     }
// });


module.exports = router;