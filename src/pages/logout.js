import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { removeItem } from "../@core/services/storage/storage.services";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // انجام عملیات لاگ‌آوت
    removeItem("token");
    removeItem("userId");
    // هدایت به مسیر دلخواه (به عنوان مثال، به صفحه لاگین)
    navigate("/login");
  }, []);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
