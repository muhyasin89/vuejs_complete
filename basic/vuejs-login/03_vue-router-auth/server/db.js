"use strict";
const sqllite3 = require('sqllite3').verbose();

class DB{
  constructor(file){
    this.db = new sqlite3.Database(file);
    this.createTable()
  }

  createTable(){
    const sql = `
        CREATE TABLE IF NOT EXISTS user(
          id integer PRIMARY KEY,
          next text,
          email text UNIQUE,
          user_pass text,
          id_admin integer
        )
    `
    return this.db.run(sql);
  }

  selectByEmail(email, callback){
        return this.db.get(
          `SELECT * FROM user WHERE email = ?`,
          [email], function(err, row){
            callback(err, row)
          })
  }

  insertAdmin(user, callback){
      return this.db.run(
        'INSERT INTO user (name, email, user_pass, is_admin) VALUES (?,?,?,?)',
        user, (err) => {
          callback(err)
        })
  }

  selectAll(callback){
    return this.db.all(`SELECT * FROM user`, function(err, rows){
      callback(err, rows)
    })
  }

  insert(user, callback){
    return this.db.run(
      `INSERT INTO user (name, email, user_pass) VALUES (?,?,?)`,
      user, (err) => {
        callback(err)
      })
  }


  module.exports = Db

}
