import React from 'react';
import {
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  Slider,
  Button
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

interface FilterPanelProps {
  typeFilter: string;
  limit: number;
  onTypeChange: (type: string) => void;
  onLimitChange: (limit: number) => void;
  onReset: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  typeFilter,
  limit,
  onTypeChange,
  onLimitChange,
  onReset
}) => {
  const handleTypeChange = (event: SelectChangeEvent) => {
    onTypeChange(event.target.value);
  };

  const handleLimitChange = (_event: Event, newValue: number | number[]) => {
    onLimitChange(newValue as number);
  };

  const marks = [
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' }
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <FilterListIcon sx={{ mr: 1, color: '#1976d2' }} />
        <Typography variant="h6">Filters</Typography>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Notification Type</InputLabel>
          <Select value={typeFilter} label="Notification Type" onChange={handleTypeChange}>
            <MenuItem value="All">All Types</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ minWidth: 300 }}>
          <Typography gutterBottom>
            Show Top <strong>{limit}</strong> Notifications
          </Typography>
          <Slider
            value={limit}
            onChange={handleLimitChange}
            step={null}
            marks={marks}
            min={10}
            max={20}
            valueLabelDisplay="auto"
            sx={{ color: '#1976d2' }}
          />
        </Box>

        <Button 
          variant="outlined" 
          onClick={onReset}
        >
          Reset Filters
        </Button>
      </Box>
    </Paper>
  );
};

export default FilterPanel;