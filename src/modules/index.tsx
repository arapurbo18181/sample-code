import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const AdvanceForm = lazy(() => import("./form"));

const Pages = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<AdvanceForm />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Pages;
