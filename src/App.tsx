import ProjectCard from "./components/ProjectCard";
import { projects } from "./data/projectData";
export function App() {
  return (
    <main className="flex flex-col md:flex-row min-h-screen">
      <section className=" mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            My Web Development Journey 🚀
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A collection of all the projects I've built throughout my web
            development journey
          </p>
        </div>
      </section>
      {/* All Projects */}
      <section className="mx-auto px-4 py-8 w-full">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          All Projects ({projects.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
``;
