import { useState } from "react";
import { addComplaint } from "../services/api";

const initialState = {
  name: "",
  description: "",
  location: "",
  image: null
};

function ComplaintForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setForm((current) => ({
      ...current,
      [name]: files ? files[0] : value
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!form.description.trim() || form.description.trim().length < 10) {
      nextErrors.description = "Add at least 10 characters.";
    }

    if (!form.location.trim()) {
      nextErrors.location = "Location is required.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const payload = new FormData();
    payload.append("name", form.name.trim());
    payload.append("description", form.description.trim());
    payload.append("location", form.location.trim());

    if (form.image) {
      payload.append("image", form.image);
    }

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await addComplaint(payload);
      setForm(initialState);
      setStatus({
        type: "success",
        message: "Complaint submitted successfully."
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Unable to submit complaint right now."
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="panel panel--form">
      <div className="panel__header">
        <span className="eyebrow">Citizen Portal</span>
        <h2>Raise a Complaint</h2>
        <p>Submit incidents with location context and image evidence.</p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label className="field">
          <span>Name</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {errors.name ? <small>{errors.name}</small> : null}
        </label>

        <label className="field field--full">
          <span>Description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe the issue, incident, or surveillance concern"
          />
          {errors.description ? <small>{errors.description}</small> : null}
        </label>

        <label className="field">
          <span>Location</span>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Area, street, or landmark"
          />
          {errors.location ? <small>{errors.location}</small> : null}
        </label>

        <label className="field">
          <span>Evidence Image</span>
          <input name="image" type="file" accept="image/*" onChange={handleChange} />
        </label>

        <div className="field field--full">
          <button className="button button--primary" type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Complaint"}
          </button>
        </div>

        {status.message ? (
          <div className={`status-message status-message--${status.type}`}>
            {status.message}
          </div>
        ) : null}
      </form>
    </section>
  );
}

export default ComplaintForm;
