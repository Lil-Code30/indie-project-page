import { useState, useEffect } from "react";
import { GitHubService } from "../services/githubService";
import type { GitHubStats, GitHubLanguage } from "../services/githubService";

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
const GITHUB_STATS_CACHE_KEY = "github_stats_cache";
const GITHUB_LANGUAGES_CACHE_KEY = "github_languages_cache";

interface CacheData<T> {
  data: T;
  timestamp: number;
}

export const useGitHubData = () => {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [languages, setLanguages] = useState<GitHubLanguage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCachedData = <T>(key: string): T | null => {
    try {
      const cached = localStorage.getItem(key);
      if (cached) {
        const { data, timestamp }: CacheData<T> = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          return data;
        }
      }
    } catch (error) {
      console.error("Error reading from cache:", error);
    }
    return null;
  };

  const setCachedData = <T>(key: string, data: T) => {
    try {
      const cacheData: CacheData<T> = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
      console.error("Error writing to cache:", error);
    }
  };

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check cache first
        const cachedStats = getCachedData<GitHubStats>(GITHUB_STATS_CACHE_KEY);
        const cachedLanguages = getCachedData<GitHubLanguage[]>(
          GITHUB_LANGUAGES_CACHE_KEY
        );

        if (cachedStats && cachedLanguages) {
          setGithubStats(cachedStats);
          setLanguages(cachedLanguages);
          setIsLoading(false);
          return;
        }

        // Fetch fresh data
        const [stats, langs] = await Promise.all([
          GitHubService.fetchGitHubStats(),
          GitHubService.fetchLanguagesData(),
        ]);

        setGithubStats(stats);
        setLanguages(langs);

        // Cache the results
        setCachedData(GITHUB_STATS_CACHE_KEY, stats);
        setCachedData(GITHUB_LANGUAGES_CACHE_KEY, langs);
      } catch (error) {
        console.error("Failed to fetch GitHub data:", error);
        setError("Failed to load GitHub data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const refreshData = async () => {
    // Clear cache and refetch
    localStorage.removeItem(GITHUB_STATS_CACHE_KEY);
    localStorage.removeItem(GITHUB_LANGUAGES_CACHE_KEY);

    setIsLoading(true);
    try {
      const [stats, langs] = await Promise.all([
        GitHubService.fetchGitHubStats(),
        GitHubService.fetchLanguagesData(),
      ]);

      setGithubStats(stats);
      setLanguages(langs);

      setCachedData(GITHUB_STATS_CACHE_KEY, stats);
      setCachedData(GITHUB_LANGUAGES_CACHE_KEY, langs);
    } catch (error) {
      console.error("Failed to refresh GitHub data:", error);
      setError("Failed to refresh GitHub data");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    githubStats,
    languages,
    isLoading,
    error,
    refreshData,
  };
};
