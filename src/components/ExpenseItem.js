import { Typography, Grid, Button, Paper } from "@mui/material";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";

const ExpenseItem = (props) => {
  const { id, category, name, amount } = props.expense;
  const { deleteExpense } = props;
  return (
    <Paper elevation={1} sx={{ marginBottom: 3, padding: 1 }}>
      <Grid container>
        <Grid item xs={3}>
          <Typography sx={{ fontSize: 25, marginTop: 0.9}} gutterBottom>
            {category}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontSize: 25, marginTop: 0.9 }} gutterBottom>
            {name}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{ fontSize: 25, marginTop: 0.9}} gutterBottom>
            {amount}$
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button color="error" onClick={() => deleteExpense(id)}>
            <DeleteSweepTwoToneIcon color="error" fontSize="large" />
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ExpenseItem;
