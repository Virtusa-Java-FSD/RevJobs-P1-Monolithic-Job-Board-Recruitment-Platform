import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Chip, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { LocationOn, Work, AttachMoney, CalendarToday } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { Job } from '../../types';
import { jobAPI, applicationAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      fetchJob();
    }
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await jobAPI.getJob(id!);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!job) return;
    
    setApplying(true);
    try {
      await applicationAPI.apply(job.id, coverLetter);
      setApplyDialogOpen(false);
      setCoverLetter('');
      // Show success message
    } catch (error) {
      console.error('Error applying:', error);
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!job) return <Typography>Job not found</Typography>;

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Salary not specified';
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    if (min) return `From $${min.toLocaleString()}`;
    return `Up to $${max?.toLocaleString()}`;
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="between" alignItems="start" mb={3}>
            <Box>
              <Typography variant="h4" gutterBottom>
                {job.title}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                {job.companyName}
              </Typography>
            </Box>
            {user?.role === 'JOB_SEEKER' && (
              <Button
                variant="contained"
                size="large"
                onClick={() => setApplyDialogOpen(true)}
              >
                Apply Now
              </Button>
            )}
          </Box>

          <Box display="flex" alignItems="center" gap={3} mb={3}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <LocationOn />
              <Typography>
                {job.location} {job.remote && '(Remote)'}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Work />
              <Typography>{job.experienceLevel}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <AttachMoney />
              <Typography>{formatSalary(job.salaryMin, job.salaryMax)}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <CalendarToday />
              <Typography>
                Posted {new Date(job.postedDate).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>

          <Typography variant="h6" gutterBottom>
            Job Description
          </Typography>
          <Typography variant="body1" paragraph>
            {job.description}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Requirements
          </Typography>
          <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
            {job.requirements.map((req, index) => (
              <Chip key={index} label={req} />
            ))}
          </Box>

          {job.applicationDeadline && (
            <Typography variant="body2" color="error">
              Application deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Apply Dialog */}
      <Dialog open={applyDialogOpen} onClose={() => setApplyDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Apply for {job.title}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Cover Letter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            margin="normal"
            placeholder="Tell us why you're interested in this position..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApplyDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleApply} variant="contained" disabled={applying}>
            {applying ? 'Applying...' : 'Submit Application'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobDetail;