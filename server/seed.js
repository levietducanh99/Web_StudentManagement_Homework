const mongoose = require('mongoose');
const Student = require('./models/Student');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/studentdb';

async function seed() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to', MONGO_URI);

  // Remove existing documents (be careful in production)
  await Student.deleteMany({});

  const students = [
    { name: 'Nguyen Van A', age: 16, class: '10A1' },
    { name: 'Tran Thi B', age: 17, class: '11B2' },
    { name: 'Le Van C', age: 15, class: '9C3' }
  ];

  const inserted = await Student.insertMany(students);
  console.log('Inserted sample students:', inserted.map(s => s._id));
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
