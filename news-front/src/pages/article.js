import {React,  useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Navbar from '../component/nav/index';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import "./article.css"
import Paper from '@material-ui/core/Paper';
import NewsComment from '../component/comment/comment'
import { Avatar } from '@material-ui/core';
import { Link } from '@material-ui/core';
import Markdown from 'react-markdown';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: "#fff"
    },
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url({img})`,
        height: "500px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "4rem",
        [theme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: "1em"
        }
    },
    blogsContainer: {
        paddingTop: theme.spacing(3)
    },
    blogTitle: {
        fontWeight: 800,
        paddingBottom: theme.spacing(3)
    },
    card: {
        maxWidth: "100%",
    },
    media: {
        height: 240
    },
    cardActions: {
        display: "flex",
        margin: "0 10px",
        justifyContent: "space-between"
    },
    author: {
        display: "flex"
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center"
    },
    fontStyle: {
        fontFamily: "monospace",
        fontWeight: "450",
        fontSize: "1.2rem"
    },
    paper: {
        maxWidth: "100%",
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(6),
      },
    text: {
        fontWeight: 600,
        margin: 0,
        marginTop: '0.5em',
        marginLeft: '1rem',
        color: "orange",
    }
}));

function Article() {
    const classes = useStyles();
    const params = useParams()  
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');
    const [param, setParam] = useState(params);
    const [avatar, setAvatar] = useState('')
    const [author, setAuthor] = useState('')


    useEffect(() => {
        // console.log(classes.hero);
        
        if(title == '') {
            // console.log(param.id);
            const config = {
                headers: { "Content-Type": "application/json" }
            };
            axios.post("/article", param.id, config).then(res=>{
                console.log(res);
                setContent(res.data.data.article.articleContent);
                setTitle(res.data.data.article.articleTitle);
                setImg(res.data.data.article.articleHeadImage);
                setAuthor(res.data.data.article.articleAuthor);
                setAvatar(res.data.data.article.articleAuthorAvatar);
              });
        }
      });

    return (
        <div className="App">
            {/* <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h6" color="primary" >
            Blog
          </Typography>
        </Toolbar>
      </AppBar> */}
            <Navbar />
            <Box className={classes.hero} style={{ background: `url('${img}') center center /cover` }}>
                <Box>{title}</Box>
            </Box>
            <Container maxWidth="lg" className={classes.blogsContainer}>
                
                <Paper className={classes.paper} elevation={3}>
                <Box className={classes.author}>
                  <Avatar src= {avatar} >An</Avatar> 
                    <Typography variant="subtitle1" component="h6" className={classes.text} >
                        {author}
                    </Typography>
                </Box>
                <Markdown children={content} className={classes.fontStyle} />
                </Paper>
                <NewsComment articleId={param.id}/>

            </Container>
        </div>
    );
}

export default Article;