export interface Project {
  // Basic Info
  id: string;
  title: string;
  description: string;
  shortDescription?: string;

  // Technical Details
  technologies: string[];
  category:
    | "Frontend"
    | "Full-Stack"
    | "Backend"
    | "Mobile"
    | "CLI"
    | "Learning"
    | "Experimental";
  difficulty: "Beginner" | "Intermediate" | "Advanced";

  // Links
  demoUrl?: string;
  codeUrl: string;

  // Media
  images: {
    thumbnail: string;
    screenshots?: string[];
  };

  status: "Completed" | "In Progress" | "Paused" | "Archived";
  features: string[];
}
