import React, { useState, useMemo } from "react";
import ProjectCard from "./components/ProjectCard";
import ProfileSidebar from "./components/ProfileSidebar";
import Pagination from "./components/Pagination";
import { Rocket, Menu, X } from "lucide-react";
import { projects } from "./data/projectData";

export function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const itemsPerPage = 6;

  // Get unique categories and statuses
  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];
  const statuses = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.status))),
  ];

  // Filter projects based on selected filters
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const categoryMatch =
        selectedCategory === "All" || project.category === selectedCategory;
      const statusMatch =
        selectedStatus === "All" || project.status === selectedStatus;
      return categoryMatch && statusMatch;
    });
  }, [selectedCategory, selectedStatus]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedStatus]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of projects section
    document
      .getElementById("projects-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-orange-600 text-white rounded-lg shadow-lg hover:bg-orange-700 transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar - Profile */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
      `}
      >
        <ProfileSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 lg:ml-0 min-h-screen">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 mt-12 lg:mt-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <span>My Web Development Journey</span>
            <Rocket size={28} className="text-orange-600 sm:w-9 sm:h-9" />
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            A collection of all the projects I've built throughout my web
            development journey. From simple websites to complex full-stack
            applications.
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center px-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-xs sm:text-sm font-medium text-gray-700 min-w-fit">
              Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 sm:flex-initial px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-xs sm:text-sm font-medium text-gray-700 min-w-fit">
              Status:
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="flex-1 sm:flex-initial px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Projects Section */}
        <section id="projects-section" className="mb-6 sm:mb-8 px-2 sm:px-0">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
            {selectedCategory === "All" && selectedStatus === "All"
              ? `All Projects (${filteredProjects.length})`
              : `Filtered Projects (${filteredProjects.length})`}
          </h2>

          {currentProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
              {currentProjects.map((project) => (
                <ProjectCard project={project} key={project.id} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No projects found matching your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedStatus("All");
                }}
                className="btn-primary mt-4"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

        {/* Pagination */}
        {filteredProjects.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={filteredProjects.length}
          />
        )}
      </main>
    </div>
  );
}

export default App;
``;
