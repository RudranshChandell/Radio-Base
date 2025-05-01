package com.RadioBase.Backend.services;

import com.RadioBase.Backend.model.common_user;
import com.RadioBase.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.user.OAuth2User ;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void saveUser (OAuth2User  oAuth2User ) {
        String email = oAuth2User .getAttribute("email");
        String name = oAuth2User .getAttribute("name");
        String familyName = oAuth2User .getAttribute("family_name");
        String profilePicture = oAuth2User .getAttribute("picture");

        common_user user = userRepository.findByEmail(email);
        if (user == null) {
            user = new common_user(email, name, familyName, profilePicture);
            userRepository.save(user);
        }
    }
}