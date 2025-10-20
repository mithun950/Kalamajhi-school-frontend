import { useEffect, useState } from "react";
import axios from "axios";

const ManageGallery = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const cloudName = "ddbbj4k2a"; // Cloudinary → Dashboard থেকে নাও
  const uploadPreset = "school_gellary"; // Cloudinary → Settings → Upload Preset

  const fetchGallery = async () => {
    const res = await axios.get("https://kalamajhi-high-school-backend.vercel.app/api/gallery");
    setGallery(res.data);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";

      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", uploadPreset);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        imageUrl = data.secure_url;
      }

      if (!imageUrl) return alert("Image upload failed!");

      if (editingId) {
        await axios.put(`https://kalamajhi-high-school-backend.vercel.app/api/gallery/${editingId}`, {
          title,
          imageUrl,
        });
        setEditingId(null);
      } else {
        await axios.post("https://kalamajhi-high-school-backend.vercel.app/api/gallery", {
          title,
          imageUrl,
        });
      }

      setTitle("");
      setImage(null);
      fetchGallery();
    } catch (err) {
      console.error(err);
      alert("Failed to upload. Try again.");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://kalamajhi-high-school-backend.vercel.app/api/gallery/${id}`);
    fetchGallery();
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setTitle(item.title);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📸 Manage Gallery</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 rounded"
          accept="image/*"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {editingId ? "Update" : "Upload"}
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((item) => (
          <div key={item._id} className="border rounded shadow p-2">
            <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded" />
            <p className="font-semibold mt-2">{item.title}</p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleEdit(item)}
                className="text-sm text-green-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageGallery;
