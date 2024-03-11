import express from 'express';
import multer from 'multer';
import path from 'path';
import { importUser } from '../controllers/excelcontroller.js';

const user = express();

const __dirname = path.dirname(new URL(import.meta.url).pathname);

user.use(express.static(path.resolve(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.xlsx')
    }
})

const upload = multer({ storage: storage })


user.post('/importUser', upload.single("File"), importUser);

export default user;
