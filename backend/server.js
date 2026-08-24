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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});