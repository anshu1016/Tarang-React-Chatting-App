// configuration
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();


//Upload Image to S3
import path from 'path';
import crypto from 'crypto';

const uploadProfilePicture = async (file, userId) => {
    try {
        // Generate a unique filename using userId and original file extension
        const fileExtension = path.extname(file.originalname);
        const filename = `${userId}-${crypto.randomBytes(16).toString('hex')}${fileExtension}`;

        // Upload parameters
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `profile-pictures/${filename}`, // Create a directory for profile pictures
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read' // Make the file publicly accessible
        };

        // Upload the file to S3
        const data = await s3.upload(params).promise();

        // Return the URL of the uploaded file
        return data.Location;
    } catch (err) {
        console.error('Error uploading file:', err);
        throw new Error('Failed to upload profile picture.');
    }
};

//Integrate with Express
import express from 'express';
import multer from 'multer';
import { uploadProfilePicture } from './your-upload-function'; // import the function defined earlier

const router = express.Router();
const upload = multer(); // Use multer for handling multipart form data

router.post('/upload-profile-picture', upload.single('profilePicture'), async (req, res) => {
    try {
        const { userId } = req.body;
        const file = req.file;

        if (!file || !userId) {
            return res.status(400).json({ message: 'Missing file or userId' });
        }

        const imageUrl = await uploadProfilePicture(file, userId);

        // Store the image URL in your MongoDB database along with user details
        // Example: Update the user's profile with the image URL
        await User.findByIdAndUpdate(userId, { profilePicture: imageUrl });

        res.status(200).json({ message: 'Profile picture uploaded successfully', imageUrl });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;

//Save Reference in MOngoDb
const userSchema = new mongoose.Schema({
    // Other user fields
    profilePicture: {
        type: String,
        required: false
    }
});

const User = mongoose.model('User', userSchema);

//Fetching and Using Profile Picture
// Use this URL in your frontend to display the profile picture
const user = await User.findById(userId);
const profilePictureUrl = user.profilePicture;

// .env file
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_S3_BUCKET_NAME=your_s3_bucket_name




