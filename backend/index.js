const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

app.use(cors());
app.use(express.json());

//
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// socket code
io.on("connection", (socket) => {
  console.log("a user connected: ", socket.id);

  socket.on("join-Room", (room) => {
    socket.join(roomId);
    
  });

  socket.on("code-change", ({roomId, code}) => {
    socket.to(roomId).emit("code-update", code);
  });
});

app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });

  await user.save();
  res.send("User registered");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email, });

    if (!user) { 
       return res.send("User not found");
    } 
     const ismatch = await
     bcrypt.compare(password, user.password);

     if (!ismatch) {
        return res.send("wrong password");
     }   
        

        
        const token = jwt.sign({ userId: user._id }, "secretkey123", { expiresIn: "1d",
         });
//
        res.json({ message: "Login successful", 
            token: token });
});


mongoose.connect("mongodb://127.0.0.1:27017/project")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});