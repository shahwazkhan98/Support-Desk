const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel");

const getNotes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("User not Found");
  }
  const ticket = await Ticket.findById(req.params.ticketId);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not Found");
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  const notes = await Note.find({ ticket: req.params.ticketId });
  if (!notes) {
    res.status(404);
    throw new Error("Please Add Notes");
  }
  res.status(200).json(notes);
});

// const addNote = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user.id);
//   if (!user) {
    // res.status(404);
    // throw new Error("User not Found");
//   }
//   const ticket = await Ticket.findById(req.params.ticketId);
//   if (!ticket) {
    // res.status(404);
    // throw new Error("Ticket not Found");
//   }
//   if (ticket.user.toString() !== req.user.id) {
    // res.status(401);
    // throw new Error("User not Authorized");
//   }
//   const note = await Note.create({
    // text : req.body.text,
    // isStaff : false,
    // ticket : req.params.ticketId,
    // user : req.user.id
//   })
//   res.status(201).json(note)
// });
const addNotes = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(404)
        throw new Error("User not Found")
    }
    const ticket = await Ticket.findById(req.params.ticketId);
    if(!ticket){
        res.status(404)
        throw new Error("Ticket not Found")
    }
    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("User not Authorized")
    }

    const note = await Note.create({
        text : req.body.text,
        isStaff : false,
        ticket : req.params.ticketId,
        user : req.user.id
    })
    res.status(201).json(note)
})
module.exports = {getNotes , addNotes};
