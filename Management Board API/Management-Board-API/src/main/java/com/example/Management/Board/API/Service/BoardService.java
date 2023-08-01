package com.example.Management.Board.API.Service;

import org.springframework.stereotype.Service;
import com.example.Management.Board.API.Repository.BoardRepository;

@Service
public class BoardService {
    private final BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    // Here you can add your methods for create, read, update, and delete
}

