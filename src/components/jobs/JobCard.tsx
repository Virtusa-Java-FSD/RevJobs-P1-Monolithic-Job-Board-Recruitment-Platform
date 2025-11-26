// src/components/jobs/JobCard.tsx
import type { Job } from "../../types/job";

interface Props {
    job: Job;
}

export default function JobCard({ job }: Props) {
    return (
        <div>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
        </div>
    );
}
