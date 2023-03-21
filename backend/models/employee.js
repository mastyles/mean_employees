const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const empSchema = new Schema({
    name: { type: String },
    designation: { type: String },
    company: { type: String },
    salary: { type: Number }
});

const Employee = mongoose.model('Employee', empSchema);
module.exports = { Employee };