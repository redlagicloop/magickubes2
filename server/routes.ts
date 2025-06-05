import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { insertMessageSchema } from "@shared/schema";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a new conversation
  app.post("/api/conversations", async (req, res) => {
    try {
      const conversation = await storage.createConversation();
      res.json(conversation);
    } catch (error) {
      res.status(500).json({ message: "Failed to create conversation" });
    }
  });

  // Get messages for a conversation
  app.get("/api/conversations/:id/messages", async (req, res) => {
    try {
      const conversationId = parseInt(req.params.id);
      const messages = await storage.getMessages(conversationId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to get messages" });
    }
  });

  // Send a message and get AI response
  app.post("/api/conversations/:id/messages", async (req, res) => {
    try {
      const conversationId = parseInt(req.params.id);
      const { content } = req.body;

      if (!content || typeof content !== 'string') {
        return res.status(400).json({ message: "Content is required" });
      }

      // Save user message
      const userMessage = await storage.createMessage({
        conversationId,
        role: "user",
        content,
        analysisData: undefined,
      });

      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

      // Generate AI response with analysis data
      const analysisData = {
        insights: {
          keyMetrics: [
            { label: "Revenue Growth", value: "+24.5%", trend: "up", color: "blue" },
            { label: "Customer Satisfaction", value: "89.2%", trend: "up", color: "green" },
            { label: "New Customers", value: "156", trend: "up", color: "purple" }
          ],
          analysis: [
            "The top-performing product category shows a 34% increase in sales volume compared to the previous quarter, driven primarily by enhanced marketing campaigns and seasonal demand patterns.",
            "Regional analysis reveals that the West Coast region contributes 42% of total revenue, while showing the highest customer acquisition rate at 28% month-over-month growth.",
            "Customer retention metrics indicate a strong correlation between product quality ratings and repeat purchase behavior, with a 0.87 correlation coefficient."
          ]
        },
        sqlQuery: `-- AI Generated Query for Top Performing Products Analysis
SELECT 
    p.product_name,
    p.category,
    SUM(s.quantity * s.unit_price) as total_revenue,
    SUM(s.quantity) as units_sold,
    AVG(r.rating) as avg_rating,
    COUNT(DISTINCT s.customer_id) as unique_customers,
    ROUND(
        (SUM(s.quantity * s.unit_price) / 
         LAG(SUM(s.quantity * s.unit_price)) OVER (
             PARTITION BY p.category 
             ORDER BY EXTRACT(QUARTER FROM s.sale_date)
         ) - 1) * 100, 2
    ) as growth_rate
FROM products p
JOIN sales s ON p.product_id = s.product_id
LEFT JOIN reviews r ON p.product_id = r.product_id
WHERE s.sale_date >= DATE_TRUNC('quarter', CURRENT_DATE - INTERVAL '1 year')
  AND s.sale_date < DATE_TRUNC('quarter', CURRENT_DATE)
GROUP BY p.product_id, p.product_name, p.category,
         EXTRACT(QUARTER FROM s.sale_date)
HAVING SUM(s.quantity * s.unit_price) > 10000
ORDER BY total_revenue DESC, growth_rate DESC
LIMIT 20;`,
        chartData: {
          revenue: {
            labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024'],
            data: [2.4, 2.8, 3.2, 4.1, 3.8]
          },
          regional: {
            labels: ['West Coast', 'East Coast', 'Midwest', 'South'],
            data: [42, 28, 18, 12],
            colors: ['#3B82F6', '#6366F1', '#8B5CF6', '#A855F7']
          },
          categories: {
            labels: ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'],
            data: [450, 320, 280, 190, 150],
            colors: ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']
          }
        }
      };

      const assistantMessage = await storage.createMessage({
        conversationId,
        role: "assistant",
        content: "I've analyzed your request and generated comprehensive insights including key metrics, detailed analysis, SQL query, and visualizations. You can explore the results in the tabs above.",
        analysisData,
      });

      // Return both messages
      res.json({
        userMessage,
        assistantMessage,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
