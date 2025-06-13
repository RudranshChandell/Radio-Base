package com.RadioBase.Backend.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/auth")
public class AuthController {

    @GetMapping("/logout")
    public String logout(HttpServletResponse response) {
        // Create a cookie with the same name and set its max age to 0
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setMaxAge(0); // Set the cookie to expire immediately
        cookie.setPath("/"); // Set the path to the same as when it was created
        response.addCookie(cookie); // Add the cookie to the response

        // Optionally, invalidate the session if you are using sessions
        // request.getSession().invalidate();

        // Redirect to the login page or home page
        return "redirect:/login"; // Change this to your login page URL
    }
}