package com.quantum.modmail.dashboard;

import com.quantum.modmail.common.response.ApiResponse;
import com.quantum.modmail.dashboard.dto.DashboardResponse;
import com.quantum.modmail.dashboard.dto.StatisticRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @PostMapping()
    public ResponseEntity<ApiResponse<DashboardResponse>> getDashboard(
            @Valid @RequestBody StatisticRequest statisticRequest
    ) {
        DashboardResponse response = dashboardService.getDashboard(statisticRequest);
        return ResponseEntity.ok(ApiResponse.ok("Success", response));
    }
}
