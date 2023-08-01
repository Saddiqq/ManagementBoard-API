package com.example.Management.Board.API.Model;

import jakarta.persistence.*;


@Entity
@Table(name = "cards")
public class Card extends BaseEntity {

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "section")
    @Enumerated(EnumType.STRING)
    private Section section;

    @ManyToOne
    @JoinColumn(name="board_id", nullable=false)
    private Board board;

    public enum Section {
        TO_DO,
        IN_PROGRESS,
        DONE
    }

    // getters and setters...
}

