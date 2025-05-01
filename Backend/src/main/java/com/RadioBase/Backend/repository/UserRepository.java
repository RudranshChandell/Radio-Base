package com.RadioBase.Backend.repository;

import com.RadioBase.Backend.model.common_user;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<common_user,Long> {
    Optional<common_user> findByEmail(String email);
}
