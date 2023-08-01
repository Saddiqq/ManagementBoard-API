package com.example.Management.Board.API.Service;

import com.example.Management.Board.API.Model.Board;
import com.example.Management.Board.API.Repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {

    private final BoardRepository boardRepository;

    @Autowired
    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public Board createBoard(Board board) {
        // Your implementation goes here
        return null;
    }

    public List<Board> getAllBoards() {
        // Your implementation goes here
        return null;
    }

    public Board getBoardById(Long id) {
        // Your implementation goes here
        return null;
    }

    public Board updateBoard(Long id, Board board) {
        // Your implementation goes here
        return null;
    }

    public void deleteBoard(Long id) {
        // Your implementation goes here
    }
}
