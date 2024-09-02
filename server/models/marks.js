import mongoose from 'mongoose';

const marksSchema = new mongoose.Schema({
    grade: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    session: {
        type: String,
        required: true
    },
    students: [
        {
            userId: {
                type: String,
                required: true
            },
            marks: {
                type: Number,
                required: true
            }
        }
    ]
});

const Marks = mongoose.model('Marks', marksSchema);
export default Marks;
