package com.example.Management.Board.API.Controller;

import com.example.Management.Board.API.Model.Board;
import com.example.Management.Board.API.Model.Card;
import com.example.Management.Board.API.Service.BoardService;
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
    private final BoardService boardService;

    @Autowired
    public CardController(CardService cardService, BoardService boardService) {
        this.cardService = cardService;
        this.boardService = boardService;
    }

    @PostMapping
    public ResponseEntity<Card> createCard(@PathVariable("boardId") Long boardId, @RequestBody Card card) {
        Board board = boardService.getBoardById(boardId);
        if (board == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        card.setBoard(board);
        Card newCard = cardService.createCard(card);
        return new ResponseEntity<>(newCard, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Card>> getAllCards(@PathVariable("boardId") Long boardId) {
        List<Card> cards = cardService.getAllCards(boardId);
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Card> getCardById(@PathVariable("boardId") Long boardId, @PathVariable("id") Long id) {
        Card card = cardService.getCardById(boardId, id);
        return new ResponseEntity<>(card, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Card> updateCard(@PathVariable("boardId") Long boardId, @PathVariable("id") Long id, @RequestBody Card card) {
        Card updatedCard = cardService.updateCard(boardId, id, card);
        return new ResponseEntity<>(updatedCard, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCard(@PathVariable("boardId") Long boardId, @PathVariable("id") Long id) {
        String response = cardService.deleteCard(boardId, id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
