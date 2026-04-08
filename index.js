import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <style>
      body { 
        font-family: sans-serif; 
        background-color: #0f172a; 
        color: white; 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        justify-content: center; 
        height: 100vh; 
        margin: 0;
      }
      .container { 
        text-align: center; 
        padding: 2rem; 
        border: 1px solid rgba(255,255,255,0.1); 
        border-radius: 16px; 
        background: rgba(255,255,255,0.05);
        backdrop-filter: blur(10px);
      }
      h1 { color: #6366f1; }
      p { color: #94a3b8; }
      .badge {
        background: #10b981;
        color: white;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: bold;
      }
    </style>
    <div class="container">
      <span class="badge">ACTIVE</span>
      <h1>Live Notification Toolkit</h1>
      <p>Your toolkit is successfully hosted and ready for integration.</p>
      <small>Check the /toolkit folder in your repository for the code.</small>
    </div>
  `);
});

app.listen(PORT, () => {
  console.log(`Toolkit info server running on port ${PORT}`);
});
