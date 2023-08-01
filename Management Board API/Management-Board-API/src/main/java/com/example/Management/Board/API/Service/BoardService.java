package com.example.Management.Board.API.Service;

import com.example.Management.Board.API.Model.Board;
import com.example.Management.Board.API.Repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Date;

@Service
public class BoardService {

    private final BoardRepository boardRepository;

    @Autowired
    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public Board createBoard(Board board) {
        return boardRepository.save(board);
    }

    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    public Board getBoardById(Long id) {
        return boardRepository.findById(id).orElse(null);
    }

    public Board updateBoard(Long id, Board boardDetails) {
        Board board = boardRepository.findById(id).orElse(null);
        if (board != null) {
            board.setTitle(boardDetails.getTitle());

            // Only set the columns field if it's not null
            if (boardDetails.getColumns() != null) {
                board.setColumns(boardDetails.getColumns());
            }

            return boardRepository.save(board);
        }
        return null;
    }
    public String deleteBoard(Long id) {
        boardRepository.deleteById(id);
        return "Board with ID " + id + " has been deleted successfully.";
    }
}
