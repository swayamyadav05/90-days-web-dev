const mongoose = require("mongoose");
require("dotenv").config();

// Import models
const Task = require("./models/Task");
const User = require("./models/User");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

async function createTestData() {
  try {
    console.log("🔗 Connected to MongoDB");

    // Find admin user
    const adminUser = await User.findOne({ role: "admin" });
    console.log("👨‍💼 Admin user found:", adminUser?.firstName);

    // Find employee user
    const employeeUser = await User.findOne({ role: "employee" });
    console.log("👨‍💻 Employee user found:", employeeUser?.firstName);

    if (!adminUser || !employeeUser) {
      console.log(
        "❌ Admin or Employee user not found. Please create users first."
      );
      process.exit(1);
    }

    // Check existing tasks
    const existingTasks = await Task.find().populate(
      "assignedTo assignedBy"
    );
    console.log(`📋 Existing tasks: ${existingTasks.length}`);
    existingTasks.forEach((task) => {
      console.log(
        `  - ${task.title} (${task.status}) assigned to ${task.assignedTo?.firstName}`
      );
    });

    // Create a test task if none exist
    if (existingTasks.length === 0) {
      console.log("🆕 Creating test task...");

      const testTask = new Task({
        title: "Welcome Task - Review Project Documentation",
        description:
          "Please review the project documentation and familiarize yourself with the codebase. This includes understanding the architecture, components, and API endpoints.",
        assignedTo: employeeUser._id,
        assignedBy: adminUser._id,
        priority: "medium",
        category: "Onboarding",
        status: "pending",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      });

      await testTask.save();
      await testTask.populate("assignedTo assignedBy");

      console.log(
        "✅ Test task created successfully:",
        testTask.title
      );
    }

    console.log("🏁 Test data setup complete");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating test data:", error);
    process.exit(1);
  }
}

createTestData();
