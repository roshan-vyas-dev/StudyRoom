

const getMyProfile = async (req, res) => {

    return res.status(200).json({
        user: req.user
    });

}

const updateMyProfile = async (req, res) => {

    try {
        const { bio, profilePic } = req.body;

        if (bio !== undefined) {
            req.user.bio = bio;
        }

        if (profilePic !== undefined) {
            req.user.profilePic = profilePic;
        }

        

        await req.user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            user: req.user
        });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }

}

module.exports = { getMyProfile,updateMyProfile };


