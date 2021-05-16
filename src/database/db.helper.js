const connectDB = () => {
  database.connect((err) => {
    if (err) {
      return console.error("Could not connect to database ", err);
    }
    return console.log("Connected to database");
  });
};

const queryDB = (query) => {
  return database.query(query).then((result, err) => {
    console.log(`Excuted QUERY(${query}) on ${new Date().toISOString()}`);
    if (err) {
      throw err;
    }
    return result;
  });
};

function disconnectDB() {
  console.log("Disconnected to database");
  database.disconnect();
}

const DatabaseHelper = {
  queryDB,
  connectDB,
  disconnectDB,
};

module.exports = DatabaseHelper;
