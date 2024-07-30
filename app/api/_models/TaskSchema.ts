const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     default: () => new mongoose.Types.ObjectId().toString(),
    // },
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
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: String,
        required: true,
    },
});


// const Task = mongoose.model('Task', TaskSchema);

const Task =
    mongoose.models.Task ?? mongoose.model('Task', TaskSchema
    );
export default Task;
