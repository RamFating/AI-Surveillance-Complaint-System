import { useEffect, useMemo, useState } from "react";
import ComplaintTable from "../components/ComplaintTable";
import MetricCard from "../components/MetricCard";
import { getAnalytics, getComplaints } from "../services/api";

const statusOptions = ["All", "Pending", "In Progress", "Resolved"];
const pageSize = 5;
const defaultAnalytics = {
  totalComplaints: 0,
  pendingComplaints: 0,
  resolvedComplaints: 0,
  activeAlerts: 0
};

function Admin() {
  const [complaints, setComplaints] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, limit: pageSize, total: 0 });
  const [analytics, setAnalytics] = useState(defaultAnalytics);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPageData = async () => {
      try {
        const [complaintResponse, analyticsResponse] = await Promise.all([
          getComplaints({
            page,
            limit: pageSize,
            status: selectedStatus === "All" ? "" : selectedStatus,
            search
          }),
          getAnalytics()
        ]);

        setComplaints(complaintResponse.data?.data || []);
        setPagination(
          complaintResponse.data?.pagination || { page, limit: pageSize, total: 0 }
        );
        setAnalytics(analyticsResponse.data?.data || defaultAnalytics);
        setError("");
      } catch (requestError) {
        setError("Unable to load dashboard data.");
      }
    };

    loadPageData();
  }, [page, search, selectedStatus]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((pagination.total || 0) / (pagination.limit || pageSize))),
    [pagination]
  );

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setPage(1);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  return (
    <div className="admin-layout">
      <section className="hero hero--compact">
        <div className="hero__content">
          <span className="eyebrow">Admin Workspace</span>
          <h2>Operational Dashboard</h2>
          <p>Track incidents, measure system health, and prioritize field response.</p>
        </div>
      </section>

      {error ? <div className="status-message status-message--error">{error}</div> : null}

      <section className="metrics-grid">
        <MetricCard label="Total Complaints" value={analytics.totalComplaints} />
        <MetricCard label="Pending" value={analytics.pendingComplaints} tone="warning" />
        <MetricCard label="Resolved" value={analytics.resolvedComplaints} tone="success" />
        <MetricCard label="Active Alerts" value={analytics.activeAlerts} tone="danger" />
      </section>

      <section className="panel">
        <div className="panel__header panel__header--inline">
          <div>
            <span className="eyebrow">Complaint Queue</span>
            <h2>Filter and Review Complaints</h2>
          </div>

          <label className="filter-control">
            <span>Search</span>
            <input
              value={search}
              onChange={handleSearchChange}
              placeholder="Search description or location"
            />
          </label>

          <label className="filter-control">
            <span>Status</span>
            <select value={selectedStatus} onChange={handleStatusChange}>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </div>

        <ComplaintTable complaints={complaints} />

        <div className="pagination-row">
          <span>
            Page {pagination.page} of {totalPages}
          </span>

          <div className="pagination-actions">
            <button
              className="button"
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              Previous
            </button>
            <button
              className="button button--primary"
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Admin;
