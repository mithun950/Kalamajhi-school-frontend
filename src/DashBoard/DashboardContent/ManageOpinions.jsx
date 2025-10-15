import { useEffect, useState } from "react";

const ManageOpinions = () => {
  const [opinions, setOpinions] = useState([]);
  const [formData, setFormData] = useState({ name: "", designation: "", image: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  // Load data
  useEffect(() => {
    fetch("http://localhost:5000/api/opinions")
      .then((res) => res.json())
      .then(setOpinions);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:5000/api/opinions/${editingId}`
      : "http://localhost:5000/api/opinions";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, date: new Date() }),
    }).then(() => {
      setFormData({ name: "", designation: "", image: "", description: "" });
      setEditingId(null);
      fetch("http://localhost:5000/api/opinions")
        .then((res) => res.json())
        .then(setOpinions);
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/opinions/${id}`, { method: "DELETE" }).then(() => {
      setOpinions(opinions.filter((o) => o._id !== id));
    });
  };

  const handleEdit = (opinion) => {
    setFormData(opinion);
    setEditingId(opinion._id);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Opinions</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Designation"
          className="border p-2 rounded"
          value={formData.designation}
          onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="border p-2 rounded"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="border p-2 rounded md:col-span-2"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        ></textarea>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Designation</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {opinions.map((opinion) => (
            <tr key={opinion._id}>
              <td className="border p-2">
                <img src={opinion.image} alt={opinion.name} className="h-12 w-12 object-cover" />
              </td>
              <td className="border p-2">{opinion.name}</td>
              <td className="border p-2">{opinion.designation}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(opinion)}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(opinion._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOpinions;
