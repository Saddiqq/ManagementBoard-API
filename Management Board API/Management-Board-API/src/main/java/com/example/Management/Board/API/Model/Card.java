package com.example.Management.Board.API.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "cards")
public class Card extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Integer section;

    @Column(nullable = true)
    private String description;

    @ManyToOne
    private Board board;

    // Default constructor
    public Card() {}

    public Card(String title, Integer section, String description, Board board) {
        this.title = title;
        this.section = section;
        this.description = description;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }
}
