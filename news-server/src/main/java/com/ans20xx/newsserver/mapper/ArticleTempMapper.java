package com.ans20xx.newsserver.mapper;

import com.ans20xx.newsserver.DO.ArticleDO;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleTempMapper {

    @Insert("insert into article_temp(gmt_create, article_author, article_title, article_content, article_head_image)" +
            "values(now(), #{articleAuthor}, #{articleTitle}, #{articleContent}, #{articleHeadImage})")
    void insert(ArticleDO article);

    @Select("select * from article_temp order by gmt_create desc limit #{pageStart}, #{pageNum}")
    List<ArticleDO> selectArticlesByPage(long pageStart, long pageNum);

    @Select("select * from article_temp where article_author = #{userId} ")
    List<ArticleDO> selectArticlesByUser(long userId);

    @Select("select * from article_temp where article_id = #{id} ")
    ArticleDO selectArticlesById(long id);

    @Select("select count(*) from article_temp")
    long selectArticleCount();

    @Select("select count(*) from article_temp where article_author = #{userId}")
    long selectArticleCntByUser(long userId);

    @Select("select article_id, gmt_create, article_author, article_title from article_temp")
    List<ArticleDO> selectAll();

    @Update("update article_temp set gmt_create = now(), article_author = #{articleAuthor}, article_title = #{articleTitle}, " +
            "article_content = #{articleContent}, article_head_image = #{articleHeadImage} where article_id = #{articleId}")
    void update(ArticleDO articleDO);

    @Delete("delete from article_temp where article_id = #{id}")
    void delete(long id);
}

