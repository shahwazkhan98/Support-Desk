const express = require("express");


const router = express.Router();
const {protect} = require("../middleware/authMiddleware")
const noteRouter = require('./notesRoutes')

const {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
} = require("../controller/ticketController");


router.route("/").get(protect, getTickets).post(protect, createTicket)
router
  .route('/:id')
  
  .get(protect, getTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket);


  router.use('/:ticketId/notes', noteRouter)
module.exports = router;
