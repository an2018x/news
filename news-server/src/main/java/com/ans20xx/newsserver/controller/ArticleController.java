package com.ans20xx.newsserver.controller;

import com.ans20xx.newsserver.DO.ArticleDO;
import com.ans20xx.newsserver.DO.UserDO;
import com.ans20xx.newsserver.VO.ArticleVO;
import com.ans20xx.newsserver.VO.PageVO;
import com.ans20xx.newsserver.mapper.ArticleMapper;
import com.ans20xx.newsserver.mapper.ArticleTempMapper;
import com.ans20xx.newsserver.mapper.CommentMapper;
import com.ans20xx.newsserver.mapper.UserMapper;
import com.ans20xx.newsserver.response.MyResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ArticleController {

    @Resource
    private ArticleTempMapper articleTempMapper;

    @Resource
    private UserMapper userMapper;

    @Resource
    private CommentMapper commentMapper;

    @PostMapping("/edit")
    public MyResponse edit(@RequestBody ArticleVO articleVO) {
        ArticleDO articleDO = new ArticleDO();
        UserDO userDO = userMapper.selectUserByName(articleVO.getArticleAuthor());
        articleDO.setArticleAuthor(userDO.getUserId());
        articleDO.setArticleContent(articleVO.getArticleContent());
        articleDO.setArticleHeadImage(articleVO.getArticleHeadImage());
        articleDO.setArticleTitle(articleVO.getArticleTitle());
        articleTempMapper.insert(articleDO);
        return MyResponse.getSuccess("success");
    }

    @PostMapping("/count")
    public MyResponse count() {
        long cnt = articleTempMapper.selectArticleCount();
        HashMap<String, Object> map = new HashMap<>();
        map.put("count", cnt);
        return MyResponse.getSuccess(map);
    }

    @PostMapping("/page")
    public MyResponse page(@RequestBody PageVO pageVO) {
        int begin = (pageVO.getBegin()-1)*9;
        int size = pageVO.getSize();
        List<ArticleDO> articleDOList = articleTempMapper.selectArticlesByPage(begin, size);
        List<ArticleVO> articleVOList = new ArrayList<>();
        for (ArticleDO articleDO : articleDOList) {
            UserDO userDO = userMapper.selectUserById(articleDO.getArticleAuthor());
            String name = userDO.getUserName();
            ArticleVO articleVO = new ArticleVO();
            articleVO.setArticleAuthor(name);
            articleVO.setArticleAuthorAvatar(userDO.getUserAvatar());
            articleVO.setArticleId(articleDO.getArticleId());
            articleVO.setArticleTitle(articleDO.getArticleTitle());
            articleVO.setArticleHeadImage(articleDO.getArticleHeadImage());
            articleVO.setGmtCreate(articleDO.getGmtCreate());
            String content = articleDO.getArticleContent();
            articleVO.setArticleContent(content.length()>100? content.substring(0, 100): content);
            articleVOList.add(articleVO);
        }

        HashMap<String, Object> map = new HashMap<>();
        map.put("list", articleVOList);
        return MyResponse.getSuccess(map);
    }

    @PostMapping("/article")
    public MyResponse article(@RequestBody long id) {
        ArticleDO articleDO = articleTempMapper.selectArticlesById(id);

        ArticleVO articleVO = new ArticleVO();
        UserDO userDO = userMapper.selectUserById(articleDO.getArticleAuthor());
        String name = userDO.getUserName();
        articleVO.setArticleAuthor(name);
        articleVO.setArticleAuthorAvatar(userDO.getUserAvatar());
        articleVO.setArticleId(articleDO.getArticleId());
        articleVO.setArticleTitle(articleDO.getArticleTitle());
        articleVO.setArticleHeadImage(articleDO.getArticleHeadImage());
        articleVO.setGmtCreate(articleDO.getGmtCreate());
        String content = articleDO.getArticleContent();
        articleVO.setArticleContent(content);

        HashMap<String, Object> map = new HashMap<>();
        map.put("article", articleVO);
        return MyResponse.getSuccess(map);
    }

    @PostMapping("/listArticle")
    public MyResponse listArticle() {
        List<ArticleDO> articleDOS = articleTempMapper.selectAll();
        ArrayList<Map<String, Object>> maps = new ArrayList<>();
        for (ArticleDO articleDO : articleDOS) {
            Map<String ,Object> map = new HashMap<>();
            long commentCnt = commentMapper.selectCommentCntByArticle(articleDO.getArticleId());
            map.put("id", articleDO.getArticleId());
            map.put("name", articleDO.getArticleTitle());
            map.put("gmtCreate", articleDO.getGmtCreate());
            map.put("commentNum", commentCnt);
            String author = userMapper.selectUserById(articleDO.getArticleAuthor()).getUserName();
            map.put("author", author);
            maps.add(map);
        }

        return MyResponse.getSuccess(maps);

    }

    @PostMapping("/update")
    public MyResponse update(@RequestBody ArticleVO articleVO) {
        ArticleDO articleDO = new ArticleDO();
        UserDO userDO = userMapper.selectUserByName(articleVO.getArticleAuthor());
        articleDO.setArticleId(articleVO.getArticleId());
        articleDO.setArticleAuthor(userDO.getUserId());
        articleDO.setArticleContent(articleVO.getArticleContent());
        articleDO.setArticleHeadImage(articleVO.getArticleHeadImage());
        articleDO.setArticleTitle(articleVO.getArticleTitle());
        articleTempMapper.update(articleDO);
        return MyResponse.getSuccess("success");
    }

    @PostMapping("/deleteArticles")
    public MyResponse deleteArticles(@RequestBody List<Long> list) {
        for (Long aLong : list) {
            articleTempMapper.delete(aLong);
        }
        return MyResponse.getSuccess("success");
    }

}
