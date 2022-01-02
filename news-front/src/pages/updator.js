import React, { Component, createRef } from "react"
import Editor from 'for-editor'
import Navbar from '../component/nav/index';
import {
    withStyles,
    makeStyles,
} from "@material-ui/core";
import "./list.css"
// import Axios from "../axios/axios";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import { useParams } from "react-router";

const useStyles ={
    editormargin: {
        margin: '4rem',
        listStyle: 'none' 
    },
    chipmargin: {
        margin: '1rem'
    },
    center: {
        marginLeft: "auto",
        marginRight: "auto"
    },
    button: {
        margin: "2rem",
        marginLeft: "40%",
        marginRight: "50%",
        minWidth: "200px",
        maxWidth: "200px",
        minHeight: "50px"
    },
    paper: {
        fontFamily: "monospace",
        maxWidth: "100%",
        margin: `5rem`,
        padding: "20px",
    },
    pfront: {
        fontFamily: "monospace",
        margin: "4rem"
    }
    
};

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

class Updator extends Component {
    constructor(props) {
        super(props)
        // console.log(props)
        this.state = {
            headImageName: '',
            value: '',
            open: false,
            articleTitle: ''
        }
        this.author = '';
        this.$vm = React.createRef();
        this.articleHeadImage = ''
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.flag = false;
        this.getArticle();
    }

    getArticle() {
        if(!this.flag) {
            this.flag = true;
            // console.log(this.param.id);
            let id = this.props.params.id
            const config = {
                headers: { "Content-Type": "application/json" }
            };
            axios.post("/article", id, config).then(res=>{
                console.log(res);
                this.setState({headImageName: res.data.data.article.articleHeadImage})
                this.headImageUrl = res.data.data.article.articleHeadImage;
                this.setState({value: res.data.data.article.articleContent});
                this.articleTitle = res.data.data.article.articleTitle;
                this.author = res.data.data.article.articleAuthor;
                this.setState({articleTitle: res.data.data.article.articleTitle});
              });
        }
    }


    handleImageChange(e) {
        let file = e.target.files[0];
        const param = new FormData();
        param.append("file", file);
        const config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
        axios.post("/upload", param, config).then(res => {
            this.setState({headImageName: file.name})
            this.headImageUrl = res.data.data.fileUrl;
          });
    }

    handleChange(value) {
        this.setState({
            value
        })
    }
    
    uploadFile = file => {
        const param = new FormData();
        param.append("file", file);
      
        const config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
    
        axios.post("/upload", param, config).then(res => {
          console.log(res.data.data.fileUrl);
          this.$vm.current.$img2Url(file.name, res.data.data.fileUrl);
        });
      };

    handleSubmit(value) {
        let object = {
            "articleId": this.props.params.id,
            "articleAuthor": this.author,
            "articleTitle": this.articleTitle,
            "articleContent": this.state.value,
            "articleHeadImage": this.headImageUrl
        }
        console.log(object)
        axios.post("/update", object).then(res => {
            console.log(res);
            this.setState({open: true})
        });
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({open: false})
      };  

    addImg($file) {
        this.uploadFile($file)
    }

    handleDelete() {
        this.headImageUrl = '';
        this.setState({headImageName: ''})
    }

    handleTitleChange(e) {
        this.articleTitle = e.target.value;
    }

    render() {
        const {  headImageName, value} = this.state
        return (
            <>
                <Navbar />
                
                <Paper className={this.props.classes.paper}>
                    <form className={this.props.classes.editormargin} noValidate>
                        <Typography component="h1" variant="h3" align="center" className={this.props.classes.pfront}>
                            修改新闻稿件
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="新闻标题"
                            onChange={this.handleTitleChange}
                            value={this.state.articleTitle}
                            autoFocus

                        />

                        <Button
                            className={this.props.classes.button}
                            variant="contained"
                            component="label"
                            color="primary"
                            onChange={this.handleImageChange}
                        >     
                        上传新闻头图
                            <input
                                type="file"
                                hidden
                            />
                        </Button> 
                        <Chip
                            avatar={<Avatar>Pic</Avatar>}
                            label={headImageName}
                            clickable
                            color="primary"
                            className={this.props.classes.chipmargin}
                            onDelete={this.handleDelete}
                        />
                        <div >    
                            <Editor
                                    ref={this.$vm}
                                    value={value} 
                                    onChange={(value) => this.handleChange(value)} 
                                    addImg={($file) => this.addImg($file)}
                                    height="50rem" />
                        </div>
                        <Button
                            className={this.props.classes.button}
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                        >
                        更新稿件
                        </Button>
                        <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity="success">
                            更新成功
                        </Alert>
                        </Snackbar>
                        
                    </form>
                </Paper>

            </>
        )
    }
}

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

export default withParams(withStyles(useStyles)(Updator))
