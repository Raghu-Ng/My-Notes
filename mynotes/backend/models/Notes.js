const mongoose = require('mongoose');

const NoteSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default: "Genral"
    },
    date:{
        type: date,
        default: Date_now
    },
})

module.exports = mongoose.model('notes', NoteSchema);