import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaHourglassHalf } from "react-icons/fa";

export default function AdmissionForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    fatherName: "",
    motherName: "",
    village: "",
    union: "",
    upozila: "",
    zila: "",
    guardianPhone: "",
  });

  const [status, setStatus] = useState(null); // pending / done / null
  const [admissionOpen, setAdmissionOpen] = useState(true);

  // Admission status check
  const fetchStatus = () => {
    axios
      .get("http://localhost:5000/api/admission-status")
      .then((res) => setAdmissionOpen(res.data.isOpen))
      .catch((err) => console.error(err));
  };

  // Student info check
  const fetchStudent = () => {
    axios
      .get("http://localhost:5000/api/admissions")
      .then((res) => {
        const student = res.data[0];
        if (student) {
          setForm(student);
          setStatus(student.status); // status set করলাম
        } else {
          setStatus(null); // কোনো student নাই
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchStatus();
    fetchStudent();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admissions", form);
      setStatus("pending"); // form submit হলে pending হবে
    } catch (err) {
      console.error(err);
    }
  };

  // Admission বন্ধ থাকলে
  if (!admissionOpen) {
    return (
      <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-lg my-10 text-center bg-red-50">
        <p className="text-red-600 text-lg font-semibold">
          ❌ Online admission is currently closed!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg my-10 bg-white shadow-md">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-700">
        Admission Form
      </h2>

      {/* Pending Message */}
      {status === "pending" && (
        <div className="flex flex-col items-center gap-3 mb-6 p-6 bg-yellow-50 border-l-8 border-yellow-500 rounded-lg shadow-sm">
          <FaHourglassHalf className="text-yellow-500 text-4xl" />
          <p className="text-yellow-700 text-lg md:text-xl font-semibold text-center">
            Your admission is pending.
            <br /> Please wait for confirmation.
          </p>
        </div>
      )}

      {/* Confirmed Message */}
      {status === "done" && (
        <div className=" w-full mx-auto flex flex-col items-center gap-3 mb-6 p-6 bg-green-50 border-2 border-green-500 rounded-lg shadow-sm">
          <FaCheckCircle className="text-green-500 text-8xl" />
          <p className="text-green-700 text-4xl md:text-xl font-semibold text-center">
             Your admission is confirmed!
            <br /> <strong className="text-red-500 mt-5 "> বিশেষ দ্রষ্টব্য: প্রথম ক্লাসের দিন  আপনার পাসপোর্ট সাইজের ২ কপি ছবি, বাবা-মায়ের জাতীয়
            পরিচয়পত্রের ফটোকপি, পিএসসি মার্কশিটের ফটোকপি অথবা আগের স্কুলের
            অনুমতিপত্র নিয়ে এসে অফিসে জমা দিতে হবে। না হলে ভর্তি বাতিল বলে গণ্য
            করা হবে।
            </strong>
          </p>
        </div>
      )}

      {/* Form - শুধুমাত্র তখনই দেখাবে যখন status null হবে */}
      {status === null && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              name={key}
              value={form[key]}
              onChange={handleChange}
              placeholder={key.replace(/([A-Z])/g, " $1")}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full"
              required
            />
          ))}
          <button
            type="submit"
            className="btn btn-primary mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
