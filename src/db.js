const mongoose = require('mongoose');

module.exports = async () => {
    try {
        const uri = process.env.DATABASE_URI;
        await mongoose.connect(uri, { useNewUrlParser:true, useUnifiedTopology:true });
        console.log("Connected to DB");
      } catch(err) {
        console.log("Failed to connect DB!\n" + err);
        process.exit(0);
      }
}
