const express = require("express");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const app = express();
const s3 = new S3Client({ region: "us-east-1" });

app.get("/", (req, res) => res.send("MercadoAndino v1 - instancia " + require("os").hostname()));
app.get("/health", (req, res) => res.status(200).send("ok"));

app.get("/api/upload-url", async (req, res) => {
  try {
    const key = `uploads/${Date.now()}-${req.query.name}`;
    const cmd = new PutObjectCommand({ Bucket: process.env.BUCKET, Key: key, ContentType: req.query.type });
    const url = await getSignedUrl(s3, cmd, { expiresIn: 300 });
    res.json({ url, key });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 80);
