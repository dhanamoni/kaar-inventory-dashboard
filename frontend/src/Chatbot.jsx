import { useState } from "react";
import "./Chatbot.css";

function Chatbot({ inventory }) {
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hello! I'm your inventory assistant. Ask me about stock, reorder items, or inventory."
        }
    ]);

    const [input, setInput] = useState("");

    const generateReply = (question) => {
        const text = question.toLowerCase();

        if (
            text.includes("reorder") ||
            text.includes("low stock") ||
            text.includes("low inventory")
        ) {
            const reorderItems = inventory.filter(
                (item) => item.status === "REORDER"
            );

            if (reorderItems.length === 0) {
                return "Currently, no items need to be reordered.";
            }

            const names = reorderItems
                .map((item) => item.name)
                .join(", ");

            return `${reorderItems.length} item(s) need reordering: ${names}.`;
        }

        if (
            text.includes("total") ||
            text.includes("how many items") ||
            text.includes("inventory count")
        ) {
            return `There are ${inventory.length} items in the inventory.`;
        }

        if (text.includes("lowest stock")) {
            if (inventory.length === 0) {
                return "There is no inventory data available.";
            }

            const lowest = inventory.reduce((min, item) =>
                item.stock < min.stock ? item : min
            );

            return `${lowest.name} has the lowest stock with ${lowest.stock} units.`;
        }

        // Search for a particular item
        const item = inventory.find((item) =>
            text.includes(item.name.toLowerCase())
        );

        if (item) {
            return `${item.name} has ${item.stock} units in stock. The reorder level is ${item.reorderLevel}. Current status: ${item.status}.`;
        }

        if (text.includes("hello") || text.includes("hi")) {
            return "Hello! How can I help you with the inventory?";
        }

        return "I can help you with inventory, stock levels, reorder items, and item status.";
    };

    const sendMessage = () => {
        if (!input.trim()) {
            return;
        }

        const userMessage = {
            sender: "user",
            text: input
        };

        const botMessage = {
            sender: "bot",
            text: generateReply(input)
        };

        setMessages((previousMessages) => [
            ...previousMessages,
            userMessage,
            botMessage
        ]);

        setInput("");
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className="chatbot">

            <div className="chatbot-header">
                <h3>Inventory Assistant</h3>
            </div>

            <div className="chatbot-messages">

                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.sender}`}
                    >
                        {message.text}
                    </div>
                ))}

            </div>

            <div className="chatbot-input">

                <input
                    type="text"
                    placeholder="Ask about inventory..."
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <button onClick={sendMessage}>
                    Send
                </button>

            </div>

        </div>
    );
}

export default Chatbot;