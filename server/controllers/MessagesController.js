import Message from "../models/MessageModel.js";

export const getMessages = async (req, res) => {
    try {
     const user1 = req.userId;
     const user2 = req.body.id;

      if (!user1 ||!user2) {
        return res.status(400).send("Both UserId are required");
      }
     
     const messages = await Message.find({
        $or:[
            {sender:user1, recipient:user2},
            {sender:user2, recipient:user1}
        ]
     }).sort({timeStamp:1});
     
      return res.status(200).json({
        messages // Ensure this matches what you're using in the frontend
      });
    } catch (err) {
      console.log('Error during search:', err);
      return res.status(500).send("Internal Server Error");
    }
  };
  


  
  export const getContactsForDMList = async (req, res) => {
      try {
          let { userId } = req;
  
          if (!userId) {
              return res.status(400).json({ error: "UserId is required" });
          }
  
          try {
              userId = new mongoose.Types.ObjectId(userId);
          } catch (err) {
              return res.status(400).json({ error: "Invalid UserId" });
          }
  
          const contacts = await Message.aggregate([
              { 
                  $match: {
                      $or: [{ sender: userId }, { recipient: userId }]
                  }
              },
              { $sort: { timeStamp: -1 } },
              { 
                  $group: {
                      _id: {
                          $cond: {
                              if: { $eq: ["$sender", userId] },
                              then: "$recipient",
                              else: "$sender"
                          }   
                      },
                      lastMessageTime: { $first: "$timeStamp" }
                  }
              },
              {
                  $lookup: {
                      from: "users",
                      localField: "_id",
                      foreignField: "_id",
                      as: "contactInfo"
                  }
              },
              { $unwind: "$contactInfo" },
              {
                  $project: {
                      _id: 1,
                      lastMessageTime: 1,
                      email: "$contactInfo.email",
                      firstName: "$contactInfo.firstName",
                      lastName: "$contactInfo.lastName",
                      color: "$contactInfo.color"
                  }
              },
              { $sort: { lastMessageTime: -1 } }
          ]);
  
          return res.status(200).json({ contacts });
      } catch (err) {
          console.log('Error during search:', err);
          return res.status(500).send("Internal Server Error");
      }
  };
  