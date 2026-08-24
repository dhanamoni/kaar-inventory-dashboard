import { useEffect, useState } from "react";
import "./Dashboard.css";
import Chatbot from "./chatbot.jsx";
function Dashboard() {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/inventory")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch inventory");
                }

                return response.json();
            })
            .then((data) => {
                setInventory(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError("Unable to load inventory");
                setLoading(false);
            });
    }, []);

    const totalItems = inventory.length;

    const reorderItems = inventory.filter(
        (item) => item.status === "REORDER"
    ).length;

    const normalItems = inventory.filter(
        (item) => item.status === "NORMAL"
    ).length;

    if (loading) {
        return <h2>Loading inventory...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div className="dashboard">

            <h1 className="dashboard-title">
                Kaar Inventory Dashboard
            </h1>

            {/* KPI CARDS */}

            <div className="kpi-container">

                <div className="kpi-card">
                    <h3>Total Items</h3>
                    <h2>{totalItems}</h2>
                </div>

                <div className="kpi-card">
                    <h3>Reorder Items</h3>
                    <h2>{reorderItems}</h2>
                </div>

                <div className="kpi-card">
                    <h3>Normal Items</h3>
                    <h2>{normalItems}</h2>
                </div>

            </div>

            {/* INVENTORY TABLE */}

            <div className="inventory-section">

                <h2>Inventory</h2>

                <table className="inventory-table">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Item Name</th>
                            <th>Stock</th>
                            <th>Reorder Level</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {inventory.map((item) => (

                            <tr key={item.id}>

                                <td>{item.id}</td>

                                <td>{item.name}</td>

                                <td>{item.stock}</td>

                                <td>{item.reorderLevel}</td>

                                <td>
                                    <span
                                        className={
                                            item.status === "REORDER"
                                                ? "status status-reorder"
                                                : "status status-normal"
                                        }
                                    >
                                        {item.status}
                                    </span>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
            <Chatbot inventory={inventory} />
        </div>
    );
}

export default Dashboard;