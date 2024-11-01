"use client";

import { useEffect } from "react";

const BootstrapClient = () => {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js' as any);
  }, []);

  return null;
};

export default BootstrapClient;