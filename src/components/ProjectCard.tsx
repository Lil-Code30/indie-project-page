import React from "react";
import { Card } from "./ui/card";
import { ExternalLink, Code, Sparkles } from "lucide-react";
import type { Project } from "@/data/types";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const {
    title,
    description,
    technologies,
    category,
    difficulty,
    status,
    thumbnail,
    demoUrl,
    codeUrl,
    features,
  } = project;

  return (
    <div className="book-card w-full max-w-sm p-4 sm:p-6 hover:scale-[1.02] transition-all duration-300">
      {/* Project Thumbnail */}
      <div className="mb-3 sm:mb-4 relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-32 sm:h-40 object-cover rounded-lg border border-gray-200"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/api/placeholder/300/160";
          }}
        />
        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 flex gap-2">
          <span className={`status-${status.toLowerCase().replace(" ", "-")}`}>
            {status}
          </span>
        </div>
      </div>

      {/* Project Title */}
      <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3.5rem]">
        {title}
      </h3>

      {/* Category and Difficulty */}
      <div className="flex justify-between items-center mb-3 gap-2">
        <span className="text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 bg-orange-100 text-orange-800 rounded-full truncate">
          {category}
        </span>
        <span
          className={`difficulty-${difficulty.toLowerCase()} text-xs sm:text-sm`}
        >
          {difficulty}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-3 min-h-[3rem] sm:min-h-[4rem]">
        {description}
      </p>

      {/* Technologies */}
      <div className="mb-3 sm:mb-4">
        <div className="flex flex-wrap gap-1">
          {technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-700 rounded-md"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 3 && (
            <span className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-700 rounded-md">
              +{technologies.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Features count */}
      <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-500 flex items-center gap-1">
        <Sparkles size={12} className="sm:w-[14px] sm:h-[14px]" />
        {features.length} features
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {demoUrl && (
          <button
            className="btn-primary flex-1 text-xs sm:text-sm flex items-center justify-center gap-1 py-2"
            onClick={() => window.open(demoUrl, "_blank")}
          >
            <ExternalLink size={12} className="sm:w-[14px] sm:h-[14px]" />
            <span className="hidden sm:inline">Demo</span>
          </button>
        )}
        <button
          className="btn-secondary flex-1 text-xs sm:text-sm flex items-center justify-center gap-1 py-2"
          onClick={() => window.open(codeUrl, "_blank")}
        >
          <Code size={12} className="sm:w-[14px] sm:h-[14px]" />
          <span className="hidden sm:inline">Code</span>
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
