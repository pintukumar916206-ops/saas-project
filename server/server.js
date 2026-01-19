import { app } from "./app.js";
import { v2 as cloudinary } from "cloudinary";

console.log("CLOUD NAME:", process.env.CLOUDINARY_CLIENT_NAME);
console.log("CLOUD KEY:", process.env.CLOUDINARY_CLIENT_API);
console.log("CLOUD SECRET:", process.env.CLOUDINARY_CLIENT_SECRET);


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
