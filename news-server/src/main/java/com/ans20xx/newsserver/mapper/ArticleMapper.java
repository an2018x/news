package com.ans20xx.newsserver.mapper;

import com.ans20xx.newsserver.DO.ArticleDO;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleMapper {

    @Insert("insert into article(gmt_create, article_author, article_title, article_content, article_head_image)" +
            "values(now(), #{articleAuthor}, #{articleTitle}, #{articleContent}, #{articleHeadImage})")
    void insert(ArticleDO article);

    @Select("select * from article order by gmt_create limit #{pageStart}, #{pageNum} ")
    List<ArticleDO> selectArticlesByPage(long pageStart, long pageNum);

    @Select("select * from article where article_author = #{userId} ")
    List<ArticleDO> selectArticlesByUser(long userId);



}

