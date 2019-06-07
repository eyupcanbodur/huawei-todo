package com.huawei.backend.controllers;

import com.huawei.backend.models.User;
import com.huawei.backend.repositories.UserRepository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository repository;

    ObjectMapper objectMapper = new ObjectMapper();

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String getUser() {
        return "There is no user with that";
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public User getUserById(@PathVariable("id") ObjectId id) {
        return repository.findBy_id(id);
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public Object createUser(@Valid @RequestBody User user) {
        // return repository.findByEmail(user.getEmail());
        if (repository.findByEmail(user.getEmail()) == null) {
            user.set_id(ObjectId.get());
            repository.save(user);
            return user;
        }
        return objectMapper.createObjectNode().put("isRegistered", true);

    }

    @GetMapping(value = "/login")
    public Object loginUser(@Valid @RequestParam("email") String email,
            @Valid @RequestParam("password") String password) {

        if (repository.findByEmail(email) == null) {
            return objectMapper.createObjectNode().put("isRegistered", false);
        }
        User user = repository.findByEmailAndPassword(email, password);
        if (user == null) {
            return objectMapper.createObjectNode().put("isRegistered", true);
        }
        return user;

    }
}