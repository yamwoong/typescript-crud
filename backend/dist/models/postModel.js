"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    createdBy: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: false
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Post', postSchema);
