package com.example.Management.Board.API.Service;

import com.example.Management.Board.API.Model.Card;
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

    public Card createCard(Card card) {
        return cardRepository.save(card);
    }

    public List<Card> getAllCards(Long boardId) {
        return cardRepository.findByBoardId(boardId);
    }

    public Card getCardById(Long boardId, Long cardId) {
        return cardRepository.findByIdAndBoardId(cardId, boardId).orElse(null);
    }

    public Card updateCard(Long boardId, Long cardId, Card cardDetails) {
        Card card = cardRepository.findByIdAndBoardId(cardId, boardId).orElse(null);
        if (card != null) {
            card.setTitle(cardDetails.getTitle());
            card.setDescription(cardDetails.getDescription());
            card.setSection(cardDetails.getSection());
            return cardRepository.save(card);
        }
        return null;
    }

    public String deleteCard(Long boardId, Long cardId) {
        Card card = cardRepository.findByIdAndBoardId(cardId, boardId).orElse(null);
        if (card != null) {
            cardRepository.delete(card);
            return "Card with ID " + cardId + " has been deleted successfully from board " + boardId + ".";
        }
        return null;
    }
}
