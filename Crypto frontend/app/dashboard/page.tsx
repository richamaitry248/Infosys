"use client"

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { PriceCards } from '@/components/dashboard/price-cards'
import { PortfolioSummary } from '@/components/dashboard/portfolio-summary'
import { MarketTable } from '@/components/dashboard/market-table'
import { Download, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const [totalInvestment, setTotalInvestment] = useState(50000)

  // 🚀 BACKGROUND SYNC: Triggers Python Backend on Load
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/market-table")
      .then(res => res.json())
      .then(data => console.log("✅ Python Backend Triggered!"))
      .catch(err => console.error("❌ Python Backend Offline", err))
  }, [])

  // --- UPDATED FEATURE: DYNAMIC DOWNLOAD REPORT ---
  const handleDownloadReport = () => {
    // We calculate the live split based on your current totalInvestment state
    const btc = totalInvestment * 0.4;
    const eth = totalInvestment * 0.3;
    const sol = totalInvestment * 0.2;
    const ada = totalInvestment * 0.1;

    // We pass these live variables as "Query Parameters" to the Python API
    const url = `http://127.0.0.1:5000/api/download-report?btc=${btc}&eth=${eth}&sol=${sol}&ada=${ada}`;
    
    window.open(url, "_blank");
  };

  // --- NEW FEATURE: PREDICT PRICE ---
  const handlePrediction = async (coin: string) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/predict/${coin}`);
      const data = await res.json();
      alert(
        `🚀 Prediction for ${coin} Tomorrow:\n\n` +
        `Current: ₹${data.currentPrice.toLocaleString()}\n` +
        `Predicted: ₹${data.predictedPrice.toLocaleString()}\n` +
        `Trend: ${data.trend}\n` +
        `Confidence Level: ${data.confidence}`
      );
    } catch (err) {
      alert("Backend offline. Please start app.py first!");
    }
  };

  return (
    <DashboardLayout title="Dashboard">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">Portfolio Overview</h2>
          <p className="text-muted-foreground">Track your crypto investments in real-time</p>
        </div>
        
        {/* ACTION BUTTONS FOR CLIENT REQUIREMENTS */}
        <div className="flex gap-3">
          <button 
            onClick={() => handlePrediction("Bitcoin")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <TrendingUp size={16} /> Predict BTC
          </button>
          <button 
            onClick={handleDownloadReport}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Download size={16} /> Download CSV
          </button>
        </div>
      </div>
      
      {/* Crypto Price Cards */}
      <section>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Top Cryptocurrencies
        </h3>
        <PriceCards />
      </section>
      
      {/* Portfolio Summary */}
      <section>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Portfolio Summary
        </h3>
        <PortfolioSummary totalInvestment={totalInvestment} setTotalInvestment={setTotalInvestment} />
      </section>
      
      {/* Market Table */}
      <section>
        <MarketTable totalInvestment={totalInvestment} />
      </section>
    </DashboardLayout>
  )
}