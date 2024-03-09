const db = require('./db');

const createLoginRequest = async () => {
  const timestamp = new Date().toISOString();
  const randomNumber = Math.floor(Math.random() * 1000000);
  
  const msg = `${timestamp}|${randomNumber}`;
  const expiresIn = 180; // seconds
  const expiresAt = new Date(new Date().getTime() + expiresIn * 1000);

  const [rows] = await db.query(`
    INSERT INTO Login (Message, ExpiresAt) 
    VALUES (?, ?)
  `, [msg, expiresAt]);

  return {
    loginID: rows.insertId,
    msg,
    expiresIn
  };
};

module.exports = {
  createLoginRequest,
};
