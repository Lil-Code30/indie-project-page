import { projects } from "@/data/projectData";
import type { Project } from "@/data/types";

// Helper functions for filtering and sorting
export const getProjectsByCategory = (category: Project["category"]) =>
  projects.filter((project) => project.category === category);

export const getProjectsByTechnology = (tech: string) =>
  projects.filter((project) =>
    project.technologies.some((technology) =>
      technology.toLowerCase().includes(tech.toLowerCase())
    )
  );
export const getProjectsByDifficulty = (difficulty: Project["difficulty"]) =>
  projects.filter((project) => project.difficulty === difficulty);

// Styling helper functions
export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800";
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800";
    case "Advanced":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800";
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Paused":
      return "bg-orange-100 text-orange-800";
    case "Archived":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
