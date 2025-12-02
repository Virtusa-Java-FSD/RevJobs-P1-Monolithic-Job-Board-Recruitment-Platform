import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Chip, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LocationOn, Work, AttachMoney } from '@mui/icons-material';
import { Job } from '../../types';
import { jobAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    remote: '',
    experienceLevel: '',
    salaryMin: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      const response = await jobAPI.getJobs(filters);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Salary not specified';
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    if (min) return `From $${min.toLocaleString()}`;
    return `Up to $${max?.toLocaleString()}`;
  };

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
          💼 Job Opportunities
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover your next career opportunity from top companies
        </Typography>
      </Box>
      
      {/* Filters */}
      <Card sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
          🔍 Find Your Perfect Job
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            label="Search jobs"
            placeholder="Job title, company, or keywords"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            sx={{ minWidth: 250, flex: 1 }}
            variant="outlined"
          />
          <TextField
            label="Location"
            placeholder="City, state, or remote"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            sx={{ minWidth: 180 }}
            variant="outlined"
          />
          <FormControl sx={{ minWidth: 140 }} variant="outlined">
            <InputLabel>Work Type</InputLabel>
            <Select
              value={filters.remote}
              onChange={(e) => handleFilterChange('remote', e.target.value)}
              label="Work Type"
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="true">🏠 Remote</MenuItem>
              <MenuItem value="false">🏢 On-site</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 160 }} variant="outlined">
            <InputLabel>Experience</InputLabel>
            <Select
              value={filters.experienceLevel}
              onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
              label="Experience"
            >
              <MenuItem value="">All Levels</MenuItem>
              <MenuItem value="ENTRY">🌱 Entry Level</MenuItem>
              <MenuItem value="MID">💼 Mid Level</MenuItem>
              <MenuItem value="SENIOR">🏆 Senior Level</MenuItem>
              <MenuItem value="LEAD">👑 Lead</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Min Salary"
            placeholder="50000"
            type="number"
            value={filters.salaryMin}
            onChange={(e) => handleFilterChange('salaryMin', e.target.value)}
            sx={{ minWidth: 140 }}
            variant="outlined"
          />
        </Box>
      </Card>

      {/* Job Cards */}
      <Box display="flex" flexDirection="column" gap={3}>
        {jobs.map((job) => (
            <Card key={job.id} sx={{ 
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px 0 rgb(0 0 0 / 0.1)'
              },
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'grey.200'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="between" alignItems="start">
                  <Box flex={1}>
                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {job.title}
                      </Typography>
                      {job.remote && (
                        <Chip label="Remote" size="small" color="success" variant="outlined" />
                      )}
                    </Box>
                    <Typography variant="subtitle1" color="primary.main" gutterBottom sx={{ fontWeight: 500 }}>
                      {job.companyName}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={3} mb={2} flexWrap="wrap">
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <LocationOn fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {job.location}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <Work fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {job.experienceLevel} Level
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <AttachMoney fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {formatSalary(job.salaryMin, job.salaryMax)}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.6 }}>
                      {job.description.substring(0, 200)}...
                    </Typography>
                    <Box display="flex" gap={1} flexWrap="wrap">
                      {job.requirements.slice(0, 4).map((req, index) => (
                        <Chip 
                          key={index} 
                          label={req} 
                          size="small" 
                          variant="outlined"
                          sx={{ 
                            bgcolor: 'grey.50',
                            borderColor: 'grey.300',
                            '&:hover': {
                              bgcolor: 'primary.50'
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box ml={3}>
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/jobs/${job.id}`)}
                      sx={{ 
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        fontWeight: 500
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
        ))}      </Box>
    </Box>
  );
};

export default JobList;