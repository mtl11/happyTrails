const Pool = require('pg').Pool

const pool = new Pool({
  user: 'lewey11',
  host: 'localhost',
  database: 'lewey11',
  password: 'Lewey Bears Down 11',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
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
  const addTask = (request, response) =>{
      const {userId, userEmail, task, mode} = request.body;
      console.log("task added");
      pool.query('INSERT INTO tasks (userid, email, task, mode) VALUES ($1, $2, $3, $4)', 
    [userId, userEmail, task, mode], (error, results) => {
      if (error) {
        throw error
      }
    })
  }

const getTasks = (request, response) => {
  pool.query('SELECT * FROM tasks', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getTasksById = (request, response) => {
  const userid = parseInt(request.params.userid);
  pool.query('SELECT * FROM tasks WHERE userid = $1', [userid], (error, results) => {
    if (error) {
      throw error
    }
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

const deleteTask = (request, response) =>{
  const {userId, taskId} = request.body;
  console.log("hello")
  console.log(taskId);
  console.log(userId);

  pool.query('Delete FROM tasks WHERE id = $1 AND userid = $2', [taskId, userId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    addTask,
    getTasks,
    getTasksById,
    deleteTask
}