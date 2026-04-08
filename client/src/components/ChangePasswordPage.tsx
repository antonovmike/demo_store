import { useState } from "react";
import axios from "axios";

import { API_BASE_URL } from "../clientConfig.ts";

import type { AxiosError } from "axios";

interface ManagedUser {
  id: number;
  username: string;
  email: string;
  role: string; // "user" | "admin" | "editor"
}

export default function AdminUserList({ users }: { users: ManagedUser[] }) {
  const [selectedUser, setSelectedUser] = useState<ManagedUser | null>(null);
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/admin/change-password`,
        {
          userId: selectedUser,
          password: newPassword,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      console.log(res.data);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      alert(error.response?.data?.error || "Error changing password");
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.username} ({u.role})
            <button onClick={() => setSelectedUser(u)}>Change Password</button>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div>
          <h3>Change password for {selectedUser.username}</h3>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleChangePassword}>Submit</button>
        </div>
      )}
    </div>
  );
}
