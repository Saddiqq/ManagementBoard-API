package com.example.Management.Board.API.Service;

import com.example.Management.Board.API.Model.Card;
import com.example.Management.Board.API.Repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class CardService {

    private final CardRepository cardRepository;

    @Autowired
    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public Card addCard(Card card) {
        return cardRepository.save(card);
    }

    public List<Card> findAllCards() {
        return cardRepository.findAll();
    }

    public Card updateCard(Card card) {
        return cardRepository.save(card);
    }

    public Card findCardById(Long id) {
        return cardRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Card with id " + id + " not found"));
    }

    public void deleteCard(Long id) {
        if (!cardRepository.existsById(id)) {
            throw new NoSuchElementException("Card with id " + id + " not found");
        }
        cardRepository.deleteById(id);
    }
}
