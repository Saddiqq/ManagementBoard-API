package com.example.Management.Board.API.Repository;

import com.example.Management.Board.API.Model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

    @Query("SELECT c FROM Card c WHERE c.board.id = :boardId")
    List<Card> findByBoardId(@Param("boardId") Long boardId);

    @Query("SELECT c FROM Card c WHERE c.id = :id AND c.board.id = :boardId")
    Optional<Card> findByIdAndBoardId(@Param("id") Long id, @Param("boardId") Long boardId);
}
