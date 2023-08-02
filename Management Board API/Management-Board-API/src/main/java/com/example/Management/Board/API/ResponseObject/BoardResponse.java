package com.example.Management.Board.API.ResponseObject;

import java.util.Map;

public class BoardResponse {

    private Long boardId;
    private String title; // replaced name with title
    private Map<Integer, String> columns;

    // Getters and setters

    public Long getBoardId() {
        return boardId;
    }

    public void setBoardId(Long boardId) {
        this.boardId = boardId;
    }

    public String getTitle() { // changed getName() to getTitle()
        return title;
    }

    public void setTitle(String title) { // changed setName() to setTitle()
        this.title = title;
    }

    public Map<Integer, String> getColumns() {
        return columns;
    }

    public void setColumns(Map<Integer, String> columns) {
        this.columns = columns;
    }
}