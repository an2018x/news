import {React, useState, useRef} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import localStorage from 'localStorage';
import { useNavigate  } from 'react-router-dom'
// 在最后导出对象时，用 `withRouter` 函数对 index 进行包装

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://blog.ans20xx.com">
        ans20xx.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: theme.spacing(0),
    marginBottom: theme.spacing(6),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function LoginForm() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };     

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen2(false);
  };     

  const handleClose3 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen3(false);
  };   

  const submitRef = () => {
    let object = {
      "userName": usernameRef.current.value,
      "userPassword": passwordRef.current.value
    }

    axios.post("/login",object).then(res => {
      // console.log(res);

      if( res.data.code != 200) {
        if (res.data.info == "用户不存在"){
          setOpen(true);
        } else {
          setOpen2(true);
        }
      } else {
        setOpen3(true);
        localStorage.setItem("username", res.data.data.username);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("avatar", res.data.data.avatar);
        localStorage.setItem("role", res.data.data.role);
        // promise
        let fun = () => console.log('time out');
        let sleep= (time)=> new Promise((resolve)=>{
          setTimeout(resolve,time)
        })
        sleep(500).then((res)=>{
          navigate("/");
        });

      }
      


    });
    // console.log(usernameRef.current.value, passwordRef.current.value);
  }

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon style={{ fontSize: 40 }}/>
        </Avatar>
        <Typography component="h1" variant="h4" style={{ fontFamily: "monospace" }} >
          登录
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Username"
            name="name"
            autoComplete="username"
            autoFocus
            inputRef={usernameRef}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passwordRef}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitRef}
          >
            登录
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            用户不存在
          </Alert>
        </Snackbar>
        <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
          <Alert onClose={handleClose2} severity="error">
            密码错误
          </Alert>
        </Snackbar>
        <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose3}>
          <Alert onClose={handleClose3} severity="success">
            登录成功
          </Alert>
        </Snackbar>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

