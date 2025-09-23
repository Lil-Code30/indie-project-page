import React from "react";
import { Card } from "./ui/card";
import { getDifficultyColor, getStatusColor } from "@/lib/helper";
import type { Project } from "@/data/types";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return <Card className="w-96 bg-white text-black">{project.title}</Card>;
}

export default ProjectCard;

/*

<span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                  difficulty
                )}`}
              >
                {difficulty}
              </span>
              
              <Button
              variant="default"
              size="sm"
              className="flex-1"
              onClick={() => window.open(demoUrl, "_blank")}
            >
              🚀 Demo
            </Button>
            */
