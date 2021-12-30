import {React, useState} from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./drawer";
import localStorage from 'localStorage';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "sticky",
    top: 0,
    background: "#fff",
    fontFamily: "monospace",
  },
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    fontFamily: "monospace",
    flexGrow: "1",
    fontWeight: 20,
    color: "black",
    cursor: "pointer",
  },
  avatar: {
    width: "1.8rem",
    height: "1.8rem",
    margin: 0,
    marginLeft: theme.spacing(6)
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: "20px",
    marginLeft: theme.spacing(6),
    "&:hover": {
      color: "orange",
      borderBottom: "1px solid white",
    },
  },
  link2: {
    textDecoration: "none",
    color: "black",
    fontSize: "20px",
    marginLeft: theme.spacing(2),
    "&:hover": {
      color: "orange",
      borderBottom: "1px solid white",
    },
  }
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  console.log(role);

  const handleClick = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("avatar");
    localStorage.removeItem("role");
    username = null;
  }

  return (
    <AppBar position="static" className={classes.appBar}>
      <CssBaseline />
      <Toolbar>
        <Typography variant="h5" className={classes.logo}>
          安新闻
          
        </Typography>
        {isMobile ? 
          <DrawerComponent />
         : 
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              首页
            </Link>
            {username == null ?
            <>
              <Link to="/login" className={classes.link}>
                登录
              </Link>
              <Link to="/register" className={classes.link}>
                注册
              </Link>
              </>:<>
              
              
             <Link to="/edit" className={classes.link}>
               投稿
             </Link>
             <Link to="/" onClick={handleClick} className={classes.link}>
               登出
             </Link>
             {role == 'ROLE_ADMIN' ?
              <Link to="/admin" className={classes.link}>
                后台
            </Link>:< > </>
            }
            <Avatar src={localStorage.getItem("avatar")} className={classes.avatar}>
                An
              </Avatar>
              <Link to="" className={classes.link2}>
               {username}
             </Link>
             </>}
          </div>
        }
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;