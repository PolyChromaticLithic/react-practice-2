const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// React のビルド済みファイルを提供
app.use(express.static(path.join(__dirname, "build")));

// React アプリのエントリーポイント (index.html) を返す
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
