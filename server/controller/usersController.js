import User from "../model/userModel.js";
import mongoose from "mongoose"

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

// Improved deleteUser controller (replace or merge into your existing controller file)


export const deleteUser = async (req, res) => {
    const id = req.params.id;
    console.info(`DELETE /api/users/${id} - request received`);

    // Validate ObjectId early to avoid unnecessary DB calls
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.warn(`DELETE /api/users/${id} - invalid id`);
        return res.status(400).json({ message: "Invalid user id" });
    }

    try {
        const deleted = await User.findByIdAndDelete(id);

        if (!deleted) {
            console.warn(`DELETE /api/users/${id} - user not found`);
            return res.status(404).json({ message: "User not found" });
        }

        // Optionally, you can return the deleted document for client confirmation
        console.info(`DELETE /api/users/${id} - user deleted`, { id, email: deleted.email });
        return res.status(200).json({ message: "User deleted", data: deleted });
    } catch (error) {
        // Include contextual info but avoid leaking sensitive details to clients
        console.error(`DELETE /api/users/${id} - error:`, error);
        return res.status(500).json({ message: "Server error" });
    }
};


