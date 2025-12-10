const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

mongoose.connect("mongodb://localhost:27017/Fyplogin", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB\n');
  migratePasswords();
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

async function hashPassword(plainPassword) {
  return await bcrypt.hash(plainPassword, SALT_ROUNDS);
}

async function isPasswordHashed(password) {
  // Bcrypt hashes always start with $2a$, $2b$, or $2y$
  return password && password.startsWith('$2');
}

async function migratePasswords() {
  console.log('=' .repeat(70));
  console.log('🔐 PASSWORD MIGRATION - Converting Plain Text to Hashed');
  console.log('=' .repeat(70));
  
  let totalMigrated = 0;
  let totalSkipped = 0;

  try {
    // Migrate Students
    console.log('\n👨‍🎓 Migrating Student Passwords...');
    console.log('-'.repeat(70));
    const students = await Student.find({});
    
    for (const student of students) {
      if (await isPasswordHashed(student.password)) {
        console.log(`   ⏭️  Skipped: ${student.email} (already hashed)`);
        totalSkipped++;
      } else {
        const originalPassword = student.password;
        const hashedPassword = await hashPassword(originalPassword);
        await Student.updateOne(
          { _id: student._id },
          { password: hashedPassword }
        );
        console.log(`   ✅ Migrated: ${student.email}`);
        console.log(`      Original: ${originalPassword}`);
        console.log(`      Hashed: ${hashedPassword.substring(0, 30)}...`);
        totalMigrated++;
      }
    }

    // Migrate Teachers
    console.log('\n👨‍🏫 Migrating Teacher Passwords...');
    console.log('-'.repeat(70));
    const teachers = await Teacher.find({});
    
    for (const teacher of teachers) {
      if (await isPasswordHashed(teacher.password)) {
        console.log(`   ⏭️  Skipped: ${teacher.email} (already hashed)`);
        totalSkipped++;
      } else {
        const originalPassword = teacher.password;
        const hashedPassword = await hashPassword(originalPassword);
        await Teacher.updateOne(
          { _id: teacher._id },
          { password: hashedPassword }
        );
        console.log(`   ✅ Migrated: ${teacher.email}`);
        console.log(`      Original: ${originalPassword}`);
        console.log(`      Hashed: ${hashedPassword.substring(0, 30)}...`);
        totalMigrated++;
      }
    }

    // Migrate Coordinators
    console.log('\n👔 Migrating Coordinator Passwords...');
    console.log('-'.repeat(70));
    const coordinators = await Coordinator.find({});
    
    for (const coordinator of coordinators) {
      if (await isPasswordHashed(coordinator.password)) {
        console.log(`   ⏭️  Skipped: ${coordinator.email} (already hashed)`);
        totalSkipped++;
      } else {
        const originalPassword = coordinator.password;
        const hashedPassword = await hashPassword(originalPassword);
        await Coordinator.updateOne(
          { _id: coordinator._id },
          { password: hashedPassword }
        );
        console.log(`   ✅ Migrated: ${coordinator.email}`);
        console.log(`      Original: ${originalPassword}`);
        console.log(`      Hashed: ${hashedPassword.substring(0, 30)}...`);
        totalMigrated++;
      }
    }

    console.log('\n' + '=' .repeat(70));
    console.log('📊 MIGRATION SUMMARY');
    console.log('=' .repeat(70));
    console.log(`✅ Passwords Migrated: ${totalMigrated}`);
    console.log(`⏭️  Already Hashed: ${totalSkipped}`);
    console.log(`📝 Total Users: ${totalMigrated + totalSkipped}`);
    
    if (totalMigrated > 0) {
      console.log('\n🎉 Migration completed successfully!');
      console.log('\n⚠️  IMPORTANT: Save the original passwords shown above!');
      console.log('   Users will need to use their original passwords to login.');
      console.log('   The system will now compare against hashed passwords.');
    } else {
      console.log('\n✅ All passwords are already hashed. No migration needed.');
    }

  } catch (error) {
    console.error('\n❌ Migration error:', error);
  } finally {
    mongoose.connection.close();
    console.log('\n🔌 Database connection closed\n');
  }
}
