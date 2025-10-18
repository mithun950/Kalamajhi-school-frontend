import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageAdmissions() {
  const [admissions, setAdmissions] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const fetchAdmissions = () => {
    axios.get("https://kalamajhi-high-school-backend.vercel.app/api/admissions")
      .then(res => setAdmissions(res.data));
    axios.get("https://kalamajhi-high-school-backend.vercel.app/api/admission-status")
      .then(res => setIsOpen(res.data.isOpen));
  };

  useEffect(() => fetchAdmissions(), []);

  const confirmAdmission = (id) => {
    axios.put(`https://kalamajhi-high-school-backend.vercel.app/api/admissions/confirm/${id}`)
      .then(fetchAdmissions);
  };

  const deleteAdmission = (id) => axios.delete(`https://kalamajhi-high-school-backend.vercel.app/api/admissions/${id}`)
    .then(fetchAdmissions);

  const toggleAdmission = () => {
    axios.put("https://kalamajhi-high-school-backend.vercel.app/api/admission-status", { isOpen: !isOpen })
      .then(fetchAdmissions);
  };

  return (
    <div className="p-4 w-full  md:w-11/12  mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-orange-500">📋 Manage Admissions</h2>
        <button
          onClick={toggleAdmission}
          className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          {isOpen ? "Close Admission" : "Open Admission"}
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-orange-200 shadow-md">
          <thead className="bg-orange-400 text-white">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Father</th>
              <th className="px-4 py-2">Mother</th>
              <th className="px-4 py-2">Village</th>
              <th className="px-4 py-2">Union</th>
              <th className="px-4 py-2">Upozila</th>
              <th className="px-4 py-2">Zila</th>
              <th className="px-4 py-2">Guardian Phone</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admissions.map(adm => (
              <tr key={adm._id} className="border-b hover:bg-orange-50 transition">
                <td className="px-4 py-2">{adm.fullName}</td>
                <td className="px-4 py-2">{adm.email}</td>
                <td className="px-4 py-2">{adm.fatherName}</td>
                <td className="px-4 py-2">{adm.motherName}</td>
                <td className="px-4 py-2">{adm.village}</td>
                <td className="px-4 py-2">{adm.union}</td>
                <td className="px-4 py-2">{adm.upozila}</td>
                <td className="px-4 py-2">{adm.zila}</td>
                <td className="px-4 py-2">{adm.guardianPhone}</td>
                <td className="px-4 py-2 font-semibold text-orange-500">{adm.status}</td>
                <td className="px-4 py-2 flex gap-2">
                  {adm.status !== "done" && (
                    <button
                      onClick={() => confirmAdmission(adm._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow-md text-sm"
                    >
                      Confirm
                    </button>
                  )}
                  <button
                    onClick={() => deleteAdmission(adm._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-md text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden grid gap-4">
        {admissions.map(adm => (
          <div
            key={adm._id}
            className="border border-orange-200 rounded-lg shadow-md p-4 bg-white"
          >
            <h3 className="text-lg font-bold text-orange-500">{adm.fullName}</h3>
            <p className="text-sm text-gray-600">{adm.email}</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-700">
              <p><span className="font-semibold">Father:</span> {adm.fatherName}</p>
              <p><span className="font-semibold">Mother:</span> {adm.motherName}</p>
              <p><span className="font-semibold">Village:</span> {adm.village}</p>
              <p><span className="font-semibold">Union:</span> {adm.union}</p>
              <p><span className="font-semibold">Upozila:</span> {adm.upozila}</p>
              <p><span className="font-semibold">Zila:</span> {adm.zila}</p>
              <p className="col-span-2"><span className="font-semibold">Guardian Phone:</span> {adm.guardianPhone}</p>
              <p className="col-span-2 font-semibold text-orange-500">Status: {adm.status}</p>
            </div>
            <div className="flex gap-2 mt-3">
              {adm.status !== "done" && (
                <button
                  onClick={() => confirmAdmission(adm._id)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg shadow-md text-sm"
                >
                  Confirm
                </button>
              )}
              <button
                onClick={() => deleteAdmission(adm._id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg shadow-md text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
