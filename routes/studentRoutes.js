const express = require("express");
const Mentor = require("../models/Mentor");
const Student = require("../models/Student");
const router = express.Router();

//Create a student

router.post("/create", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(200).send(student);
  } catch (error) {
    res.status(403).send("Error in creating student");
  }
});

//A student who has a mentor should not be shown in List

router.get("/mentorNotAssigned", async (req, res) => {
  const students = await Student.find({});
  let mentorNotAssignedStudents = students.filter((student) => student.mentor == undefined);
  res.send(mentorNotAssignedStudents);
});

//Writing an API to Assign or Change Mentor for particular Student

router.post('/updateMentor',async(req,res) => {
  const {mentorId,studentId} =req.body;
  const student =await Student.findById(studentId);
  student.mentor = mentorId;
  await student.save();
  //To update a student In mentor's students array
  const mentor =await Mentor.findById(mentorId);
  mentor.students.push(studentId);
  await mentor.save();
  res.send(student);
})

//Writing an API to show the previously assigned mentor for a particular student.
router.get('/:id/mentor',async(req,res) => {
  const student = await Student.findById(req.params.id).populate('mentor');
  res.send(student.mentor);
})


module.exports = router;