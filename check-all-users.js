const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Fyplogin", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB\n');
  checkAllUsers();
}).catch((err) => {
  console.error('❌ Connection error:', err);
  process.exit(1);
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const teacherSchema = new mongoose.Schema({
  teacherId: { type: String, required: true },
  name: { type: String, required: true },
  project: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const coordinatorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Student = mongoose.model("Students", studentSchema);
const Teacher = mongoose.model("Teachers", teacherSchema);
const Coordinator = mongoose.model("Coordinators", coordinatorSchema);

async function checkAllUsers() {
  try {
    console.log('=' .repeat(70));
    console.log('📊 ALL REGISTERED USERS IN DATABASE');
    console.log('=' .repeat(70));
    
    // Check Students
    const students = await Student.find({}, 'name studentId email password');
    console.log('\n👨‍🎓 STUDENTS (' + students.length + ' total):');
    console.log('-'.repeat(70));
    if (students.length === 0) {
      console.log('   No students found');
    } else {
      students.forEach((student, index) => {
        console.log(`\n   ${index + 1}. ${student.name}`);
        console.log(`      Student ID: ${student.studentId}`);
        console.log(`      Email: ${student.email}`);
        console.log(`      Password: ${student.password}`);
      });
    }
    
    // Check Teachers
    const teachers = await Teacher.find({}, 'name teacherId email password');
    console.log('\n\n👨‍🏫 TEACHERS (' + teachers.length + ' total):');
    console.log('-'.repeat(70));
    if (teachers.length === 0) {
      console.log('   No teachers found');
    } else {
      teachers.forEach((teacher, index) => {
        console.log(`\n   ${index + 1}. ${teacher.name}`);
        console.log(`      Teacher ID: ${teacher.teacherId}`);
        console.log(`      Email: ${teacher.email}`);
        console.log(`      Password: ${teacher.password}`);
      });
    }
    
    // Check Coordinators
    const coordinators = await Coordinator.find({}, 'email password');
    console.log('\n\n👔 COORDINATORS (' + coordinators.length + ' total):');
    console.log('-'.repeat(70));
    if (coordinators.length === 0) {
      console.log('   No coordinators found');
    } else {
      coordinators.forEach((coordinator, index) => {
        console.log(`\n   ${index + 1}. Email: ${coordinator.email}`);
        console.log(`      Password: ${coordinator.password}`);
      });
    }
    
    console.log('\n' + '=' .repeat(70));
    console.log('💡 USE THESE EMAILS FOR PASSWORD RESET TESTING');
    console.log('=' .repeat(70));
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.connection.close();
    console.log('\n🔌 Database connection closed\n');
  }
}
