package com.example.Management.Board.API.Model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "boards")
public class Board extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Integer columns = 0;

    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Card> cards;

    // Default constructor
    public Board() {}

    public Board(String title, Integer columns) {
        this.title = title;
        this.columns = columns;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getColumns() {
        return columns;
    }

    public void setColumns(Integer columns) {
        if(columns != null) {
            this.columns = columns;
        }
    }

    public List<Card> cards() {
        return cards;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }
}
