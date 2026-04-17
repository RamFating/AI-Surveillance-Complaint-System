const toStatusClass = (status) =>
  (status || "pending").toLowerCase().replace(/\s+/g, "-");

function ComplaintTable({ complaints }) {
  return (
    <div className="table-shell">
      <table className="data-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Location</th>
            <th>Status</th>
            <th>Reported At</th>
          </tr>
        </thead>
        <tbody>
          {complaints.length ? (
            complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td>{complaint.description}</td>
                <td>{complaint.location}</td>
                <td>
                  <span className={`pill pill--${toStatusClass(complaint.status)}`}>
                    {complaint.status}
                  </span>
                </td>
                <td>{complaint.createdAtLabel || "Recently"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="empty-state">
                No complaints found for this filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ComplaintTable;
