import "./App.css";
import React, { useState } from "react";
import {
  Container,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";



import BudgetContainer from "./components/BudgetContainer";

const App = () => {
  
  const [addedOpen, setAddedOpen] = useState(false);
  const [deletedOpen, setDeletedOpen] = useState(false);

  return (
    <div className="App">
      <Container maxWidth="md">
        <BudgetContainer openAdded={setAddedOpen} openDeleted={setDeletedOpen} />
      </Container>
      <Snackbar
        open={addedOpen}
        autoHideDuration={3000}
        onClose={() => setAddedOpen(false)}
      >
        <Alert>
          <AlertTitle>Added</AlertTitle>
          Successfully added item to budget
        </Alert>
      </Snackbar>

      <Snackbar
        open={deletedOpen}
        autoHideDuration={3000}
        onClose={() => setDeletedOpen(false)}
      >
        <Alert severity="error">
          <AlertTitle>Deleted</AlertTitle>
          Successfully deleted item from budget
        </Alert>
      </Snackbar>
    </div>
  );
};

export default App;
