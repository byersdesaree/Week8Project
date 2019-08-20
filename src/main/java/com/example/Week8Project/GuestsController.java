package com.example.Week8Project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/book")
public class GuestsController {
    @Autowired
    GuestsRepository guestsRepo;

    @GetMapping
    public List<Guests> getAllBooking() {
        return guestsRepo.findAll();
    }

    @PostMapping
    public Guests addGuest(@RequestBody @Valid Guests guests) {
        return guestsRepo.save(guests);
    }

}

