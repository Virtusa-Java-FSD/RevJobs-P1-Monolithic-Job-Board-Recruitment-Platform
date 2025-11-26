// src/routes/AppRoutes.tsx
import React, { type JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import JobDetail from "../pages/JobDetail";
import Profile from "../pages/Profile";
import EmployerPostJob from "../pages/EmployerPostJob";
import Application from "../pages/Application";
import Scheduler from "../pages/Scheduler";

// If your file names differ (e.g. Applications.tsx), change the imports above.

export default function AppRoutes(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post-job" element={<EmployerPostJob />} />
            <Route path="/applications" element={<Application />} />
            <Route path="/scheduler" element={<Scheduler />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
