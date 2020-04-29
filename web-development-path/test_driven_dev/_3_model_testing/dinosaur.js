const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define validator method here
const validator = function(args) {
    // return false;
    return value <= 10;
};
// Define Schema here
const DinosaurSchema = new Schema({
    name: { type: String, required: true },
    count: {
        type: Number,
        // Define validate property here
        // validate: [validator, 'Cannot hold more than 10 dinosaurs.']
        max: [10, 'Cannot hold more than 10 dinosaurs.']
    },
    risk: { type: String }
});

// Define .findByName here
// static method - implementation
DinosaurSchema.statics.findByName = function(name, callback) {
    return this.findOne({ name: name }, callback);
};
// static method - call the method
// await Dinosaur.findByName('Velociraptor')

// Define .breed here
DinosaurSchema.methods.breed = function() {
    this.count = this.count + 1;
};
// instance method - call the method
// dino.breed()

module.exports = mongoose.model('Dinosaur', DinosaurSchema);
