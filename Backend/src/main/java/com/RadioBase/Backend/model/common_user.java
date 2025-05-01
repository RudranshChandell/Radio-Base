package com.RadioBase.Backend.model;

import jakarta.persistence.*;

@Entity
public class common_user {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String name;
    private String profilePicture;

    // Constructors, Getters, and Setters
    public common_user() {}

    public common_user(String email, String name, String familyName, String profilePicture) {
        this.email = email;
        this.name = name;
        this.profilePicture = profilePicture;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getProfilePicture() { return profilePicture; }
    public void setProfilePicture(String profilePicture) { this.profilePicture = profilePicture; }
}