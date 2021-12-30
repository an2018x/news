package com.ans20xx.newsserver.mapper;


import com.ans20xx.newsserver.DO.ArticleDO;
import com.ans20xx.newsserver.DO.CommentDO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentMapper {

    @Insert("insert into comment(gmt_create, comment_author, comment_article, comment_content)" +
            "values(now(), #{commentAuthor}, #{commentArticle}, #{commentContent})")
    void insert(CommentDO commentDO);

    @Select("select * from comment where comment_article = #{id} ")
    List<CommentDO> selectCommentsByArticleId(long id);

    @Select("select count(*) from comment where comment_author = #{userId}")
    long selectCommentCntByUser(long userId);

    @Select("select count(*) from comment where comment_article = #{articleId}")
    long selectCommentCntByArticle(long articleId);
}
