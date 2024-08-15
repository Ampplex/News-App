const { User } = require("../../models/user");

// Handle creating a new user
const handleCreateNewUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if required fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Check if email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "Email already exists" }); // 409 Conflict
    }

    // Create new user
    const newUser = new User({ name, email, password });

    const result = await newUser.save();

    return res
      .status(201)
      .json({ msg: "User created successfully", id: result._id });
  } catch (exception) {
    console.error("Error creating user:", exception);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Handle user login
const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide all the fields" });
  }

  try {
    // Authenticate user and generate token
    const token = await User.matchPasswordAndGenerateToken(email, password);
    console.log("Login successful, token generated:", token);

    return res.status(200).json({ token, msg: "Login successful" });
  } catch (error) {
    console.log("Login failed:", error.message);
    return res.status(401).json({ message: "Invalid credentials" });
  }
};

module.exports = { handleLoginUser, handleCreateNewUser };
