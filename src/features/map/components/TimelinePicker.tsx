interface TimelinePickerProps {
  years: number[];
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

export function TimelinePicker({ years, selectedYear, setSelectedYear }: TimelinePickerProps) {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded shadow px-4 py-2">
      <label htmlFor="timeline-year" className="mr-2 font-semibold">Year:</label>
      <select
        id="timeline-year"
        value={selectedYear}
        onChange={e => setSelectedYear(Number(e.target.value))}
        className="px-2 py-1 rounded border"
      >
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
}