const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./DB/Db");
const addtaskRoutes = require("./routes/AddTask_Routes");
const userRoutes=require("./routes/userRoutes");
dotenv.config();

const app = express();


app.use(cors());
app.use(express.json()); 


app.use("/api", addtaskRoutes);
app.use("/api/users", userRoutes);


connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
