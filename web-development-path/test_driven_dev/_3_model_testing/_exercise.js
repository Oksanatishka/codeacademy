const { mongoose, runWithDatabase } = require('./_database');
const manyItems = require('./items');

// Mongoose Schema
const magicItemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    magicalProperty: {
        type: String,
        required: true
    },
    unitCost: {
        type: Number,
        required: true
    },
    totalUnits: {
        type: Number,
        required: true
    }
});
// Model Methods
magicItemSchema.statics.findMostExpensive = function(callback) {
    return this.findOne({})
        .sort('unitCost')
        .exec(callback);
};
magicItemSchema.methods.use = function(callback) {
    this.totalUnits -= this.unitCost;
    return this.save();
};

// Model
const MagicItem = mongoose.model('MagicItem', magicItemSchema);

const properties = {
    item: 'cloak',
    magicalProperty: 'invisibility',
    unitCost: 25,
    totalUnits: 100
};
runWithDatabase(async () => {
    // Create and save a document
    await MagicItem.create(properties);

    // Queries
    let finder = await MagicItem.findOne({
        item: 'cloak'
    });
    console.log(`Found one: ${finder.item}`); // Check that it works by logging the number of returned documents
    // > node exercise.js

    let cheapObjects = await MagicItem.find({
        unitCost: { $lt: 50 }
    });
    console.log(`Found ${cheapObjects.length} magic objects`);

    // Code for Model Methods
    const mostExpensive = await MagicItem.findMostExpensive();
    console.log(`The most expensive object is the ${mostExpensive.item}`);
    console.log(`The ${mostExpensive.item} started with ${mostExpensive.totalUnits} charges.`);
    console.log(`Using ${mostExpensive.item}...`);
    await mostExpensive.use();
    console.log(`The ${mostExpensive.item} has ${mostExpensive.totalUnits} charges left.`);
});
