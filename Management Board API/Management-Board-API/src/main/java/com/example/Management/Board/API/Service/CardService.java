package com.example.Management.Board.API.Service;

import com.example.Management.Board.API.Repository.CardRepository;
import org.springframework.stereotype.Service;

@Service
public class CardService {
    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    // Here you can add your methods for create, read, update, and delete
}
