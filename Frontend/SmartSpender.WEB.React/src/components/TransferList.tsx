import { useState, useMemo } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Checkbox, Button, Paper, TextField, Typography, Box, Divider, Stack, ListItemButton } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

interface TransferListProps<T> {
  left: T[];
  right: T[];
  setLeft: (items: T[]) => void;
  setRight: (items: T[]) => void;
  renderItem: (item: T) => React.ReactNode;
  idAccessor: (item: T) => string | number;
}

export function TransferList<T>({ left, right, setLeft, setRight, renderItem, idAccessor }: TransferListProps<T>) {
  const [checked, setChecked] = useState<T[]>([]);
  const [leftSearch, setLeftSearch] = useState('');
  const [rightSearch, setRightSearch] = useState('');

  const leftChecked = useMemo(() => checked.filter(item => left.includes(item)), [checked, left]);
  const rightChecked = useMemo(() => checked.filter(item => right.includes(item)), [checked, right]);

  const handleToggle = (item: T) => () => {
    const currentIndex = checked.findIndex(checkedItem => idAccessor(checkedItem) === idAccessor(item));
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(item);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(left.filter(item => !leftChecked.find(checked => idAccessor(checked) === idAccessor(item))));
    setChecked(checked.filter(item => !leftChecked.find(checked => idAccessor(checked) === idAccessor(item))));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(right.filter(item => !rightChecked.find(checked => idAccessor(checked) === idAccessor(item))));
    setChecked(checked.filter(item => !rightChecked.find(checked => idAccessor(checked) === idAccessor(item))));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const filteredLeft = useMemo(() => left.filter(item => renderItem(item)?.toString().toLowerCase().includes(leftSearch.toLowerCase())), [left, leftSearch, renderItem]);
  const filteredRight = useMemo(() => right.filter(item => renderItem(item)?.toString().toLowerCase().includes(rightSearch.toLowerCase())), [right, rightSearch, renderItem]);

  const customList = (title: React.ReactNode, items: T[], search: string, onSearchChange: (value: string) => void) => (
    <Paper
      elevation={0}
      sx={{
        width: 300,
        height: 480,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ p: 2, bgcolor: 'background.neutral' }}>
        <Typography variant="subtitle1" fontWeight="600" gutterBottom>{title}</Typography>
        <Typography variant="caption" color="text.secondary">{items.length} items</Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 1 }}>
        <TextField
          placeholder="Search..."
          variant="outlined"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Box>
      <List dense component="div" role="list" sx={{ flexGrow: 1, overflow: 'auto', p: 0 }}>
        {items.map((item: T) => {
          const labelId = `transfer-list-item-${idAccessor(item)}-label`;
          return (
            <ListItem
              key={idAccessor(item)}
              role="listitem"
              disablePadding
            >
              <ListItemButton onClick={handleToggle(item)} dense>
                <ListItemIcon>
                  <Checkbox
                    checked={checked.findIndex(checkedItem => idAccessor(checkedItem) === idAccessor(item)) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    size="small"
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={renderItem(item)} primaryTypographyProps={{ fontSize: 14 }} />
              </ListItemButton>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Stack direction="row" spacing={3} justifyContent="center" alignItems="center">
      <Box>{customList('Available Options', filteredLeft, leftSearch, setLeftSearch)}</Box>
      <Box>
        <Stack spacing={1}>
          <Button variant="outlined" size="small" onClick={handleAllRight} disabled={left.length === 0} aria-label="move all right">
            <KeyboardDoubleArrowRightIcon />
          </Button>
          <Button variant="outlined" size="small" onClick={handleCheckedRight} disabled={leftChecked.length === 0} aria-label="move selected right">
            <KeyboardArrowRightIcon />
          </Button>
          <Button variant="outlined" size="small" onClick={handleCheckedLeft} disabled={rightChecked.length === 0} aria-label="move selected left">
            <KeyboardArrowLeftIcon />
          </Button>
          <Button variant="outlined" size="small" onClick={handleAllLeft} disabled={right.length === 0} aria-label="move all left">
            <KeyboardDoubleArrowLeftIcon />
          </Button>
        </Stack>
      </Box>
      <Box>{customList('Selected', filteredRight, rightSearch, setRightSearch)}</Box>
    </Stack>
  );
}
