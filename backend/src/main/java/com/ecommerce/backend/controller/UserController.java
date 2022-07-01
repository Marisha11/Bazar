package com.ecommerce.backend.controller;


import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5000")
@RestController
@RequestMapping("/api/")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public void createProduct(@RequestBody User user) {
        System.out.println("Hello");
    }

}
