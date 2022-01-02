package com.ans20xx.newsserver.response;


import com.google.gson.Gson;
import lombok.Data;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Data
public class MyResponse {

    public static final Gson gson = new Gson();

    private int code;
    private String info;
    private Object data;

    public MyResponse(int code, String info, Object data) {
        this.code = code;
        this.info = info;
        this.data = data;
    }

    public static MyResponse getSuccess(Object data) {
        return new MyResponse(200, "success", data);
    }

    public static MyResponse getError(String info) {
        return new MyResponse(201, info, null);
    }

    public static MyResponse getError(int code, String info) {
        return new MyResponse(code, info, null);
    }

    public static void getError(HttpServletResponse response, int code, String description) throws IOException {
        MyResponse result = new MyResponse(code, description, null);
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(gson.toJson(result));
    }

}