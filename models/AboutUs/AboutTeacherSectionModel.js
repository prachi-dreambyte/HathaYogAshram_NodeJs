const mongoose = require("mongoose");

const aboutTeacherDetailsSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    role: [
        {
            type: String
        }
    ],

    image: {
        type: String
    },

    bio: [
        {
            type: String
        }
    ],

    education: [
        {
            type: String
        }
    ],

    experience: [
        {
            type: String
        }
    ],

    expertise: [
        {
            type: String
        }
    ]
},
{ timestamps: true }
);

module.exports = mongoose.model(
"AboutTeacherDetails",
aboutTeacherDetailsSchema
);