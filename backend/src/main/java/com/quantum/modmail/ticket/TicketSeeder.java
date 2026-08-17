package com.quantum.modmail.ticket;

import com.quantum.modmail.ticket.entity.Ticket;
import com.quantum.modmail.ticket.entity.TicketPriority;
import com.quantum.modmail.ticket.entity.TicketStatus;
import com.quantum.modmail.ticket.repositories.TicketRepository;
import com.quantum.modmail.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import net.datafaker.Faker;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketSeeder {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final Faker faker = new Faker();

    public void seed() {
        int toplamVeri = 1000;
        int batchBoyutu = 50;
        List<Ticket> ticketList = new ArrayList<>();

        for (int i = 0; i < toplamVeri; i++) {
            Ticket ticket = new Ticket();
            ticket.setTitle(faker.name().fullName());
            ticket.setDescription(faker.lorem().characters(60, 90));
            ticket.setPriority(faker.options().option(TicketPriority.class));
            ticket.setCreatedBy(userRepository.findRandom());
            ticket.setStatus(faker.options().option(TicketStatus.class));

            ticketList.add(ticket);
            if (ticketList.size() == batchBoyutu) {
                ticketRepository.saveAll(ticketList);
                ticketList.clear();
            }
        }

        if (!ticketList.isEmpty()) {
            ticketRepository.saveAll(ticketList);
        }
    }
}