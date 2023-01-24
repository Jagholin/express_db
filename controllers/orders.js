import pool from "../db/postgres.js";

export async function getOrders (req, res) {
    try {
        const results = await pool.query('SELECT * FROM orders;');
        if (results.rowCount === 0) {
            res.status(404).send();
        } else {
            res.send(results.rows);
        }
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function getOrder (req, res) {
    try {
        const id = req.params.id;
        const result = await pool.query('SELECT * FROM orders WHERE id=$1', [id]);
        if (result.rowCount === 0) {
            res.status(404).send();
        } else {
            res.send(result.rows);
        }
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function postOrder (req, res) {
    try {
        const { price, date, userId } = req.body;
        const result = await pool.query('INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3) RETURNING *', [price, new Date(date), userId]);
        res.status(201).send(result.rows);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function putOrder (req, res) {
    try {
        const { price, date, userId } = req.body;
        const id = req.params.id;
        const result = await pool.query('UPDATE orders SET price=$1, date=$2, user_id=$3 WHERE id=$4 RETURNING *', [price, new Date(date), userId, id]);
        if (result.rowCount === 0) {
            res.sendStatus(404);
        } else {
            res.send(result.rows);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteOrder (req, res) {
    try {
        const id = req.params.id;
        const result = await pool.query('DELETE FROM orders WHERE id=$1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            res.sendStatus(204);
        } else {
            res.send(result.rows);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}