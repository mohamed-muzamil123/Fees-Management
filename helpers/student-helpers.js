const db = require('../config/connection'); // Ensure the correct path
const collection = require('../config/collection');
const { ObjectId } = require('mongodb');

module.exports = {
    getAllStudents: async () => {
        const database = db.getDB(); // Get the database instance
        return await database.collection(collection.STUDENT_COLLECTION).find().toArray();
    },
    
    addStudent: async (student, callback) => {
        const database = db.getDB();
        await database.collection(collection.STUDENT_COLLECTION).insertOne(student);
        callback();
    },
    
    getStudentDetails: async (stdId) => {
        const database = db.getDB();
        return await database.collection(collection.STUDENT_COLLECTION)
                             .findOne({ _id: new ObjectId(stdId) });
    },
    
    addFees: async (fees) => {
        const database = db.getDB();
        return await database.collection(collection.STUDENT_COLLECTION)
                             .updateOne(
                                 { _id: new ObjectId(fees._id) },
                                 { 
                                     $push: { 
                                         fees: { 
                                             date: fees.date,
                                             month: fees.month,
                                             amount: fees.amount
                                         }
                                     }
                                 }
                             );
    }
};
