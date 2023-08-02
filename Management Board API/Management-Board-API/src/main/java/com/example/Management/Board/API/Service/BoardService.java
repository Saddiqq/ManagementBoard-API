package com.example.Management.Board.API.Service;

import com.example.Management.Board.API.Model.Board;
import com.example.Management.Board.API.ResponseObject.BoardResponse;
import com.example.Management.Board.API.Repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BoardService {

    private final BoardRepository boardRepository;

    @Autowired
    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public BoardResponse createBoard(Board board) {
        Board savedBoard = boardRepository.save(board);
        return convertToBoardResponse(savedBoard);
    }

    public List<BoardResponse> getAllBoards() {
        List<Board> boards = boardRepository.findAll();
        return boards.stream()
                .map(this::convertToBoardResponse)
                .collect(Collectors.toList());
    }

    public BoardResponse getBoardById(Long id) {
        Board board = boardRepository.findById(id).orElse(null);
        if(board != null) {
            return convertToBoardResponse(board);
        }
        return null;
    }

    public BoardResponse updateBoard(Long id, Board boardDetails) {
        Board board = boardRepository.findById(id).orElse(null);
        if (board != null) {
            board.setTitle(boardDetails.getTitle());

            // Only set the columns field if it's not null
            if (boardDetails.getColumns() != null) {
                board.setColumns(boardDetails.getColumns());
            }

            Board updatedBoard = boardRepository.save(board);
            return convertToBoardResponse(updatedBoard);
        }
        return null;
    }

    public String deleteBoard(Long id) {
        boardRepository.deleteById(id);
        return "Board with ID " + id + " has been deleted successfully.";
    }

    // Conversion method
    private BoardResponse convertToBoardResponse(Board board) {
        BoardResponse response = new BoardResponse();
        response.setBoardId(board.getId());
        response.setName(board.getTitle());

        Map<Integer, String> columns = new HashMap<>();
        // TODO: fill in the columns map based on the board entity
        response.setColumns(columns);

        return response;
    }
}
