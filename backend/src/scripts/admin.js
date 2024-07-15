// const User = require("../models/user");
// const bcrypt = require("bcrypt");

// async function createAdminAccount() {
//     try {
//         const existingAdmin = await User.findOne({ email: "admin@test.com" });
//         if (!existingAdmin) {
//             const newAdmin = new User({
//                 email: "admin@test.com",
//                 name: "Admin",
//                 password: await bcrypt.hash("admin", 10),
//                 role: "admin"
//             })
//             await newAdmin.save();
//             console.log("Admin account created successfully");
//         } else {
//             console.log("Admin already exist");
//         }
//     } catch (error) {
//         console.error(error.message);
//     }
// }

// module.exports = createAdminAccount;
const User = require("../models/user"); // Correctly capitalize the model name for consistency
const bcrypt = require("bcrypt");

async function createAdminAccount() {
    try {
        const existingAdmin = await User.findOne({ email: "admin@test.com" });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash("admin", 10);
            const newAdmin = new User({
                email: "admin@test.com",
                name: "Admin",
                password: hashedPassword,
                role: "admin"
            });
            await newAdmin.save();
            console.log("Admin account created successfully");
        } else {
            console.log("Admin already exists");
        }
    } catch (error) {
        console.error("Error creating admin account:", error.message);
    }
}

module.exports = createAdminAccount;