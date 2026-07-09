const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://monikasharma279826:Jn2W7Dd88ek7SBvj@akshay.wpt5p3n.mongodb.net/InvestorPortal?retryWrites=true&w=majority&appName=Akshay')
  .then(async () => {
    const deals = await mongoose.connection.db.collection('deals').find({ 'startupId': { $exists: true } }).toArray();
    console.log(deals.map(d => ({ id: d._id, status: d.status, startupId: d.startupId })));
    process.exit(0);
  });
