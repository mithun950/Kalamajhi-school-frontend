import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    achievement: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  // GET all testimonials
  const fetchTestimonials = () => {
    axios.get("http://localhost:5000/api/testimonials")
      .then(res => setTestimonials(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ADD or UPDATE testimonial
  const handleSubmit = (e) => {
    e.preventDefault();
    if(editingId) {
      axios.put(`http://localhost:5000/api/testimonials/${editingId}`, formData)
        .then(() => {
          fetchTestimonials();
          setFormData({ name: "", image: "", achievement: "", description: "" });
          setEditingId(null);
        })
        .catch(err => console.error(err));
    } else {
      axios.post("http://localhost:5000/api/testimonials", formData)
        .then(() => {
          fetchTestimonials();
          setFormData({ name: "", image: "", achievement: "", description: "" });
        })
        .catch(err => console.error(err));
    }
  };

  // DELETE testimonial
  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this testimonial?")) {
      axios.delete(`http://localhost:5000/api/testimonials/${id}`)
        .then(() => fetchTestimonials())
        .catch(err => console.error(err));
    }
  };

  // EDIT testimonial
  const handleEdit = (t) => {
    setFormData({
      name: t.name,
      image: t.image,
      achievement: t.achievement,
      description: t.description,
    });
    setEditingId(t._id);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Manage Testimonials</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
        <div className="grid md:grid-cols-2 gap-4">
          <input 
            type="text" 
            name="name" 
            placeholder="Student Name" 
            value={formData.name} 
            onChange={handleChange} 
            className="border p-2 rounded w-full"
            required
          />
          <input 
            type="text" 
            name="image" 
            placeholder="Image URL" 
            value={formData.image} 
            onChange={handleChange} 
            className="border p-2 rounded w-full"
            required
          />
          <input 
            type="text" 
            name="achievement" 
            placeholder="Achievement" 
            value={formData.achievement} 
            onChange={handleChange} 
            className="border p-2 rounded w-full"
            required
          />
          <textarea 
            name="description" 
            placeholder="Description" 
            value={formData.description} 
            onChange={handleChange} 
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Update Testimonial" : "Add Testimonial"}
        </button>
      </form>

      {/* Testimonials Table */}
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Achievement</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map(t => (
              <tr key={t._id} className="text-center">
                <td className="border p-2">{t.name}</td>
                <td className="border p-2">{t.achievement}</td>
                <td className="border p-2 space-x-2">
                  <button 
                    onClick={() => handleEdit(t)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(t._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTestimonials;
