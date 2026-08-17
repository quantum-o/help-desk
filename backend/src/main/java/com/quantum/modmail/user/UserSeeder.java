package com.quantum.modmail.user;

import com.quantum.modmail.authorization.role.RoleService;
import com.quantum.modmail.authorization.role.entity.Role;
import com.quantum.modmail.user.entity.User;
import com.quantum.modmail.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import net.datafaker.Faker;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserSeeder {

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final Faker faker = new Faker();

    public void seed() {
        Role defaultRole = roleService.getDefaultRole();

        int toplamVeri = 250;
        int batchBoyutu = 50;
        List<User> list = new ArrayList<>();

        for (int i = 0; i < toplamVeri; i++) {
            User user = new User();
            user.setUsername(faker.name().fullName());
            user.setEmail(Math.random() * 1000 + "_" + faker.internet().emailAddress());
            user.setRoles(new HashSet<>(List.of(defaultRole)));
            user.setPasswordHash(faker.credentials().password());

            list.add(user);
            if (list.size() == batchBoyutu) {
                userRepository.saveAll(list);
                list.clear();
            }
        }

        if (!list.isEmpty()) {
            userRepository.saveAll(list);
        }
    }
}