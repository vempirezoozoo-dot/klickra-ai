import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Razorpay from "razorpay";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Razorpay API route
  app.post("/api/create-razorpay-order", async (req, res) => {
    try {
      const { amount, planName } = req.body;
      
      const key_id = process.env.RAZORPAY_KEY_ID;
      const key_secret = process.env.RAZORPAY_KEY_SECRET;
      
      if (!key_id || !key_secret) {
        return res.status(500).json({ error: "Razorpay credentials missing" });
      }

      const razorpay = new Razorpay({ key_id, key_secret });
      
      const options = {
        amount: Math.round(amount * 100), // convert to paise
        currency: "INR",
        receipt: `receipt_${Date.now()}_${Math.floor(Math.random() * 1000)}`
      };

      const order = await razorpay.orders.create(options);
      
      res.json({ 
        order_id: order.id, 
        amount: options.amount, 
        key_id,
        currency: options.currency
      });
    } catch (error) {
      console.error("Razorpay error:", error);
      res.status(500).json({ error: "Failed to create Razorpay order" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
