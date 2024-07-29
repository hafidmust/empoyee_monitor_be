const fs = require('fs');
const multer = require('multer');
const path = require('path');

const uploadDir = 'uploads/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,uniqueSuffix + '-' + file.originalname);
    }
})

export const upload = multer({storage: storage});