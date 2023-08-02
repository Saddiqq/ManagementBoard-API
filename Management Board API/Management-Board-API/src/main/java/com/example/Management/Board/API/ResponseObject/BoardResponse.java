package com.example.Management.Board.API.ResponseObject;

import java.util.Map;

public class BoardResponse {

    private Long boardId;
    private String name;
    private Map<Integer, String> columns;

    // Getters and setters

    public Long getBoardId() {
        return boardId;
    }

    public void setBoardId(Long boardId) {
        this.boardId = boardId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Map<Integer, String> getColumns() {
        return columns;
    }

    public void setColumns(Map<Integer, String> columns) {
        this.columns = columns;
    }
}
