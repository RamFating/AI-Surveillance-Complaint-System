import { complaints, getNextId } from "../data/mockStore.js";

const formatComplaint = (complaint) => ({
  ...complaint,
  createdAtLabel: new Date(complaint.createdAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  })
});

export const getComplaints = (_request, response) => {
  const { status, search = "", page = "1", limit = "10" } = _request.query;
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  let results = [...complaints];

  if (status) {
    results = results.filter((complaint) => complaint.status === status);
  }

  if (search.trim()) {
    const query = search.toLowerCase();
    results = results.filter(
      (complaint) =>
        complaint.description.toLowerCase().includes(query) ||
        complaint.location.toLowerCase().includes(query)
    );
  }

  const start = (pageNumber - 1) * limitNumber;
  const paginated = results.slice(start, start + limitNumber).map(formatComplaint);

  return response.json({
    success: true,
    data: paginated,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total: results.length
    }
  });
};

export const createComplaint = (request, response) => {
  const { name, description, location } = request.body;

  if (!name || !description || !location) {
    return response.status(400).json({
      success: false,
      message: "Name, description, and location are required."
    });
  }

  const complaint = {
    id: getNextId(complaints),
    name,
    description,
    location,
    status: "Pending",
    imageUrl: request.file ? `/uploads/${request.file.filename}` : "",
    createdAt: new Date().toISOString()
  };

  complaints.unshift(complaint);

  return response.status(201).json({
    success: true,
    message: "Complaint created successfully.",
    data: formatComplaint(complaint)
  });
};

export const updateComplaintStatus = (request, response) => {
  const { id } = request.params;
  const { status } = request.body;
  const complaint = complaints.find((item) => item.id === Number(id));

  if (!complaint) {
    return response.status(404).json({ success: false, message: "Complaint not found." });
  }

  complaint.status = status || complaint.status;

  return response.json({
    success: true,
    message: "Complaint status updated.",
    data: formatComplaint(complaint)
  });
};
