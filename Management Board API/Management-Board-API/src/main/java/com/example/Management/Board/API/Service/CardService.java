package com.example.Management.Board.API.Service;

import com.example.Management.Board.API.Model.Card;
import com.example.Management.Board.API.Model.Board;
import com.example.Management.Board.API.Repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService {

    private final CardRepository cardRepository;

    @Autowired
    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public Card createCard(Board board, Card card) {
        card.setBoard(board);
        return cardRepository.save(card);
    }

    public List<Card> getAllCards(Board board) {
        return cardRepository.findByBoard(board);
    }

    public Card getCardById(Board board, Long cardId) {
        return cardRepository.findByIdAndBoard(cardId, board).orElse(null);
    }

    public Card updateCard(Board board, Long cardId, Card cardDetails) {
        Card card = cardRepository.findByIdAndBoard(cardId, board).orElse(null);
        if (card != null) {
            card.setTitle(cardDetails.getTitle());
            card.setDescription(cardDetails.getDescription());
            card.setSection(cardDetails.getSection());
            return cardRepository.save(card);
        }
        return null;
    }

    public String deleteCard(Board board, Long cardId) {
        Card card = cardRepository.findByIdAndBoard(cardId, board).orElse(null);
        if (card != null) {
            cardRepository.delete(card);
            return "Card with ID " + cardId + " has been deleted successfully from board " + board.getId() + ".";
        }
        return null;
    }
}
