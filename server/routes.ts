import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { insertAnalysisRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Mock API endpoint for AI analysis
  app.post("/api/analyze", async (req, res) => {
    try {
      // Validate request body
      const { prompt } = insertAnalysisRequestSchema.parse(req.body);
      
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));
      
      // Generate mock response based on prompt
      const mockResponse = {
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
      
      res.json(mockResponse);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid request data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
