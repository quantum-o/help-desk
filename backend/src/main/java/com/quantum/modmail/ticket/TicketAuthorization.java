package com.quantum.modmail.ticket;

import com.quantum.modmail.authorization.permission.PermissionService;
import com.quantum.modmail.authorization.permission.entity.PermissionCode;
import com.quantum.modmail.ticket.entity.Ticket;

import java.util.UUID;

public class TicketAuthorization {
    public static boolean canRead(Ticket ticket, UUID userId) {
        if (PermissionService.hasPermission(PermissionCode.ADMINISTRATOR))
            return true;

        if (PermissionService.hasPermission(PermissionCode.TICKET_READ))
            return true;

        if (ticket.getAssignedTo() != null && ticket.getAssignedTo().getId().equals(userId))
            return true;

        return ticket.getCreatedBy().getId().equals(userId);
    }

    public static boolean canUpdate(Ticket ticket, UUID userId) {
        if (PermissionService.hasPermission(PermissionCode.ADMINISTRATOR))
            return true;

        if (PermissionService.hasPermission(PermissionCode.TICKET_UPDATE))
            return true;

        return ticket.getAssignedTo() != null && ticket.getAssignedTo().getId().equals(userId);
    }

    public static boolean canSendMessage(Ticket ticket, UUID userId) {
        if (PermissionService.hasPermission(PermissionCode.ADMINISTRATOR))
            return true;

        if (PermissionService.hasPermission(PermissionCode.TICKET_UPDATE))
            return true;

        if (ticket.getAssignedTo() != null && ticket.getAssignedTo().getId().equals(userId))
            return true;

        return ticket.getCreatedBy().getId().equals(userId);
    }
}
