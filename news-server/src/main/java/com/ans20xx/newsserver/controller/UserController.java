package com.ans20xx.newsserver.controller;

import com.ans20xx.newsserver.DO.ArticleDO;
import com.ans20xx.newsserver.DO.TokenDO;
import com.ans20xx.newsserver.DO.UserDO;
import com.ans20xx.newsserver.config.ImageConfig;
import com.ans20xx.newsserver.exception.ApiAssert;
import com.ans20xx.newsserver.exception.ApiException;
import com.ans20xx.newsserver.mapper.ArticleTempMapper;
import com.ans20xx.newsserver.mapper.CommentMapper;
import com.ans20xx.newsserver.mapper.TokenMapper;
import com.ans20xx.newsserver.mapper.UserMapper;
import com.ans20xx.newsserver.response.MyResponse;
import com.ans20xx.newsserver.service.TokenService;
import com.ans20xx.newsserver.utils.JwtTokenUtil;
import org.apache.commons.io.FileUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class UserController {

    @Resource
    private UserMapper userMapper;

    @Resource
    private TokenService tokenService;

    @Resource
    private JwtTokenUtil jwtTokenUtil;

    @Resource
    private TokenMapper tokenMapper;

    @Resource
    private ImageConfig imageConfig;

    @Resource
    private ArticleTempMapper articleTempMapper;

    @Resource
    private CommentMapper commentMapper;


    @PostMapping("/register")
    public MyResponse register(@RequestBody UserDO user) {

        try {
            String username = user.getUserName();

            UserDO newUser = userMapper.selectUserByName(username);
            ApiAssert.isNull(newUser, "用户已存在");

            user.setUserPassword(new BCryptPasswordEncoder().encode(user.getUserPassword()));
            user.setUserRole("ROLE_USER");
            if(user.getUserAvatar() == null || user.getUserAvatar().length() < 10) {
                user.setUserAvatar("http://localhost:8080/img/th.jfif");
            }
            userMapper.insert(user);

            TokenDO newToken = tokenService.create(jwtTokenUtil.generateToken(user.getUserName()), user.getUserId());

            HashMap<String, Object> map = new HashMap<>();
            map.put("username", user.getUserName());
            map.put("token", newToken.getTokenStr());
            map.put("avatar", user.getUserAvatar());
            map.put("role", user.getUserRole());
            return MyResponse.getSuccess(map);
        } catch (ApiException e) {
            return MyResponse.getError(e.getMessage());
        }
    }

    @PostMapping("/login")
    public MyResponse login(@RequestBody UserDO user) {
        try {
            String username = user.getUserName();
            String password = user.getUserPassword();

            UserDO newUser = userMapper.selectUserByName(user.getUserName());

            ApiAssert.notNull(newUser, "用户不存在");
            ApiAssert.isTrue(new BCryptPasswordEncoder().matches(password, newUser.getUserPassword()), "密码错误");
            TokenDO token = tokenMapper.selectTokenByTokenUser(newUser.getUserId());
            HashMap<String, Object> map = new HashMap<>();
            map.put("username", user.getUserName());
            map.put("token", token.getTokenStr());
            map.put("role", newUser.getUserRole());
            map.put("avatar", newUser.getUserAvatar());
            return MyResponse.getSuccess(map);
        } catch (ApiException e) {
            return MyResponse.getError(e.getMessage());
        }

    }

    @PostMapping("/upload")
    public MyResponse upload(@RequestParam("file") MultipartFile file) {
        String fileName = file.getOriginalFilename();
        HashMap<String, Object> map = new HashMap<>();

        try {
            String path = ResourceUtils.getURL("classpath:").getPath()+"static/upload";
            String realPath = path.replace('/', '\\').substring(1,path.length());
            File uploadFile = new File(realPath, fileName);
            File fileParent = uploadFile.getParentFile();
            if(!fileParent.exists()) {
                fileParent.mkdirs();
            }
            file.transferTo(uploadFile);
            map.put("fileUrl", imageConfig.getUrl()+"/img/"+fileName);
            return MyResponse.getSuccess(map);
        } catch (IOException e) {
            e.printStackTrace();
            return MyResponse.getError("上传失败");
        }

    }

    @PostMapping("/listUser")
    public MyResponse listUser() {
        List<UserDO> userDOS = userMapper.selectAll();
        ArrayList<Map<String, Object>> maps = new ArrayList<>();
        for (UserDO userDO : userDOS) {
            Map<String ,Object> map = new HashMap<>();
            long articleCnt = articleTempMapper.selectArticleCntByUser(userDO.getUserId());
            long commentCnt = commentMapper.selectCommentCntByUser(userDO.getUserId());
            map.put("id", userDO.getUserId());
            map.put("userName", userDO.getUserName());
            map.put("userRole", "ROLE_ADMIN".equals(userDO.getUserRole()) ? "管理员" : "普通用户");
            map.put("articleCnt", articleCnt);
            map.put("commentCnt", commentCnt);
            maps.add(map);
        }
        return MyResponse.getSuccess(maps);

    }



}
