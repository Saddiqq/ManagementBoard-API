package com.example.Management.Board.API.Controller;

import com.example.Management.Board.API.Model.Card;
import com.example.Management.Board.API.Model.Board;
import com.example.Management.Board.API.Service.CardService;
import com.example.Management.Board.API.Service.BoardService;
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
        if(board == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        Card newCard = cardService.createCard(board, card);
        return new ResponseEntity<>(newCard, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Card>> getAllCards(@PathVariable("boardId") Long boardId) {
        Board board = boardService.getBoardById(boardId);
        if(board == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        List<Card> cards = cardService.getAllCards(board);
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Card> getCardById(@PathVariable("boardId") Long boardId, @PathVariable("id") Long id) {
        Board board = boardService.getBoardById(boardId);
        if(board == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        Card card = cardService.getCardById(board, id);
        return new ResponseEntity<>(card, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Card> updateCard(@PathVariable("boardId") Long boardId, @PathVariable("id") Long id, @RequestBody Card card) {
        Board board = boardService.getBoardById(boardId);
        if(board == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        Card updatedCard = cardService.updateCard(board, id, card);
        return new ResponseEntity<>(updatedCard, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCard(@PathVariable("boardId") Long boardId, @PathVariable("id") Long id) {
        Board board = boardService.getBoardById(boardId);
        if(board == null)
            return new ResponseEntity<>("Board not found", HttpStatus.NOT_FOUND);
        String response = cardService.deleteCard(board, id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
