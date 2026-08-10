package com.quantum.modmail.user;

import com.quantum.modmail.user.entity.User;
import com.quantum.modmail.user.entity.UserRole;
import com.quantum.modmail.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class UserSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final Faker faker = new Faker();

    @Override
    public void run(String... args) throws Exception {
        if (Arrays.asList(args).contains("--seed-users")) {
            int toplamVeri = 250;
            int batchBoyutu = 50;
            List<User> list = new ArrayList<>();

            for (int i = 0; i < toplamVeri; i++) {
                User user = new User();
                user.setUsername(faker.name().fullName());
                user.setEmail(Math.random() * 1000 + "_" + faker.internet().emailAddress());
                user.setRole(faker.options().option(UserRole.class));
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
}