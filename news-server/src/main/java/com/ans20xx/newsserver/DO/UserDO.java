package com.ans20xx.newsserver.DO;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;

@Data
@Component
public class UserDO  {

    private Long userId;
    private String userName;
    private String userPassword;
    private String userRole;
    private Date gmtCreate;
    private String userAvatar;
}
