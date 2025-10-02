const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors({
    origin: 'http://localhost:3000', // or your frontend URL
    credentials: true
}));

if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY environment variable');
    process.exit(1);
}

app.post('/api/send-interview-invitation', async (req, res) => {
    try {
        const { interviewData } = req.body;
        
        const data = await resend.emails.send({
            from: 'Employment Corner <notifications@yourapp.com>',
            to: interviewData.email,
            subject: `Interview Invitation - ${interviewData.company_name}`,
            html: generateInterviewEmailHTML(interviewData),
            text: generateInterviewEmailText(interviewData)
        });

        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});

function generateInterviewEmailHTML(interviewData) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Interview Invitation</h2>
                <p>Dear ${interviewData.applicant_name},</p>
                <p>Your interview is scheduled for ${interviewData.interview_date} at ${interviewData.interview_time}</p>
            </div>
        </body>
        </html>
    `;
}

function generateInterviewEmailText(interviewData) {
    return `Interview Invitation\n\nDear ${interviewData.applicant_name},\n\nYour interview is scheduled for ${interviewData.interview_date} at ${interviewData.interview_time}`;
}