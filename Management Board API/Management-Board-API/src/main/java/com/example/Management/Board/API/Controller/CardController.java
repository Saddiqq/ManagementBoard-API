package com.example.Management.Board.API.Controller;

import com.example.Management.Board.API.Model.Card;
import com.example.Management.Board.API.Service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards/{boardId}/cards")
public class CardController {

    private final CardService cardService;

    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping
    public ResponseEntity<Card> createCard(@PathVariable Long boardId, @RequestBody Card card) {
        Card newCard = cardService.addCard(boardId, card);
        return new ResponseEntity<>(newCard, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Card>> getAllCards(@PathVariable Long boardId) {
        List<Card> cards = cardService.findAllCards(boardId);
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Card> getCardById(@PathVariable Long boardId, @PathVariable("id") Long id) {
        Card card = cardService.findCardById(boardId, id);
        return new ResponseEntity<>(card, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Card> updateCard(@PathVariable Long boardId, @PathVariable("id") Long id, @RequestBody Card cardDetails) {
        Card updatedCard = cardService.updateCard(boardId, id, cardDetails);
        return new ResponseEntity<>(updatedCard, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCard(@PathVariable Long boardId, @PathVariable("id") Long id) {
        cardService.deleteCard(boardId, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
