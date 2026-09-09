import User from "../models/User.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ date: -1 });
    res.status(200).json({
        success: true,
        data: users,
    });
    } catch (error) {
        console.error("Error fetching users: ", error);
        res.status(404).json({
            success: false,
            message: "Users not found",
        });
    }
}

export const getUser = async (req, res) => {
    try {
        // req.params.id actually equals _id: req.params.id
        // .select() return only name and email in the response
        const user = await User.findById(req.params.id).select("name email");
        if(!user){
                return res.status(404).json({
                message: "User not found",
                success: false,
            })
        }

        res.status(200).json({
            success: true,
            data: user,
        });

    } catch (error) {
        console.error("Error fetching user: ", error);
        res.status(400).json({
            success: false,
            message: "Error fetching user"
        });
    }
}

//when there is register, why to post user

// export const createUser = async (req, res) => {
//     try {
//         const user = await User.create(req.body);
//         res.status(201).json({
//             success: true,
//             // message: "User Created Successfully",
//             data: user,
//         });
//     } catch (error) {
//         console.error("Error creating user: ", error);
//         res.status(400).json({
//             success: false,
//             message: "Error creating user",
//         });
//     }
// }

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json(user)
    } catch (error) {
        console.error("Error updating user: ", error)
        res.status(500).json({
            success: false,
            message: "Error updating user",
        });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }else{
                res.status(200).json({
                success: true,
                message: "User deleted successfully",
            });
        }
    } catch (error) {
        console.error("Error deleting user: ", error);
        res.status(400).json({
            success: false,
            message: "Error deleting user",
        });
    }
}