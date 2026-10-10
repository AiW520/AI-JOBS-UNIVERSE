import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { List, Search, Orbit, X, SearchX } from "lucide-react";
import { JobCard } from "@/components/ui/JobCard";
import jobsData from "@/data/jobs.json";
import type { Job, JobCategory } from "@/types";

const CareerUniverseExplorer = lazy(() =>
  import("@/components/three/CareerUniverseExplorer").then((module) => ({
    default: module.CareerUniverseExplorer,
  })),
);
const categories: { key: JobCategory | "all"; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "ai", label: "AI" },
  { key: "web3", label: "Web3" },
  { key: "frontend", label: "前端" },
  { key: "backend", label: "后端" },
];

function readExplorerState() {
  const defaults = { filter: 'all' as JobCategory | 'all', selectedId: jobsData[0].id, query: '', sort: 'heat' };
  try {
    const saved = JSON.parse(sessionStorage.getItem('career-explorer') || 'null');
    if (!saved) return defaults;
    return {
      filter: categories.some(item => item.key === saved.filter) ? saved.filter as JobCategory | 'all' : defaults.filter,
      selectedId: jobsData.some(item => item.id === saved.selectedId) ? saved.selectedId as string : defaults.selectedId,
      query: typeof saved.query === 'string' ? saved.query.slice(0, 128) : '',
      sort: ['heat','demand','salary'].includes(saved.sort) ? saved.sort as string : 'heat',
    };
  } catch { return defaults; }
}

export function JobsUniverseSection() {
  const [saved] = useState(readExplorerState);
  const [filter, setFilter] = useState<JobCategory | "all">(saved.filter);
  const [selectedJobId, setSelectedJobId] = useState(saved.selectedId);
  const [query, setQuery] = useState(saved.query);
  const [sort, setSort] = useState(saved.sort);
  useEffect(() => {
    try { sessionStorage.setItem('career-explorer', JSON.stringify({ filter, selectedId: selectedJobId, query, sort })); } catch { /* Storage can be disabled. */ }
  }, [filter, selectedJobId, query, sort]);
  const [view, setView] = useState<"universe" | "list">(() => {
    try {
      return localStorage.getItem("career-view") === "list"
        ? "list"
        : "universe";
    } catch {
      return "universe";
    }
  });
  const changeView = (value: "universe" | "list") => {
    setView(value);
    try {
      localStorage.setItem("career-view", value);
    } catch {
      /* Storage may be unavailable. */
    }
  };
  const filteredJobs = useMemo(
    () =>
      (jobsData as Job[])
        .filter(
          (job) =>
            (filter === "all" || job.category === filter) &&
            `${job.title} ${job.skills.join(" ")} ${job.tools.join(" ")}`
              .toLowerCase()
              .includes(query.toLowerCase().trim()),
        )
        .sort((a, b) =>
          sort === "salary"
            ? b.salaryMax - a.salaryMax
            : sort === "demand"
              ? b.demand - a.demand
              : b.heat - a.heat,
        ),
    [filter, query, sort],
  );
  const selected =
    filteredJobs.find((job) => job.id === selectedJobId) || filteredJobs[0];
  const select = useCallback((job: Job) => setSelectedJobId(job.id), []);
  return (
    <section id="careers" className="career-section">
      <div className="career-heading">
        <div>
          <span className="career-eyebrow">职业探索 / 20 条 AI 岗位路径</span>
          <h1>AI 岗位 <span>宇宙</span></h1>
        </div>
        <p>
          探索正在改变技术行业的岗位。
          <br />
          <span>AI · Web3 · 前端 · 后端</span>
        </p>
      </div>
      <div className="career-filterbar">
        <div
          className="career-categories"
          role="group"
          aria-label="Career category"
        >
          {categories.map((category) => (
            <button
              key={category.key}
              aria-pressed={filter === category.key}
              className={filter === category.key ? "active" : ""}
              onClick={() => setFilter(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>
        <div className="career-view" role="group" aria-label="Career view">
          <button
            aria-label="Universe view"
            title="Universe view"
            aria-pressed={view === "universe"}
            onClick={() => changeView("universe")}
          >
            <Orbit size={17} />
            <span>3D</span>
          </button>
          <button
            aria-label="List view"
            title="List view"
            aria-pressed={view === "list"}
            onClick={() => changeView("list")}
          >
            <List size={17} />
            <span>目录</span>
          </button>
        </div>
      </div>
      <div className="career-searchbar">
        <label>
          <Search size={16} />
          <input
            aria-label="Search careers or skills"
            placeholder="搜索岗位、技能或工具…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            maxLength={128}
          />
          {query && <button title="清除搜索" aria-label="Clear search" onClick={() => setQuery('')}><X size={16} /></button>}
        </label>
        <label className="career-sort">
          排序
          <select
            aria-label="Sort careers"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="heat">热度</option>
            <option value="demand">需求</option>
            <option value="salary">薪资</option>
          </select>
        </label>
      </div>
      {view === "universe" && selected && (
        <Suspense
          fallback={
            <div className="career-universe-loading" role="status">
              <Orbit size={30} /><span>正在载入职业空间站…</span>
            </div>
          }
        >
          <CareerUniverseExplorer
            jobs={filteredJobs}
            selectedId={selected.id}
            onSelect={select}
          />
        </Suspense>
      )}
      <div className="career-list-heading">
        <h2>
          岗位目录 <span>{filteredJobs.length}</span>
        </h2>
        <span>市场信号 / 数据目录</span>
      </div>
      {filteredJobs.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job, index) => (
            <JobCard
              key={job.id}
              job={job}
              index={index}
              onFocus={
                view === "universe"
                  ? () => {
                      select(job);
                      document
                        .querySelector(".career-universe")
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                    }
                  : undefined
              }
            />
          ))}
        </div>
      ) : (
        <div className="career-empty">
          <SearchX size={32} /><h3>没有匹配的岗位</h3><p>试试其他岗位名称、技能，或恢复全部岗位。</p>
          <button
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
          >
            恢复全部岗位
          </button>
        </div>
      )}
    </section>
  );
}
