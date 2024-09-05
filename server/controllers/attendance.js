import Attendance from '../models/attendance.js';


const uploadattendance = async (req, res) => {
    const { class: className, stream, attendance } = req.body;

    if (!className|| !attendance) {
        return res.status(400).json({ error: 'Class, date, and attendance are required.' });
    }

    if ((className === '11' || className === '12') && !stream) {
        return res.status(400).json({ error: 'Stream is required for classes 11 and 12.' });
    }

    const validStreams = ["Science", "Commerce", "Arts"];
    if (stream && !validStreams.includes(stream)) {
        return res.status(400).json({ error: 'Invalid stream value.' });
    }

    try {
        const newAttendance = new Attendance({
            class: className,
            stream: stream || undefined, 
            attendance,
        });

        await newAttendance.save();
        res.status(200).json({ message: 'Attendance submitted successfully.' });
    } catch (error) {
        console.error('Error saving attendance:', error);
        res.status(500).json({ error: 'Failed to submit attendance.' });
    }

}

export default uploadattendance;

