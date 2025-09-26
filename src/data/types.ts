export interface Project {
  // Basic Info
  id: string;
  title: string;
  description: string;

  // Technical Details
  technologies: string[];
  category:
    | "Frontend"
    | "Full-Stack"
    | "Backend"
    | "Mobile"
    | "CLI"
    | "Game"
    | "API"
    | "Learning"
    | "Package"
    | "Experimental";
  difficulty: "Beginner" | "Intermediate" | "Advanced";

  // Links
  demoUrl?: string;
  codeUrl: string;

  // Media
  thumbnail: string;

  status: "Completed" | "In Progress" | "Paused" | "Archived";
  features: string[];
}
