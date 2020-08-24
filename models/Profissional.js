// User model here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const professionalSchema = new Schema({
    position: [String],
    location: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        unique: true
    },
    contact: {
        email: {
            type: String,
            required: true
        },
        link: String,
        linkedIn: String,
    },
    isActive: Boolean
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const Professional = mongoose.model("Professional", professionalSchema);

module.exports = Professional;