package com.RadioBase.Backend.controller;

import io.micrometer.core.ipc.http.HttpSender;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {

    @GetMapping("/authenticated")
    public ResponseEntity<Map<String,Object>> isAuthenticated(Authentication auth) {
        Map<String, Object> response = new HashMap<>();
        boolean isAuthenticated = auth != null && auth.isAuthenticated();

        if (isAuthenticated && auth.getPrincipal() instanceof OAuth2User){
            OAuth2User oauthUser = (OAuth2User) auth.getPrincipal();
            response.put("authenticated", isAuthenticated);
            response.put("email", oauthUser.getAttribute("email"));
            response.put("name", oauthUser.getAttribute("name"));
            response.put("user", oauthUser.getAttributes());
    }else{
        response.put("user",null);
    }
        return ResponseEntity.ok(response);
    }
}
