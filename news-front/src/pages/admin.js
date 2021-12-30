// Material Dashboard 2 PRO React Examples
import Navbar from "../component/nav";
import { Paper } from "@material-ui/core";
import UserTable from "../component/table/UserTable";
import ArticleTable from "../component/table/ArticleTable";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({


    paper: {
      margin: theme.spacing(20),
      padding: "5 rem"
      
    },
  }));

function Admin() {
    const classes = useStyles();
    const role = localStorage.getItem("role");
    return (
        <>
        <Navbar />
        { role=='ROLE_ADMIN' ? <>
        <UserTable /> 
        <ArticleTable /> </>:<h1>你没有权限访问</h1> }
        </>
    );

}

export default Admin;