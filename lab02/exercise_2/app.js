const mysql = require('mysql2/promise');
require('dotenv').config({
    path: '../.env'
});
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATA_BASE
});

async function getUsers(req, res) {
    try {
        const connection = await pool.getConnection();

        const[rows, fields] = await connection.query('select * from lab2_users');
        res.status(200)
            .send(rows);
    } catch (err) {
        res.status(500)
            .send(`Error getting users: ${err}`);
    }
}

app.get('/users', getUsers);

async function postUser(req, res) {
    try {
        const connection = await pool.getConnection();
        const sql = 'insert into lab2_users(username) values(?)';
        const values = [req.body.username];
        await connection.query(sql, [values]);
        res.status(201)
            .send(`User added`);
    } catch (err) {
        res.status(500)
            .send(`Error posting user: ${err}`);
    }
}
app.post('/users', postUser);

// ------------ Conversations -------------
async function getConversations(req, res) {
    try {
        const connection = await pool.getConnection();
        const[rows, fields] = await connection.query('select * from lab2_conversations');
        res.status(200)
            .send(rows);
    } catch (err) {
        res.status(500)
            .send(`Error getting users: ${err}`);
    }
}
app.get('/conversations', getConversations);

async function getConversationById(req, res) {
    try {
        const connection = await pool.getConnection();
        const[rows, fields] = await connection.query('select * from lab2_conversations where convo_id = ?', [req.params.id]);
        res.status(200)
            .send(rows);
    } catch (err) {
        res.status(500)
            .send(`Error getting users: ${err}`);
    }
}
app.get('/conversations/:id', getConversationById);

async function postConversation(req, res) {
    try {
        const connection = await pool.getConnection();
        const sql = 'insert into lab2_conversations(convo_name, created_on) values(?, NOW())';
        const values = [req.body.convo_name];
        await connection.query(sql, [values]);
        res.status(201)
            .send(`Convo added`);
    } catch (err) {
        res.status(500)
            .send(`Error posting user: ${err}`);
    }
}
app.post('/conversations', postConversation);

async function editConversation(req, res) {
    try {
        const connection = await pool.getConnection();
        const sql = 'update lab2_conversations set convo_name = ? and created_on = NOW() where convo_id = ?';
        const values = [
            req.body.convo_name,
            req.params.id
        ];
        await connection.query(sql, [values]);
        res.status(201)
            .send(`Convo edited`);
    } catch (err) {
        res.status(500)
            .send(`Error posting user: ${err}`);
    }
}
app.put('/conversations/:id', editConversation);

async function deleteConversation(req, res) {
    try {
        const connection = await pool.getConnection();
        const sql = 'delete from lab2_conversations where convo_id = ?';
        const values = [req.params.id];
        await connection.query(sql, [values]);
        res.status(201)
            .send(`Convo edited`);
    } catch (err) {
        res.status(500)
            .send(`Error deleting conversation`);
    }
}
app.delete('/conversations/:id', deleteConversation);

// ----------------- Conversation messages ------------------
async function getMessages(req, res) {
    try {
        const connection = await pool.getConnection();

        const[rows, fields] = await connection.query('select * from lab2_messages where convo_id = ?', [req.params.id]);
        res.status(200)
            .send(rows);
    } catch (err) {
        res.status(500)
            .send(`Error getting messages: ${err}`);
    }
}
app.get('/conversations/:id/messages', getMessages);

async function getSingleMessage(req, res) {
    try {
        const connection = await pool.getConnection();

        const[rows, fields] = await connection.query('select * from lab2_messages where convo_id = ? and message_id = ?', [req.params.cid, req.params.mid]);
        res.status(200)
            .send(rows);
    } catch (err) {
        res.status(500)
            .send(`Error getting messages: ${err}`);
    }
}
app.get('/conversations/:cid/messages/:mid', getSingleMessage);

async function postMessage(req, res) {
    try {
        const connection = await pool.getConnection();
        const sql = 'insert into lab2_messages(convo_id, user_id, sent_time, message) values(?, ?, NOW(), ?)';
        const values = [
            req.params.id,
            req.body.user_id,
            req.body.message
        ];
        await connection.query(sql, [values]);
        res.status(201)
            .send(`Message added`);
    } catch (err) {
        res.status(500)
            .send(`Error posting user: ${err}`);
    }
}
app.post('/conversations/:id/messages', postMessage);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Listening');
});
