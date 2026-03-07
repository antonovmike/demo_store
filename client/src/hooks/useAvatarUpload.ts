import { useState } from "react";

export function useAvatarUpload() {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // restrictions: size < 1MB, width/height will be verified later
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        alert("The file is too large (max. 1MB)");
        return;
      }
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const clearPreview = () => {
    setAvatar(null);
    setPreview(null);
  };
  return { avatar, preview, handleAvatarChange, clearPreview };
}
