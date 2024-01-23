const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
const Routes = require("./routes/route.js");

const PORT = 5000;

dotenv.config();

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(express.json({ limit: "10mb" }));
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://sam111:sam54321@cluster0.t2gcm.mongodb.net/minor-project-2",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

app.use("/", Routes);

// app.get("/downloadExcel", async (req, res) => {
//   try {
//     // Retrieve student data from the database using Mongoose
//     const studentData = await Students.findOne({}); // Fetching specific fields

//     // Convert data to Excel format using xlsx
//     const worksheet = xlsx.utils.json_to_sheet(studentData);
//     const workbook = xlsx.utils.book_new();
//     xlsx.utils.book_append_sheet(workbook, worksheet, "Students");

//     // Write the Excel file to response and trigger download
//     const excelBuffer = xlsx.write(workbook, {
//       bookType: "xlsx",
//       type: "buffer",
//     });

//     // Set response headers
//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     );
//     res.setHeader(
//       "Content-Disposition",
//       "attachment; filename=students_data.xlsx"
//     );
//     // res.attachment("students_data.xlsx");
//     res.send(excelBuffer);
//   } catch (error) {
//     console.error("Error fetching student data:", error);
//     res.status(500).send("Error fetching student data");
//   }
// });

app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`);
});
