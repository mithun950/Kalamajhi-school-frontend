import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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

  // Filter teachers
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p className="text-center mt-20 text-orange-600 font-bold">Loading teachers...</p>;
  }

  if (error) {
    return <p className="text-center mt-20 text-red-600 font-bold">{error}</p>;
  }

  return (
    <div className="p-6">
      {/* Search & Add */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search by name or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400"
          />
          <FaSearch className="absolute left-3 top-2.5 text-orange-500" />
        </div>

        <button
          onClick={handleAddNew}
          className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2"
        >
          <FaPlus /> Add Teacher
        </button>
      </div>

      {/* Teacher Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Subject</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map((teacher) => (
              <tr key={teacher._id} className="border-b hover:bg-orange-50">
                <td className="px-4 py-2 font-semibold">{teacher.name}</td>
                <td className="px-4 py-2">
                  <img src={teacher.image} alt={teacher.name} className="w-12 h-12 rounded-full" />
                </td>
                <td className="px-4 py-2">{teacher.subject}</td>
                <td className="px-4 py-2">{teacher.phone}</td>
                <td className="px-4 py-2 text-center flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(teacher)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(teacher._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-orange-600">
              {editingTeacher ? "Edit Teacher" : "Add Teacher"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-orange-300 px-3 py-2 rounded"
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full border border-orange-300 px-3 py-2 rounded"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full border border-orange-300 px-3 py-2 rounded"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-orange-300 px-3 py-2 rounded"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  {editingTeacher ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTeachers;
