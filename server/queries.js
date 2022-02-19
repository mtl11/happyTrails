const Pool = require('pg').Pool
const pool = new Pool({
  user: 'lewey11',
  host: 'localhost',
  database: 'lewey11',
  password: 'Lewey Bears Down 11',
  port: 5432,
})

const getUsers = (request, response) => {
  console.log("hello")
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
     //json(results.rows)
    })
  }

  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const createUser = (request, response) => {
    const { username, firstName, age, email, password } = request.body
    console.log("New User Added");
    pool.query('INSERT INTO users (username, firstName, age, email, password) VALUES ($1, $2, $3, $4, $5)', 
    [username, firstName, age, email, password], (error, results) => {
      if (error) {
        throw error
      }
      //response.status(201).send(`User added with ID: ${result.insertId}`)
    })
  }
module.exports = {
    getUsers,
    getUserById,
    createUser
}