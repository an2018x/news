package com.ans20xx.newsserver.VO;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
@Data
public class ArticleVO {

    private long articleId;
    private Date gmtCreate;
    private String articleAuthor;
    private String articleTitle;
    private String articleContent;
    private String articleHeadImage;
    private String articleAuthorAvatar;

}