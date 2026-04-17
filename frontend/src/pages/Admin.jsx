import { useEffect, useMemo, useState } from "react";
import ComplaintTable from "../components/ComplaintTable";
import MetricCard from "../components/MetricCard";
import { getAnalytics, getComplaints } from "../services/api";

const statusOptions = ["All", "Pending", "In Progress", "Resolved"];
const defaultAnalytics = {
  totalComplaints: 0,
  pendingComplaints: 0,
  resolvedComplaints: 0,
  activeAlerts: 0
};

function Admin() {
  const [complaints, setComplaints] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [analytics, setAnalytics] = useState(defaultAnalytics);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPageData = async () => {
      try {
        const [complaintResponse, analyticsResponse] = await Promise.all([
          getComplaints(),
          getAnalytics()
        ]);

        setComplaints(complaintResponse.data?.data || []);
        setAnalytics(analyticsResponse.data?.data || defaultAnalytics);
        setError("");
      } catch (requestError) {
        setError("Unable to load dashboard data.");
      }
    };

    loadPageData();
  }, []);

  const filteredComplaints = useMemo(() => {
    if (selectedStatus === "All") {
      return complaints;
    }

    return complaints.filter((complaint) => complaint.status === selectedStatus);
  }, [complaints, selectedStatus]);

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
            <span>Status</span>
            <select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)}>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </div>

        <ComplaintTable complaints={filteredComplaints} />
      </section>
    </div>
  );
}

export default Admin;
