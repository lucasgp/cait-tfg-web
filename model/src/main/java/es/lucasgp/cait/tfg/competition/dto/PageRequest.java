package es.lucasgp.cait.tfg.competition.dto;

import java.util.ArrayList;
import java.util.List;

public class PageRequest {

    private int page;
    private int size;
    private final List<Sort> sorting = new ArrayList<Sort>();

    public PageRequest() {
    }

    public PageRequest(int page, int size) {
        this.page = page;
        this.size = size;
    }

    public int getPage() {
        return this.page;
    }

    public void setPage(final int page) {
        this.page = page;
    }

    public int getSize() {
        return this.size;
    }

    public void setSize(final int size) {
        this.size = size;
    }

    public List<Sort> getSorting() {
        return this.sorting;
    }

}
