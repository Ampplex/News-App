const { User } = require("../../models/user");

const handleCreateNewUser = async (req, res) => {
  const body = req.body;

  // Check if required fields are provided
  if (!body.first_name || !body.email || !body.password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const newUser = new User({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    const result = await newUser.save();

    return res
      .status(201)
      .json({ msg: "User created successfully", id: result._id });
  } catch (exception) {
    console.error(exception);
    return res.status(400).json({ msg: "Bad request" });
  }
};

const handleLoginUser = async (req, res) => {
  const body = req.body;

  console.log(body);

  if (!body.email || !body.password) {
    return res.status(400).json({ message: "Please all the fields" });
  } else {
    const { email, password } = body.email;

    try {
      const token = await User.matchPasswordAndGenerateToken(email, password);
      console.log(token);

      return res.status(200).json({ token, msg: "success" });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Invalid credentials" });
    }
  }
};

module.exports = { handleLoginUser, handleCreateNewUser };
