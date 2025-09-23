/*
Sample project data
{
    id: "weather-app",
    title: "Weather Dashboard",
    description:
      "A weather application that fetches real-time weather data from OpenWeatherMap API. Features current weather, 5-day forecast, and location search functionality.",
    shortDescription: "Weather app with API integration and forecasts",
    technologies: ["React", "TypeScript", "Tailwind CSS", "OpenWeatherMap API"],
    category: "Frontend",
    difficulty: "Intermediate",
    codeUrl: "https://github.com/yourusername/weather-dashboard",
    demoUrl: "https://your-weather-app.vercel.app",
    images: {
      thumbnail: "/images/projects/weather-app/thumbnail.png",
      screenshots: [
        "/images/projects/weather-app/screenshot1.png",
        "/images/projects/weather-app/screenshot2.png",
        "/images/projects/weather-app/screenshot3.png",
      ],
    },
    startDate: "2023-06-10",
    completionDate: "2023-07-02",
    status: "Completed",
    features: [
      "Current weather display",
      "5-day weather forecast",
      "Location search",
      "Geolocation support",
      "Weather icons and animations",
      "Unit conversion (Celsius/Fahrenheit)",
      "Responsive design",
    ],
    challenges: [
      "API integration and error handling",
      "Managing complex state",
      "Implementing geolocation",
      "Handling different weather conditions",
    ],
    learnings: [
      "REST API consumption",
      "TypeScript interfaces",
      "Error boundary implementation",
      "Advanced React hooks",
      "Tailwind CSS utilities",
    ],
    tags: ["api-integration", "typescript", "weather", "geolocation"],
    isFeatured: true,
  },

*/

import type { Project } from "@/data/types";
import { v4 as uuidv4 } from "uuid";

export const projects: Project[] = [];
