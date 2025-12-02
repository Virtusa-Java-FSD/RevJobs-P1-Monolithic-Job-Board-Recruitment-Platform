import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Chip, FormControlLabel, Switch } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { jobAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const CreateJob: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    remote: false,
    experienceLevel: 'MID',
    salaryMin: '',
    salaryMax: '',
    applicationDeadline: '',
  });
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addRequirement = () => {
    if (newRequirement.trim() && !requirements.includes(newRequirement.trim())) {
      setRequirements([...requirements, newRequirement.trim()]);
      setNewRequirement('');
    }
  };

  const removeRequirement = (req: string) => {
    setRequirements(requirements.filter(r => r !== req));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const jobData = {
        ...formData,
        requirements,
        salaryMin: formData.salaryMin ? parseInt(formData.salaryMin) : undefined,
        salaryMax: formData.salaryMax ? parseInt(formData.salaryMax) : undefined,
        experienceLevel: formData.experienceLevel as 'ENTRY' | 'MID' | 'SENIOR' | 'LEAD',
      };
      
      await jobAPI.createJob(jobData);
      navigate('/employer/dashboard');
    } catch (error) {
      console.error('Error creating job:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Post New Job
      </Typography>
      
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Job Title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              margin="normal"
              required
            />
            
            <Box mt={2} mb={2}>
              <Typography variant="subtitle1" gutterBottom>
                Job Description
              </Typography>
              <ReactQuill
                value={formData.description}
                onChange={(value) => handleChange('description', value)}
                style={{ height: '200px', marginBottom: '50px' }}
              />
            </Box>

            <TextField
              fullWidth
              label="Location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              margin="normal"
              required
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.remote}
                  onChange={(e) => handleChange('remote', e.target.checked)}
                />
              }
              label="Remote Position"
              sx={{ mt: 2, mb: 2 }}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Experience Level</InputLabel>
              <Select
                value={formData.experienceLevel}
                onChange={(e) => handleChange('experienceLevel', e.target.value)}
              >
                <MenuItem value="ENTRY">Entry Level</MenuItem>
                <MenuItem value="MID">Mid Level</MenuItem>
                <MenuItem value="SENIOR">Senior Level</MenuItem>
                <MenuItem value="LEAD">Lead</MenuItem>
              </Select>
            </FormControl>

            <Box display="flex" gap={2}>
              <TextField
                label="Minimum Salary"
                type="number"
                value={formData.salaryMin}
                onChange={(e) => handleChange('salaryMin', e.target.value)}
                margin="normal"
                sx={{ flex: 1 }}
              />
              <TextField
                label="Maximum Salary"
                type="number"
                value={formData.salaryMax}
                onChange={(e) => handleChange('salaryMax', e.target.value)}
                margin="normal"
                sx={{ flex: 1 }}
              />
            </Box>

            <TextField
              fullWidth
              label="Application Deadline"
              type="date"
              value={formData.applicationDeadline}
              onChange={(e) => handleChange('applicationDeadline', e.target.value)}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />

            <Box mt={3}>
              <Typography variant="subtitle1" gutterBottom>
                Requirements & Skills
              </Typography>
              <Box display="flex" gap={2} mb={2}>
                <TextField
                  label="Add requirement"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                  sx={{ flex: 1 }}
                />
                <Button onClick={addRequirement} variant="outlined">
                  Add
                </Button>
              </Box>
              <Box display="flex" gap={1} flexWrap="wrap">
                {requirements.map((req, index) => (
                  <Chip
                    key={index}
                    label={req}
                    onDelete={() => removeRequirement(req)}
                  />
                ))}
              </Box>
            </Box>

            <Box mt={4} display="flex" gap={2}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                size="large"
              >
                {loading ? 'Posting...' : 'Post Job'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/employer/dashboard')}
                size="large"
              >
                Cancel
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateJob;