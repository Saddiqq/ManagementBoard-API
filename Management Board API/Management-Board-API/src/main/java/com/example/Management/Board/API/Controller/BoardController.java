package com.example.Management.Board.API.Controller;

import com.example.Management.Board.API.Model.Board;
import com.example.Management.Board.API.ResponseObject.BoardResponse;
import com.example.Management.Board.API.Service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardService boardService;

    @Autowired
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @PostMapping
    public ResponseEntity<BoardResponse> createBoard(@RequestBody Board board) {
        BoardResponse newBoard = boardService.createBoard(board);
        return new ResponseEntity<>(newBoard, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<BoardResponse>> getAllBoards() {
        List<BoardResponse> boards = boardService.getAllBoards();
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoardResponse> getBoardById(@PathVariable("id") Long id) {
        BoardResponse board = boardService.getBoardById(id);
        if (board != null) {
            return new ResponseEntity<>(board, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BoardResponse> updateBoard(@PathVariable("id") Long id, @RequestBody Board board) {
        BoardResponse updatedBoard = boardService.updateBoard(id, board);
        if (updatedBoard != null) {
            return new ResponseEntity<>(updatedBoard, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBoard(@PathVariable("id") Long id) {
        String response = boardService.deleteBoard(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
