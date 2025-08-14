import React, { useEffect, useState } from "react";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/teachers")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch teachers");
        }
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
  }, []);

  if (loading) return <p className="text-center mt-10">Loading teachers...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (teachers.length === 0)
    return <p className="text-center mt-10">No teachers found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">
        Our Teachers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {teachers.map(({ _id, name, image, subject, phone }) => (
          <div
            key={_id}
            className="bg-white rounded-lg shadow-md p-5 hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={image}
              alt={name}
              className="w-full h-48 object-cover rounded-md mb-4"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x300?text=No+Image"; // fallback image
              }}
            />
            <h3 className="text-xl font-semibold mb-1">{name}</h3>
            <p className="text-gray-600 mb-2">
              <strong>Subject:</strong> {subject}
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> {phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teachers;
