package com.example.Management.Board.API.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "cards")
public class Card extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Integer section;

    @ManyToOne
    private Board board;

    // Default constructor
    public Card() {}

    public Card(String title, Integer section, Board board) {
        this.title = title;
        this.section = section;
        this.board = board;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getSection() {
        return section;
    }

    public void setSection(Integer section) {
        this.section = section;
    }

    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }
}
