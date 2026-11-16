
import type { TodoFilter as FilterType } from "../types";

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

function TodoFilter({
  currentFilter,
  onFilterChange,
  counts,
}: TodoFilterProps) {
  const filters: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <div className="todo-filters">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={currentFilter === filter.value ? "active-filter" : ""}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
          <span>{counts[filter.value]}</span>
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
