import { validationResult } from "express-validator";
import pool from "../db/postgres.js";

export async function getUsers (req, res) {
    try {
        const results = await pool.query('SELECT * FROM users;');
        if (results.rowCount === 0) {
            res.status(404).send();
        } else {
            res.send(results.rows);
        }
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function getUser (req, res) {
    try {
        const id = req.params.id;
        const result = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
        if (result.rowCount === 0) {
            res.status(404).send();
        } else {
            res.send(result.rows);
        }
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function postUser (req, res) {
    try {
        const errors = validationResult(req);
        if (! errors.isEmpty()) {
            res.status(400).send(errors.array());
            return;
        }
        const { firstName, lastName, age } = req.body;
        const result = await pool.query('INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *', [firstName, lastName, age]);
        res.status(201).send(result.rows);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function putUser (req, res) {
    try {
        const errors = validationResult(req);
        if (! errors.isEmpty()) {
            res.status(400).send(errors.array());
            return;
        }
        const { firstName, lastName, age } = req.body;
        const id = req.params.id;
        const result = await pool.query('UPDATE users SET first_name=$1, last_name=$2, age=$3 WHERE id=$4 RETURNING *', [firstName, lastName, age, id]);
        if (result.rowCount === 0) {
            res.sendStatus(404);
        } else {
            res.send(result.rows);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteUser (req, res) {
    try {
        const id = req.params.id;
        const result = await pool.query('DELETE FROM users WHERE id=$1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            res.sendStatus(204);
        } else {
            res.send(result.rows);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}
