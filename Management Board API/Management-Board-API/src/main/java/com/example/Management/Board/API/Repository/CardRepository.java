package com.example.Management.Board.API.Repository;


import com.example.Management.Board.API.Model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    List<Card> findByBoardId(Long boardId);
    Optional<Card> findByIdAndBoardId(Long id, Long boardId);
}
