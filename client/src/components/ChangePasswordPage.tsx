import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { API_BASE_URL } from "../clientConfig.ts";
import { selectCurrentUser } from "../store/userSlice";
import { fetchUsers } from "../store/adminSlice";

import type { AppDispatch, RootState } from "../store/store.ts";
import type { AxiosError } from "axios";
import type { ManagedUser } from "../types.ts";

export default function ChangePasswordPage() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.admin.users);

  const currentUser = useSelector(selectCurrentUser);

  console.log("currentUser:", currentUser);
  console.log("currentUser?.role:", currentUser?.role);

  if (currentUser?.role !== "admin") {
    return <div>Access denied</div>;
  }

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [selectedUser, setSelectedUser] = useState<ManagedUser | null>(null);
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/admin/change-password`,
        {
          userId: selectedUser?.id,
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
        {users.map((u: ManagedUser) => (
          <li key={u.id}>
            {u.name} (id: {u.id})
            <button onClick={() => setSelectedUser(u)}>Change Password</button>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div>
          <h3>Change password for {selectedUser.name}</h3>
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
