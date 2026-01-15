import mongoose from "mongoose";



const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  
  name: { type: String, default: "" },
  bio: { type: String },         
  state: { type: String },
  city: { type: String },
  
  about: { type: String },  
  topSkills: [String],     

  profilePhoto: { type: String },
  coverImage: { type: String },

  services: [String],

  experience: [
    {
      title: String,
      company: String,
      duration: String,
      location: String,
      description: [String],
    }
  ],

  portfolio: [
  {
    title: String,
    fileUrl: String,
    thumbnailUrl: String,
  }
],

  socialMedia: {
    linkedin: String,
    instagram: String,
  }
});

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;