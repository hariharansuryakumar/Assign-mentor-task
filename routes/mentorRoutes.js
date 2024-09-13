const express = require("express");
const Mentor = require("../models/Mentor");
const Student = require("../models/Student");
const router = express.Router();

//Create a mentor

router.post("/create", async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(200).send(mentor);
  } catch (error) {
    res.status(403).send("Error in creating mentor");
  }
});

//Select one mentor and Add multiple Student

router.post("/addStudents", async (req, res) => {
  const { mentorId, studentsId } = req.body;
  const mentor = await Mentor.findById(mentorId);
  // give studentsId as array in postman
  mentor.students.push(...studentsId);
  await mentor.save();
  //to update a mentor in students documents
  studentsId.forEach(async(id) => {
    const student = await Student.findById(id)
    student.mentor = mentorId;
    await student.save();
    
  });
  res.send(mentor);
});

//Writing API to show all students for a particular mentor

router.get('/:id/allStudents',async(req,res) => {

  const mentor = await Mentor.findById(req.params.id).populate('students');
  res.send(mentor.students);

})


module.exports = router;