const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
    },
    priority: {
        type: String,
    },
    userId: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});


// const Task = mongoose.model('Task', TaskSchema);

const Task =
    mongoose.models.Task ?? mongoose.model('Task', TaskSchema
    );
export default Task;