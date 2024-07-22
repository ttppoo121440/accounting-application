import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import Transaction from "../../models/Transaction";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case "GET":
      try {
        // 取得所有交易紀錄
        const transactions = await Transaction.find({});
        res.status(200).json(transactions);
      } catch (error) {
        res.status(500).json({ error: "無法取得交易紀錄" });
      }
      break;
    case "POST":
      try {
        // 建立新的交易紀錄
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json(transaction);
      } catch (error) {
        res.status(500).json({ error: "無法建立交易紀錄" });
      }
      break;
    case "PUT":
      try {
        // 更新指定的交易紀錄
        const { _id, ...rest } = req.body;
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          _id,
          rest,
          { new: true }
        );
        res.status(200).json(updatedTransaction);
      } catch (error) {
        res.status(500).json({ error: "無法更新交易紀錄" });
      }
      break;
    case "DELETE":
      try {
        // 刪除指定的交易紀錄
        const { _id } = req.body;
        await Transaction.findByIdAndDelete(_id);
        res.status(200).json({ message: "交易紀錄已刪除" });
      } catch (error) {
        res.status(500).json({ error: "無法刪除交易紀錄" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`不允許的方法：${method}`);
  }
}
