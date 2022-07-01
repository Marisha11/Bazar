package com.ecommerce.backend.controller;

import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5000")
@RestController
@RequestMapping("/api/")

public class CartController {

    @Autowired
    private CartRepository cartRepository;

    // get all products
    @GetMapping("/cart")
    public List<Cart> getAllCart() {
        return cartRepository.findAll();
    }


    // create products rest api
    @PostMapping("/cart")
    public ResponseEntity<Cart> createCart(@RequestBody Cart cart) {
        List<Cart> allCartProducts = getAllCart();
        for (Cart cartItem : allCartProducts) {
            if (cartItem.getProductId() == cart.getProductId()) {
                Cart existingItem = cartItem;
                existingItem.setProductQuantity(cart.getProductQuantity());

                Cart updatedItem = cartRepository.save(existingItem);
                return ResponseEntity.ok().body(updatedItem);
            }
        }
        Cart item = cartRepository.save(cart);
        return ResponseEntity.ok().body(item);
    }

    @DeleteMapping("/cart/{id}")
    public void deleteCart(@PathVariable Long id) {
        List<Cart> allCartProducts = getAllCart();
        for (Cart cartItem : allCartProducts) {
            if (cartItem.getProductId() == id) {
                cartRepository.delete(cartItem);
            }
        }
    }
}
