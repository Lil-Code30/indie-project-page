import React from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Globe,
  Sparkles,
  ArrowRight,
  X,
  Star,
  GitCommit,
  GitPullRequest,
  AlertCircle,
  Building,
  Loader2,
  RefreshCw,
  Instagram,
  Youtube,
  Twitch,
} from "lucide-react";
import { useGitHubData } from "../hooks/useGitHubData";

interface ProfileSidebarProps {
  onClose?: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ onClose }) => {
  const { githubStats, languages, isLoading, error, refreshData } =
    useGitHubData();

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/dereal.ismael/",
      icon: Instagram,
      description: "Follow my journey",
      color: "text-pink-600",
      hoverColor: "hover:bg-pink-50",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/loko-ismael/",
      icon: Linkedin,
      description: "Professional network",
      color: "text-blue-600",
      hoverColor: "hover:bg-blue-50",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@licode30",
      icon: Youtube,
      description: "Watch my content",
      color: "text-red-600",
      hoverColor: "hover:bg-red-50",
    },
    {
      name: "Twitter",
      url: "https://x.com/dereal_ismael",
      icon: Twitter,
      description: "Follow updates",
      color: "text-gray-800",
      hoverColor: "hover:bg-gray-50",
    },
    {
      name: "Twitch",
      url: "https://www.twitch.tv/dereal_ismael",
      icon: Twitch,
      description: "Watch live streams",
      color: "text-purple-600",
      hoverColor: "hover:bg-purple-50",
    },
    {
      name: "GitHub",
      url: "https://github.com/Lil-Code30",
      icon: Github,
      description: "View my code",
      color: "text-gray-800",
      hoverColor: "hover:bg-gray-50",
    },
  ];

  return (
    <div className="sidebar h-screen sticky top-0 p-4 sm:p-6 w-full sm:w-80 lg:w-80 overflow-y-auto">
      {/* Mobile Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
        >
          <X size={16} />
        </button>
      )}
      {/* Profile Section */}
      <div className="text-center mb-6 sm:mb-8 mt-8 lg:mt-0">
        {/* Profile Picture */}
        <div className="relative mb-4">
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-2xl sm:text-4xl font-bold text-white shadow-lg">
            IL
          </div>
          <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-2 sm:border-4 border-white flex items-center justify-center">
            <Sparkles size={12} className="text-white sm:w-4 sm:h-4" />
          </div>
        </div>

        {/* Name and Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Ismael Loko
        </h1>
        <p className="text-orange-600 font-semibold mb-2 text-sm sm:text-base">
          Full-Stack Developer
        </p>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed px-2">
          Passionate about building exceptional digital experiences with modern
          web technologies.
        </p>
      </div>

      {/* GitHub Stats Section */}
      <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-200">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2 text-gray-800">
            <Github
              size={16}
              className="sm:w-[18px] sm:h-[18px] text-orange-600"
            />
            GitHub Stats
            {isLoading && (
              <Loader2 size={14} className="animate-spin text-orange-600" />
            )}
          </h3>
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="p-1 rounded hover:bg-orange-100 transition-colors disabled:opacity-50"
            title="Refresh GitHub data"
          >
            <RefreshCw
              size={14}
              className={`text-orange-600 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={24} className="animate-spin text-orange-600" />
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <p className="text-red-600 text-xs mb-2">{error}</p>
            <button
              onClick={refreshData}
              className="text-orange-600 text-xs hover:underline"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <Star size={14} className="text-yellow-600" />
                <span className="text-gray-700">Total Stars Earned:</span>
              </div>
              <span className="font-bold text-orange-600">
                {githubStats?.totalStars || 0}
              </span>
            </div>
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <GitCommit size={14} className="text-green-600" />
                <span className="text-gray-700">Total Commits:</span>
              </div>
              <span className="font-bold text-orange-600">
                {githubStats?.totalCommits
                  ? githubStats.totalCommits >= 1000
                    ? `${(githubStats.totalCommits / 1000).toFixed(1)}k`
                    : githubStats.totalCommits.toString()
                  : "0"}
              </span>
            </div>
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <GitPullRequest size={14} className="text-purple-600" />
                <span className="text-gray-700">Total PRs:</span>
              </div>
              <span className="font-bold text-orange-600">
                {githubStats?.totalPRs || 0}
              </span>
            </div>
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle size={14} className="text-red-600" />
                <span className="text-gray-700">Total Issues:</span>
              </div>
              <span className="font-bold text-orange-600">
                {githubStats?.totalIssues || 0}
              </span>
            </div>
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <Building size={14} className="text-blue-600" />
                <span className="text-gray-700">Public Repositories:</span>
              </div>
              <span className="font-bold text-orange-600">
                {githubStats?.publicRepos || 0}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Most Used Languages Section */}
      <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-200">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">
          Most Used Languages
        </h3>
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 size={20} className="animate-spin text-orange-600" />
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <p className="text-red-600 text-xs">Failed to load languages</p>
          </div>
        ) : (
          <div className="space-y-2">
            {languages.map((language, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: language.color }}
                ></div>
                <span className="text-xs sm:text-sm text-gray-700 flex-1">
                  {language.name}
                </span>
                <span className="text-xs text-gray-600">
                  {language.percentage.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Social Links */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
          <Globe
            size={16}
            className="sm:w-[18px] sm:h-[18px] text-orange-600"
          />
          Socials
        </h3>
        <div className="space-y-2 sm:space-y-3">
          {socialLinks.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg ${link.hoverColor} transition-colors duration-200 group`}
              >
                <IconComponent
                  size={18}
                  className={`${link.color} sm:w-5 sm:h-5`}
                />
                <div className="flex-1">
                  <div className="font-medium text-sm sm:text-base text-gray-800 group-hover:text-gray-900">
                    {link.name}
                  </div>
                  <div className="text-xs text-gray-500 hidden sm:block">
                    {link.description}
                  </div>
                </div>
                <ArrowRight
                  size={14}
                  className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity sm:w-4 sm:h-4"
                />
              </a>
            );
          })}
        </div>
      </div>

      {/* Quote */}
      <div className="text-center p-3 sm:p-4 bg-gradient-to-r from-orange-100 to-orange-50 rounded-lg border border-orange-200">
        <p className="text-xs sm:text-sm italic text-gray-700 mb-2 leading-relaxed">
          "Code is like humor. When you have to explain it, it's bad."
        </p>
        <p className="text-xs text-gray-500">- Cory House</p>
      </div>
    </div>
  );
};

export default ProfileSidebar;
