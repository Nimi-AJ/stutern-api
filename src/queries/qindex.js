import client from '../database/dindex.js';

export const getUsers = async (req, res) => {
  try {
    const response = await client.query('SELECT * FROM users ORDER BY id ASC');

    if (response) {
      return res.status(200).json({ status: 'success', data: response.rows });
    }
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async (req, res) => {
  try{
    const response = await client.query('INSERT into <table name>');
  } catch(err){
    console.log(error);
  }
}

export const updateUser = async (req, res) => {
  try{
    const response =await client.query('');
  } catch(err) {
    console.log(err);
  }
}

export const deleteUser = async (req, res) => {
  try{
    const response = await client.query('');
  } catch(err) {
    console.log(err);
  }
}