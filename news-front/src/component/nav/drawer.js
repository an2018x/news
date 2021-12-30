import React, { useState } from "react";
import {
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(() => ({
    link: {
        textDecoration: "none",
        color: "blue",
        fontSize: "16px"
    },
    icon: {
        color: "white"
    },
    item: {
        width: "300px"
    },
    list: {
        backgroundColor: "blue"
    }
}));

function DrawerComponent() {
    const username = localStorage.getItem("username");
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleClick = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        username = null;
      }
    return (
        <>
            <Drawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <List >
                    <ListItem className={classes.item} onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/" className={classes.link}>首页</Link>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    {username == null ? <> 
                    <ListItem className={classes.item} onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/login" className={classes.link}>登录</Link>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem className={classes.item} onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/register" className={classes.link}>注册</Link>
                        </ListItemText>
                    </ListItem>
                    <Divider /> </>: <> 
                    <ListItem className={classes.item} onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/edit" className={classes.link}>投稿</Link>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem className={classes.item} onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/" className={classes.link}>登出</Link>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    </>}
                </List>
            </Drawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)} className={classes.icon}>
                <MenuIcon color="primary"/>
            </IconButton>
        </>
    );
}
export default DrawerComponent;