const fs = require('fs');
const path = 'd:/investorportal+collaboration/investorportal/Backend/controller/deal.controller.js';
let content = fs.readFileSync(path, 'utf8');

const oldGetMyDeals = `export const getMyDeals = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status, spMode } = req.query;

    let query = {
      $or: [
        { startupId: new mongoose.Types.ObjectId(userId) }, 
        { professionalId: new mongoose.Types.ObjectId(userId) }
      ],
    };

    // If the frontend explicitly specifies the mode, we securely filter at the DB level
    if (req.user && req.user.role === 'startup') {
      // Startups are always buyers, ignore spMode (which defaults to 'provider' in frontend)
      query = { startupId: new mongoose.Types.ObjectId(userId) };
    } else if (spMode === "buyer") {
      query = { startupId: new mongoose.Types.ObjectId(userId) };
    } else if (spMode === "provider") {
      query = { professionalId: new mongoose.Types.ObjectId(userId) };
    }`;

const newGetMyDeals = `export const getMyDeals = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status, spMode } = req.query;
    
    console.log('GET MY DEALS CALLED. userId:', userId, 'role:', req.user?.role, 'spMode:', spMode);

    let query = {
      $or: [
        { startupId: new mongoose.Types.ObjectId(userId) }, 
        { professionalId: new mongoose.Types.ObjectId(userId) }
      ],
    };

    // If the frontend explicitly specifies the mode, we securely filter at the DB level
    if (req.user && req.user.role === 'startup') {
      // Startups are always buyers, ignore spMode (which defaults to 'provider' in frontend)
      query = { startupId: new mongoose.Types.ObjectId(userId) };
    } else if (spMode === "buyer") {
      query = { startupId: new mongoose.Types.ObjectId(userId) };
    } else if (spMode === "provider") {
      query = { professionalId: new mongoose.Types.ObjectId(userId) };
    }
    console.log('Final query:', JSON.stringify(query));`;

if (content.includes(oldGetMyDeals)) {
  content = content.replace(oldGetMyDeals, newGetMyDeals);
  fs.writeFileSync(path, content);
  console.log('Patched with console.logs');
}
