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

// 新增根据loginID查询Login记录
const findLoginRequestById = async (loginID) => {
  const [rows] = await db.query(`
    SELECT * FROM Login WHERE LoginID = ? AND Used = FALSE AND ExpiresAt > NOW()
  `, [loginID]);
  return rows[0] || null;
};

// 新增标记Login记录为已使用
const markLoginAsUsed = async (loginID, userID) => {
  await db.query(`
    UPDATE Login SET Used = TRUE, UserID = ? WHERE LoginID = ?
  `, [userID, loginID]);
};

module.exports = {
  createLoginRequest,
  findLoginRequestById,
  markLoginAsUsed,
};
