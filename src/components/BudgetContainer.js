import React, { useState, useEffect, useRef} from "react";
import {
  Card,
  Typography,
  CardContent,
  Button,
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import DownloadTwoToneIcon from "@mui/icons-material/DownloadTwoTone";
import ExpenseItem from "./ExpenseItem";

import useDownload from "../hooks/useDownload";

const categoryList = [
  "Bank",
  "Tax",
  "Entertainment",
  "Groceries",
  "Other",
  "Investment",
];

const BudgetContainer = (props) => {
  const [category, setCategory] = useState(categoryList[0]);
  const [inputCategory, setInputCategory] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [expensesList, setExpensesList] = useState([]);

  const [total, setTotal] = useState(false);
  const [errors, setErrors] = useState(false);

  let downloadBtn = useRef(null)
  const { fileName, download, downloadUrl } = useDownload(expensesList, downloadBtn);

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      expensesList.forEach((expense) => {
        total += parseFloat(expense.amount);
      });
      setTotal(total);
    };
    calculateTotal();
  }, [expensesList]);

  const validateField = () => {
    let errors = {};
    let isValid = true;

    if (inputCategory === "") {
      errors["category"] = "Category cannot be empty";
      isValid = false;
    }
    if (name === "") {
      errors["name"] = "cannot be empty";
      isValid = false;
    }
    if (amount.toString().length === 0) {
      errors["amount"] = "cannot be empty";
      isValid = false;
    }
    if (amount <= 0) {
      errors["amount"] = "cannot be inferior or equal to 0";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const updateField = (fieldName, value) => {
    switch (fieldName) {
      case "category":
        console.log(value);
        break;
      case "name":
        setName(value);
        break;
      case "amount":
        setAmount(value);
        break;

      default:
        break;
    }
  };

  const handleAddExpense = () => {
    if (validateField()) {
      setExpensesList((prevState) => {
        return [
          ...prevState,
          {
            id: Math.floor(Math.random() * 1000) + "_" + name,
            category,
            name,
            amount,
          },
        ];
      });
      props.openAdded(true)
      setName("");
      setAmount("");
    }
  };

  const handleDeleteExpense = (id) => {
    setExpensesList((prevState) => {
      let newList = prevState.filter((expense) => expense.id !== id);
      return newList;
    });
    props.openDeleted(true)
  };

  return (
    <Card sx={{ minWidth: 700 }}>
      <CardContent>
        <Typography variant="h2" color="orangered" gutterBottom>
          Budget calculator
        </Typography>
        <Grid container>
          <Grid item xs={3}>
            <Autocomplete
              value={category}
              onChange={(e, newValue) => setCategory(newValue)}
              inputValue={inputCategory}
              onInputChange={(e, newInputValue) => {
                setInputCategory(newInputValue);
              }}
              id="category"
              options={categoryList}
              renderInput={(params) => (
                <TextField
                  error={errors["category"] ? true : false}
                  helperText={errors["category"] ? errors["category"] : null}
                  {...params}
                  label="Category"
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              error={errors["name"] ? true : false}
              helperText={errors["name"] ? errors["name"] : null}
              id="name"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              error={errors["amount"] ? true : false}
              helperText={errors["amount"] ? errors["amount"] : null}
              id="amount"
              label="Amount"
              variant="outlined"
              type="number"
              value={amount}
              onChange={(e) => updateField("amount", e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button onClick={() => handleAddExpense()}>
              <AddCircleTwoToneIcon fontSize="large" />
            </Button>
          </Grid>
        </Grid>

        <Grid container mt={3}>
          <Grid item xs={3}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Category
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Name
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Amount
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>

        {expensesList.map((expense) => {
          return (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              deleteExpense={handleDeleteExpense}
            />
          );
        })}
        <Grid container mt={5}>
          <Grid item xs={9}>
            <Typography variant="h4" gutterBottom>
              Total: {total}$
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Button variant="outlined" onClick={(e) => download(e)}>
              <DownloadTwoToneIcon fontSize="large" />
              <Typography variant="button" gutterBottom>
                Download report
              </Typography>
            </Button>
            <a
              style={{ display: "none" }}
              href={downloadUrl}
              ref={ downloadBtn }
              download ={fileName}
            >
              download it
            </a>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BudgetContainer;
