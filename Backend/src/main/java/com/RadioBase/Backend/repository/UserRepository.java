package com.RadioBase.Backend.repository;

import com.RadioBase.Backend.model.common_user;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<common_user,Long> {
    common_user findByEmail(String email);
}
