import { useState, useMemo } from 'react';
import { Grid, List, ListItem, ListItemText, ListItemIcon, Checkbox, Button, Paper, TextField } from '@mui/material';

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
    <Paper sx={{ width: 300, height: 400, overflow: 'auto' }}>
      <TextField
        label={title}
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ m: 1, width: 'calc(100% - 16px)' }}
      />
      <List dense component="div" role="list">
        {items.map((item: T) => {
          const labelId = `transfer-list-item-${idAccessor(item)}-label`;
          return (
            <ListItem key={idAccessor(item)} role="listitem" button onClick={handleToggle(item)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.findIndex(checkedItem => idAccessor(checkedItem) === idAccessor(item)) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={renderItem(item)} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList('Not Included', filteredLeft, leftSearch, setLeftSearch)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button sx={{ my: 0.5 }} variant="outlined" size="small" onClick={handleAllRight} disabled={left.length === 0}>
            ≫
          </Button>
          <Button sx={{ my: 0.5 }} variant="outlined" size="small" onClick={handleCheckedRight} disabled={leftChecked.length === 0}>
            &gt;
          </Button>
          <Button sx={{ my: 0.5 }} variant="outlined" size="small" onClick={handleCheckedLeft} disabled={rightChecked.length === 0}>
            &lt;
          </Button>
          <Button sx={{ my: 0.5 }} variant="outlined" size="small" onClick={handleAllLeft} disabled={right.length === 0}>
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Included', filteredRight, rightSearch, setRightSearch)}</Grid>
    </Grid>
  );
}
