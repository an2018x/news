import {React, useState, useEffect, useRef} from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Editor from 'for-editor';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Markdown from 'react-markdown';
import { Link } from "react-router-dom";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: "100%",
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(6),
  },
  button: {
      minWidth: "200px",
      margin: "2rem",
      marginLeft: "80%"
  },
  fontStyle: {
      fontFamily: "monospace",
      fontWeight: "450",
      fontSize: "1.2rem"
  }
}));


export default function NewsComment(props) {
  const [value, setValue] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [flag, setFlag] = useState(false);

  let $vm = useRef();

  const classes = useStyles();

  const username = localStorage.getItem("username");

  const handleChange = (value) => {
    setValue(value);
    }

    useEffect(() => {
        if(!flag) {
            setFlag(true)
            const config = {
                headers: { "Content-Type": "application/json" }
            };
            axios.post("/listComment", props.articleId, config).then(res=>{
                console.log(res);

                setCommentList(res.data.data.commentList);
            });
        }
    });

    

    const handleClick = () => {
        console.log(props)
        let param = {
            "commentAuthor": localStorage.getItem("username"),
            "commentArticle": props.articleId,
            "commentContent": value,
        }
        console.log(param)
        axios.post("/comment", param).then(res=>{
            console.log(res);
          });
          window.location.reload()
      }

    const uploadFile = file => {
        const param = new FormData();
        param.append("file", file);
      
        const config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
    
        axios.post("/upload", param, config).then(res => {
          console.log(res.data.data.fileUrl);
          $vm.current.$img2Url(file.name, res.data.data.fileUrl);
        });
      };


    

  return (
    <>
      
      <Paper className={classes.paper} elevation={3}>
          {username != null ? <>
        <Grid container wrap="nowrap" spacing={2} >
          <Grid item>
            <Avatar src={localStorage.getItem("avatar")}>An</Avatar>
          </Grid>
          <Grid item xs>
            <Typography>{username}</Typography>
          </Grid>
        </Grid>
        <br/> <br/>
        <Editor
            ref={$vm}
            value={value} 
            height="8rem"
            onChange={handleChange}
            addImg={($file) => uploadFile($file)}

         /> 
        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={handleClick}
                        >
                        提交评论
                        </Button>    
        </> : <Typography><Link to="/login" className={classes.link}>登录</Link>了才能发表评论哦~</Typography>}

        

      </Paper>
        {commentList.map((item) => <Paper className={classes.paper} elevation={3} key={item.commentId}>
            <Grid container wrap="nowrap" spacing={2} >
        <Grid item>
          <Avatar src={item.userAvatar}>An</Avatar>
        </Grid>
        <Grid item xs>
          <Typography>{item.commentAuthor}</Typography>
          <Typography>{moment(Number(item.gmtCreate)).format("YYYY-MM-DD HH:mm:ss")}</Typography>
        </Grid>
        </Grid>
        
        <div>
            <Markdown children={item.commentContent} className={classes.fontStyle} />
        </div>
      </Paper>)}
      </>
  );
}
