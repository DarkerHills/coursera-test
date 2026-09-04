// Fixed reference clock for the demo data set, so "days since" / staleness
// math is reproducible on every render instead of drifting with wall-clock
// time. Swap for `new Date()` once this is wired to a real data source.
export const NOW = new Date("2026-09-04T12:00:00Z");
