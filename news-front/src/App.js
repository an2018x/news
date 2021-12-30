import { React, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Pagination from '@material-ui/lab/Pagination';
import Navbar from './component/nav/index';
import axios from 'axios';
import Link from '@material-ui/core/Link';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff"
  },
  hero: {
    backgroundImage: `url('http://www.xinhuanet.com/photo/1127025614_16116254826551n.jpg')`,
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontFamily: "monospace",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em"
    }
  },
  blogsContainer: {
    paddingTop: theme.spacing(3)
  },
  blogTitle: {
    fontFamily: "monospace",
    fontWeight: 800,
    paddingBottom: theme.spacing(3)
  },
  card: {
    fontFamily: "monospace",
    maxWidth: "100%",
  },
  media: {
    height: 240
  },
  cardActions: {
    fontFamily: "monospace",
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
  text: {
    fontWeight: 600,
      margin: 0,
      color: "black",
  },
  text2: {
    fontWeight: 500,
      margin: 0,
      color: "grey",
  }
}));

function App() {
  const classes = useStyles();
  const [count, setCount] = useState(9);
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  
  const getCount = () => {
    axios.post("/count").then(res=>{
      setCount(res.data.data.count);
    });
  }





  const handleChange = (e, value) => {
    axios.post("/count").then(res=>{
      // console.log(res.data.data.count)
      setCount(res.data.data.count);
    });
    // console.log(value)
    let param = {
      begin: value,
      size: 9
    }
    axios.post("/page", param).then(res=>{
      // console.log(res);
      setList(res.data.data.list);
      // console.log(list);
    });
    setPage(value);
  }

  useEffect(() => {
    if(list.length<1) {
      let value=1;
      axios.post("/count").then(res=>{
        // console.log(res.data.data.count)
        setCount(res.data.data.count);
      });
      // console.log(value)
      let param = {
        begin: value,
        size: 9
      }
      axios.post("/page", param).then(res=>{
        // console.log(res);
        setList(res.data.data.list);
        // console.log(list);
      });
      // setPage(value);
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
      <Box className={classes.hero} >
        <Box>安新闻</Box>
      </Box>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Typography variant="h4" className={classes.blogTitle}>
          最新热点
        </Typography>
        <Grid container spacing={3}>
          
          {list.map((item) => 
            
            <Grid item xs={12} sm={6} md={4}  key={item.articleId}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={item.articleHeadImage}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" style={{fontFamily: "monospace", fontWeight: 900}}>
                  {item.articleTitle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" style={{fontFamily: "monospace",fontWeight: 500}}>
                    {item.articleContent}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.cardActions}>
                <Box className={classes.author}>
                  <Avatar src= {item.articleAuthorAvatar} >An</Avatar> 
                  <Box ml={2}>
                    <Typography variant="subtitle2" component="p" className={classes.text}>
                      {item.articleAuthor}
                    </Typography>
                    <Typography variant="subtitle2" component="p" className={classes.text2}>
                    {moment(Number(item.gmtCreate)).format("YYYY-MM-DD HH:mm:ss")}
                    </Typography>
                  </Box>
                </Box>
                <Link href={"/article/"+item.articleId}>
                  阅读更多
                </Link>
              </CardActions>
            </Card>
          </Grid>
          
          )}

          
          
        </Grid>
        
        <Box my={4} className={classes.paginationContainer}>
          <Pagination count={count%9==0?(count/9):(count/9+1)} onChange={handleChange} />
        </Box>
      </Container>
    </div>
  );
}

export default App;