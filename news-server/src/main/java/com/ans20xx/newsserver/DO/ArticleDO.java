package com.ans20xx.newsserver.DO;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Data
public class ArticleDO {

    private long articleId;
    private Date gmtCreate;
    private long articleAuthor;
    private String articleTitle;
    private String articleContent;
    private String articleHeadImage;

}
