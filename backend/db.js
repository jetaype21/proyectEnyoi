const mongoose = require('mongoose')

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  try {
    mongoose.connect(process.env.DB, connectionParams)
    console.log(`Connection succesfull for database`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}