const { Client } = require('pg');
const settings = require("./settings");

// Creating the config to connect to postgres
const client = new Client({
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  });

// Connecting to the people db
// Using promises
client
  .connect()
  .then()
  .catch(err => console.log(err))
  .finally(() => console.log('People Database Connected'));


// Get the arguments from the command line
const getArguments = () => {
  const [node, path, name] = process.argv;

  return name;
};

const displayPerson = personObj => {
  console.log(
    ` - ${personObj.id}: ${personObj.first_name} ${personObj.last_name}, born ${personObj.birthdate.toLocaleString()} `
  );
};

const renderPeople = peopleArr => {
  console.log(`Listing ${peopleArr.length} persons`);
  console.log('-'.repeat(20));

  for (const person of peopleArr) {
    displayPerson(person);
  }
};

const listPeople = (name) => {
  // Creating the SELECT Query
  //Get name parameter
  const query = {
    text: "SELECT * FROM famous_people WHERE (first_name = 'Paul') OR (last_name = 'Paul')",
    
  };
//   console.log()

  // Running that query
  client
    .query(query)
    // Getting the result
    .then(res => {
        // console.log(res.rows);
        renderPeople(res.rows);
    })
    // Catching errors
    .catch(err => console.log(err))

    // Closing the connection
    .finally(() => {
      console.log('Query completed.');
      client.end();
    });
};

// Extracting the arguments
const name = getArguments();
listPeople(name);


