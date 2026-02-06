package com.RadioBase.Backend.repository;

import com.RadioBase.Backend.model.common_user;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class UserRepository {
    private final Map<String, common_user> store = new ConcurrentHashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    public Optional<common_user> findByEmail(String email) {
        return Optional.ofNullable(store.get(email));
    }

    public common_user save(common_user user) {
        if (user.getId() == null) {
            user.setId(idGenerator.getAndIncrement());
        }
        // Assuming email is the unique key we want to store by for fast lookup
        if (user.getEmail() != null) {
            store.put(user.getEmail(), user);
        }
        return user;
    }
}
