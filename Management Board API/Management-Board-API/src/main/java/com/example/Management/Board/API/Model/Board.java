package com.example.Management.Board.API.Model;

import jakarta.persistence.*;
import java.util.List;
import java.util.Map;

@Entity
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;

    @ElementCollection
    private Map<Integer, String> columns;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Card> cards;

    public Board() {
        // Default constructor
    }

    public Board(String name, Map<Integer, String> columns) {
        this.name = name;
        this.columns = columns;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public List<Card> getCards() {
        return cards;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }
}
