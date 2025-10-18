import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaPlus, FaEdit, FaTrash, FaFileWord, FaFilePdf } from "react-icons/fa";

export default function ManageNotices() {
  const [notices, setNotices] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  // Fetch all notices
  const fetchNotices = async () => {
    try {
      const res = await axios.get("https://kalamajhi-high-school-backend.vercel.app/api/notices");
      setNotices(res.data);
    } catch (err) {
      console.error("Failed to fetch notices:", err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Add Notice
  const handleAdd = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const fileContent = form.file.files[0]?.name;
    const date = form.date.value;

    if (!title || !fileContent || !date) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    try {
      await axios.post("https://kalamajhi-high-school-backend.vercel.app/api/notices", {
        title,
        fileContent,
        date,
      });
      Swal.fire("Success", "Notice added successfully", "success");
      setShowAddForm(false);
      fetchNotices();
    } catch (err) {
      Swal.fire("Error", "Failed to add notice", err);
    }
  };

  // Delete Notice
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the notice permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://kalamajhi-high-school-backend.vercel.app/api/notices/${id}`);
          Swal.fire("Deleted!", "Notice has been deleted.", "success");
          fetchNotices();
        } catch (err) {
          Swal.fire("Error", "Failed to delete notice", err);
        }
      }
    });
  };

  // Open Update Form
  const handleEdit = (notice) => {
    setSelectedNotice(notice);
    setShowUpdateForm(true);
  };

  // Update Notice
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const fileContent = form.file.files[0]?.name || selectedNotice.fileContent;
    const date = form.date.value;

    try {
      await axios.put(
        `https://kalamajhi-high-school-backend.vercel.app/api/notices/${selectedNotice._id}`,
        {
          title,
          fileContent,
          date,
        }
      );
      Swal.fire("Updated!", "Notice updated successfully", "success");
      setShowUpdateForm(false);
      fetchNotices();
    } catch (err) {
      Swal.fire("Error", "Failed to update notice", err);
    }
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5 gap-3 sm:gap-0">
        <h2 className="text-2xl font-bold">Manage Notices</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-500 text-white p-2 rounded-full w-fit self-start sm:self-auto flex items-center gap-2"
        >
          <FaPlus /> Add Notice
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">File</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(notices) &&
              notices.map((n) => (
                <tr key={n._id}>
                  <td className="p-2 border">{n.title}</td>
                  <td className="p-2 border text-center">
                    {n.fileContent.endsWith(".pdf") ? (
                      <a
                        href={`/${n.fileContent}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block"
                        title={n.fileContent}
                      >
                        <FaFilePdf className="text-red-600 text-2xl hover:text-red-800 transition" />
                      </a>
                    ) : n.fileContent.endsWith(".docx") ? (
                      <a
                        href={`/${n.fileContent}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block"
                        title={n.fileContent}
                      >
                        <FaFileWord className="text-blue-600 text-2xl hover:text-blue-800 transition" />
                      </a>
                    ) : (
                      <a
                        href={`/${n.fileContent}`}
                        target="_blank"
                        rel="noreferrer"
                        className="underline text-blue-500"
                      >
                        {n.fileContent}
                      </a>
                    )}
                  </td>
                  <td className="p-2 border">
                    {new Date(n.date || new Date()).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </td>
                  <td className="p-2 border flex justify-center gap-6">
                    <button
                      className="bg-blue-500 text-white p-1 rounded"
                      onClick={() => handleEdit(n)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-red-500 text-white p-1 rounded"
                      onClick={() => handleDelete(n._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {Array.isArray(notices) &&
          notices.map((n) => (
            <div
              key={n._id}
              className="border p-4 rounded shadow bg-white flex flex-col gap-2"
            >
              <h3 className="font-semibold text-lg">{n.title}</h3>
              <div className="flex items-center gap-2">
                {n.fileContent.endsWith(".pdf") ? (
                  <a
                    href={`/${n.fileContent}`}
                    target="_blank"
                    rel="noreferrer"
                    title={n.fileContent}
                  >
                    <FaFilePdf className="text-red-600 text-2xl hover:text-red-800 transition" />
                  </a>
                ) : n.fileContent.endsWith(".docx") ? (
                  <a
                    href={`/${n.fileContent}`}
                    target="_blank"
                    rel="noreferrer"
                    title={n.fileContent}
                  >
                    <FaFileWord className="text-blue-600 text-2xl hover:text-blue-800 transition" />
                  </a>
                ) : (
                  <a
                    href={`/${n.fileContent}`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-500"
                  >
                    {n.fileContent}
                  </a>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {new Date(n.date).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 text-white p-1 rounded"
                  onClick={() => handleEdit(n)}
                >
                  <FaEdit />
                </button>
                <button
                  className="bg-red-500 text-white p-1 rounded"
                  onClick={() => handleDelete(n._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <form
            onSubmit={handleAdd}
            className="bg-white p-5 rounded shadow w-96"
          >
            <h3 className="text-xl mb-3">Add Notice</h3>
            <input
              name="title"
              placeholder="Title"
              className="border p-2 w-full mb-2"
            />
            <input
              type="file"
              name="file"
              accept=".pdf,.docx"
              className="border p-2 w-full mb-2"
            />
            <input
              type="date"
              name="date"
              className="border p-2 w-full mb-2"
              defaultValue={new Date().toISOString().split("T")[0]}
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-400 text-white px-4 py-1 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-1 rounded"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Update Form Modal */}
      {showUpdateForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-5 rounded shadow w-96"
          >
            <h3 className="text-xl mb-3">Update Notice</h3>
            <input
              name="title"
              defaultValue={selectedNotice?.title}
              className="border p-2 w-full mb-2"
            />
            <input
              type="file"
              name="file"
              accept=".pdf,.docx"
              className="border p-2 w-full mb-2"
            />
            <input
              type="date"
              name="date"
              defaultValue={selectedNotice?.date.split("T")[0]}
              className="border p-2 w-full mb-2"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowUpdateForm(false)}
                className="bg-gray-400 text-white px-4 py-1 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-1 rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
