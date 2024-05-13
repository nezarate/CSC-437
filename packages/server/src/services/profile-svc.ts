// src/services/profile-svc.ts
import { Schema, Model, Document, model } from "mongoose";
import { Profile } from "../models/profile";


const ProfileSchema = new Schema<Profile>(
  {
    name: { type: String, required: true, trim: true },
    artists: [String],
    album: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    duration_ms: { type: Number, required: true },
    popularity: { type: Number }
  },
  { collection: "user_profiles" }
);

const ProfileModel = model<Profile>("Profile", ProfileSchema);

// in-memory DB
// let profiles: Array<Profile> = [
//   {
//     id: "blaze",
//     name: "Blaze Pasquale",
//     nickname: undefined,
//     home: "Oakland, CA",
//     airports: ["SFO", "OAK", "SJC"],
//     color: "#8A81BE",
//     avatar: "/data/avatars/Blaze Pasquale.png"
//   }
//   // add a few more profile objects here
// ];

// export function get(id: String): Profile | undefined {
//   return profiles.find((t) => t.id === id);
// }

function index(): Promise<Profile[]> {
  return ProfileModel.find();
}

function get(name: String): Promise<Profile> {
  return ProfileModel.find({ name })
    .then((list) => list[0])
    .catch((err) => {
      throw `${name} Not Found`;
    });
}

function create(profile: Profile): Promise<Profile> {
  const p = new ProfileModel(profile);
  return p.save();
}

function update(
  name: String,
  profile: Profile
): Promise<Profile> {
  return ProfileModel.findOne({ name })
    .then((found) => {
      if (!found) throw `${name} Not Found`;
      else
        return ProfileModel.findByIdAndUpdate(
          found._id,
          profile,
          {
            new: true
          }
        );
    })
    .then((updated) => {
      if (!updated) throw `${name} not updated`;
      else return updated as Profile;
    });
}

function remove(name: String): Promise<void> {
  return ProfileModel.findOneAndDelete({ name }).then(
    (deleted) => {
      if (!deleted) throw `${name} not deleted`;
    }
  );
}

export default { index, get, create, update, remove };


