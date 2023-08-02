package com.example.Management.Board.API.Service;

import com.example.Management.Board.API.Model.Board;
import com.example.Management.Board.API.Model.Card;
import com.example.Management.Board.API.Repository.BoardRepository;
import com.example.Management.Board.API.Repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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

    public Card updateCard(Long boardId, Long cardId, Card cardDetails) {
        Card card = cardRepository.findByIdAndBoardId(cardId, boardId)
                .orElseThrow(() -> new NoSuchElementException("Card with id " + cardId + " not found"));

        card.setTitle(cardDetails.getTitle());
        card.setSection(cardDetails.getSection());

        return cardRepository.save(card);
    }


    public Card findCardById(Long boardId, Long id) {
        return cardRepository.findByIdAndBoardId(id, boardId)
                .orElseThrow(() -> new NoSuchElementException("Card with id " + id + " not found in board " + boardId));
    }

    public Optional<Card> deleteCard(Long boardId, Long id) {
        Optional<Card> card = cardRepository.findByIdAndBoardId(id, boardId);
        card.ifPresent(cardRepository::delete);
        return card;
    }
}
