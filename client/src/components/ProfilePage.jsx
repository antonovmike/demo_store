import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function ProfilePage() {
  const { token, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("🔑 Using token:", token);
        const res = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("✅ Profile data:", res.data);
        setProfile(res.data);
      } catch (err) {
        console.error(
          "❌ Failed to fetch profile:",
          err.response?.status,
          err.response?.data,
        );
        setProfile(null);
      }
    };
    fetchProfile();
  }, [token]);

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-2">My Profile</h2>
      {profile ? (
        <div>
          <p>
            <strong>ID:</strong> {profile.id}
          </p>
          <p>
            <strong>Username:</strong> {profile.username}
          </p>
          <button
            onClick={logout}
            className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>No profile data</p>
      )}
    </div>
  );
}
