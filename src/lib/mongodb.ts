import mongoose from "mongoose";
// 從環境變數中獲取 MONGODB_URI，並確保其為字符串類型
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  // 如果沒有設定 MONGODB_URI
  throw new Error(
    // 拋出錯誤，提示需要在 .env.local 中定義 MONGODB_URI 環境變數
    "Define the MONGODB_URI environment variable inside .env.local"
  );
}
// 定義一個變數來緩存 MongoDB 客戶端，初始值為 null
let cachedClient: mongoose.Mongoose | null = null;

// 導出一個異步函數，用於連接到數據庫
export async function connectToDatabase() {
  // 如果已經有緩存的客戶端
  if (cachedClient) {
    // 直接返回該客戶端
    return cachedClient;
  }

  // 使用 MONGODB_URI 連接到 MongoDB，並等待連接完成
  const client = await mongoose.connect(MONGODB_URI);
  // 將連接成功的客戶端緩存起來
  cachedClient = client;
  // 返回連接成功的客戶端
  return client;
}
