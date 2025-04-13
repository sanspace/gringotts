// src/pages/AccountPage.tsx
import React, { useState, useEffect} from 'react';
import { useAuth } from '../context/AuthContext'; // To get user info
import { Link } from 'react-router-dom';

// MUI Components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'; // <-- Keep importing Grid
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress'; // For loading state
import Alert from '@mui/material/Alert'; // For error state

// MUI Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

// --- Placeholder Data ---
interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
}

const DUMMY_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2025-04-12', description: 'Coffee Shop', amount: -5.50, type: 'debit' },
  { id: 't2', date: '2025-04-11', description: 'Salary Deposit', amount: 2500.00, type: 'credit' },
  { id: 't3', date: '2025-04-10', description: 'Grocery Store', amount: -75.20, type: 'debit' },
  { id: 't4', date: '2025-04-09', description: 'Online Subscription', amount: -15.00, type: 'debit' },
  { id: 't5', date: '2025-04-08', description: 'Book Purchase', amount: -25.99, type: 'debit' },
];

const DUMMY_BALANCE = 5340.75;
const DUMMY_ACCOUNT_NUMBER = '9154308411'; 
// --- End Placeholder Data ---

const AccountPage: React.FC = () => {
  const { user } = useAuth();

  // --- State for actual data (replace placeholders) ---
  const [accountBalance, setAccountBalance] = useState<number | null>(null); // Start as null
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Start as empty
  const [accountNumber, setAccountNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Start loading true
  const [error, setError] = useState<string | null>(null); // To store potential errors

  // --- Mock Data Fetching Effect (replace with real API calls) ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Assume API calls succeed and return dummy data
        setAccountBalance(DUMMY_BALANCE);
        setTransactions(DUMMY_TRANSACTIONS);
        setAccountNumber(DUMMY_ACCOUNT_NUMBER);

        // --- Example Error Handling (uncomment to test) ---
        // throw new Error("Failed to load account data from server.");

      } catch (err) {
        console.error("Failed to fetch account data:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
        setAccountBalance(null); // Clear data on error
        setTransactions([]);
        setAccountNumber(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Runs once on mount

  // --- Helper Functions ---
  const formatCurrency = (amount: number) => {
    // Using 'en-IN' locale and 'INR' currency based on context
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    // Basic date formatting, consider using date-fns for more robust needs
    return new Date(dateString).toLocaleDateString('en-IN', { // Use appropriate locale
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
  };

  const maskAccountNumber = (accNum: string | null | undefined): string => {
    if (!accNum || accNum.length <= 4) {
      // Handle null, undefined, or short numbers gracefully
      return accNum || 'N/A';
    }
    const lastFourDigits = accNum.slice(-4);
    // Adjust the number of 'X's if needed, keeping it simple here
    return `XXXXXXXX${lastFourDigits}`;
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}> {/* Vertical margin */}

        {/* Back Button */}
        <Box sx={{ mb: 3 }}> {/* Spacing below button */}
            <Button
                component={Link}
                to="/dashboard"
                variant="outlined"
                size="small"
                startIcon={<ArrowBackIcon />}
            >
                Back to Dashboard
            </Button>
        </Box>

        {/* Page Title */}
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
          Account Details
        </Typography>

        {/* Account Holder Name */}
        <Box sx={{ color: 'text.secondary', mb: 3 }}>
            <Typography variant="subtitle1" component="p">
                {/* Wrapped label in Box with bold style */}
                <Box component="span" sx={{ fontWeight: 'bold', mr: 0.5 }}> {/* mr for spacing */}
                    Account Holder:
                </Box>
                {user?.full_name || 'N/A'}
            </Typography>
        </Box>

        {/* Account Number */}
        <Box sx={{ color: 'text.secondary', mb: 3 }}>
          <Typography variant="subtitle1" component="p">
              <Box component="span" sx={{ fontWeight: 'bold', mr: 0.5 }}>
                  Account Number:
              </Box>
              {/* Use state variable and masking function */}
              {maskAccountNumber(accountNumber)}
          </Typography>
        </Box>

        {/* Loading State */}
        {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
                <CircularProgress />
            </Box>
        )}

        {/* Error State */}
        {error && !loading && (
            <Alert severity="error" sx={{ my: 2 }}>
                {error}
            </Alert>
        )}

         {/* Content Grid (Only render if not loading and no error) */}
         {!loading && !error && (
            <Grid container spacing={3}> {/* v7: Container is correct */}

                {/* Grid Item 1: Account Balance */}
                {/* Applying responsive object to 'size' prop based on ProfilePage and v7 API */}
                <Grid size={{ xs: 12, md: 4 }}> {/* <-- UPDATED: Use size prop with object */}
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                       <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                           <AccountBalanceWalletIcon color="primary" sx={{ mr: 1 }} />
                           <Typography variant="h6" component="h2">
                               Account Balance
                           </Typography>
                       </Box>
                       <Typography variant="h4" component="p" sx={{ mt: 2, pt: 0 }}>
                          {accountBalance !== null ? formatCurrency(accountBalance) : 'N/A'}
                       </Typography>
                    </Paper>
                </Grid>

                {/* Grid Item 2: Recent Transactions */}
                {/* Applying responsive object to 'size' prop based on ProfilePage and v7 API */}
                <Grid size={{ xs: 12, md: 8 }}> {/* <-- UPDATED: Use size prop with object */}
                    <Paper sx={{ p: 2, height: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                             <ReceiptLongIcon color="primary" sx={{ mr: 1 }}/>
                           <Typography variant="h6" component="h2">
                               Recent Transactions
                           </Typography>
                       </Box>
                       <TableContainer>
                           <Table stickyHeader size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell align="right">Amount (INR)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transactions.length > 0 ? (
                                        transactions.map((transaction) => (
                                            <TableRow
                                                key={transaction.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {formatDate(transaction.date)}
                                                </TableCell>
                                                <TableCell>{transaction.description}</TableCell>
                                                <TableCell
                                                    align="right"
                                                    sx={{ color: transaction.type === 'credit' ? 'success.main' : 'error.main' }}
                                                >
                                                    {formatCurrency(transaction.amount)}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} align="center">
                                                No recent transactions found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                       </TableContainer>
                    </Paper>
                </Grid>

            </Grid> // End Grid container
        )}
        {/* End conditional rendering block */}

      </Box> {/* End main content Box */}
    </Container>
  );
};

export default AccountPage;
