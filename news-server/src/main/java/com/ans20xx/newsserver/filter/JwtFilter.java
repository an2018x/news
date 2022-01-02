package com.ans20xx.newsserver.filter;


import com.ans20xx.newsserver.config.JwtConfig;
import com.ans20xx.newsserver.utils.JwtTokenUtil;
import com.ans20xx.newsserver.response.MyResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @Author: miansen
 * @Date: 2018/11/17 13:27
 */
@Component
public class JwtFilter implements HandlerInterceptor {

    @Autowired
    private JwtConfig jwtConfig;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        if (request.getMethod().equals("OPTIONS")) {
            response.setStatus(HttpServletResponse.SC_NO_CONTENT);
            return false;
        }

        String authHeader = request.getHeader(jwtConfig.getHeader());
        if (authHeader == null || !authHeader.startsWith(jwtConfig.getTokenHead())) {
            MyResponse.getError(response, 202, "无效Token");
            return false;
        }

        String authToken = authHeader.substring(jwtConfig.getTokenHead().length());
        if(!jwtTokenUtil.validateToken(authToken)){
            MyResponse.getError(response, 202, "Token不合法或已过期");
            return false;
        }
        request.setAttribute("authToken", authHeader);
        return true;
    }
}
