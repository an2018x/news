package com.ans20xx.newsserver.DO;

import lombok.Data;

import java.util.Date;

@Data
public class TokenDO {

    private Long tokenID;
    private String tokenStr;
    private Long tokenUser;
    private Date gmtCreate;

}


//create table token (
//token_id bigint primary key auto_increment,
//token_str text,
//token_user bigint,
//gmt_create date,
//
//constraint fk_token_user foreign key(token_user) references user(user_id)
//);
