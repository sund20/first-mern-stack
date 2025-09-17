import User from "../model/userModel.js";

// Create a new user
export const create = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const { email } = newUser;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists." });
        }

        const savedData = await newUser.save();
        res.status(200).json({
            message: "User created successfully",
            data: savedData
        });

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const userData = await User.find();

        if (!userData || userData.length === 0) {
            return res.status(404).json({ message: "No user data found." });
        }

        res.status(200).json(userData);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Update user by ID
export const update = async (req, res) => {
    try {
        const { id } = req.params;

        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found." });
        }

        const updatedData = await User.findByIdAndUpdate(id, req.body, {
            new: true
        });

        res.status(200).json({
            message: "User updated successfully",
            data: updatedData
        });

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Delete user by ID
{/*
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const userExist = await User.findById(id);
        if (!userExist) {
        
            return res.status(404).json({ message: "User not found." });
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User was deleted successfully." });

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
*/}
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    console.log("try me");
    if (!user) return res.status(404).json({ message: "User not found" });
    console.log("2 log test")
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


