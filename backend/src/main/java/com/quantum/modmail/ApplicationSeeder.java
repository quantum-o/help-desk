package com.quantum.modmail;

import com.quantum.modmail.authorization.permission.PermissionSeeder;
import com.quantum.modmail.authorization.role.RoleSeeder;
import com.quantum.modmail.ticket.TicketSeeder;
import com.quantum.modmail.user.UserSeeder;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class ApplicationSeeder implements CommandLineRunner {

    private final PermissionSeeder permissionSeeder;
    private final RoleSeeder roleSeeder;
    private final UserSeeder userSeeder;
    private final TicketSeeder ticketSeeder;
    @Override
    public void run(String... args) {
        permissionSeeder.seed();
        roleSeeder.seed();

        if (Arrays.asList(args).contains("--seed-users")) {
            userSeeder.seed();
        }
        if (Arrays.asList(args).contains("--seed-tickets")) {
            ticketSeeder.seed();
        }
    }
}