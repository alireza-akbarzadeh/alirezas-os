import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import db from "@/server/db";

export const terminalRouter = createTRPCRouter({
  projects: publicProcedure.query(async () => {
    // Example: fetch projects from DB (replace with your model)
    // return await db.project.findMany();
    return [
      { name: "Nike Ecommerce", description: "Modern e-commerce platform" },
      { name: "AI Resume Analyzer", description: "Smart resume analysis tool" },
      { name: "Food Delivery App", description: "Mobile-first delivery app" },
    ];
  }),
  contact: publicProcedure.query(async () => {
    // Example: fetch contact info from DB (replace with your model)
    return {
      email: "alireza@example.com",
      github: "github.com/alireza-akbarzadeh",
      linkedin: "linkedin.com/in/alireza-akbarzadeh",
    };
  }),
});
