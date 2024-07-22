import mongoose from "mongoose";

// 定義一個交易模式，包含描述、金額和日期三個字段，並且這些字段都是必填的
const TransactionSchema = new mongoose.Schema({
  description: { type: String, required: true }, // 描述：類型為字符串，必填
  amount: { type: Number, required: true }, // 金額：類型為數字，必填
  date: { type: Date, required: true }, // 日期：類型為日期，必填
});

// 嘗試從 mongoose 的模型中獲取 Transaction 模型，如果不存在則創建一個新的模型
const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);

export default Transaction;
