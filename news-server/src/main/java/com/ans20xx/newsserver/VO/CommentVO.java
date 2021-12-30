package com.ans20xx.newsserver.VO;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Data
public class CommentVO {
    private long commentId;
    private String commentAuthor;
    private long commentArticle;
    private String commentContent;
    private Date gmtCreate;
    private String userAvatar;
}
