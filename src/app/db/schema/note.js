import { Schema, model, models } from "mongoose";

const noteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",  
        required: true,
    },
    title: {
        type: String,
        trim: true,
    },
    tags: {
        type: [String], 
        default: [],
    },
    body: {
        type: [String],  
        required: true,
        validate: {
            validator: function (arr) {
                return arr.length > 0; 
            },
            message: 'Body cannot be empty',
        },
    },
}, {
    timestamps: true, 
});
const note = models.notes || model("notes", noteSchema)
export default note