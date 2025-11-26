import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import JobDetail from "../pages/JobDetail";
import Profile from "../pages/Profile";
import EmployerPostJob from "../pages/EmployerPostJob";
import Applications from "../pages/Application";
import Scheduler from "../pages/Scheduler";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post-job" element={<EmployerPostJob />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/scheduler" element={<Scheduler />} />
        </Routes>
    );
}
