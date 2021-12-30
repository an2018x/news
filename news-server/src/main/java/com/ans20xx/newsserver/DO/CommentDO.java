package com.ans20xx.newsserver.DO;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.Date;

@Data
@Component
public class CommentDO {
    private long commentId;
    private long commentAuthor;
    private long commentArticle;
    private String commentContent;
    private Date gmtCreate;
}
