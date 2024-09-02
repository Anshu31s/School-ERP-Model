import Marks from '../models/marks.js';


const uploadmarks = async (req, res) => {
    try {
        const { grade, subject, session, students } = req.body;

        if (!grade || !subject || !session || !students || !Array.isArray(students)) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        const newMarks = new Marks({
            grade,
            subject,
            session,
            students
        });

        await newMarks.save();

        res.status(201).json({ message: 'Marks uploaded successfully', data: newMarks });
    } catch (error) {
        console.error('Error uploading marks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getmarks = async (req, res) => {
   
}

export { uploadmarks , getmarks };

