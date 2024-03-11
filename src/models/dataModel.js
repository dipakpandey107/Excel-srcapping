import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email:{
        type: String,
    },
    mobile:{
        type: Number
    }
});

const Data = mongoose.model('Data', dataSchema);

export default Data;
