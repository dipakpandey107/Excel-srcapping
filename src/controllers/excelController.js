// import Data from '../models/dataModel.js';
// import excelToJson from 'convert-excel-to-json'
// import fs from 'fs';

// const importUser = async (req, res) => {
//     try {
//         var userData = [];
//         console.log(req.file);
//         const filePath = req.file.path;

//         const result = await excelToJson({
//             source: fs.readFileSync(filePath), // fs.readFileSync return a Buffer
//             header: {
//                 rows: 1 // 2, 3, 4, etc.
//             },
//             columnToKey: {
//                 A: 'name',
//                 B: 'email',
//                 C: 'mobile'
//             }
//         });

//         console.log(result);

//         if (result) {
//             for (let key in result) {
//                 const response = result[key];
//                 for (let x = 0; x < response.length; x++) {
//                     userData.push({
//                         name: response[x].name,
//                         email: response[x].email,
//                         mobile: response[x].mobile,
//                     })
//                 }
//                const temp = await Data.insertMany(userData);
//                console.log(temp)
//             }
//         }

//         await fs.unlinkSync(filePath);
//         return res.status(201).send('Data uploaded successfully');
//     } catch (error) {
//         console.log('Error uploading data:', error);
//         return res.status(500).send('Internal Server Error');
//     }
// };

// export { importUser };


import Data from '../models/dataModel.js';
import excelToJson from 'convert-excel-to-json';
import fs from 'fs';

const importUser = async (req, res) => {
    try {
        const filePath = req.file.path;

        const result = await excelToJson({
            source: fs.readFileSync(filePath),
            header: {
                rows: 1
            },
            columnToKey: {
                A: 'name',
                B: 'email',
                C: 'mobile'
            }
        });

        if (!result) {
            throw new Error('No data found in the Excel file');
        }

        const userData = Object.values(result).flat(); 

        if (userData.length === 0) {
            throw new Error('No valid data found in the Excel file');
        }

        const insertedData = await Data.insertMany(userData);

        await fs.unlinkSync(filePath);

        return res.status(201).send('Data uploaded successfully');
    } catch (error) {
        console.log('Error uploading data:', error);
        return res.status(500).send('Internal Server Error');
    }
};

export { importUser };
