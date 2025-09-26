import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_FEEDBACK_HOST,
  port: Number(process.env.DB_FEEDBACK_PORT),
  database: process.env.DB_FEEDBACK_NAME,
  user: process.env.DB_FEEDBACK_USER,
  password: process.env.DB_FEEDBACK_PASS,
  charset: process.env.DB_CHARSET,
  connectionLimit: 1,
});

export default pool;


const workshopPool = mysql.createPool({
  host: process.env.DB_WORKSHOP_REGISTRATION_HOST,
  port: Number(process.env.DB_WORKSHOP_REGISTRATION_PORT),
  database: process.env.DB_WORKSHOP_REGISTRATION_NAME,
  user: process.env.DB_WORKSHOP_REGISTRATION_USER,
  password: process.env.DB_WORKSHOP_REGISTRATION_PASS,
  charset: process.env.DB_CHARSET,
  connectionLimit: 1,
});

export { workshopPool };