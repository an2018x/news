package com.ans20xx.newsserver.controller;


import com.ans20xx.newsserver.DO.ArticleDO;
import com.ans20xx.newsserver.DO.CommentDO;
import com.ans20xx.newsserver.DO.UserDO;
import com.ans20xx.newsserver.VO.CommentVO;
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
public class CommentController {

    @Resource
    private CommentMapper commentMapper;

    @Resource
    private UserMapper userMapper;

    @Resource
    private ArticleTempMapper articleTempMapper;

    @PostMapping("/comment")
    public MyResponse comment(@RequestBody CommentVO commentVO) {
        String username = commentVO.getCommentAuthor();
        UserDO userDO = userMapper.selectUserByName(username);
        CommentDO commentDO = new CommentDO();
        commentDO.setCommentArticle(commentVO.getCommentArticle());
        commentDO.setCommentContent(commentVO.getCommentContent());
        commentDO.setCommentAuthor(userDO.getUserId());
        System.out.println(commentDO.getCommentAuthor());
        commentMapper.insert(commentDO);
        return MyResponse.getSuccess("success");
    }

    @PostMapping("/listComment")
    public MyResponse listComment(@RequestBody long id) {
        List<CommentDO> commentDOList = commentMapper.selectCommentsByArticleId(id);
        List<CommentVO> commentVOList = new ArrayList<>();

        for (CommentDO commentDO : commentDOList) {
            CommentVO commentVO = new CommentVO();
            UserDO user = userMapper.selectUserById(commentDO.getCommentAuthor());
            String username = user.getUserName();
            commentVO.setCommentId(commentDO.getCommentId());
            commentVO.setCommentAuthor(username);
            commentVO.setCommentArticle(commentDO.getCommentArticle());
            commentVO.setCommentContent(commentDO.getCommentContent());
            commentVO.setGmtCreate(commentDO.getGmtCreate());
            commentVO.setUserAvatar(user.getUserAvatar());
            commentVOList.add(commentVO);
        }
        Map<String, Object> map = new HashMap<>();
        map.put("commentList", commentVOList);
        return MyResponse.getSuccess(map);
    }
}
