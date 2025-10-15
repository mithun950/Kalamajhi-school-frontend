import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ManageResult() {
  const [className, setClassName] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [section, setSection] = useState(""); // নতুন
  const [type, setType] = useState("half"); // half/yearly
  const [subjects, setSubjects] = useState([{ name: "", mark: "" }]); // dynamic subjects

  // Fetch students when class changes
  useEffect(() => {
    if (className) {
      axios.get(`http://localhost:5000/api/students/class/${className}`)
        .then(res => setStudents(res.data));
    }
  }, [className]);

  const handleAddSubject = () => {
    setSubjects([...subjects, { name: "", mark: "" }]);
  };

  const handleRemoveSubject = index => {
    const updated = subjects.filter((_, i) => i !== index);
    setSubjects(updated);
  };

  const handleSubjectChange = (index, field, value) => {
    const updated = subjects.map((s, i) => i === index ? { ...s, [field]: value } : s);
    setSubjects(updated);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!selectedStudent || !section) {
      alert("Please select student and section");
      return;
    }
    await axios.post("http://localhost:5000/api/results", {
      studentId: selectedStudent,
      className,
      roll: students.find(s => s._id === selectedStudent).roll,
      section,
      type,
      subjects: subjects.reduce((acc, s) => {
        if (s.name) acc[s.name] = Number(s.mark);
        return acc;
      }, {})
    });
    alert("Marks uploaded!");
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Manage Result</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Class Name */}
        <input
          className="input w-full"
          placeholder="Class Name"
          value={className}
          onChange={e => setClassName(e.target.value)}
        />

        {/* Section */}
        <select className="input w-full" value={section} onChange={e => setSection(e.target.value)}>
          <option value="">Select Section</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>

        {/* Student */}
        <select className="input w-full" value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}>
          <option value="">Select Student</option>
          {students.map(s => <option key={s._id} value={s._id}>{s.name} (Roll: {s.roll})</option>)}
        </select>

        {/* Result Type */}
        <select className="input w-full" value={type} onChange={e => setType(e.target.value)}>
          <option value="half">Half Yearly</option>
          <option value="yearly">Yearly</option>
        </select>

        {/* Dynamic Subjects */}
        <div className="space-y-2">
          {subjects.map((s, index) => (
            <div key={index} className="flex gap-2">
              <input
                className="input flex-1"
                placeholder="Subject Name"
                value={s.name}
                onChange={e => handleSubjectChange(index, "name", e.target.value)}
              />
              <input
                className="input w-24"
                placeholder="Mark"
                type="number"
                value={s.mark}
                onChange={e => handleSubjectChange(index, "mark", e.target.value)}
              />
              <button type="button" className="btn btn-error" onClick={() => handleRemoveSubject(index)}>Delete</button>
            </div>
          ))}
          <button type="button" className="btn btn-secondary mt-2" onClick={handleAddSubject}>Add Subject</button>
        </div>

        {/* Submit */}
        <button className="btn bg-blue-500 text-white w-full mt-3">Upload Marks</button>
      </form>
    </div>
  );
}
