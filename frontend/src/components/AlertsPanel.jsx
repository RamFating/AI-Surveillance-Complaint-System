import { useEffect, useState } from "react";
import { getAlerts } from "../services/api";

function AlertsPanel() {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadAlerts = async () => {
      try {
        const response = await getAlerts();
        if (mounted) {
          setAlerts(response.data?.data || []);
          setError("");
        }
      } catch (requestError) {
        if (mounted) {
          setError("Unable to load alerts.");
        }
      }
    };

    loadAlerts();
    const intervalId = window.setInterval(loadAlerts, 5000);

    return () => {
      mounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="panel">
      <div className="panel__header">
        <span className="eyebrow">Live Alerts</span>
        <h2>Auto-Generated Surveillance Alerts</h2>
        <p>Refreshed every 5 seconds from the backend alert stream.</p>
      </div>

      {error ? <div className="status-message status-message--error">{error}</div> : null}

      <div className="alerts-list">
        {alerts.length ? (
          alerts.map((alert) => (
            <article
              key={alert.id}
              className={`alert-card alert-card--${alert.severity?.toLowerCase() || "high"}`}
            >
              <div>
                <strong>{alert.title}</strong>
                <p>{alert.message}</p>
              </div>
              <span>{alert.severity}</span>
            </article>
          ))
        ) : (
          <p className="muted-copy">No active alerts right now.</p>
        )}
      </div>
    </section>
  );
}

export default AlertsPanel;
