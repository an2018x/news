import RegisterForm from '../component/form/registerForm';
import NavBar from '../component/nav/index';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        minWidth: "30rem",
        maxWidth: "35rem",
        margin: `${theme.spacing(6)}px auto`,
        padding: theme.spacing(5),
    }
  }));
function Register() {

    const classes = useStyles();

    return (
        <>
            <NavBar />
            <Paper className={classes.paper} elevation={3}>
                <RegisterForm />
            </Paper>
        </>
    );
}

export default Register;