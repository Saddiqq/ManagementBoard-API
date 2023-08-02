package com.example.Management.Board.API.Service;

import com.example.Management.Board.API.Model.Board;
import com.example.Management.Board.API.Model.Card;
import com.example.Management.Board.API.Repository.BoardRepository;
import com.example.Management.Board.API.Repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CardService {

    private final CardRepository cardRepository;
    private final BoardRepository boardRepository;

    @Autowired
    public CardService(CardRepository cardRepository, BoardRepository boardRepository) {
        this.cardRepository = cardRepository;
        this.boardRepository = boardRepository;
    }

    public Card addCard(Long boardId, Card card) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new NoSuchElementException("Board with id " + boardId + " not found"));
        card.setBoard(board);
        return cardRepository.save(card);
    }

    public List<Card> findAllCards(Long boardId) {
        return cardRepository.findByBoardId(boardId);
    }

    public Card updateCard(Long boardId, Card card) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new NoSuchElementException("Board with id " + boardId + " not found"));
        card.setBoard(board);
        return cardRepository.save(card);
    }

    public Card findCardById(Long boardId, Long id) {
        return cardRepository.findByIdAndBoardId(id, boardId)
                .orElseThrow(() -> new NoSuchElementException("Card with id " + id + " not found in board " + boardId));
    }

    public void deleteCard(Long boardId, Long id) {
        cardRepository.findByIdAndBoardId(id, boardId).ifPresent(cardRepository::delete);
    }
}
