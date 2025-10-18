import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    subject: "",
    phone: "",
  });

  // Fetch teachers
  const fetchTeachers = () => {
    setLoading(true);
    fetch("https://kalamajhi-high-school-backend.vercel.app/api/teachers")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch teachers");
        return res.json();
      })
      .then((data) => {
        setTeachers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddNew = () => {
    setEditingTeacher(null);
    setFormData({ name: "", image: "", subject: "", phone: "" });
    setShowForm(true);
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name,
      image: teacher.image,
      subject: teacher.subject,
      phone: teacher.phone,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingTeacher
      ? `https://kalamajhi-high-school-backend.vercel.app/api/teachers/${editingTeacher._id}`
      : "https://kalamajhi-high-school-backend.vercel.app/api/teachers";
    const method = editingTeacher ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save teacher");
      }

      Swal.fire({
        icon: "success",
        title: editingTeacher ? "Teacher updated" : "Teacher added",
        timer: 1500,
        showConfirmButton: false,
      });

      setShowForm(false);
      fetchTeachers();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this teacher?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://kalamajhi-high-school-backend.vercel.app/api/teachers/${id}`, {
            method: "DELETE",
          });
          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || "Failed to delete teacher");
          }
          Swal.fire("Deleted!", "Teacher has been deleted.", "success");
          fetchTeachers();
        } catch (err) {
          Swal.fire("Error!", err.message, "error");
        }
      }
    });
  };

  if (loading) return <p className="text-center mt-10">Loading teachers...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-indigo-700">Manage Teachers</h2>
        <button
          onClick={handleAddNew}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition w-full sm:w-auto"
        >
          + Add Teacher
        </button>
      </div>

      {/* Add/Update Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-6 rounded shadow mb-6 max-w-xl mx-auto"
        >
          <h3 className="text-xl font-semibold mb-4">
            {editingTeacher ? "Update Teacher" : "Add New Teacher"}
          </h3>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
              placeholder="+8801XXXXXXXXX"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded border hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              {editingTeacher ? "Update" : "Add"}
            </button>
          </div>
        </form>
      )}

      {/* Large Device: Table */}
      <div className="hidden md:block">
        <table className="table-auto w-full border border-gray-300 rounded">
          <thead className="bg-indigo-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td className="border px-4 py-2">{teacher.name}</td>
                <td className="border px-4 py-2">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="border px-4 py-2">{teacher.subject}</td>
                <td className="border px-4 py-2">{teacher.phone}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(teacher)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(teacher._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {teachers.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 font-semibold"
                >
                  No teachers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Small Device: Card View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {teachers.map((teacher) => (
          <div
            key={teacher._id}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center"
          >
            <img
              src={teacher.image}
              alt={teacher.name}
              className="w-20 h-20 rounded-full object-cover mb-3"
            />
            <h3 className="text-lg font-semibold">{teacher.name}</h3>
            <p className="text-gray-600">{teacher.subject}</p>
            <p className="text-gray-500">{teacher.phone}</p>
            <div className="flex gap-4 mt-3">
              <button
                onClick={() => handleEdit(teacher)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(teacher._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {teachers.length === 0 && (
          <p className="col-span-1 sm:col-span-2 text-center text-gray-500">
            No teachers found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageTeachers;
