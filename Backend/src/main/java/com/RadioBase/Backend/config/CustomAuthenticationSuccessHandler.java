package com.RadioBase.Backend.config;

import com.RadioBase.Backend.model.common_user;
import com.RadioBase.Backend.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User ;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Value("${frontend.url}")
    private String frontend_url;

    @Autowired
    private UserRepository userRepository; // Your JPA repository

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User  principal = (OAuth2User ) authentication.getPrincipal();
        String email = (String) principal.getAttributes().get("email");
        String fullName = (String) principal.getAttributes().get("name");
        String picture = (String) principal.getAttributes().get("picture");

        // Create or update user entity
        common_user user = userRepository.findByEmail(email).orElse(new common_user ());
        user.setEmail(email);

        user.setName(fullName);
        user.setProfilePicture(picture);

        userRepository.save(user); // Save user information

        String url=frontend_url+"/location";
        // Redirect to the desired URL
        response.sendRedirect(url);
    }

}