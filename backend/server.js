const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const inventory = require("./data/inventory.json");

app.get("/", (req, res) => {
    res.send("Kaar Project Backend is running successfully!");
});

app.get("/api/inventory", (req, res) => {
    const result = inventory.map(item => ({
        ...item,
        status: item.stock < item.reorderLevel ? "REORDER" : "NORMAL"
    }));

    res.json(result);
});

module.exports = app;