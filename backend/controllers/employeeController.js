const e = require('cors');
const express = require('express');
var router = express.Router();

var { Employee } = require('../models/employee');

router.get('/', async(req, res) => {
    try {
        const employeesData = await Employee.find();
        res.status(200).send({
            status: 'Success',
            data: employeesData,
        });
    } catch (error) {
        console.log('Error in retrieving Employees :' + JSON.stringify(error));
    }
});

const ObjectId = require('mongodb').ObjectId;
router.get('/:id', async(req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('No record exists with the id: ' + req.params.id);
    }

    const employee = await Employee.findById(req.params.id);

    // if (!employee) {
    //     res.status(404).send('Employee not found. Please try again');
    //     return;
    // }

    res.status(200).send({
        status: 'Success',
        data: employee,
    });
});

router.post('/', async(req, res) => {
    const { name, designation, company, salary } = req.body;
    const employee = new Employee({
        name,
        designation,
        company,
        salary
    });

    await employee.save()
        .then(() => res.json('Employee added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.put('/:id', async(req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('No record exists with the id: ' + req.params.id);
    }

    try {
        const { name, designation, company, salary } = req.body;
        const updatedEmployee = await Employee.findOneAndUpdate({ _id: req.params.id }, { name, designation, company, salary }, { new: true });
        res.status(200).send({
            status: 'Success',
            data: updatedEmployee,
        });
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

router.delete('/:id', async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('No record exists with the id: ' + req.params.id);
    }

    await Employee.findByIdAndDelete(req.params.id)
        .then((deletedEmployee) => {
            res.status(200).send({
                status: 'Success',
                data: deletedEmployee,
            });
        })
        .catch((error) => {
            return res.status(400).json(`Error deleting employee: ${error}`);
        });

});

module.exports = router;