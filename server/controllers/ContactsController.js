import User from "../models/UserModel.js";

export const SearchContacts = async (req, res) => {
  try {
    const { searchTerm } = req.body;
    if (searchTerm === undefined || searchTerm === null) {
      return res.status(400).send("Searched Term is required.");
    }
    const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|{\}\\]/g, "\\$&");
    const regex = new RegExp(sanitizedSearchTerm, "i");
    const contacts = await User.find({
      $and: [
        { _id: { $ne: req.userId } },
        {
          $or: [{ firstName: regex }, { lastName: regex }, { email: regex }]
        }
      ]
    });
    return res.status(200).json({
      contacts // Ensure this matches what you're using in the frontend
    });
  } catch (err) {
    console.log('Error during search:', err);
    return res.status(500).send("Internal Server Error");
  }
};
