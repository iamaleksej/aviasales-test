
const db = require('../db')
// const newUserData = {}
class UserController {

   // constructor() {
   //    this.newUserData = newUserData
   // }

   async createUser(req, res) {
      const { shared, email } = req.body
      const newPerson = await db.query(`INSERT INTO person (shared, email) values ($1, $2) RETURNING *`,
         [shared, email])
      const newUserData = res.json(newPerson.rows[0])
      return newUserData
   }

   async updateUser(req, res) {
      const { id, shared, email } = req.body;
      const user = await db.query('UPDATE person set shared = $1, email = $2 where id = $3 RETURNING *',
         [shared, email, id])
      return res.json(user.rows[0])
   }

}

module.exports = new UserController()