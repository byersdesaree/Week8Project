package com.example.Week8Project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class GuestsController {
    @Autowired
    GuestsRepository guestsRepo;

    @Autowired
    TablesRepository tablesRepo;


    @RequestMapping(value = "/book",method = RequestMethod.GET)
    public List<Guests> getAllGuests(){
        return guestsRepo.findAll();
    }

    @RequestMapping(value = "/available",method = RequestMethod.GET)
    public List<Tables> getAllTablesAvailable(){
        return tablesRepo.findAll();
    }

    @RequestMapping(value = "/book",method = RequestMethod.POST)
    public Guests addGuest(@RequestBody @Valid Guests guests){
        return guestsRepo.save(guests);
    }

}

