import { useState, useEffect } from "react";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");
  const [isProUser, setIsProUser] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const proStatus = JSON.parse(localStorage.getItem("isProUser")) || false;
    setNotes(savedNotes);
    setIsProUser(proStatus);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("isProUser", JSON.stringify(isProUser));
  }, [notes, isProUser]);

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    setNotes([...notes, noteInput]);
    setNoteInput("");
  };

  const handleDeleteNote = (i) => {
    const updated = notes.filter((_, index) => index !== i);
    setNotes(updated);
  };

  const handleUpgrade = () => {
    alert("Scan the QR (phonepe@ybl) and confirm payment");
    const confirm = window.confirm("Payment done?");
    if (confirm) {
      setIsProUser(true);
      alert("You're now a Pro user!");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-purple-700">📝 NoteFlow</h1>
        {!isProUser && (
          <button
            onClick={handleUpgrade}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Upgrade to Pro
          </button>
        )}
      </header>

      {/* Hero */}
      <section className="text-center py-8 px-4">
        <h2 className="text-2xl font-bold mb-2">Your notes. Organized. Forever.</h2>
        <p className="text-gray-600">Take notes instantly, even without logging in.</p>
      </section>

      {/* Note Input */}
      <section className="max-w-md mx-auto mt-6">
        <input
          type="text"
          placeholder="Write your note..."
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          className="w-full p-3 border rounded mb-2"
        />
        <button
          onClick={handleAddNote}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Add Note
        </button>
      </section>

      {/* Notes List */}
      <section className="max-w-md mx-auto mt-6 px-2 flex-1">
        {notes.length === 0 ? (
          <p className="text-center text-gray-500">No notes yet. Add one above 👆</p>
        ) : (
          <ul className="space-y-2">
            {notes.map((note, index) => (
              <li
                key={index}
                className="bg-white p-3 rounded shadow flex justify-between items-center"
              >
                {note}
                <button
                  onClick={() => handleDeleteNote(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Pro Footer Notice */}
      {!isProUser && (
        <section className="bg-yellow-100 text-sm text-center p-3 mt-6">
          Upgrade to Pro for cloud sync & export (via PhonePe). UPI ID: <strong>phonepe@ybl</strong>
        </section>
      )}

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 mt-auto py-4">
        © 2025 NoteFlow. Made with 💜 by InDepthCode.
      </footer>
    </div>
  );
}
