const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const asyncHandler = require("express-async-handler")

const getTickets = asyncHandler(async(req,res)=>{
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error("User not Found")
  }

  const tickets = await Ticket.find({user : req.user.id})

  res.status(200).json(tickets);
})


const getTicket = asyncHandler(async(req, res) => {

  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401);
    throw new Error("User not Found");
  }
  const ticket = await Ticket.findById(req.params.id)
  if(!ticket){
    res.status(401);
    throw new Error("Ticket not Found");
  }
  if(ticket.user.toString() != req.user.id){
    res.status(401)
    throw new Error("No Authorized")
  }
  res.status(200).json(ticket);
  
});

const createTicket = asyncHandler(async(req, res) => {
  const {product , description} = req.body
  if(!product || ! description){
    res.status(401)
    throw new Error("Please fill all detail")
  }
  const user = await User.findById(req.user.id)
  if(!user){
    req.status(401)
    throw new Error("User not Found")
  }
  const ticket = await Ticket.create({
    user : req.user.id,
    product,
    description,
    status : 'new'
  })
  res.status(201).json(ticket)
});

const updateTicket = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error("User Not Found")
  }
  const ticket = await Ticket.findById(req.params.id);
  if(!ticket){
    res.status(401)
    throw new Error("Ticket not Found")
  }

  const updateTicket = await Ticket.findByIdAndUpdate(req.params.id , req.body , {
    new : true
  })
  res.status(200).json(updateTicket)
});

const deleteTicket = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error("User not Found")
  }

  const ticket = await Ticket.findById(req.params.id)
  if(!ticket){
    res.status(401)
    throw new Error("Ticket not Found")
  }
  if (ticket.user.toString() != req.user.id) {
    res.status(401);
    throw new Error("No Authorized");
  }

await Ticket.findByIdAndDelete(req.params.id)
  res.status(200).json({success : true});  
})

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
