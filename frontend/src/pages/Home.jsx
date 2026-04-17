import AlertsPanel from "../components/AlertsPanel";
import ComplaintForm from "../components/ComplaintForm";

function Home() {
  return (
    <div className="page-grid">
      <section className="hero">
        <div className="hero__content">
          <span className="eyebrow">Public Interface</span>
          <h2>Report issues. Track incidents. Strengthen city response.</h2>
          <p>
            A modern complaint management platform connected to AI-powered surveillance alerts
            and administrative action workflows.
          </p>
        </div>
      </section>

      <div className="content-grid">
        <ComplaintForm />
        <AlertsPanel />
      </div>
    </div>
  );
}

export default Home;
