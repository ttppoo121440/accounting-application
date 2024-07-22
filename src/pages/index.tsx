import { useEffect, useState } from "react";
import "@/app/globals.css";
import axios from "axios";

interface Transaction {
  _id: string;
  description: string;
  amount: number;
  date: string;
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await axios.get("/api/transactions");
      setTransactions(response.data);
    };
    fetchTransactions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/api/transactions", { description, amount, date });
    setDescription("");
    setAmount("");
    setDate("");
    const response = await axios.get("/api/transactions");
    setTransactions(response.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Transaction Tracker</h1>
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-8"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Amount</label>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Transaction
        </button>
      </form>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Transactions</h2>
        <ul className="divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <li key={transaction._id} className="py-4">
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">
                  {transaction.description}
                </span>
                <span className="font-medium text-gray-900">
                  ${transaction.amount}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
