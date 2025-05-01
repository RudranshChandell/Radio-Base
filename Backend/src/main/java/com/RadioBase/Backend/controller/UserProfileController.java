package com.RadioBase.Backend.controller;

import com.RadioBase.Backend.model.common_user;
import com.RadioBase.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserProfileController {

    @Autowired
    private UserRepository userRepository; // your JPA repository

    @GetMapping("/user")
    public  void  getUserProfile(@AuthenticationPrincipal OAuth2User principal) {
        String email = (String) principal.getAttributes().get("email");
        String fullName = (String) principal.getAttributes().get("name");
        String givenName = (String) principal.getAttributes().get("given_name");
        String familyName = (String) principal.getAttributes().get("family_name");
        String picture = (String) principal.getAttributes().get("picture");

        // Create or update user entity
        common_user user = userRepository.findByEmail(email).orElse(new common_user());
        user.setEmail(email);
        user.setName(fullName);
        user.setProfilePicture(picture);

        userRepository.save(user);
    }
}